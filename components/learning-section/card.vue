<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="w-full lg:max-w-[478px] min-h-[478px] pb-[66px] flex flex-col items-center justify-between rounded-md bg-white shadow-[0_4.226px_8.453px_0_rgba(49,49,49,0.10)] group">
    <img v-if="label === 'Online'" class="mt-[10px]" src="/images/homepage/learning-section/online-learning.svg" alt="Online Card Image'" />
    <img v-else class="mt-[90px]" src="/images/homepage/learning-section/onsite-learning.svg" alt="On-Site Card Image" />
    <p class="p_tag_fourth !text-2xl !font-bold group-hover:text-[#FF6E1F]">{{ label }}</p>
  </div>
</template>
