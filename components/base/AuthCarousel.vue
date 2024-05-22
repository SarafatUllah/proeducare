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
    default: "w-full h-full",
  },
  showPaginating: {
    type: Boolean,
    required: false,
    default: true,
  },
  showNavigation: {
    type: Boolean,
    required: false,
    default: false,
  },
  imageClass: {
    type: String,
    required: false,
    default: "object-fill w-full aspect-[616/816]",
  },
});
</script>

<template>
  <Carousel
    v-if="slider && slider.length > 0"
    class="auth-carousel"
    :items-to-show="1"
    :transition="500"
    :autoplay="2000"
    :wrapAround="false"
    :pauseAutoplayOnHover="true"
    napAlign="center"
  >
    <Slide class="" v-for="slide in slider" :key="slide.id">
      <div class="w-full my-auto" :class="[carouselItemsClass]">
        <img
          v-if="slide.type === 'image'"
          class="rounded-3xl"
          :class="[imageClass]"
          :src="slide.media_link || slide.media_url"
          :alt="slide.title"
        />
        <iframe
          v-else-if="slide.type === 'video'"
          class="w-full aspect-video"
          :src="slide.media_link || slide.media_url"
        >
        </iframe>
      </div>
    </Slide>

    <template #addons>
      <Navigation v-if="showNavigation" />
      <Pagination v-if="showPaginating" />
    </template>
  </Carousel>
  <NoPageFound v-else minHeight="200" />
</template>
