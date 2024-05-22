<script setup>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  slider: {
    type: Array,
    required: true,
  },
  carouselItemsClass: {
    type: String,
    required: false,
    default:
      "h-[230px] xs:h-[300px] sm:h-[340px] md:h-[450px] xl:h-[500px] 2dx:h-[600px]",
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
  <Carousel v-if="props.slider && props.slider.length > 0">
    <Slide class="" v-for="slide in slider" :key="slide.id">
      <div class="relative w-full gradient-wrapper" :class="carouselItemsClass">
        <img
          v-if="slide.type === 'image'"
          class="object-cover object-top w-full md:max-w-[916px] h-full md:h-[610px]"
          width="100%"
          :src="slide.media_link"
          :alt="slide.title"
        />
        <iframe
          v-else-if="slide.type === 'video'"
          class="w-full h-full object-cover"
          :src="slide.media_link"
        >
        </iframe>
        <div
          v-if="slide.type === 'image'"
          class="z-10 text-3xl w-full h-full absolute top-0 left-0 right-0 mx-auto text-white flex flex-col justify-between items-center p-5 sm:p-8 md:py-10"
        >
          <div class="space-y-4 break-word">
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
            class="border-2 border-red-500 rounded-full text-base md:text-lg font-bold p-2 md:px-5 w-[160px] whitespace-nowrap"
            :style="props.styles"
          >
            {{ $t("view_course_btn") }}
          </NuxtLink>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
  <NoPageFound v-else minHeight="400" />
</template>
<style scoped>
.gradient-wrapper:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
}
/* .word-break {
  word-break: break-word;
} */
</style>
