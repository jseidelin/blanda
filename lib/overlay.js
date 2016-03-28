"use strict";
const utils = require("../utils");

module.exports = function overlay(a, b, out) {
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

        if (rA < 128) {
            r = rB * rA * k;
        } else {
            r = 255 - (255 - rA) * (255 - rB) * k;
        }

        if (gA < 128) {
            g = gB * gA * k;
        } else {
            g = 255 - (255 - gA) * (255 - gB) * k;
        }

        if (bA < 128) {
            b = bB * bA * k;
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