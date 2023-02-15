const ethers = require("ethers");
const nft = require("../models/nftModel");
const abi = require("../abis/NFT.json");
const axios = require("axios");

const provider = new ethers.providers.InfuraProvider(
  "goerli",
  process.env.PROVIDER_URL
);

const NFT = new ethers.Contract(
  process.env.NFT_CONTRACT_ADDRESS,
  abi,
  provider
);

exports.createNFt = (req, res) => {
  NFT.on("nftMinted", async (tokenId, tokenURI) => {
    const owner = await NFT.ownerOf(tokenId);

    const nftData = await axios.get(tokenURI);

    const newNft = await nft.create({
      name: nftData.data.name,
      description: nftData.data.description,
      owner: owner,
      image: nftData.data.image,
    });

    res.status(201).json({
      status: "success",
      data: newNft,
    });
  });
};
