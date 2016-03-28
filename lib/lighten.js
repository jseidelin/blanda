"use strict";
const utils = require("../utils");

module.exports = function lighten(a, b, out) {
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

        dataOut[i]   = rA > rB ? rA : rB;
        dataOut[i+1] = gA > gB ? gA : gB;
        dataOut[i+2] = bA > bB ? bA : bB
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};