import React, {useState, useEffect} from "react";
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from "@material-ui/core";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

import {commerce} from "../../lib/commerce";

import FormInput from "./CustomTextField";

const AddressForm = function({checkoutToken, next}) {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");
    const {handleSubmit, control} = useForm();

    const onSubmit = data => {next({...data, shippingCountry, shippingSubdivision, shippingOption})};

    const fetchShippingCountries = async function(checkoutTokenId) {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async function(countryCode) {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    const fetchShippingOptions = async function(checkoutTokenId, country, region = null) {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(function() {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(function() {
        shippingCountry && fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(function() {
        shippingSubdivision && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant="h6" gutterBottom>Shipping address</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <FormInput control={control} required name="firstName" label="First name" />
                    <FormInput control={control} required name="lastName" label="Last name" />
                    <FormInput control={control} required name="address1" label="Address" />
                    <FormInput control={control} required name="email" label="E-mail" />
                    <FormInput control={control} required name="city" label="City" />
                    <FormInput control={control} required name="zip" label="ZIP / Postal code" />
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping country</InputLabel>
                        <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping subdivision</InputLabel>
                        <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                            {Object.entries(shippingSubdivisions).map(([code, name]) => (
                                <MenuItem key={code} value={code}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping options</InputLabel>
                        <Select value={shippingOption} fullWidth onChange={(e)=>setShippingOption(e.target.value)}>
                            {shippingOptions.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.description} - ({option.price.formatted_with_code})
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "4%"}}>
                    <Button component={Link} to="/cart" variant="outlined">Back to cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                </div>
            </form>
        </>
    )
}

export default AddressForm;