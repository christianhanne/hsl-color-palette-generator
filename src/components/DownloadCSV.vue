<script>
import {HSLToHex} from '../helpers/colors';
import {download} from '../helpers/downloads';

export default {
  props: {
    mode: {
      type: String,
      default: 'lightness'
    },
    swatchesGrouped: {
      type: Array,
      default: function() { return []; }
    }
  },
  computed: {
    csv() {
      let contents = `"${this.mode} \ hue",`;
      contents += this.swatchesGrouped[0].map(swatch => swatch.hue).join(',') + "\n";

      for (let swatches of this.swatchesGrouped) {
        contents += `"${swatches[0][this.mode]}",`;
        contents += swatches.map(swatch => '"' + HSLToHex(swatch.hue, swatch.saturation, swatch.lightness) + '"').join(',') + "\n";
      }

      return contents;
    }
  },
  methods: {
    download() {
      download('palette.csv', this.csv, 'text/csv');
    }
  }
}
</script>

<template>
  <button @click="download()">
    Download CSV
  </button>
</template>

<style scoped>
button {
  @apply bg-gray-600 font-light inline-block leading-none mx-1 px-2 py-2 text-sm text-white transition focus:bg-gray-600 focus:outline-none focus:ring-0 hover:bg-gray-600;
}
</style>