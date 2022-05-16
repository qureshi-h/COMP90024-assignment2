const request = require("request");
const couch = require("../config/couchDB");

exports.getCounts = async (req, res) => {
    try {
        const { doc_count } = await couch.use("all_tweets").info();
        const subtotal = await couch
            .use("tweets")
            .view("CountSpecs", "type_counts", { group: true });

        res.status(200).json({
            doc_count,
            subtotal,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: `${error}` });
    }
};
