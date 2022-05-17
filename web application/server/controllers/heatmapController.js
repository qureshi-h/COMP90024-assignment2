const { spawnSync } = require("child_process");
const fs = require("fs");

exports.all_tweets_heatmap = async (req, res) => {
    try {
        const { type, recompute } = req.params;
        const path = "../plots/" + type + "TweetsHeatMap.html";

        if (recompute === "true" || !fs.existsSync(path)) {
            const script = "analysis_scripts/heatmap_maker_" + type + ".py";

            console.log(script);

            const { stdout, stderr } = spawnSync(
                "/Users/hamzaqureshi/opt/anaconda3/envs/COMP90024-assignment2/bin/python",
                ["-u", script]
            );

            res.sendFile(`${stdout}`, { root: __dirname + "/.." });
        } else {
            res.sendFile(path, {
                root: __dirname
            });
        }
    } catch (err) {
        res.status(400).json({
            status_code: 400,
            status_message: "Error: Internal Server Error",
        });
    }
};
