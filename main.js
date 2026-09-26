function generateKeystream(seed, taps, length) {

    let register = seed;

    let keystream = "";

    let steps = [];


    for (let i = 0; i < length; i++) {

        const currentRegister = register;

        const outputBit =
            register[register.length - 1];

        let feedback = 0;

        let tapValues = [];


        for (const tap of taps) {

            const index =
                register.length - tap;

            const tapValue =
                Number(register[index]);

            tapValues.push(tapValue);

            feedback ^=
                tapValue;
        }

        register =
            register.slice(0, -1);

        register =
            feedback + register;

        steps.push({
            step: i + 1,
            currentRegister: currentRegister,
            outputBit: outputBit,
            tapValues: tapValues.join(", "),
            feedback: feedback,
            nextRegister: register
        });

        keystream += outputBit;
    }


    return {
        keystream: keystream,
        steps: steps
    };
}