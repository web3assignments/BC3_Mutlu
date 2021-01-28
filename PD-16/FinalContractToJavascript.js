// contractAddress and abi are setted after contract deploy
var contractAddress = '0xfce62253280451b35a46F927d1C73025DcEa7C5F';
var abi = [
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "result",
				"type": "string"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_myid",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_result",
				"type": "string"
			},
			{
				"internalType": "bytes",
				"name": "_proof",
				"type": "bytes"
			}
		],
		"name": "__callback",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "changeSecondChanceCurrentTemp",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "stake",
				"type": "uint256"
			}
		],
		"name": "CheckIfEven",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetTemp",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "input",
				"type": "bytes"
			}
		],
		"name": "convertToUint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
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
	},
	{
		"inputs": [],
		"name": "GetCurrentAddressesThatHaveLost",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetCurrentAddressesThatHaveWon",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "GetCurrentTemp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "priceOfUrl",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "temp",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
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
	contract.methods.GuessIfEven(0).send({ from: account, value: Web3.utils.toWei('0', 'ether') }, function (error) {
		document.getElementById('outPut').innerHTML = error;
		console.log("outPut Error: ", error);
		
	}).then(function (receipt) {
		console.log("Succes outPut Receipt: ", receipt)	
		document.getElementById('outPut').innerHTML = receipt.events.CalculatedWinnings.returnValues.winner;
		document.getElementById('outPutAmount').innerHTML = receipt.events.CalculatedWinnings.returnValues.winning;
	});

	web3.eth.getBalance(contractAddress, function (err, result) { console.log("Balance: ",result); });
	console.log("Contract: ", contract);
}
Contract();