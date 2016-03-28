"use strict";
const utils = require("../utils");

module.exports = function difference(a, b, out) {
    utils.validateSources(a, b);

    if (!out) {
        out = utils.createImageData(a.width, a.height);
    }
    const dataOut = out.data;
    const dataA = a.data;
    const dataB = b.data;
    const n = dataOut.length;

    for (let i = 0; i < n; i += 4) {
        let r = dataA[i]   - dataB[i];
        let g = dataA[i+1] - dataB[i+1];
        let b = dataA[i+2] - dataB[i+2];

        if (r < 0) r = -r;
        if (g < 0) g = -g;
        if (b < 0) b = -b;

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};