"use strict";
const utils = require("../utils");

module.exports = function multiply(a, b, out) {
    utils.validateSources(a, b);

    if (!out) {
        out = utils.createImageData(a.width, a.height);
    }
    const dataOut = out.data;
    const dataA = a.data;
    const dataB = b.data;
    const n = dataOut.length;

    for (let i = 0; i < n; i += 4) {
        const r = dataA[i]   * dataB[i]   / 255;
        const g = dataA[i+1] * dataB[i+1] / 255;
        const b = dataA[i+2] * dataB[i+2] / 255;

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};