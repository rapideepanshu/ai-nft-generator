const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  id: String,

  name: String,

  description: String,

  owner: String,

  image: String,
});

const nftModel = mongoose.model("NFTs", nftSchema);

module.exports = nftModel;
