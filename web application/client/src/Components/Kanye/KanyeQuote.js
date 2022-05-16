import React from "react";

import image from "../../res/kanye/kanye-1.png";

export const KanyeQuote = () => {
    const [quote, setQuote] = React.useState(null);

    React.useEffect(() => {
        getQuote();
    }, []);

    const getQuote = () => {
        fetch("https://api.kanye.rest", {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                setQuote(data.quote);
            });
    };

    return (
        <div>
            <div style={{ textAlign: "center", width: "100vw" }}>
                <h2 style={{ color: "white", marginTop: "15vh" }}>
                    Ye - (Formerly Kanye West)
                </h2>
                <h2 style={{ color: "white", fontSize: "1.5rem" }}>
                    Born 1977
                </h2>
            </div>

            {quote &&
                (Math.random() < 0.5 ? (
                    <div>
                        <div className="quoteBox">
                            <div style={{ padding: "2rem" }}>
                                <h3>{quote}</h3>
                                <h3
                                    style={{
                                        marginTop: "5vh",
                                        textAlign: "right",
                                    }}
                                >
                                    - Ye
                                </h3>
                            </div>
                        </div>
                        <img
                            className="kanyeImage"
                            src={image}
                            onClick={getQuote}
                        />
                    </div>
                ) : (
                    <div>
                        <img
                            className="kanyeImage"
                            src={image}
                            onClick={getQuote}
                        />
                        <div className="quoteBox">
                            <div style={{ padding: "2rem" }}>
                                <h3>{quote}</h3>
                                <h3
                                    style={{
                                        marginTop: "5vh",
                                        textAlign: "right",
                                    }}
                                >
                                    - Ye
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
