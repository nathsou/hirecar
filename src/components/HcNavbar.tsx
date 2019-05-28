import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HcSecondaryButton from "./Button/HcSecondaryButton";
import Logo from "./Logo";
import HcModal from './HcModal';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { ToggleModalAction, NavbarState } from "../redux/navbar/types";
import { connect } from "react-redux";
import { HcState } from "../redux/configureStore";
import { toggleShowModal } from "../redux/navbar/actions";
import HcPrimaryButton from "./Button/HcPrimaryButton";
import { UserState, ResetUserLoggedAction } from "../redux/user/types";
import { resetUserLogged } from "../redux/user/actions";
import { emptyLocalStorage } from "../Utils";

interface HcNavbarProps extends RouteComponentProps {
    navbar: NavbarState,
    user: UserState,
    toggleModal: () => ToggleModalAction,
    resetUser: () => ResetUserLoggedAction
}

class HcNavbar extends Component<HcNavbarProps> {

    public loggedOut = () => {
        this.props.history.push("/");
        this.props.resetUser();
        emptyLocalStorage();
    }

    public render() {
        const { logged_in, data } = this.props.user;
        return (
            <header>
                <Navbar collapseOnSelect expand="lg" fixed="top">
                    <Navbar.Brand>
                        <h1><Logo /></h1>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Item>
                                <NavLink activeClassName='selected' to='/parking'>Location de parkings</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink activeClassName='selected' to='/voiture'>Location de voitures</NavLink>
                            </Nav.Item>
                            {logged_in ? (
                                <NavLink activeClassName='selected' to='/profil'>
                                    <Nav.Item>
                                        <HcPrimaryButton outlined="true">
                                            {logged_in ? `${data.firstname} ${data.lastname[0]}.` : ""}
                                        </HcPrimaryButton>
                                    </Nav.Item>
                                </NavLink>
                            ) : null}
                            <Nav.Item>
                                <HcSecondaryButton handleClick={logged_in ? this.loggedOut : this.props.toggleModal}>
                                    {logged_in ? "Déconnexion" : "Connexion"}
                                </HcSecondaryButton>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <HcModal show={this.props.navbar.show_modal} handleClose={this.props.toggleModal} />
            </header>
        );
    }
}

export default
    withRouter(
        connect(
            (state: HcState) => ({ navbar: state.navbar, user: state.user }),
            {
                toggleModal: toggleShowModal,
                resetUser: resetUserLogged
            }
        )(HcNavbar)
    );