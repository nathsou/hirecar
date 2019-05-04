import React,{Component} from "react";
// @ts-ignore
import PaypalExpressBtn from 'react-paypal-express-checkout';
interface HcPaypalProps {
    prix:number
}

export default class HcPaypal extends Component<HcPaypalProps>{

    public render(){
        const {prix} =this.props;
        const client ={
            sandbox:process.env.REACT_APP_PAYPAl_CLIENT_ID
    };
        return ( <PaypalExpressBtn client={client} currency={'EUR'} total={prix} onSuccess={successPaiment} />)
    }
}
// @ts-ignore
const successPaiment = (paiement) => {
    console.log(JSON.stringify(paiement));
    const site = process.env.REACT_APP_HIRECARAPI+'/verify_paiement';
    const req= new XMLHttpRequest();
    req.open('POST',site,false);
    req.send(JSON.stringify(paiement));
    if (req.status === 200){
        //TODO complete in case of succeed Action
    } else {
        //TODO complete in case of unpaid error given by data trasnmitted to the serveur
    }
};