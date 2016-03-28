"use strict";
const utils = require("../utils");

module.exports = function hardlight(a, b, out) {
    utils.validateSources(a, b);

    if (!out) {
        out = utils.createImageData(a.width, a.height);
    }
    const dataOut = out.data;
    const dataA = a.data;
    const dataB = b.data;
    const n = dataOut.length;

    const k = 2 / 255;

    for (let i = 0; i < n; i += 4) {
        const rA = dataA[i];
        const gA = dataA[i+1];
        const bA = dataA[i+2];
        const rB = dataB[i];
        const gB = dataB[i+1];
        const bB = dataB[i+2];

        let r, g, b;

        if (rB < 128) {
            r = rA * rB * k;
        } else {
            r = 255 - (255 - rA) * (255 - rB) * k;
        }

        if (gB < 128) {
            g = gA * gB * k;
        } else {
            g = 255 - (255 - gA) * (255 - gB) * k;
        }

        if (bB < 128) {
            b = bA * bB * k;
        } else {
            b = 255 - (255 - bA) * (255 - bB) * k;
        }

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};