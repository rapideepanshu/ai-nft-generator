// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC1155, Ownable {
    uint256[] supplies = [50, 100, 150];
    uint256[] minted = [0, 0, 0];
    uint256[] rates = [0.05 ether, 0.1 ether, 0.025 ether];

    constructor() ERC1155("https://api.mysite.com/tokens/{id}") {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(uint256 id, uint256 amount) public payable {
        require(id < supplies.length, "Token doesn't exists");
        require(id != 0, "Token doesn't exists");
        uint256 index = id - 1;

        require(minted[index] + amount <= supplies[index], "Not enough supply");
        require(msg.value >= amount * rates[index], "Not enough ethers sent");
        minted[index] += amount;
        _mint(msg.sender, id, amount, "");
    }

    function withdraw() public onlyOwner {
        require(address(this).balance > 0, "Balance is 0");
        payable(owner()).transfer(address(this).balance);
    }
}
