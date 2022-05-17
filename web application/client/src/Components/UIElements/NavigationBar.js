import React from "react";
import { Dropdown } from "./Dropdown";

const statistics = [
    { name: "All", path: "/all_tweets" },
    { name: "Religon", path: "/Religion" },
    { name: "Education", path: "/Education" },
    { name: "Substance Abuse", path: "/Substance_Abuse" },
    { name: "Violence", path: "/Violence" },
];

export const NavigationBar = ({ opacity }) => {
    return (
        <div className="navbar">
            <div
                style={{
                    alignItems: "center",
                    justifyContent: "left",
                    display: "flex",
                    backgroundColor: `rgba(0, 0, 0, ${opacity})`,
                    height: "100%",
                    width: "100vw",
                    paddingLeft: "6vw",
                }}
            >
                <a href="/" className="navbarText">
                    Home
                </a>
                <a href="/lga_lookup" className="navbarText">
                    LGA Lookup
                </a>
                <Dropdown
                    opacity={opacity}
                    name="Statistics"
                    menu={statistics}
                />
            </div>
        </div>
    );
};

NavigationBar.defaultProps = {
    opacity: 0.013,
};
