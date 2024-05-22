<script setup>
const props = defineProps({
  rating: {
    type: Number,
    default: 0,
  },
});
const { rating } = toRefs(props);

const full = computed(() => Math.floor(rating.value));
const hasHalf = computed(() => rating.value - full.value >= 0.5);

const getRatingClass = (index) => {
  if (index < full.value) {
    return "full";
  } else if (index === full.value && hasHalf.value) {
    return "half";
  } else {
    return "empty";
  }
};
</script>

<template>
  <div class="flex items-center justify-center space-x-2">
    <IconsStar
      v-for="(item, index) in 5"
      :key="index"
      :rating="getRatingClass(index)"
    />
  </div>
</template>

<style lang="scss" scoped></style>
