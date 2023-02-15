const express = require("express");

const nftController = require("../controllers/nftController");

const router = express.Router();

router.post("/create", nftController.createNFt);

module.exports = router;
