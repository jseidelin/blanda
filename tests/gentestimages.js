/* eslint-env mocha */

"use strict";

const blanda = require("../index.js");
const PNG = require("pngjs").PNG;
const fs = require("fs");
const async = require("async");

function getImageData(src, callback) {
    fs.createReadStream(__dirname + "/" + src).pipe(
        new PNG({filterType: 4})
    ).on("parsed", function() {
        callback(this);
    });
}

function writeImageData(dst, imageData, callback) {
    var png = new PNG({
        filterType: 4,
        width: imageData.width,
        height: imageData.height,
        depth: 8
    });
    png.data = new Buffer(imageData.data);
    png.pack().pipe(fs.createWriteStream(__dirname + "/" + dst)).on("finish", callback);
}

const modes = [
    "darken",
    "multiply",
    "colorburn",
    "linearburn",
    "darkercolor",

    "lighten",
    "screen",
    "colordodge",
    "lineardodge",
    "lightercolor",

    "overlay",
    "softlight",
    "hardlight",
    "vividlight",
    "linearlight",
    "pinlight",
    "hardmix",

    "difference",
    "exclusion",
    "subtract",
    "divide"
];

async.eachSeries(modes, (mode, callback) => {
    getImageData("a.png", (a) => {
        getImageData("b.png", (b) => {
            const outData = blanda[mode](a, b);
            writeImageData("results/" + mode + ".png", outData, () => {
                callback();
            });
        });
    });
});


