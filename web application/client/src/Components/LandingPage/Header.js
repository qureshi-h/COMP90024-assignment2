import React, { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Buffer } from "buffer";

export const Header = () => {
    const [dropdown, setDropdown] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch("http://localhost:5001/tweets/getCounts", {
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
                console.log(response);
                setLoading(false);
            });
    };

    return (
        <div className="background">
            <div style={{ textAlign: "center", width: "100vw" }}>
                <h1 style={{ fontSize: "0.001rem " }}>s</h1>
                <h1 style={{ marginTop: "30vh" }}>
                    Exploring Livibility in Melbourne
                </h1>
                <h2>An analysis using AURIN and Twitter data...</h2>

                {!loading && (
                    <React.Fragment>
                        <div style={{ marginTop: "10vh" }}>
                            <h3 style={{ display: "inline" }}>
                                Tweets Collected
                            </h3>
                            <h3
                                style={{ display: "inline", marginLeft: "5vw" }}
                            >
                                {data.doc_count}
                            </h3>
                            <IoMdArrowDropdownCircle
                                style={{
                                    display: "inline",
                                    color: "rgb(193, 238, 11)",
                                    marginLeft: "1.5vw",
                                    cursor: "pointer",
                                    zIndex: 2,
                                }}
                                onClick={() => setDropdown(!dropdown)}
                                size="3rem"
                            />
                        </div>
                        {dropdown && (
                            <div
                                style={{
                                    width: "100vw",
                                    marginTop: "1vh",
                                }}
                            >
                                {data.subtotal.rows.map((value) => (
                                    <div
                                        style={{
                                            textAlign: "left",
                                            justifyContent: "center",
                                            alignItems: "left",
                                            display: "flex",
                                            height: "5vh",
                                        }}
                                    >
                                        <h4
                                            style={{
                                                display: "block",
                                                fontSize: "4rem",
                                                justifyContent: "left",
                                                alignItems: "left",
                                            }}
                                        >
                                            {value.key}
                                        </h4>
                                        <h4
                                            style={{
                                                display: "inline",
                                                marginLeft: "5vw",
                                                fontSize: "4rem",
                                                justifyContent: "left",
                                                alignItems: "left",
                                            }}
                                        >
                                            {value.value}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};
