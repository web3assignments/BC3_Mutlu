// Source code to interact with smart contract

// web3 provider with fallback for old version
if (typeof window.web3 !== 'undefined') {
	// Use Mist/MetaMask's provider.
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
var contractAddress = '0xC3E0450f3A052BF57e9f0056708563b40BD546b5';
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

var account;

async function createAccount() {
	// Accounts
	await web3.eth.getAccounts(function (err, accounts) {
		account = accounts[0];
		console.log('Account: ' + account);
		web3.eth.defaultAccount = account;
		web3.eth.personal.unlockAccount(account, 'daac1eddeea98c02e84e1051a5d927b9b62ca3e0731e339d741c8d7665cec741');

		document.getElementById('currentAddress').innerHTML = account;
	});
};
async function deployer() {
	//contract instance
	contract = new web3.eth.Contract(abi, contractAddress)
	var byteCode = web3.eth.getCode(contractAddress)

	contract.options.data = byteCode;
	await contract.deploy({
	})
		.send({
			from: '0x9b25fd251BbC869d617172F91E0DacD9FFFaF265',
			gas: 1500000,
			gasPrice: '30000000000000'
		})
		.then(function (newContractInstance) {
			console.log(newContractInstance.options.address) // instance with the new contract address
		});
	contract.methods.GuessIfEven(10).call({}, function (error) {
		console.log(error);
		outPut = error.message;
		document.getElementById('outPut').innerHTML = error;
	});
};
createAccount();
deployer();
console.log(contract);
