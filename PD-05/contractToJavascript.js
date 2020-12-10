// contractAddress and abi are setted after contract deploy
var contractAddress = '0xa491Ee40C399232Ba2cD109Ec975986FbCa16688';
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
	web3 = await new Web3(Web3.givenProvider);
	var requestAccounts = await web3.eth.requestAccounts();
	console.log('Injected web3 detected.');

	// } else {
	// 	// Fallback to localhost if no web3 injection. We've configured this to GANACHE
	// 	var provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
	// 	web3 = new Web3(provider)
	// 	console.log('No web3 instance injected, using Local web3.');
	// }

	// Accounts
	var account;
	var accounts = await web3.eth.getAccounts();
	account = accounts[0];
	console.log('Account: ' + account);
	document.getElementById('currentAddress').innerHTML = account;

	//contract instance
	contract = new web3.eth.Contract(abi, contractAddress)
	contract.methods.GuessIfEven(2).send({ from: account, value: Web3.utils.toWei('2', 'ether') }, function (error) {
		console.log(error);
	}).then(function (receipt) {
		console.log(receipt)
	});

	web3.eth.getBalance(contractAddress, function (err, result) { console.log(result); });
	console.log(contract);
}

Contract();