import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { HeatmapAllTweet } from "../Components/TweetsStats/Heatmap";
import { NavigationBar } from "../Components/UIElements/NavigationBar";

import { useParams } from "react-router-dom";

export const EducationTweets = () => {
    const stat = useParams().stat_field
    const [stat_field, setstat_field] = useState(useParams().stat_field);
    const [url, setURL] = useState("http://localhost:5001/heatmap/" + stat_field.toLowerCase() + "/");
    console.log(stat_field);

    useEffect(() => {
      setstat_field(stat)
      setURL("http://localhost:5001/heatmap/" + stat_field.toLowerCase() + "/")
    }, [stat])
    

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
                        <HeatmapAllTweet
                            url="http://localhost:5001/heatmap/all/"
                            text="All Tweets"
                        />
                        <HeatmapAllTweet
                            url={url}
                            text={"All " + stat_field + " Tweets"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
