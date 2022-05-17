
import React from "react";
import { Helmet } from "react-helmet";
import { LgaLookup } from "../Components/LgaStats/LgaLookup";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

export const SelectLga = () => {
    return (
        <div className="countriesBackground">
            <Helmet>
                <title>Melbourne Livibility | Search LGA</title>
                <style>{"body { background-color: #060026; }"}</style>
            </Helmet>
            <NavigationBar opacity={0.4} />
            <LgaLookup/>
        </div>
    );
};