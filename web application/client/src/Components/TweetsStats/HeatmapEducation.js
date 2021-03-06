import React, { useState } from "react";

export const HeatmapEducation = () => {
    const [recompute, setRecompute] = useState("false");
    return (
        <div>
            <h1>Education Tweets</h1>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: " 10vh 0 0vh 0",
                    width: "50vw",
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
                        marginLeft: "20vw",
                        color: "white",
                    }}
                >
                    All Education Tweets
                </h3>
            </div>
            <iframe
                src={"http://localhost:5001/heatmap/education_tweets/" + recompute}
                style={{
                    width: "50vw",
                    height: "60vh",
                    display: "inline-block",
                }}
            />
        </div>
    );
};
