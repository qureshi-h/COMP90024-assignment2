import React from "react";
import { Helmet } from "react-helmet";
import { HeatmapAllTweet } from "../Components/TweetsStats/Heatmap";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

import { useParams } from "react-router-dom";

export const TweetsStats = () => {
    const { stat_field } = useParams();
    return (
        <div className="kanyeBackground">
            <Helmet>
                <title>Explore Melbourne Livibility | Home</title>
                <style>{"body { background-color: #28004d; }"}</style>
            </Helmet>
            <NavigationBar />
            <div className="heatmap">
                <div>
                    <h1>{stat_field} Heatmaps</h1>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <HeatmapAllTweet stat_field="all" text="All Tweets" />
                        <HeatmapAllTweet
                            stat_field={stat_field}
                            text={"All " + stat_field + " Tweets"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
