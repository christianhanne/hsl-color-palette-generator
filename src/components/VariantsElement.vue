<script>
export default {
  props: {
    mode: {
      type: String,
      default: ''
    },
    variants: {
      type: Array,
      default: []
    }
  },
  emits: ['addLower', 'addHigher'],
  data() {
    return {
      percentage: 10,
      percentages: [5, 10, 15, 20, 25]
    }
  },
  computed: {
    modeLabel() {
      return this.mode.charAt(0).toUpperCase() + this.mode.slice(1);
    }
  },
  methods: {
    addLowerVariant() {
      let newVariant = +Math.min(...this.variants) - +this.percentage;
      if (newVariant >= 0) {
        this.$emit('addLower', newVariant);
      }
    },
    addHigherVariant() {
      let newVariant = +Math.max(...this.variants) + +this.percentage;
      if (newVariant <= 100) {
        this.$emit('addHigher', newVariant);
      }
    },
  }
}
</script>

<template>
  <div>
    <label class="block font-medium mb-1 text-sm">Variants:</label>
    <div class="flex">
      <button @click="addHigherVariant()">
        +
      </button>
      <button @click="addLowerVariant()">
        -
      </button>
      <select v-model="percentage">
        <option v-for="percentage in percentages" :value="percentage">
          %{{ percentage }} {{ modeLabel }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
button {
  @apply bg-gray-400 font-medium inline-block leading-none mr-1 px-2 py-0 text-base text-white transition w-10 focus:bg-gray-600 focus:outline-none focus:ring-0 hover:bg-gray-600;
}

select {
  @apply bg-white block border border-gray-200 border-solid m-0 px-2 py-1.5 text-base text-gray-600 transition w-full focus:border-gray-600 focus:outline-none focus:text-gray-800;
}
</style>
