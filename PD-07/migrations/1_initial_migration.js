var Game = artifacts.require("Game");

module.exports = async function (deployer) {
    await deployer.deploy(Game, {value: 8000000000000000000});
    gameContract = await Game.deployed();
    await gameContract.GuessIfEven(2, {value: 2000000000000000000});
    console.log(await gameContract.CalculatedWinnings())
}