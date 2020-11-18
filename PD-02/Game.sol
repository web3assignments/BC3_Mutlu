pragma solidity ^0.7.0;

contract Game {
    address _currentAddress;

    constructor() public payable {
        require(msg.value >= 1 ether, "No Ether");
        _currentAddress = msg.sender;
        guessIfEven(msg.value);
    }

    function guessIfEven(uint256 stake) public {
        if (stake % 2 == 0) {
            calculateWinning(stake);
        }
    }

    function calculateWinning(uint256 stake) private {
        uint256 percentage = (stake / _currentAddress.balance) * 100;
        if (percentage > 50) {
            sendRewardToAddress(stake * 3);
        } else {
            sendRewardToAddress(stake * 2);
        }
    }

    function sendRewardToAddress(uint256 winning) private {
        address payable sendAbleAddress = payable(_currentAddress);
        (bool transferSucceeded, ) = sendAbleAddress.call{value: winning}("");
        require(transferSucceeded, "Transfer failed, you lost everything.");
    }
}
