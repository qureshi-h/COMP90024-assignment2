import React from "react";
import { Helmet } from "react-helmet";
import { SelectLGA } from "../Components/Countries/SelectLGA";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

export const CountriesSearchPage = () => {
    return (
        <div className="countriesBackground">
            <Helmet>
                <title>Melbourne Livibility | Search LGA</title>
                <style>{"body { background-color: #060026; }"}</style>
            </Helmet>
            <NavigationBar opacity={0.4} />
            <SelectLGA />
        </div>
    );
};
