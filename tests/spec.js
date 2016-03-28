/* eslint-env mocha */

"use strict";

const blanda = require("../index.js");

const expect = require("expect");
const PNG = require("pngjs").PNG;
const fs = require("fs");


function getImageData(src, callback) {
    fs.createReadStream(__dirname + "/" + src).pipe(
        new PNG({filterType: 4})
    ).on("parsed", function() {
        callback(this);
    });
}

function compareImageData(src, dst) {
    expect(src.width).toEqual(dst.width);
    expect(src.height).toEqual(dst.height);
    expect(src.data.length).toEqual(dst.data.length);

    const buf1 = new Buffer(dst.data);
    const buf2 = new Buffer(src.data);

    expect(buf1.compare(buf2)).toEqual(0);
}

describe("blanda", function() {

    const images = {};

    beforeEach((done) => {
        getImageData("a.png", (a) => {
            getImageData("b.png", (b) => {
                images.a = a;
                images.b = b;
                done();
            });
        });
    });


    describe("colorburn()", function() {
        beforeEach((done) => {
            getImageData("results/colorburn.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.colorburn(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("colordodge()", function() {
        beforeEach((done) => {
            getImageData("results/colordodge.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.colordodge(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("darken()", function() {
        beforeEach((done) => {
            getImageData("results/darken.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.darken(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.darken(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("darkercolor()", function() {
        beforeEach((done) => {
            getImageData("results/darkercolor.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.darkercolor(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.darkercolor(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("difference()", function() {
        beforeEach((done) => {
            getImageData("results/difference.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.difference(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.difference(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("divide()", function() {
        beforeEach((done) => {
            getImageData("results/divide.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.divide(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("exclusion()", function() {
        beforeEach((done) => {
            getImageData("results/exclusion.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.exclusion(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.exclusion(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("hardlight()", function() {
        beforeEach((done) => {
            getImageData("results/hardlight.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.hardlight(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("hardmix()", function() {
        beforeEach((done) => {
            getImageData("results/hardmix.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.hardmix(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("lighten()", function() {
        beforeEach((done) => {
            getImageData("results/lighten.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.lighten(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.lighten(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("lightercolor()", function() {
        beforeEach((done) => {
            getImageData("results/lightercolor.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.lightercolor(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.lightercolor(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("linearburn()", function() {
        beforeEach((done) => {
            getImageData("results/linearburn.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.linearburn(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.linearburn(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("lineardodge()", function() {
        beforeEach((done) => {
            getImageData("results/lineardodge.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.lineardodge(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.lineardodge(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("multiply()", function() {
        beforeEach((done) => {
            getImageData("results/multiply.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.multiply(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.multiply(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("overlay()", function() {
        beforeEach((done) => {
            getImageData("results/overlay.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.overlay(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("pinlight()", function() {
        beforeEach((done) => {
            getImageData("results/pinlight.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.pinlight(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("screen()", function() {
        beforeEach((done) => {
            getImageData("results/screen.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.screen(images.a, images.b);
            compareImageData(outData, images.c);
        });

        it("should be commutative", function() {
            const outData = blanda.screen(images.b, images.a);
            compareImageData(outData, images.c);
        });
    });

    describe("softlight()", function() {
        beforeEach((done) => {
            getImageData("results/softlight.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.softlight(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("subtract()", function() {
        beforeEach((done) => {
            getImageData("results/subtract.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.subtract(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

    describe("vividlight()", function() {
        beforeEach((done) => {
            getImageData("results/vividlight.png", (c) => {
                images.c = c;
                done();
            });
        });

        it("should produce expected blended image", function() {
            const outData = blanda.vividlight(images.a, images.b);
            compareImageData(outData, images.c);
        });
    });

});

