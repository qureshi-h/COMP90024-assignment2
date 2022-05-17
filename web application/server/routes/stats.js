var express = require("express");
var router = express.Router();

const statsController = require("../controllers/statsController");

router.get("/lga_counts/", statsController.lga_counts);

module.exports = router;
