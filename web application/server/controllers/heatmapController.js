const { spawnSync } = require("child_process");
const fs = require("fs");

exports.all_tweets_heatmap = async (req, res) => {
    try {
        const { type, recompute } = req.params;
        const path = "plots/" + type.toLowerCase() + ".html";

        if (recompute === "true" || !fs.existsSync(path)) {
            console.log("recomputing");
            const script = "analysis_scripts/heatmap_maker_" + type + ".py";

            const { stdout, stderr } = spawnSync(
                "/Users/hamzaqureshi/opt/anaconda3/envs/COMP90024-assignment2/bin/python",
                ["-u", script]
            );

            res.status(200).json({path: "http://localhost:5001/" + path});
        } else {
            console.log("http://localhost:5001/" + path);
            res.status(200).json({path: "http://localhost:5001/" + path})
        }
    } catch (err) {
        res.status(400).json({
            status_code: 400,
            status_message: "Error: Internal Server Error",
        });
    }
};
