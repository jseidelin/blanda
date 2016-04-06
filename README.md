blanda
============

Image blending functions à la Photoshop's layer blend modes.

[![Build Status](https://img.shields.io/travis/jseidelin/blanda.svg)](https://travis-ci.org/jseidelin/blanda)
[![npm version](https://img.shields.io/npm/v/blanda.svg)](https://www.npmjs.com/package/blanda)


## Usage

```javascript
var blanda = require("blanda");

var blendedImage = blanda.multiply(imageA, imageB);
```

The following blend functions are available:

* `colorburn()`
* `colordodge()`
* `darken()`
* `darkercolor()`
* `difference()`
* `divide()`
* `exclusion()`
* `hardlight()`
* `hardmix()`
* `lighten()`
* `lightercolor()`
* `linearburn()`
* `lineardodge()`
* `linearlight()`
* `multiply()`
* `overlay()`
* `pinlight()`
* `screen()`
* `softlight()`
* `subtract()`
* `vividlight()`

All blend functions take two parameters, `imageA` and `imageB`, each being an object with the following properties:

* `width` - The width of the image
* `height` - The height of the image
* `data` - An array of `(width * height * 4)` RGBA pixel values. Any array type (or Node `Buffer` object) should do but values should be in the range `[0,255]`

This format is compatible with e.g. `ImageData` objects created by `<canvas>` elements, as well as those used by e.g. [pngjs](https://github.com/niegowski/node-pngjs/).

All blend functions return image data objects with similar structure (using an `Uint8Array` to hold pixel values).

### Example with pngjs

```javascript
var blanda = require("blanda");
var PNG = require("pngjs").PNG;

// read PNG image data with pngjs
function getImageData(src, callback) {
    fs.createReadStream(src).pipe(
        new PNG({filterType: 4})
    ).on("parsed", function() {
        callback(this);
    });
}

// write PNG image data with pngjs
function writeImageData(dst, imageData, callback) {
    var png = new PNG({
        filterType: 4,
        width: imageData.width,
        height: imageData.height,
        depth: 8
    });
    png.data = new Buffer(imageData.data);
    png.pack().pipe(fs.createWriteStream(dst)).on("finish", callback);
}


getImageData("A.png", function(imageA) {
    getImageData("B.png", function(imageB) {
        var blendedImage = blanda.linearburn(imageA, imageB);
        writeImageData("out.png", blendedImage, () => {
            callback();
        });
    });
});

```