pragma solidity >=0.4.22 <0.8.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.
//import "remix_accounts.sol";
import "Game.sol";


contract game_test  {
     Game foo;

  function beforeAll() public {
    foo = new Game();
  }

  function InitialCurrentTempValue() public returns (bool) {
    return Assert.equal(foo.GetCurrentTemp(), 9, "initial currentTemp value should be 9");
  }

  function CurrentTempValueChangedByOwner() public returns (bool) {
      foo.changeSecondChanceCurrentTemp(8);
      return Assert.equal(foo.GetCurrentTemp(), 8, "Changed initial currentTemp value should be 8");
  }

function StakeIsEven() public returns (bool) {
        uint256 stake = 2;
        return Assert.equal(foo.CheckIfEven(stake), true, "It should be even");
  }
  
  function StakeIsOnEven() public returns (bool) {
        uint256 stake = 3;
        return Assert.equal(foo.CheckIfEven(stake), false, "It should be OnEven");
  }
  
  function checkIfLoserHasBeenAdded() public returns (bool) {
        foo.changeSecondChanceCurrentTemp(5);
        foo.GuessIfEven(1);
        return Assert.equal(foo.GetCurrentAddressesThatHaveLost().length, 1, "Losers should be 1");
  }
}
