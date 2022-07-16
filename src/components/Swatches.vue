<script>
import {HSLToHex} from '../helpers/colors';

export default {
  props: {
    swatchesGrouped: {
      type: Array,
      default: function() { return []; }
    }
  },
  methods: {
    HSLToHex
  }
}
</script>

<template>
  <div class="my-4">
    <div v-for="swatches in swatchesGrouped" class="flex">
      <div v-for="swatch in swatches" class="flex-1 py-4" :style="{background: HSLToHex(swatch.hue, swatch.saturation, swatch.lightness)}">
        &nbsp;
      </div>
    </div>
  </div>
</template>
