const ciphertextHexOutput = document.getElementById("ciphertextHex");

const encryptButton = document.getElementById("encryptButton");

const plaintextBinaryOutput = document.getElementById("plaintextBinary");

const encryptionKeystreamOutput = document.getElementById(
  "encryptionKeystream",
);

const ciphertextBinaryOutput = document.getElementById("ciphertextBinary");

encryptButton.addEventListener("click", function () {
  const plaintext = document.getElementById("plaintext").value;

  if (plaintext.length === 0) {
    alert("Please enter some plaintext.");

    return;
  }

  // get the LSFR configuration user input
  const initialSeed = document.getElementById("initialSeed").value;

  const tapPosition = document.getElementById("tapPositions").value;

  const taps = tapPosition.split(",").map((tap) => Number(tap.trim()));

  // convert first the plain text to binary
  let plaintextBinary = "";

  for (const character of plaintext) {
    const binary = character.charCodeAt(0).toString(2).padStart(8, "0");

    plaintextBinary += binary;
  }

  // generare the keystream of the plain text
  const result = generateKeystream(initialSeed, taps, plaintextBinary.length);

  const keystream = result.keystream;

  // XOR plaintext with keystream
  let ciphertextBinary = "";

  for (let i = 0; i < plaintextBinary.length; i++) {
    const plaintextBit = Number(plaintextBinary[i]);

    const keystreamBit = Number(keystream[i]);

    const encryptedBit = plaintextBit ^ keystreamBit;

    ciphertextBinary += encryptedBit;
  }

  let ciphertextHex = "";

  for (let i = 0; i < ciphertextBinary.length; i += 8) {
    const byte = ciphertextBinary.substring(i, i + 8);

    const hex = parseInt(byte, 2).toString(16).padStart(2, "0").toUpperCase();

    ciphertextHex += hex + " ";
  }

  // Display results
  plaintextBinaryOutput.textContent = plaintextBinary;

  encryptionKeystreamOutput.textContent = keystream;

  ciphertextBinaryOutput.textContent = ciphertextBinary;

  ciphertextHexOutput.textContent = ciphertextHex.trim();
});
