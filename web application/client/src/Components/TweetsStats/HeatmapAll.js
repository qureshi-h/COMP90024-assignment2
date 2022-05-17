import React, { useState } from "react";
import { HeatmapAllTweet } from "./Heatmap";

import AllStatsTable from "./AllStatsTable";

export const HeatmapAll = ({ loading, setLoading }) => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch("http://localhost:5001/stats/lga_counts", {
            method: "GET",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                setData(response);
                setLoading(false);
            });
    };

    return (
        <div>
            <h1>All Tweets - Statistics</h1>
            {!loading && (
                <div>
                    <div
                        style={{
                            display: "block",
                            justifyContent: "center",
                            margin: "7vh 0 7vh 0",
                        }}
                    >
                        <div style={{ width: "100vw", display: "block" }}>
                            <h3>
                                {data.total_count} tweets analyses. &nbsp;
                                {data.category_count} related tweets found!
                            </h3>
                        </div>
                        <div
                            style={{
                                width: "100vw",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <AllStatsTable info={data.lga_counts.rows} />
                        </div>
                    </div>

                    <h1>Heatmaps</h1>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <HeatmapAllTweet
                            url="http://localhost:5001/heatmap/all/"
                            text="All Tweets"
                        />
                        <HeatmapAllTweet
                            url="http://localhost:5001/heatmap/category/"
                            text="All Categorised Tweets"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
