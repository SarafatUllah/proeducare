<script setup>
defineProps({
  color: {
    type: String,
    default: "#ffffff",
  },
  showPayment: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <svg
    width="595"
    height="2"
    viewBox="0 0 595 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="dotted_box"
    :class="showPayment ? '' : 'active'"
  >
    <path
      d="M1 1H594"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-dasharray="5 5"
    />
  </svg>
</template>

<style scoped>
.dotted_box {
  transition: all 1s ease-in-out;
  background: linear-gradient(to left, #e3e3e3 50%, #ff6e1f 50%);
  background-size: 200%, 100%;
  background-position: left;
}
.dotted_box.active {
  background-position: right;
}
</style>
