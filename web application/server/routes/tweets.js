var express = require("express");
var router = express.Router();

const tweetsController = require("../controllers/tweetsController");

router.get("/getCounts/", tweetsController.getCounts);

module.exports = router;
