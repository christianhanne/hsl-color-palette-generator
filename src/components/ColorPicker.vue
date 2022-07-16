<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <div>
    <label class="block font-medium mb-1 text-sm">Base Color:</label>
    <input type="color" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
  </div>
</template>

<style scoped>
input[type="color"] {
  @apply appearance-none bg-white block border border-gray-200 border-solid h-9 m-0 px-0.5 py-0 transition w-full focus:border-gray-600 focus:outline-none;
}
</style>