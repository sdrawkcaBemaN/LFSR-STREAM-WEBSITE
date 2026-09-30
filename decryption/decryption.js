const decryptButton =
    document.getElementById("decryptButton");

const ciphertextHexInput =
    document.getElementById("ciphertextHexInput");

const decryptionCiphertextBinaryOutput =
    document.getElementById("decryptionCiphertextBinary");

const decryptionKeystreamOutput =
    document.getElementById("decryptionKeystream");

const decryptedBinaryOutput =
    document.getElementById("decryptedBinary");

const decryptedPlaintextOutput =
    document.getElementById("decryptedPlaintext");


decryptButton.addEventListener("click", function () {

    // remove every space from the hex input
    const ciphertextHex =
        ciphertextHexInput.value.replace(/\s+/g, "");


    // validate the input
    if (ciphertextHex.length === 0) {

        alert("Please enter the ciphertext (hex).");

        return;
    }

    if (!/^[0-9a-fA-F]+$/.test(ciphertextHex) || ciphertextHex.length % 2 !== 0) {

        alert("Ciphertext must be valid hex (pairs of 0-9 / A-F), e.g. 3F A2 1C");

        return;
    }


    // get the LFSR configuration 
    const initialSeed =
        document.getElementById("initialSeed").value;

    const tapPosition =
        document.getElementById("tapPositions").value;


    const taps =
        tapPosition
            .split(",")
            .map(tap => Number(tap.trim()));


    // convert hex to binary 
    let ciphertextBinary = "";

    for (let i = 0; i < ciphertextHex.length; i += 2) {

        const byteHex =
            ciphertextHex.substring(i, i + 2);

        const binary =
            parseInt(byteHex, 16)
                .toString(2)
                .padStart(8, "0");

        ciphertextBinary += binary;
    }


    // generate the keystream of the ciphertext
    const result =
        generateKeystream(
            initialSeed,
            taps,
            ciphertextBinary.length
        );

    const keystream =
        result.keystream;


    // XOR ciphertext with keystream 
    let plaintextBinary = "";

    for (let i = 0; i < ciphertextBinary.length; i++) {

        const ciphertextBit =
            Number(ciphertextBinary[i]);

        const keystreamBit =
            Number(keystream[i]);

        plaintextBinary += ciphertextBit ^ keystreamBit;
    }


    // convert binary to text 
    let plaintext = "";

    for (let i = 0; i < plaintextBinary.length; i += 8) {

        const byte =
            plaintextBinary.substring(i, i + 8);

        plaintext +=
            String.fromCharCode(parseInt(byte, 2));
    }


    // Display result
    decryptionCiphertextBinaryOutput.textContent =
        ciphertextBinary;

    decryptionKeystreamOutput.textContent =
        keystream;

    decryptedBinaryOutput.textContent =
        plaintextBinary;

    decryptedPlaintextOutput.textContent =
        plaintext;

});
