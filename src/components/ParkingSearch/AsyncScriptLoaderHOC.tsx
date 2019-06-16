import hoistStatics from 'hoist-non-react-statics';
import React, { Component, ComponentType } from "react";
import { Omit } from 'react-router';

export interface AsyncScriptLoaderHOCProps {
    scripts_loaded: false,
    scripts_loaded_successfully: false
}

const cached_scripts = new Set<string>();

export const withScriptLoader = (...scripts: string[]) =>
    function <P extends AsyncScriptLoaderHOCProps>(WrappedComponent: ComponentType<P>) {
        class AsyncScriptLoaderHOC extends Component<P> {

            public state: AsyncScriptLoaderHOCProps = {
                scripts_loaded: false,
                scripts_loaded_successfully: false
            };

            public is_mounted = false;

            public componentDidMount() {
                this.is_mounted = true;
                this.loadSripts(scripts);
            }

            public componentWillUnmount() {
                this.is_mounted = false;
            }

            public loadSripts = async (scripts: string[]) => {
                let success = true;

                try {
                    await Promise.all(scripts
                        .filter(uri => !cached_scripts.has(uri))
                        .map(uri => this.loadScript(uri))
                    );
                } catch {
                    success = false;
                }

                if (this.is_mounted) {
                    this.setState({
                        scripts_loaded: true,
                        scripts_loaded_successfully: success
                    });
                }
            }

            public loadScript = (uri: string): Promise<string> => {
                cached_scripts.add(uri);
                const script = document.createElement('script');
                script.src = uri;
                script.async = true;
                const loader = new Promise<string>((resolve, reject) => {
                    script.addEventListener('load', () => {
                        console.info(`loaded: ${uri}`);
                        resolve(uri);
                    });
                    script.addEventListener('error', e => reject(e));
                }).catch(e => {
                    cached_scripts.delete(uri);
                    script.remove();
                    throw e;
                });

                document.body.appendChild(script);

                return loader;
            }

            public render() {
                const props = {
                    ...this.props,
                    ...this.state
                };

                return <WrappedComponent {...props} />
            }
        }

        return (hoistStatics(AsyncScriptLoaderHOC, WrappedComponent) as unknown) as ComponentType<Omit<P, keyof AsyncScriptLoaderHOCProps>> & hoistStatics.NonReactStatics<React.ComponentType<Omit<P, keyof AsyncScriptLoaderHOCProps>>, {}>;
    }