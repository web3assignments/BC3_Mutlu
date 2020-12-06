// Source code to interact with smart contract

// web3 provider with fallback for old version
if (typeof window.web3 !== 'undefined') {
	web3 = new Web3(window.web3.currentProvider)
	console.log('Injected web3 detected.');

} else {
	// Fallback to localhost if no web3 injection. We've configured this to GANACHE
	var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
	web3 = new Web3(provider)
	console.log('No web3 instance injected, using Local web3.');
}
console.log(provider)

// contractAddress and abi are setted after contract deploy
var contractAddress = '0x3cCD631e7aFB7065254C94027aAA7FcDC8B157de';
var abi = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winning",
				"type": "uint256"
			}
		],
		"name": "AddressThatLost",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "test",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "winning",
				"type": "uint256"
			}
		],
		"name": "CalculatedWinnings",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "stake",
				"type": "uint256"
			}
		],
		"name": "GuessIfEven",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "currentAddressesInContract",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


// Accounts
var account;
web3.eth.getAccounts(function (err, accounts) {
	account = accounts[0];
	console.log('Account: ' + account);
	web3.eth.defaultAccount = account;
	web3.eth.personal.unlockAccount(account, 'daac1eddeea98c02e84e1051a5d927b9b62ca3e0731e339d741c8d7665cec741');

	document.getElementById('currentAddress').innerHTML = account;
});

//contract instance
contract = new web3.eth.Contract(abi, contractAddress)
var outPut = "test";

contract.methods.GuessIfEven(5).send({from: '0x9b25fd251BbC869d617172F91E0DacD9FFFaF265'}, function (error) {
	console.log(error);
}).then(function(receipt){
    console.log(receipt)
});

console.log(contract);
