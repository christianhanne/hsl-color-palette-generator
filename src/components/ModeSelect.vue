<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<template>
  <div>
    <label class="block font-medium mb-1 text-sm">Variable:</label>
    <select :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
      <option value="lightness">Lightness</option>
      <option value="saturation">Saturation</option>
    </select>
  </div>
</template>

<style scoped>
select {
  @apply bg-white block border border-gray-200 border-solid m-0 px-2 py-1.5 text-base text-gray-600 transition w-full focus:border-gray-600 focus:outline-none focus:text-gray-800;
}
</style>