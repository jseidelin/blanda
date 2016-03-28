"use strict";
const utils = require("../utils");

module.exports = function hardmix(a, b, out) {
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

        let r, g, b;

        if (rB < 128) {
            r = (rB === 0) ? 0 : 255 - ((255 - rA) << 8) / (2 * rB);
        } else {
            r = (rA << 8) / (255 - (2 * (rB - 128)));
        }
        r = r < 128 ? 0 : 255;

        if (gB < 128) {
            g = (gB === 0) ? 0 : 255 - ((255 - gA) << 8) / (2 * gB);
        } else {
            g = (gA << 8) / (255 - (2 * (gB - 128)));
        }
        g = g < 128 ? 0 : 255;

        if (bB < 128) {
            b = (bB === 0) ? 0 : 255 - ((255 - bA) << 8) / (2 * bB);
        } else {
            b = (bA << 8) / (255 - (2 * (bB - 128)));
        }
        b = b < 128 ? 0 : 255;

        dataOut[i]   = r;
        dataOut[i+1] = g;
        dataOut[i+2] = b;
        dataOut[i+3] = dataA[i+3];
    }

    return out;
};