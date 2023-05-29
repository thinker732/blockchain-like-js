//setting-up

const { Blockchain, Transaction } = require("./blockchain.js");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "52ccb301491428bfefd0a6708cd4657b2238e76aefa56681d4cf454187b6b794"
);
const myWalletAddress = myKey.getPublic("hex");

let ApoChain = new Blockchain();

//
const someonAddress =
  "04b34689bef9d5950f8ac2b1b3f1f28a2525a117f62a38b46fb86b94acec06cbe72a124160a693ad966785ecaeef5415aa053e7322b622d001dcdbe095c50fcd5f";
const tx1 = new Transaction(myWalletAddress, someonAddress, 10);
tx1.signTransaction(myKey);

ApoChain.addTransaction(tx1);

ApoChain.minePendingTransactions(myWalletAddress);
console.log("\n my balance :" + ApoChain.getBalanceOfAddress(myWalletAddress));
console.log(
  "\n someone balance :" + ApoChain.getBalanceOfAddress(someonAddress)
);

console.log(JSON.stringify(ApoChain, null, 10));
console.log("Is Blockchain Valid? " + ApoChain.isChainValid());

ApoChain.chain[1].transactions[0].amount = 1000;

console.log("Is Blockchain Valid? " + ApoChain.isChainValid());
/*
//console.log(JSON.stringify(ApoChain, null, 10));
//console.log("Is Blockchain Valid? " + ApoChain.isChainValid());

//ApoChain.chain[1].transactions = { amount: 100 };
//Blockchain.chain[1].hash = Blockchain.chain[1];
//onsole.log(ApoChain.chain[1]);
//console.log(ApoChain.chain[1].isHashValid());
console.log("Is Blockchain Valid? " + ApoChain.isChainValid());
*/
