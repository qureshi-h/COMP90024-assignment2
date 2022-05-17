import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { HeatmapAll } from "../Components/All_Tweets/HeatmapAll";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

export const AllTweets = () => {
    return (
        <div className="kanyeBackground">
            <Helmet>
                <title>Explore Melbourne Livibility | Home</title>
                <style>{"body { background-color: #28004d; }"}</style>
            </Helmet>
            <NavigationBar />
            <div className="hashmapAll">
                <HeatmapAll />
            </div>
        </div>
    );
};
