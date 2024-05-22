<script setup>
const props = defineProps({
  minHeight: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="w-full flex flex-col justify-center items-center"
    :style="{ 'min-height': minHeight + 'px' }"
  >
    <IconsNoData />
    <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
  </div>
</template>
