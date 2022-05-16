import React from "react";
import { Dropdown } from "./Dropdown";

const statistics = [
    { name: "Religon", path: "/religon" },
    { name: "Education", path: "/education" },
    { name: "Mental Health", path: "/mental_health" },
    { name: "Substance Abuse", path: "/substance_abuse" },
    { name: "Violence", path: "/violence" },
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
