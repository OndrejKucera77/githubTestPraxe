import React, {useState, useEffect} from "react";
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

import {commerce} from "../../../lib/commerce";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps= ["Shipping address", "Payment details"];

const Checkout = function({cart, order, onCaptureCheckout, error}) {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState({});
    const [shippingData, setShippingData] = useState({});
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(function() {
        const generateToken = async function() {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: "cart"});
                setCheckoutToken(token);
            }
            catch (error) {
                navigate("/");
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

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    );

    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    }

    const Form = function() {
        if (activeStep === 0)
            return <AddressForm checkoutToken={checkoutToken} next={next} />
        return <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} back={prevStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} />
    }

    return (
        <>
            <CssBaseline />
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