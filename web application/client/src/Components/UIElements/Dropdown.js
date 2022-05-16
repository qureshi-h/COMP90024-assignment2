import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";

export const Dropdown = ({ opacity, name, menu }) => {
    const [showTools, setShowTools] = React.useState(false);

    return (
        <div
            style={{ display: "inline-flex", alignContent: "center" }}
            onMouseEnter={() => {
                setShowTools(true);
            }}
            onMouseLeave={() => {
                setShowTools(false);
            }}
        >
            <a
                href="/"
                className="navbarText"
                style={{ display: "inline-flex" }}
            >
                {name}
                <RiArrowDropDownLine size={"1.2em"} />
            </a>
            {showTools && (
                <div
                    className="toolsDropdown"
                    style={{
                        backgroundColor: `rgba(0, 0, 0, ${opacity})`,
                    }}
                >
                    {menu.map((item) => (
                        <Link to={item.path} style={{ textDecoration: "none" }}>
                            <div className="toolsDropdownItem toolsDropdownText">
                                {item.name}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
