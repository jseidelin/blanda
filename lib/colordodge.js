"use strict";
const utils = require("../utils");

module.exports = function colordodge(a, b, out) {
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

        let r = (rA << 8) / (255 - rB);
        if (r > 255 || rB === 255) {
            r = 255;
        }

        let g = (gA << 8) / (255 - gB);
        if (g > 255 || gB === 255) {
            g = 255;
        }

        let b = (bA << 8) / (255 - bB);
        if (b > 255 || bB === 255) {
            b = 255;
        }

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};