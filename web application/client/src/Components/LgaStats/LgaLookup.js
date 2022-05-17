import React from "react";

import Select from "react-select";
import lgas from "../../res/lga_names.json";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

export const LgaLookup = () => {
    const [disabled, setDisabled] = React.useState(false);
    const [LGA, setLGA] = React.useState(lgas.lgas[0].key);
    const navigate = useNavigate();

    console.log(LGA);

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            height: "7vh",
            borderRadius: "1rem",
        }),

        input: (provided, state) => ({
            ...provided,
            marginLeft: "1.5rem",
        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#2584FF" : "white",
                color: "#000000",
                cursor: isDisabled ? "not-allowed" : "default",
            };
        },
    };

    const handleClick = () => {
        setDisabled(true);
        navigate(`stats/${LGA}`);
    };

    return (
        <div className="selectCountry">
            <h1 style={{ fontSize: "3.5rem" }}>
                Select a LGA to find out more...
            </h1>
            <Select
                className="selectBox"
                options={lgas.lgas.map((lga) => ({
                    name: lga.key,
                    label: lga.key,
                }))}
                onChange={(option) => setLGA(option.name)}
                styles={colourStyles}
                placeholder={LGA}
            />
            <Button
                disabled={disabled}
                variant="contained"
                className="selectCountryButton"
                sx={{
                    marginLeft: "1.5vw",
                    borderRadius: "0.5rem",
                    fontSize: "1.5rem",
                    padding: "1rem",
                }}
                onClick={handleClick}
            >
                Search
            </Button>
        </div>
    );
};
