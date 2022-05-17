import React from "react";
import LgaTable from "./LgaTable";

export const LgaInfo = ({ lga, loading, setLoading }) => {
    const [data, setData] = React.useState(null);
    const [numTweets, setNumTweets] = React.useState(0);

    React.useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch("http://localhost:5001/stats/lga_info", {
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
                setLoading(false);
                console.log(response);

                if (
                    response.region_count.rows.filter((row) => row.key == lga)
                        .length > 0
                ) {
                    setNumTweets(
                        response.region_count.rows.filter(
                            (row) => row.key == lga
                        )[0].value
                    );
                }
            });
    };
    return (
        <div>
            {!loading && (
                <div>
                    <div>
                        <h3>
                            {data.total_count} tweets analysed.&nbsp;
                            {data.category_count} tweets matched
                        </h3>
                        <h3>
                            {numTweets} tweets found in {lga}
                        </h3>
                    </div>
                    <div>
                        <LgaTable
                            info={data.lga_counts.rows}
                            aurin={data.lga_data.rows}
                            lga={lga}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
