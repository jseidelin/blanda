"use strict";
const utils = require("../utils");

module.exports = function linearlight(a, b, out) {
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

        let r = rA + 2 * rB - 255;
        let g = gA + 2 * gB - 255;
        let b = bA + 2 * bB - 255;

        if (r < 0) r = 0;
        if (g < 0) g = 0;
        if (b < 0) b = 0;

        if (r > 255) r = 255;
        if (g > 255) g = 255;
        if (b > 255) b = 255;

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};