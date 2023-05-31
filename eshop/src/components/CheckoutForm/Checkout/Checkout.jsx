import React, {useState, useEffect} from "react";
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from "@material-ui/core";

import {commerce} from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps= ["Shipping address", "Payment details"];

const Checkout = function({cart}) {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState({});
    const [shippingData, setShippingData] = useState({});
    const classes = useStyles();

    useEffect(function() {
        const generateToken = async function() {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: "cart"});
                setCheckoutToken(token);
            }
            catch (error) {

            }
        }

        generateToken();
    }, [cart]);

    const nextStep = function() {setActiveStep(step => step+1)}
    const prevStep = function() {setActiveStep(step => step-1)}

    const next = function(data) {
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    const Form = function() {
        if (activeStep === 0)
            return <AddressForm checkoutToken={checkoutToken} next={next} />
        return <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} />
    }

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(function(step) {
                            return <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        })}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;