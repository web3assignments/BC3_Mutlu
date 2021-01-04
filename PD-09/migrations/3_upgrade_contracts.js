const { deployProxy, upgradeProxy } = require('@openzeppelin/truffle-upgrades');
var Game = artifacts.require("Game");
var GameUpdated = artifacts.require("UpdatedGame");

module.exports = async function(deployer) {    
    const GameContract=await Game.deployed()
    const GameUpdatedContract=await upgradeProxy(GameContract.address, GameUpdated,{deployer });
    console.log(`Address of GameContract: ${GameContract.address}`)
    console.log(`Address of GameUpdatedContract: ${GameUpdatedContract.address}`)
    // await GameUpdatedContract.GuessIfEven(1, {value: 1000000000000000000});
    // console.log(await GameUpdatedContract.CalculatedWinnings());
}