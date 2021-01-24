pragma solidity >=0.6.12;
//import "github.com/provable-things/ethereum-api/provableAPI_0.6.sol";
//import "@openzeppelin/upgrades-core/contracts/Initializable.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-sdk/blob/master/packages/lib/contracts/Initializable.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/access/Ownable.sol";

contract Game is Ownable {
    address _currentAddress;
    mapping(address => uint256) public currentAddressesInContract;
    address[] currentAddressesThatHaveLost;
    address[] currentAddressesThatHaveWon;
    bytes public temp;
    uint256 public priceOfUrl;
    uint256 currentTemp = 9;
  bool isStakeEven = false;

    constructor() public  {
       //require(msg.value >= 1 ether, "Not enough Ether");
        _currentAddress = msg.sender;
       //GuessIfEven(msg.value);
    }

    event CalculatedWinnings(address winner, uint256 winning);
    event AddressThatLost(address winner, uint256 winning);

    function convertToUint(bytes memory input) public pure returns (uint256) {
        uint256 res = 0;
        for (uint256 i = 0; i < input.length; i++)
            res = (res << 8) + uint256(uint8(input[i]));
        return res;
    }

    function GuessIfEven(uint256 stake) public payable {
        currentAddressesInContract[msg.sender] = msg.value;
        bool isEven = CheckIfEven(stake);
        if (isEven) {
            CalculateWinning(stake);
        } else {
            //+ GetTemp();
            // bytes memory res = 10;
            //uint256 currentTemp = convertToUint(10);
            if (currentTemp % 2 == 0) {
                // Second chance at winning the game.
                CalculateWinning(stake);
            } else {
                currentAddressesThatHaveLost.push(msg.sender);
                emit AddressThatLost(msg.sender, stake);
            }
        }
    }

    function CalculateWinning(uint256 stake) private {
                currentAddressesThatHaveWon.push(msg.sender);
        uint256 percentage = (stake / _currentAddress.balance) * 100;
        if (percentage > 50) {
            SendRewardToAddress(stake * 1); //TODO: Change this value when amount of people in contract is > 1.
        } else {
            SendRewardToAddress(stake * 1); //TODO: Change this value when amount of people in contract is > 1.
        }
    }

    function SendRewardToAddress(uint256 winning) private {
        emit CalculatedWinnings(msg.sender, winning);
        address payable sendAbleAddress = payable(_currentAddress);
        (bool transferSucceeded, ) = sendAbleAddress.call{value: winning}("");
        require(
            transferSucceeded,
            "Transfer failed, there was not enough ETH in this contract, you didn't win anything"
        );
    }


    function changeSecondChanceCurrentTemp(uint256 number) public onlyOwner {
        currentTemp = number;
    }

    // function __callback(
    //     bytes32,
    //     /* myid prevent warning*/
    //     string memory result
    // ) public override {
    //     if (msg.sender != provable_cbAddress()) revert();
    //     temp = bytes(result);
    // }

    // function GetTemp() public payable {
    //     priceOfUrl = provable_getPrice("URL");
    //     require(
    //         address(this).balance >= priceOfUrl,
    //         "please add some ETH to cover for the query fee"
    //     );
    //     provable_query(
    //         "URL",
    //         "json(http://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam).liveweer[0].temp"
    //     );
    // }

        function GetCurrentTemp() public view returns (uint256) {
        return currentTemp;
    }

        function GetCurrentAddressesThatHaveWon() public view returns (address[] memory) {
        return currentAddressesThatHaveWon;
    }

        function GetCurrentAddressesThatHaveLost() public view returns (address[] memory) {
        return currentAddressesThatHaveLost;
    }
    
           function CheckIfEven(uint256 stake) public returns (bool) {
               if(stake % 2 == 0){
               isStakeEven = true;
               }else{
                   isStakeEven = false;
               }
        return isStakeEven;
    }

}
