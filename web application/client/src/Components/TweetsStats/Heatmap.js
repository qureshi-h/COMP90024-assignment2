import React, { useState, useEffect } from "react";

export const HeatmapAllTweet = ({ stat_field, text }) => {
    const [recompute, setRecompute] = useState("false");
    const [loading, setLoading] = useState(true);
    const [url, setURL] = useState("");

    useEffect(() => {
        getURL();
    }, [stat_field, recompute]);

    const getURL = () => {
        setLoading(true);
        fetch("http://localhost:5001/heatmap/" + stat_field + "/" + recompute, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((response) => {
                setURL(response.path);
                console.log(response.path);
                setLoading(false);
            });
    };

    return (
        <div
            style={{
                margin: "0 5vw 5vw",
                display: "inline",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    width: "35vw",
                }}
            >
                <button
                    type="button"
                    className="recomputeButton"
                    onClick={() => setRecompute("true")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}
                >
                    Recompute
                </button>
                <h3
                    style={{
                        marginLeft: "10vw",
                        color: "white",
                        fontSize: "2rem",
                    }}
                >
                    {text}
                </h3>
            </div>
            <iframe
                src={url}
                style={{
                    width: "35vw",
                    height: "35vh",
                    display: "inline-block",
                }}
            />
            {loading && <h4>Loading...</h4>}
        </div>
    );
};
