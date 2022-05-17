var express = require("express");
var router = express.Router();

const heatmapController = require("../controllers/heatmapController");

router.get("/:type/:recompute", heatmapController.all_tweets_heatmap);


module.exports = router;
