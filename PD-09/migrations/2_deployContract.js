const { deployProxy } = require('@openzeppelin/truffle-upgrades');
var Game = artifacts.require("Game");


module.exports = async function(deployer) {
    const GameContract = await deployProxy(Game, {deployer});
    console.log(`Address of GameContract: ${GameContract.address}`)
    console.log("Doing some tests with the just deployed contract");
    //await GameContract.GuessIfEven(2);
   //console.log(await GameContract.CalculatedWinnings());
};