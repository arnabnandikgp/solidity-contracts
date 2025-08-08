// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Staking {
    uint256 public totalStaked;
    mapping(address => uint) public stakedBalances;

    function stake(uint256 amount) public payable {
        require(amount > 0, "send non-zero amount for staking");
        require(
            msg.value == amount,
            "the amount sent has to be equal to the staking input"
        );
        totalStaked += amount;
        stakedBalances[msg.sender] += amount;
    }

    function unStake(uint256 amount) public payable {
        require(
            amount <= stakedBalances[msg.sender],
            "Not enough balance"
        );
        totalStaked -= amount;
        stakedBalances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
}
