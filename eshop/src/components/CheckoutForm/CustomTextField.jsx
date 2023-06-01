import React from "react";
import { TextField, Grid, Input } from "@material-ui/core";
import { Controller } from "react-hook-form";

const FormInput = function({name, label, required, control}) {
    return (
        <Grid item xs={12} sm={6}>
            <label style={{fontFamily: "sans-serif", paddingRight: "50px"}}>{label}</label>
            <Controller
                control={control}
                name={name}
                rules={{"required": required}}
                render = {({field}) => (
                    <Input {...field} />
                )}
            />
        </Grid>
    )
}

export default FormInput;