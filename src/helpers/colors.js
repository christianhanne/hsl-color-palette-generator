/**
 * Transforms a hexadecimal color string into a HSL color object.
 *
 * @param {string} hexColor
 *   Hexadecimal color string in the form #aabbcc.
 *
 * @returns {{saturation: number, lightness: number, hue: number}}
 *
 * @see https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl
 */
export function hexToHSL(hexColor) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hexColor.length === 4) {
        r = "0x" + hexColor[1] + hexColor[1];
        g = "0x" + hexColor[2] + hexColor[2];
        b = "0x" + hexColor[3] + hexColor[3];
    } else if (hexColor.length === 7) {
        r = "0x" + hexColor[1] + hexColor[2];
        g = "0x" + hexColor[3] + hexColor[4];
        b = "0x" + hexColor[5] + hexColor[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta === 0)
        h = 0;
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    else if (cmax == g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        hue: h,
        saturation: s,
        lightness: l
    };
}

/**
 * Transforms a HSL color string into a hexadecimal color string.
 *
 * @param {number} h
 *   The color's hue value.
 * @param {number} s
 *   The color's saturation value.
 * @param {number} l
 *   The color's lightness value.
 *
 * @returns {string}
 *
 * @see https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hsl-to-hex
 */
export function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1) {
      r = "0" + r;
    }
    if (g.length === 1) {
      g = "0" + g;
    }
    if (b.length === 1) {
      b = "0" + b;
    }

    return "#" + r + g + b;
}
