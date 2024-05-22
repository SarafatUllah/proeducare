<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

defineProps({
  slider: {
    type: Array,
    required: true,
  },
  carouselItemsClass: {
    type: String,
    required: false,
    default: "h-[300px] md:h-full",
  },
  headingClass: {
    type: String,
    required: false,
    default: "text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-6xl",
  },
  subHeadingClass: {
    type: String,
    required: false,
    default: "text-base sm:text-xl lg:text-2xl",
  },
});
</script>

<template>
  <Carousel v-if="slider && slider.length > 0">
    <Slide class="rounded-[20px]" v-for="slide in slider" :key="slide.id">
      <div
        class="relative w-full rounded-[20px] overflow-hidden"
        :class="carouselItemsClass"
      >
        <NuxtLink :to="slide.url">
          <img
            v-if="slide.type === 'image'"
            class="w-full h-full md:h-[595px] rounded-[20px]"
            width="100%"
            :src="slide.media_link"
            :alt="slide.title"
        /></NuxtLink>
        <iframe
          v-if="slide.type === 'video'"
          class="w-full h-full"
          :src="slide.media_link"
        >
        </iframe>
        <div
          v-if="slide.type === 'image'"
          class="hidden text-3xl w-full h-full absolute top-0 left-0 right-0 mx-auto text-white flex flex-col justify-between items-center p-5 sm:p-8 md:py-10 xl:py-20"
        >
          <div class="space-y-4">
            <p class="font-semibold" :class="headingClass">
              {{ slide.title }}
            </p>
            <p :class="subHeadingClass">{{ slide.sub_title }}</p>
          </div>
          <NuxtLink
            :to="slide.url"
            v-if="slide.url"
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            class="border-2 border-red-500 rounded-full text-base md:text-lg font-bold p-2 md:p-5 w-[160px] whitespace-nowrap"
            :style="styles"
          >
            See more
          </NuxtLink>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  <NoPageFound v-else minHeight="400" />
</template>
