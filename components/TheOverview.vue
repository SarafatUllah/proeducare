<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
const breakpoints = useBreakpoints(breakpointsTailwind);
const isDesktop = breakpoints.greaterOrEqual("md");
defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  scoureColor: {
    type: String,
    default: "text-white",
  },
  titleColor: {
    type: String,
    default: "text-white",
  },
  lineColor: {
    type: String,
    default: "bg-white",
  },
});
</script>
<template>
  <ClientOnly>
    <div
      class="md:w-auto w-1/2 flex flex-row md:justify-start justify-center min-[1400px]:space-x-[90px] lg:space-x-[60px] md:space-x-[22px] space-x-3 md:text-left text-center"
      :class="[
        (index === 3 || index === 1) && !isDesktop ? 'pl-3' : '',
        (index === 3 || index === 2) && !isDesktop ? 'mt-10' : '',
      ]"
    >
      <div class="flex flex-col space-y-2 md:flex-grow-0 flex-grow">
        <p
          class="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold"
          :class="scoureColor"
        >
          {{ item.value }}
        </p>
        <p class="text-xl md:text-2xl lg:text-3xl xl:text-4xl md:whitespace-nowrap" :class="titleColor">
          {{ item.name }}
        </p>
      </div>
      <div
        v-if="index !== 2 && isDesktop"
        class="w-[1px] md:h-[70px] my-auto h-[50px] py-2"
        :class="lineColor"
      ></div>
      <div
        v-if="index !== 3 && index !== 1 && !isDesktop"
        class="w-[1px] md:h-[70px] my-auto h-[50px] py-2"
        :class="lineColor"
      ></div>
    </div>
  </ClientOnly>
</template>
