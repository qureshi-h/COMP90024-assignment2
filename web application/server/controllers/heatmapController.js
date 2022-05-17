const { spawnSync } = require("child_process");

exports.education_tweets_heatmap = async (req, res) => {
    try {
        const { recompute } = req.params;

        if (recompute === "true") {
            const script = "analysis_scripts/heatmap_maker_education.py";

            const { stdout, stderr } = spawnSync(
                "/Users/hamzaqureshi/opt/anaconda3/envs/COMP90024-assignment2/bin/python",
                ["-u", script]
            );

            res.sendFile(`${stdout}`, { root: __dirname + "/.." });
        } else {
            res.sendFile("plots/educationTweetHeatMap.html", {
                root: __dirname + "/..",
            });
        }
    } catch (err) {
        res.status(400).json({
            status_code: 400,
            status_message: "Error: Internal Server Error",
        });
    }
};

exports.all_tweets_heatmap = async (req, res) => {
    try {
        const { recompute } = req.params;

        if (recompute === "true") {
            const script = "analysis_scripts/heatmap_maker.py";

            const { stdout, stderr } = spawnSync(
                "/Users/hamzaqureshi/opt/anaconda3/envs/COMP90024-assignment2/bin/python",
                ["-u", script]
            );

            res.sendFile(`${stdout}`, { root: __dirname + "/.." });
        } else {
            res.sendFile("plots/allTweetHeatMap.html", {
                root: __dirname + "/..",
            });
        }
    } catch (err) {
        res.status(400).json({
            status_code: 400,
            status_message: "Error: Internal Server Error",
        });
    }
};

exports.all_tweets_heatmap = async (req, res) => {
    try {
        const { recompute } = req.params;

        if (recompute === "true") {
            const script = "analysis_scripts/heatmap_maker.py";

            const { stdout, stderr } = spawnSync(
                "/Users/hamzaqureshi/opt/anaconda3/envs/COMP90024-assignment2/bin/python",
                ["-u", script]
            );

            res.sendFile(`${stdout}`, { root: __dirname + "/.." });
        } else {
            res.sendFile("plots/allTweetHeatMap.html", {
                root: __dirname + "/..",
            });
        }
    } catch (err) {
        res.status(400).json({
            status_code: 400,
            status_message: "Error: Internal Server Error",
        });
    }
};

exports.all_tweets_heatmap = async (req, res) => {
    try {
        const { recompute } = req.params;

        if (recompute === "true") {
            const script = "analysis_scripts/heatmap_maker.py";

            const { stdout, stderr } = spawnSync(
                "/Users/hamzaqureshi/opt/anaconda3/envs/COMP90024-assignment2/bin/python",
                ["-u", script]
            );

            res.sendFile(`${stdout}`, { root: __dirname + "/.." });
        } else {
            res.sendFile("plots/allTweetHeatMap.html", {
                root: __dirname + "/..",
            });
        }
    } catch (err) {
        res.status(400).json({
            status_code: 400,
            status_message: "Error: Internal Server Error",
        });
    }
};

exports.all_tweets_heatmap = async (req, res) => {
    try {
        const { recompute } = req.params;

        if (recompute === "true") {
            const script = "analysis_scripts/heatmap_maker.py";

            const { stdout, stderr } = spawnSync(
                "/Users/hamzaqureshi/opt/anaconda3/envs/COMP90024-assignment2/bin/python",
                ["-u", script]
            );

            res.sendFile(`${stdout}`, { root: __dirname + "/.." });
        } else {
            res.sendFile("plots/allTweetHeatMap.html", {
                root: __dirname + "/..",
            });
        }
    } catch (err) {
        res.status(400).json({
            status_code: 400,
            status_message: "Error: Internal Server Error",
        });
    }
};
