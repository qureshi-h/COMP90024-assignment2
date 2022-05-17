import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NavigationBar } from "../Components/UIElements/NavigationBar";
import { useParams } from "react-router-dom";
import { LgaInfo } from "../Components/LgaStats/LgaInfo";

export const LgaStats = () => {
    const { lga } = useParams();
    const [loading, setLoading] = useState(true);

    return (
        <div>
            <Helmet>
                <title>Melbourne Livibility | Search LGA</title>
                <style>{"body { background-color: #060026; }"}</style>
            </Helmet>
            <NavigationBar opacity={0.4} />
            <div className="heatmap">
                <LgaInfo lga={lga} loading={loading} setLoading={setLoading} />
            </div>
        </div>
    );
};
