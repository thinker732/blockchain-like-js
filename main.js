const { Blockchain, Transaction } = require("./blockchain.js");

let ApoChain = new Blockchain();

ApoChain.createTransactions(new Transaction("address1", "address2", 120));
ApoChain.createTransactions(new Transaction("address2", "address1", 10));

ApoChain.minePendingTransactions("my-address");
console.log("\n my balance :" + ApoChain.getBalanceOfAddress("my-address"));
console.log("\n my balance :" + ApoChain.getBalanceOfAddress("address1"));

ApoChain.minePendingTransactions("my-address");
console.log("\n my balance :" + ApoChain.getBalanceOfAddress("my-address"));

console.log(JSON.stringify(ApoChain, null, 10));
/*
console.log("mining block one ...");
ApoChain.addBlock({ amount: 1 });
console.log("mining block two ...");
ApoChain.addBlock({ amount: 10 });



//console.log(JSON.stringify(ApoChain, null, 10));
//console.log("Is Blockchain Valid? " + ApoChain.isChainValid());

//ApoChain.chain[1].transactions = { amount: 100 };
//Blockchain.chain[1].hash = Blockchain.chain[1];
//onsole.log(ApoChain.chain[1]);
//console.log(ApoChain.chain[1].isHashValid());
console.log("Is Blockchain Valid? " + ApoChain.isChainValid());
*/
