var express = require("express");
var router = express.Router();

const statsController = require("../controllers/statsController");

router.get("/lga_counts/", statsController.lga_counts);
router.get("/lga_info/", statsController.lga_info);

module.exports = router;
