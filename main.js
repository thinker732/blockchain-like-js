const hash256 = require("./Tohash.js");

//console.log(hash256("a"));
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return hash256(
      this.index +
        this.previousHah +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  isHashValid = () => {
    return this.hash == this.calculateHash();
  };

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("Block mined:" + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.mark_index = 0;
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2023", "", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(_data) {
    const newBlock = new Block(
      ++this.mark_index,
      new Date().toISOString(),
      _data,
      this.getLatestBlock().hash
    );
    //newBlock.hash = newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      return (
        currentBlock.isHashValid() &&
        currentBlock.previousHash === previousBlock.hash
      );
    }
  }
}

let ApoChain = new Blockchain();

console.log("mining block one ...");
ApoChain.addBlock({ amount: 1 });
console.log("mining block two ...");
ApoChain.addBlock({ amount: 10 });

console.log(JSON.stringify(ApoChain, null, 10));
console.log("Is Blockchain Valid? " + ApoChain.isChainValid());

ApoChain.chain[1].data = { amount: 100 };
//Blockchain.chain[1].hash = Blockchain.chain[1];
console.log(ApoChain.chain[1]);
console.log(ApoChain.chain[1].isHashValid());
console.log("Is Blockchain Valid? " + ApoChain.isChainValid());
