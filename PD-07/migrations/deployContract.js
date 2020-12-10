var Game = artifacts.require("Game");

module.exports = async function (deployer) {
    await deployer.deploy(Game);
    gameContract = await Game.deployed();
    await gameContract.GuessIfEven(2);
    console.log(await gameContract.CalculatedWinnings());
}