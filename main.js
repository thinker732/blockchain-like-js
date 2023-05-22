const hash256 = require("./Tohash.js");

//console.log(hash256("a"));
class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return hash256(
      this.index + this.previousHah + this.timestamp + JSON.stringify(this.data)
    ).toString();
  }

  isHashValid = () => {
    return this.hash == this.calculateHash();
  };
}

class Blockchain {
  constructor() {
    this.mark_index = 0;
    this.chain = [this.createGenesisBlock()];
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
    newBlock.hash = newBlock.calculateHash();
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
ApoChain.addBlock({ amount: 15 });
ApoChain.addBlock({ amount: 10 });

console.log(JSON.stringify(ApoChain, null, 10));
console.log("Is Blockchain Valid? " + ApoChain.isChainValid());

ApoChain.chain[1].data = { amount: 100 };
//Blockchain.chain[1].hash=Blockchain.chain[1]

console.log("Is Blockchain Valid? " + ApoChain.isChainValid());
