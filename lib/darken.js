"use strict";
const utils = require("../utils");

module.exports = function darken(a, b, out) {
    utils.validateSources(a, b);

    if (!out) {
        out = utils.createImageData(a.width, a.height);
    }
    const dataOut = out.data;
    const dataA = a.data;
    const dataB = b.data;
    const n = dataOut.length;

    for (let i = 0; i < n; i += 4) {
        let rA = dataA[i];
        let gA = dataA[i+1];
        let bA = dataA[i+2];
        let rB = dataB[i];
        let gB = dataB[i+1];
        let bB = dataB[i+2];

        dataOut[i]   = rA < rB ? rA : rB;
        dataOut[i+1] = gA < gB ? gA : gB;
        dataOut[i+2] = bA < bB ? bA : bB
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};