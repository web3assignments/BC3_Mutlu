// contractAddress and abi are setted after contract deploy
var contractAddress = '0x36aE9978e3241109f8fA87E9AF1912235fba79A3';
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
		"stateMutability": "payable",
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

async function Contract() {
	// web3 provider with fallback for old version
	// if (typeof window.web3 !== 'undefined') {
		web3 = new Web3(Web3.givenProvider);
		var requestAccounts = await web3.eth.requestAccounts();
		const network = await web3.eth.net.getId();
		console.log('Injected web3 detected.');

	// } else {
	// 	// Fallback to localhost if no web3 injection. We've configured this to GANACHE
	// 	var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
	// 	web3 = new Web3(provider)
	// 	console.log('No web3 instance injected, using Local web3.');
	// }
	console.log(provider)

	// Accounts
	var account;
	var accounts = web3.eth.getAccounts();

	account = accounts[0];
	console.log('Account: ' + account);
	web3.eth.defaultAccount = account;

	document.getElementById('currentAddress').innerHTML = account;

	//contract instance
	contract = new web3.eth.Contract(abi, contractAddress)
	var outPut = "test";
	if (!account) {

		contract.methods.GuessIfEven(5).send({ from: account, value: Web3.utils.toWei('5', 'ether') }, function (error) {
			console.log(error);
		}).then(function (receipt) {
			console.log(receipt)
		});
	}

	web3.eth.getBalance(contractAddress, function (err, result) { console.log(result); });
	console.log(contract);
}

Contract();