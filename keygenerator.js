async function generateKeys() {
  try {
    const { publicKey, privateKey } = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-256" },
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Access and use the publicKey and privateKey as needed
    console.log("Public Key:", publicKey);
    console.log("Private Key:", privateKey);

    // You can return the keys or perform other operations here
    return { publicKey, privateKey };
  } catch (error) {
    console.error("Error generating keys:", error);
  }
}

// Call the generateKeys function
generateKeys();
