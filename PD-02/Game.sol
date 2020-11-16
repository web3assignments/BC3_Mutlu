pragma solidity ^0.7.0;

contract Game {
    uint256 _stake;

    constructor(uint256 stake) public {
        _stake = stake;
    }

    function isItEven(uint256 stake) public returns (bool) {
        bool isEven = false;
        if (stake % 2 == 0) {
            return isEven = true;
        }
        return isEven;
    }
}
