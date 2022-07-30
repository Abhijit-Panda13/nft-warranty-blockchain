// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FlipkartCoin is ERC20 {
    address owner;

    constructor() ERC20("FlipkartCoin", "SC") {
        owner = msg.sender;
    }

    function mint(uint256 amount) public payable {
        require(msg.value == amount * 0.0001 ether, "invalid amount of ether");
        _mint(msg.sender, amount);
    }

    function withdraw() payable public {
        require(msg.sender == owner, "Not Authorized!");

        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    receive() external payable {}

    fallback() external payable {}
}
