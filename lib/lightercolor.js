"use strict";
const utils = require("../utils");

module.exports = function lightercolor(a, b, out) {
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

        var lA = rA * 0.3 + gA * 0.59 + bA * 0.11;
        var lB = rB * 0.3 + gB * 0.59 + bB * 0.11;

        if (lA > lB) {
            dataOut[i]   = rA;
            dataOut[i+1] = gA;
            dataOut[i+2] = bA;
        } else {
            dataOut[i]   = rB;
            dataOut[i+1] = gB;
            dataOut[i+2] = bB;
        }
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};