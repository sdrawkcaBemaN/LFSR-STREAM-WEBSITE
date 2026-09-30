const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", function () {
    const size = Number(document.getElementById("registerSize").value);
    const tapText = document.getElementById("tapPositions").value;
    const target = document.getElementById("targetKeystream").value.trim();
    const summary = document.getElementById("searchSummary");
    const tableBody = document.getElementById("searchTableBody");

    summary.textContent = "";
    tableBody.innerHTML = "";

    if (!Number.isInteger(size) || size < 2 || size > 8) {
        alert("For seed search, choose a register size from 2 to 8.");
        return;
    }

    if (!/^[01]+$/.test(target) || target.length > 256) {
        alert("Enter a target keystream containing 1 to 256 binary digits.");
        return;
    }

    const tapParts = tapText.split(",");
    const taps = [];

    for (let i = 0; i < tapParts.length; i++) {
        const tap = Number(tapParts[i].trim());
        if (!Number.isInteger(tap) || tap < 1 || tap > size) {
            alert("Tap positions must be whole numbers from 1 to " + size + ".");
            return;
        }
        taps.push(tap);
    }

    const numberOfSeeds = 2 ** size;
    const matches = [];

    for (let i = 0; i < numberOfSeeds; i++) {
        const seed = i.toString(2).padStart(size, "0");
        const result = generateKeystream(seed, taps, target.length);
        let matchText = "No";

        if (result.keystream === target) {
            matches.push(seed);
            matchText = "Match";
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${seed}</td>
            <td>${result.keystream}</td>
            <td>${matchText}</td>
        `;
        tableBody.appendChild(row);
    }

    let matchingSeeds = "none";
    if (matches.length > 0) {
        matchingSeeds = matches.join(", ");
    }

    summary.textContent = "Tried " + numberOfSeeds +
        " seeds. Matching seeds: " + matchingSeeds + ".";
});
