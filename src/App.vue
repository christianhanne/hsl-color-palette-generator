<script>
import {hexToHSL, HSLToHex} from './helpers/colors';

import ColorPicker from './components/ColorPicker.vue';
import DownloadCSV from './components/DownloadCSV.vue';
import DownloadSVG from './components/DownloadSVG.vue';
import ModeSelect from './components/ModeSelect.vue';
import StepsElement from './components/StepsElement.vue';
import Swatches from './components/Swatches.vue';
import VariantsElement from './components/VariantsElement.vue';

export default {
  components: {
    ColorPicker,
    DownloadCSV,
    DownloadSVG,
    ModeSelect,
    StepsElement,
    Swatches,
    VariantsElement
  },
  data() {
    return {
      baseColor: HSLToHex(Math.random() * 360, Math.random() * 100, Math.random() * 100),
      steps: 8,
      mode: "lightness",
      variants: [],
      swatches: []
    };
  },
  computed: {
    baseColorHSL() {
      return hexToHSL(this.baseColor);
    },
    swatchesGrouped() {
      let swatchesGrouped = [];
      let hueDiff = 360 / this.steps;

      for (let variant of this.variants) {
        let swatches = [];
        for (let i = 0; i < this.steps; i++) {
          let swatchHue = this.baseColorHSL.hue + i * hueDiff;
          if (swatchHue > 360) {
            swatchHue -= 360;
          }
          swatches.push({
            hue: swatchHue,
            saturation: this.mode === "saturation" ? variant : this.baseColorHSL.saturation,
            lightness: this.mode === "lightness" ? variant : this.baseColorHSL.lightness,
          });
        }

        swatches.sort((a, b) => a.hue > b.hue ? 1 : -1);
        swatchesGrouped.push(swatches);
      }

      return swatchesGrouped;
    }
  },
  watch: {
    baseColor(newBaseColor, oldBaseColor) {
      this.resetVariants();
    },
    mode(newMode, oldMode) {
      this.resetVariants();
    }
  },
  created: function() {
    this.resetVariants();
  },
  methods: {
    resetVariants() {
      this.variants = [];
      this.variants.push(this.baseColorHSL[this.mode]);
    },
  }
}
</script>

<template>
  <div class="container mx-auto px-4">
    <h1 class="font-medium py-4 text-center text-xl">
      HSL Color Palette Generator
    </h1>
    <div class="gap-2 grid sm:grid-cols-2 md:grid-cols-4">
      <ColorPicker v-model="baseColor" />
      <StepsElement v-model="steps" />
      <ModeSelect v-model="mode" />
      <VariantsElement
        :mode="mode"
        :variants="variants"
        @add-lower="(value) => variants.unshift(value)"
        @add-higher="(value) => variants.push(value)"
      />
    </div>
    <Swatches :swatches-grouped="swatchesGrouped" />
    <div class="flex justify-center">
      <DownloadCSV :swatches-grouped="swatchesGrouped" :mode="mode" />
      <DownloadSVG :swatches-grouped="swatchesGrouped" />
    </div>
  </div>
</template>
