"use strict";
const utils = require("../utils");

module.exports = function colorburn(a, b, out) {
    utils.validateSources(a, b);

    if (!out) {
        out = utils.createImageData(a.width, a.height);
    }
    const dataOut = out.data;
    const dataA = a.data;
    const dataB = b.data;
    const n = dataOut.length;

    for (let i = 0; i < n; i += 4) {
        const rA = dataA[i];
        const gA = dataA[i+1];
        const bA = dataA[i+2];
        const rB = dataB[i];
        const gB = dataB[i+1];
        const bB = dataB[i+2];

        let r = 255 - ((255 - rA) << 8) / rB;
        if (r < 0 || rB === 0) {
            r = 0;
        }

        let g = 255 - ((255 - gA) << 8) / gB;
        if (g < 0 || gB === 0) {
            g = 0;
        }

        let b = 255 - ((255 - bA) << 8) / bB;
        if (b < 0 || bB === 0) {
            b = 0;
        }

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};