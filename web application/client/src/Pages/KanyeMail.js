import React from "react";
import kanye from "../res/kanye/kanye-1.jpeg";

export const KanyeMail = () => {
    return (
        <div style={{ marginLeft: "20px" }}>
            <h3 style={{ color: "black", fontSize: 20, marginTop: "20px" }}>
                Dear Kanye Fan,
            </h3>
            <p style={{ color: "black", marginLeft: "20px", fontSize: 15 }}>
                The kanye qoute of the day is:
            </p>
            <p
                style={{
                    color: "black",
                    textAlign: "center",
                    fontSize: 15,
                }}
            >
                <b> Speak God's truth to power</b>
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={kanye}
                    alt="kanye"
                    style={{ width: "300px", marginBottom: "10px" }}
                />
            </div>
            <p style={{ color: "black", fontSize: 15 }}>Kind regards,</p>
            <p style={{ color: "black", fontSize: 15 }}>The Oreo Project</p>
        </div>
    );
};
