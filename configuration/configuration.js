const generateKeystreamButton = document.getElementById("generateKeystream");

const keystreamOutput = document.getElementById("keystreamOutput");

const lfsrTableBody = document.getElementById("lfsrTableBody");

generateKeystreamButton.addEventListener("click", function () {
  const registerSize = Number(document.getElementById("registerSize").value);

  const initialSeed = document.getElementById("initialSeed").value;

  const tapPosition = document.getElementById("tapPositions").value;

  const keystreamLength = Number(
    document.getElementById("keystreamLength").value,
  );

  if (!Number.isInteger(registerSize) || registerSize < 2) {
    alert("Register size must be an integer of at least 2.");
    return;
  }
  if (!/^[01]+$/.test(initialSeed)) {
    alert("Seed must contain only 0 and 1.");
    return;
  }

  if (initialSeed.length !== registerSize) {
    alert(`Seed must contain exactly ${registerSize} bits.`);
    return;
  }

  if (/^0+$/.test(initialSeed)) {
    alert("Seed cannot be all zeros.");
    return;
  }

  if (!Number.isInteger(keystreamLength) || keystreamLength < 1) {
    alert("Keystream length must be a positive integer.");
    return;
  }

  const taps = tapPosition.split(",").map((tap) => Number(tap.trim()));

  if (taps.length === 0) {
    alert("Please enter at least one tap position.");
    return;
  }

  const result = generateKeystream(initialSeed, taps, keystreamLength);

  keystreamOutput.textContent = result.keystream;

  lfsrTableBody.innerHTML = "";

  for (const step of result.steps) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${step.step}</td>
            <td>${step.currentRegister}</td>
            <td>${step.outputBit}</td>
            <td>${step.tapValues}</td>
            <td>${step.feedback}</td>
            <td>${step.nextRegister}</td>
        `;

    lfsrTableBody.appendChild(row);
  }
});
