const sha256 = require("./Tohash.js");
const hash256 = require("./Tohash.js");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash() {
    return sha256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPubli("hex") !== this.fromAddress) {
      throw new Eroor("You cannot sign transactions for other wallets!");
    }

    const hasTx = this.calculateHash();
    const sign = signingKey.sign(hasTx, "base64");
    this.signature = sign.toDER("hex");
  }

  isValid() {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error("No Signature in this transactions");
    }
  }
}
class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return hash256(
      this.previousHah +
        this.timestamp +
        JSON.stringify(this.transactions) +
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
    //this.mark_index = 0;
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block("01/01/2023", "", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log("block mined!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward),
    ];
  }

  createTransactions(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        } else if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  addBlock(_data) {
    const newBlock = new Block(
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

module.exports = { Transaction, Block, Blockchain };
