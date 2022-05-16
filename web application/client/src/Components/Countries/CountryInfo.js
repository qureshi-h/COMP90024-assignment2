import React from "react";

import { useParams } from "react-router-dom";
import { CountryMap } from "./CountryMap";
import InfoTable from "./InfoTable";

export const CountryInfo = ({ country }) => {
    const [info, setInfo] = React.useState(null);

    React.useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        fetch(`https://restcountries.com/v3.1/name/${country}`, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data[0]);
                setInfo(data[0]);
            });
    };

    return (
        <div>
            {info && (
                <div className="countryInfo">
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "10vw",
                        }}
                    >
                        <h1>{info.name.official}</h1>
                        <img
                            src={info.flags.png}
                            alt="flag"
                            className="countryFlag"
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "left",
                        }}
                    >
                        <div className="infoTable">
                            <InfoTable info={info} />
                        </div>
                        <CountryMap country={info.name.common} />
                    </div>
                </div>
            )}
        </div>
    );
};
