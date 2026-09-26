const generateKeystreamButton =
    document.getElementById("generateKeystream");

const keystreamOutput =
    document.getElementById("keystreamOutput");

const lfsrTableBody =
    document.getElementById("lfsrTableBody");


generateKeystreamButton.addEventListener("click", function () {

    const initialSeed =
        document.getElementById("initialSeed").value;

    const tapPosition =
        document.getElementById("tapPositions").value;

    const keystreamLength =
        Number(
            document.getElementById("keystreamLength").value
        );


    const taps =
        tapPosition
            .split(",")
            .map(tap => Number(tap.trim()));


    const result =
        generateKeystream(
            initialSeed,
            taps,
            keystreamLength
        );

    keystreamOutput.textContent =
        result.keystream;

    lfsrTableBody.innerHTML = "";

    for (const step of result.steps) {

        const row =
            document.createElement("tr");


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