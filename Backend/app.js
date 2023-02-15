const express = require("express");
const nftRoutes = require("./routes/nftRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/nft", nftRoutes);

module.exports = app;
