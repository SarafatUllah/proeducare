<script setup>
defineProps({
  feature: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="col-span-1 p-[20.3px] min-h-[191px] flex flex-col space-y-5 rounded-md bg-white shadow-[0_4.226px_8.453px_0_rgba(49,49,49,0.10)]"
  >
    <img
      class="w-[33.81px] h-[33.81px]"
      :class="feature.title === 'Expert Instructors' ? 'w-[43.81px] h-[33.81px]' : ''"
      :src="feature.image"
      :alt="`${feature.title} image`"
    />
    <div>
      <h3 class="h_tag_third">{{ feature.title }}</h3>
      <p class="p_tag_third mt-[6.7px]">{{ feature.description }}</p>
    </div>
  </div>
</template>
