import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        "& > span": {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

export default function Selector({ countries, setInputValue }) {
    const classes = useStyles();

    const changeValue = (country) => {
        setInputValue(country);
    };

    return (
        <>
            {countries && (
                <Autocomplete
                    onChange={(event, value) => changeValue(value)}
                    style={{ width: 300 }}
                    options={countries}
                    classes={{
                        option: classes.option,
                    }}
                    autoComplete
                    autoHighlight
                    getOptionLabel={(option) => (option.label ? option.label : "")}
                    renderOption={(option) => <React.Fragment>{option.label}</React.Fragment>}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Choose a country"
                            variant="outlined"
                            inputProps={{
                                ...params.inputProps,
                                // autoComplete: "new-password", // disable autocomplete and autofill
                            }}
                        />
                    )}
                />
            )}
        </>
    );
}
