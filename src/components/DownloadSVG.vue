<script>
import {HSLToHex} from '../helpers/colors';
import {download} from '../helpers/downloads';

export default {
  props: {
    swatchesGrouped: {
      type: Array,
      default: function() { return []; }
    }
  },
  computed: {
    svg() {
      const rectWidth = 40;
      const rectHeight = 40;

      let svgWidth = rectWidth * this.swatchesGrouped[0].length;
      let svgHeight = rectHeight * this.swatchesGrouped.length

      let y = 0;
      let contents = '<?xml version="1.0" ?>';
      contents += `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
      for (let swatches of this.swatchesGrouped) {
        let x = 0;
        for (let swatch of swatches) {
          let fill = HSLToHex(swatch.hue, swatch.saturation, swatch.lightness);
          contents += `<rect x="${x * rectWidth}" y="${y * rectHeight}" width="${rectWidth}" height="${rectHeight}" fill="${fill}" />`;
          x++;
        }
        y++;
      }
      contents += '</svg>';

      return contents;
    }
  },
  methods: {
    download() {
      download('palette.svg', this.svg, 'image/svg+xml');
    }
  }
}
</script>

<template>
  <button @click="download()">
    Download SVG
  </button>
</template>

<style scoped>
button {
  @apply bg-gray-600 font-light inline-block leading-none mx-1 px-2 py-2 text-sm text-white transition focus:bg-gray-600 focus:outline-none focus:ring-0 hover:bg-gray-600;
}
</style>