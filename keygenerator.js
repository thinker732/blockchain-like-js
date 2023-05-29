const EC = require("elliptic").ec;

const ec = new EC("secp256k1"); // this is also the basics on bitcoin wallet

const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex"); //hex format of the string

console.log("SK: " + privateKey);
console.log("PK: " + publicKey);
