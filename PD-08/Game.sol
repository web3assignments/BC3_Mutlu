pragma solidity ^0.7.0;
import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";

contract Game is usingProvable {
    address _currentAddress;
    mapping(address => uint256) public currentAddressesInContract;
    bytes public temp;
    uint256 public priceOfUrl;

    constructor() public payable {
        require(msg.value >= 1 ether, "Not enough Ether");
        currentAddressesInContract[msg.sender] = msg.value;
        _currentAddress = msg.sender;
        GuessIfEven(msg.value);
    }

    event CalculatedWinnings(string test, address winner, uint256 winning);
    event AddressThatLost(address winner, uint256 winning);

    function convertToUint(bytes memory input) public pure returns (uint256) {
        uint256 res = 0;
        for (uint256 i = 0; i < input.length; i++)
            res = (res << 8) + uint256(uint8(input[i]));
        return res;
    }

    function GuessIfEven(uint256 stake) public payable {
        if (stake % 2 == 0) {
            CalculateWinning(stake);
        } else {
             GetTemp();
             bytes memory res = temp;
            uint256 currentTemp = convertToUint(res);
            if (currentTemp % 2 == 0) {
                // Second chance at winning the game.
                CalculateWinning(stake);
            } else {
                emit AddressThatLost(msg.sender, stake);
            }
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

    function __callback(bytes32, /* myid prevent warning*/string memory result) public override {
        if (msg.sender != provable_cbAddress()) revert();
        temp = bytes(result);
    }

    function GetTemp() public payable {
        priceOfUrl = provable_getPrice("URL");
        require(    
            address(this).balance >= priceOfUrl,"please add some ETH to cover for the query fee");
        provable_query(
            "URL",
            "json(http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam).liveweer[0].temp"
        );
    }
}
