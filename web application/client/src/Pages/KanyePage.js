import React from "react";
import { Helmet } from "react-helmet";
import { KanyeQuote } from "../Components/Kanye/KanyeQuote";
import { Subscription } from "../Components/Kanye/Subscription";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

export const KanyePage = () => {
    return (
        <div className="kanyeBackground">
            <Helmet>
                <title>The Oreo Project | Kanye Quotes</title>
                <style>{"body { background-color: #060026; }"}</style>
            </Helmet>
            <NavigationBar />
            <KanyeQuote />
            <Subscription />
        </div>
    );
};
