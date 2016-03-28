function validateSources(a, b) {
    if ((a.width !== b.width) || (a.height !== b.height)) {
        throw new Error("A and B must have indentical dimensions");
    }
}

function createImageData(width, height) {
    return {
        width,
        height,
        data: new Uint8Array(width * height * 4)
    };
}

module.exports = {
    validateSources,
    createImageData
};
