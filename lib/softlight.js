"use strict";
const utils = require("../utils");

module.exports = function softlight(a, b, out) {
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
        let rA = dataA[i];
        let gA = dataA[i+1];
        let bA = dataA[i+2];
        let rB = dataB[i];
        let gB = dataB[i+1];
        let bB = dataB[i+2];

        let r, g, b;

        if (rA < 128) {
            r = ((rB >> 1) + 64) * rA * k;
        } else {
            r = 255 - (191 - (rB >> 1)) * (255 - rA) * k;
        }

        if (gA < 128) {
            g = ((gB >> 1) + 64) * gA * k;
        } else {
            g = 255 - (191 - (gB >> 1)) * (255 - gA) * k;
        }

        if (bA < 128) {
            b = ((bB >> 1) + 64) * bA * k;
        } else {
            b = 255 - (191 - (bB >> 1)) * (255 - bA) * k;
        }

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};