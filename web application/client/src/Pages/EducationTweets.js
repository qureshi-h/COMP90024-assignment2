import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { HeatmapEducation } from "../Components/TweetsStats/HeatmapEducation";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

export const EducationTweets = () => {
    return (
        <div className="kanyeBackground">
            <Helmet>
                <title>Explore Melbourne Livibility | Home</title>
                <style>{"body { background-color: #28004d; }"}</style>
            </Helmet>
            <NavigationBar />
            <div className="heatmap">
                <HeatmapEducation />
            </div>
        </div>
    );
};
