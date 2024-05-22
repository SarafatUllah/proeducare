<script setup>
defineProps({
  ourValue: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="w-full xl:col-span-1 col-span-2 flex flex-col space-y-[30px] md:py-[51px] md:px-[30px] py-[20px] px-4 lg:bg-transparent lg:shadow-none rounded-[21px] bg-white shadow-[0_-12px_52.694px_0_rgba(0,0,0,0.10)] xl:hover:rounded-[21px] xl:hover:bg-white xl:hover:shadow-[0_-12px_52.694px_0_rgba(0,0,0,0.10)]"
  >
    <div
      class="flex justify-center items-center w-[63px] h-[63px] bg-opacity-15 rounded-full"
      :class="ourValue.background"
    >
      <img
        class="w-[25px] h-[25px]"
        :src="ourValue.image"
        :alt="ourValue.title"
      />
    </div>
    <div>
      <h3 class="md:h_tag_secondary h_tag_third md:whitespace-nowrap">
        {{ ourValue.title }}
      </h3>
      <p class="md:p_tag_secondary p_tag_third mt-[11px]">
        {{ ourValue.description }}
      </p>
    </div>
  </div>
</template>
