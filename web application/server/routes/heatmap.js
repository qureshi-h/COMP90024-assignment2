var express = require("express");
var router = express.Router();

const heatmapController = require("../controllers/heatmapController");

router.get("/all_tweets/:recompute", heatmapController.all_tweets_heatmap);

module.exports = router;
