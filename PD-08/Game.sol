pragma solidity ^0.6.12;
import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";

contract Game is usingProvable {
    address _currentAddress;
    mapping(address => uint256) public currentAddressesInContract;
 string  public temp;
   uint256 public priceOfUrl;


    constructor() public payable {
        require(msg.value >= 1 ether, "Not enough Ether");
        currentAddressesInContract[msg.sender] = msg.value;
        _currentAddress = msg.sender;
        GuessIfEven(msg.value);
    }

    event CalculatedWinnings(string test, address winner, uint256 winning);
    event AddressThatLost(address winner, uint256 winning);

    function GuessIfEven(uint256 stake) public payable {
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


    function __callback(bytes32 /* myid prevent warning*/ , string memory result ) override public {
       if (msg.sender != provable_cbAddress()) revert();
       temp = result;
   }

   function GetTemp() public payable {
       priceOfUrl = provable_getPrice("URL");
       require (address(this).balance >= priceOfUrl,
            "please add some ETH to cover for the query fee");
       provable_query("URL", 
            "json(http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam).liveweer[0].temp");
   }
}
