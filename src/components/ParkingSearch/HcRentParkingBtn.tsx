import React, { Component } from "react";
import { PayPalButton } from 'react-paypal-button';


export interface HcRentParkingBtnProps {
    cost: number
}

export class HcRentParkingBtn extends Component<HcRentParkingBtnProps> {

    public componentDidMount() {

    }

    public render() {
        return (
            <PayPalButton
                env='sandbox'
                sandboxID={process.env.REACT_APP_PAYPAl_CLIENT_ID}
                amount={0.01}
                currency='EUR'
                onPaymentStart={() => console.log('payment started')}
                onPaymentSuccess={(res) => alert('payment complete: ' + JSON.stringify(res))}
                onPaymentError={(msg) => alert('payment error: ' + JSON.stringify(msg))}
            />
        );
    }
}