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
    default: "",
  },
  showPaginating: {
    type: Boolean,
    required: false,
    default: false,
  },
  showNavigation: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <Carousel
    v-if="slider && slider.length > 0"
    class="consultation-carousel"
    :items-to-show="1"
    :transition="500"
    :autoplay="2000"
    :wrapAround="false"
    :pauseAutoplayOnHover="true"
    napAlign="center"
  >
    <Slide class="" v-for="slide in slider" :key="slide.id">
      <div
        class="w-full my-auto px-7 md:px-10 py-10"
        :class="[carouselItemsClass]"
      >
        <div
          class="bg-white rounded-[10px] shadow-[0px_10px_19px_rgba(0,0,0,0.25)] relative"
        >
          <div class="absolute w-12 h-12 -top-6 left-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
            >
              <circle cx="24" cy="24" r="24" fill="#D9D9D9" />
              <path
                d="M33.62 16V18.94C32.22 19.1267 31.2167 19.6167 30.61 20.41C30.05 21.2033 29.77 22.58 29.77 24.54H33.55V31.89H25.78V25.8C25.78 22.6267 26.3633 20.2 27.53 18.52C28.7433 16.84 30.7733 16 33.62 16ZM22.84 16V18.94C21.44 19.1267 20.4367 19.6167 19.83 20.41C19.27 21.2033 18.99 22.58 18.99 24.54H22.7V31.89H15V25.8C15 22.6267 15.5833 20.2 16.75 18.52C17.9633 16.84 19.9933 16 22.84 16Z"
                fill="#EC1F27"
              />
            </svg>
          </div>

          <div
            class="contentDiv px-6 md:px-10 py-10 md:py-12 flex flex-col space-y-5"
          >
            <div class="text-left text-xl" v-html="slide.description"></div>

            <div class="reviewerInfo flex space-x-4">
              <div
                class="md:h-[64px] h-[48px] md:w-[64px] w-[48px] rounded-[64px] border border-black shadow-[0px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden"
              >
                <img
                  v-if="slide.user.image"
                  :src="slide.user.image"
                  class="md:h-[64px] h-[48px] md:w-[64px] w-[48px]"
                  alt="reviewer image"
                  srcset=""
                />
                <div v-else>
                  <ClientOnly>
                    <fa
                      class="md:h-[64px] h-[48px] md:w-[64px] w-[48px]"
                      :icon="['fa-solid', 'user']"
                  /></ClientOnly>
                </div>
              </div>
              <div class="flex flex-col space-y-1.5">
                <div class="text-left text-xl md:text-3xl">
                  {{ slide.user.name }}
                </div>
                <div class="text-left md:text-lg">
                  {{ slide.user.occupations }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation v-if="showNavigation" />
      <Pagination v-if="showPaginating" />
    </template>
  </Carousel>
  <NoPageFound v-else minHeight="200" />
</template>
