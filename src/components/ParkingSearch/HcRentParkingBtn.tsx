import React, { Component } from "react";
import { AsyncScriptLoaderHOCProps, withScriptLoader } from "./AsyncScriptLoaderHOC";

declare const paypal: any;

export interface HcRentParkingBtnProps extends AsyncScriptLoaderHOCProps {
    cost: number,
    disabled: boolean,
    onSuccess: (details: OrderDetails) => void
}

class HcRentParkingBtn extends Component<HcRentParkingBtnProps> {

    public componentDidUpdate(prev_props: HcRentParkingBtnProps & AsyncScriptLoaderHOCProps) {
        if (!prev_props.scripts_loaded && this.props.scripts_loaded && this.props.scripts_loaded_successfully) {
            console.log('all scripts loaded!');
            this.initButton();
        }
    }

    public initButton() {
        paypal.Buttons({
            locale: 'fr_FR',
            style: {
                size: 'responsive',
                layout: 'horizontal',
                color: 'blue',
                shape: 'rect',
                label: 'pay',
                tagline: false
            },
            createOrder: (data: any, actions: any) => {
                // Set up the transaction
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: parseFloat(this.props.cost.toFixed(2))
                        }
                    }]
                });
            },
            onApprove: (data: any, actions: any) => {
                // Capture the funds from the transaction
                return actions.order.capture().then((details: OrderDetails) => {
                    this.props.onSuccess(details);
                });
            }
        }).render('#rent-parking-paypal');
    }

    public render() {
        const { scripts_loaded_successfully: loaded, disabled, cost } = this.props;
        return loaded ?
            (<div style={{ display: disabled ? 'none' : 'flex', width: "200px", flexDirection: 'column', justifyContent: 'flex-end' }} id='rent-parking-paypal'>
                <h3>Total: {cost.toFixed(2)}€</h3>
            </div>) : 'Loading...';
    }
}

export default withScriptLoader('https://www.paypal.com/sdk/js?currency=EUR&client-id=' + process.env.REACT_APP_PAYPAl_CLIENT_ID)(
    HcRentParkingBtn
);

interface OrderDetails {
    create_time: string;
    update_time: string;
    id: string;
    intent: string;
    status: string;
    payer: Payer;
    purchase_units: Purchaseunit[];
    links: Link[];
}

interface Purchaseunit {
    reference_id: string;
    amount: Amount;
    payee: Payee;
    shipping: Shipping;
    payments: Payments;
}

interface Payments {
    captures: Capture[];
}

interface Capture {
    status: string;
    id: string;
    final_capture: boolean;
    create_time: string;
    update_time: string;
    amount: Amount;
    seller_protection: Sellerprotection;
    links: Link[];
}

interface Link {
    href: string;
    rel: string;
    method: string;
    title: string;
}

interface Sellerprotection {
    status: string;
    dispute_categories: string[];
}

interface Shipping {
    name: Name2;
    address: Address2;
}

interface Address2 {
    address_line_1: string;
    admin_area_2: string;
    admin_area_1: string;
    postal_code: string;
    country_code: string;
}

interface Name2 {
    full_name: string;
}

interface Payee {
    email_address: string;
    merchant_id: string;
}

interface Amount {
    value: string;
    currency_code: string;
}

interface Payer {
    email_address: string;
    payer_id: string;
    address: Address;
    name: Name;
}

interface Name {
    given_name: string;
    surname: string;
}

interface Address {
    country_code: string;
}