"use strict";
const utils = require("../utils");

module.exports = function vividlight(a, b, out) {
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

        let r, g, b;

        if (rB < 128) {
            r = (rB === 0) ? 0 : 255 - ((255 - rA) << 8) / (2 * rB);
        } else {
            r = (rA << 8) / (255 - (2 * (rB - 128)));
        }

        if (gB < 128) {
            g = (gB === 0) ? 0 : 255 - ((255 - gA) << 8) / (2 * gB);
        } else {
            g = (gA << 8) / (255 - (2 * (gB - 128)));
        }

        if (bB < 128) {
            b = (bB === 0) ? 0 : 255 - ((255 - bA) << 8) / (2 * bB);
        } else {
            b = (bA << 8) / (255 - (2 * (bB - 128)));
        }

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