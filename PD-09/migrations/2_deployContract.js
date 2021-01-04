const { deployProxy } = require('@openzeppelin/truffle-upgrades');
var Game = artifacts.require("Game");


module.exports = async function(deployer) {
    const GameContract = await deployProxy(Game, {deployer});
    console.log(`Address of GameContract: ${GameContract.address}`)
};