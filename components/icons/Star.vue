<script setup>
const props = defineProps({
  rating: {
    type: String,
    default: "empty",
  },
});
</script>

<template>
  <svg
    class="svg-icon"
    style="
      width: 1em;
      height: 1em;
      vertical-align: middle;
      fill: currentColor;
      overflow: hidden;
    "
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1024.7 396.8l-353.6-51.4L513 24.8v807.6l316.3 166.4-60.5-352.4z"
      :fill="rating === 'full' ? '#FF9529' : '#D9D9D9'"
    />
    <path
      d="M513 832.4V24.8L354.6 345.4 0.8 396.8l255.9 249.6-60.3 352.4z"
      :fill="rating === 'full' || rating === 'half' ? '#FF9529' : '#D9D9D9'"
    />
  </svg>
</template>

<style scoped></style>
