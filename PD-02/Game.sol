pragma solidity >=0.4.22 <0.8.0;

contract Game {
    uint256 _stake;
    address _currentAddress;

    constructor(uint256 stake, address currentAddress) public {
        _stake = stake;
        _currentAddress = currentAddress;
    }

    function guessIfEven(uint256 stake) public {
        if (stake % 2 == 0) {
            calculateWinning(stake);
        }
    }

    function calculateWinning(uint256 stake) public {
        uint256 percentage = (stake / _currentAddress.balance) * 100;
        if (percentage > 50) {
            sendRewardToAddress(stake * 3);
        } else {
            sendRewardToAddress(stake * 2);
        }
    }

    function sendRewardToAddress(uint256 winning) public {
        address payable sendAbleAddress = payable(_currentAddress);
        (bool transferSucceeded, ) = sendAbleAddress.call{value: winning}("");
        require(transferSucceeded, "Transfer failed, you lost everything.");
    }
}
