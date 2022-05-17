import React, { useState } from "react";

export const HeatmapAllTweet = ({ url, text }) => {
    const [recompute, setRecompute] = useState("false");

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
                        fontSize: "4rem",
                    }}
                >
                    {text}
                </h3>
            </div>
            <iframe
                src={url + recompute}
                style={{
                    width: "35vw",
                    height: "35vh",
                    display: "inline-block",
                }}
            />
        </div>
    );
};
