import React from "react";

export const CountryMap = ({ country }) => {
    const [map, setMap] = React.useState(null);

    React.useEffect(() => {
        getMap();
    }, []);

    const getMap = () => {
        fetch(
            "https://maps.googleapis.com/maps/api/staticmap?center=" +
                country +
                "&zoom=5&size=400x400&key=AIzaSyA-scfdv9iwgeRT_aYUMYK0p00gfwEocw0",
            {
                method: "GET",
            }
        ).then((data) => {
            setMap(data.url);
        });
    };
    return (
        <div className="countryMap">
            <img src={map} alt="map" />
        </div>
    );
};
