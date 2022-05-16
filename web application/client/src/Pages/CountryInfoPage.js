import React from "react";
import { Helmet } from "react-helmet";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

import { useParams } from "react-router-dom";
import { CountryInfo } from "../Components/Countries/CountryInfo";

export const CountryInfoPage = () => {
    const { country } = useParams();
    return (
        <div>
            <Helmet>
                <title>The Oreo Project | </title>
                <style>{"body { background-color: #28004d; }"}</style>
            </Helmet>
            <NavigationBar opacity={0.4} />
            <CountryInfo country={country} />
        </div>
    );
};
