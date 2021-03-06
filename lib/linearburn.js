"use strict";
const utils = require("../utils");

module.exports = function linearburn(a, b, out) {
    utils.validateSources(a, b);

    if (!out) {
        out = utils.createImageData(a.width, a.height);
    }
    const dataOut = out.data;
    const dataA = a.data;
    const dataB = b.data;
    const n = dataOut.length;

    for (let i = 0; i < n; i += 4) {
        let r = dataA[i]   + dataB[i];
        let g = dataA[i+1] + dataB[i+1];
        let b = dataA[i+2] + dataB[i+2];

        if (r < 255) {
            r = 0;
        } else {
            r = r - 255;
        }

        if (g < 255) {
            g = 0;
        } else {
            g = g - 255;
        }

        if (b < 255) {
            b = 0;
        } else {
            b = b - 255;
        }

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};