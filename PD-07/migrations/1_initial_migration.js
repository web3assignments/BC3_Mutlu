var Game = artifacts.require("Game");

module.exports = async function (deployer) {
    await deployer.deploy(Game, {value: 1000000000000000000});
    gameContract = await Game.deployed();
    await gameContract.GuessIfEven(1, {value: 1000000000000000000});
    console.log(await gameContract.CalculatedWinnings())
}