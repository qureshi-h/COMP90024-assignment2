import React, { useState } from "react";
import Button from "@mui/material/Button";

export const Subscription = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleClick = () => {
        setMessage("Working...");

        if (name === "" || email === "") {
            setMessage("Please enter both fields");
            return;
        }

        fetch("https://server-oreo-project.herokuapp.com/kanye/addSubscriber", {
            method: "post",
            mode: "cors",
            headers: new Headers({
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.recordInserted) setMessage("Subscribed Successfully!");
                else setMessage("Email Already Subscribed!");
            });
    };
    return (
        <div className="subscription">
            <div
                style={{ textAlign: "center", width: "100vw" }}
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                        handleClick();
                    }
                }}
            >
                <h2 style={{ textAligh: "center", color: "yellow" }}>
                    Subscribe for daily Kanye Quotes
                </h2>
            </div>
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100vw",
                }}
            >
                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    onChange={(name) => setName(name.target.value)}
                />
                <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    style={{ marginLeft: "2vw" }}
                    onChange={(email) => {
                        setEmail(email.target.value);
                        setMessage("");
                    }}
                />
                <Button
                    variant="contained"
                    className="selectCountryButton"
                    sx={{
                        marginLeft: "1.5vw",
                        borderRadius: "0.5rem",
                        fontSize: "1.2rem",
                        backgroundColor: "green",
                    }}
                    onClick={handleClick}
                >
                    Subscribe
                </Button>{" "}
            </div>
            <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100vw",
                }}
            >
                <h3>{message}</h3>
            </div>
        </div>
    );
};
