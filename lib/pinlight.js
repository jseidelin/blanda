"use strict";
const utils = require("../utils");

module.exports = function pinlight(a, b, out) {
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

        if (rB > 128) {
            r = 2 * (rB - 128);
            if (rA > r) r = rA;
        } else {
            r = 2 * rB;
            if (rA < r) r = rA;
        }

        if (gB > 128) {
            g = 2 * (gB - 128);
            if (gA > g) g = gA;
        } else {
            g = 2 * gB;
            if (gA < g) g = gA;
        }

        if (bB > 128) {
            b = 2 * (bB - 128);
            if (bA > b) b = bA;
        } else {
            b = 2 * bB;
            if (bA < b) b = bA;
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