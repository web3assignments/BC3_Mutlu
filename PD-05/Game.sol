pragma solidity ^0.7.0;

contract Game {
    address _currentAddress;
    mapping(address => uint256) public currentAddressesInContract;

    constructor() public payable {
        require(msg.value >= 1 ether, "Not enough Ether");
        currentAddressesInContract[msg.sender] = msg.value;
        _currentAddress = msg.sender;
        GuessIfEven(msg.value);
    }

    event CalculatedWinnings(string test, address winner, uint256 winning);
    event AddressThatLost(address winner, uint256 winning);

    function GuessIfEven(uint256 stake) public {
        if (stake % 2 == 0) {
            CalculateWinning(stake);
        } else {
            emit AddressThatLost(msg.sender, stake);
        }
    }

    function CalculateWinning(uint256 stake) private {
        uint256 percentage = (stake / _currentAddress.balance) * 100;
        if (percentage > 50) {
            SendRewardToAddress(stake * 1); //TODO: Change this value when amount of people in contract is > 1.
        } else {
            SendRewardToAddress(stake * 1); //TODO: Change this value when amount of people in contract is > 1.
        }
    }

    function SendRewardToAddress(uint256 winning) private {
        emit CalculatedWinnings("test", msg.sender, winning);
        address payable sendAbleAddress = payable(_currentAddress);
        (bool transferSucceeded, ) = sendAbleAddress.call{value: winning}("");
        require(
            transferSucceeded,
            "Transfer failed, there was not enough ETH in this contract, you didn't win anything"
        );
    }
}
