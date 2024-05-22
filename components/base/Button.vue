<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Title",
  },
  styles: {
    type: Object,
    default: {
      backgroundColor: "rgba(0, 0, 0, 1)",
      color: "rgba(255, 255, 255, 1)",
    },
  },
});
</script>
<template>
  <button
    type="button"
    data-te-ripple-init
    data-te-ripple-color="light"
    class="rounded-100px w-[156px] md:w-[180px] 2dx:w-[220px] h-[40px] 2dx:h-[50px] flex justify-center items-center 2dx:text-xl font-bold leading-normal transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
    :style="props.styles"
  >
    {{ props.title }}
  </button>
</template>
