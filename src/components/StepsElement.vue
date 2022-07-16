<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <div>
    <label class="block font-medium mb-1 text-sm">Steps:</label>
    <input type="number" step="1" min="1" max="16" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<style scoped>
input[type="number"] {
  @apply appearance-none bg-white block border border-gray-200 border-solid text-gray-600 m-0 pl-2 py-1 text-base transition w-full focus:border-gray-600 focus:outline-none focus:text-gray-800;
}
</style>
