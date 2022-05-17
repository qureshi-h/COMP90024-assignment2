import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { HeatmapAll } from "../Components/TweetsStats/HeatmapAll";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

export const AllTweets = () => {
    const [loading, setLoading] = useState(true);
    return (
        <div>
            <Helmet>
                <title>Explore Melbourne Livibility | Home</title>
                <style>{"body { background-color: #05032e; }"}</style>
            </Helmet>
            <NavigationBar opacity={0.85} />
            <div className="heatmap">
                <HeatmapAll loading={loading} setLoading={setLoading} />
            </div>
        </div>
    );
};
