const couch = require("../config/couchDB");

exports.lga_counts = async (req, res) => {
    try {
        const { doc_count: total_count } = await couch.use("all_tweets").info();
        const { doc_count: category_count } = await couch.use("tweets").info();
        const lga_counts = await couch
            .use("tweets")
            .view("CountSpecs", "lga_type_counts", { group: true });

        res.status(200).json({
            total_count,
            category_count,
            lga_counts,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
    }
};
