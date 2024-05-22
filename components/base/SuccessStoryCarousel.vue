<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  slider: {
    type: Array,
    required: true,
  },
});

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
  modelValue: props.slider.length === 3 ? 1 : 0,
  autoplay: 5000,
  wrapAround: true,
};
const breakpoints = {
  630: {
    itemsToShow: 2,
    snapAlign: "center",
  },
  960: {
    itemsToShow:
      props.slider.length <= 2 ? 1 : props.slider.length >= 3 ? 3 : "",
    snapAlign: "center",
  },
  // 1280: {
  //   itemsToShow:
  //     props.slider.length === 4 || props.slider.length > 4
  //       ? 4
  //       : props.slider.length,
  //   snapAlign: "center",
  // },
};
</script>

<template>
  <Carousel
    v-if="props.slider && props.slider.length > 0"
    v-bind="settings"
    :breakpoints="breakpoints"
  >
    <Slide v-for="item in props.slider" :key="item.id">
      <div>
        <div class="carousel__item w-full max-h-[300px] mb-4">
          <img
            v-if="item.type === 'image'"
            class="object-cover object-top w-[305px] h-[200px]"
            :src="item.media_url"
            alt="Fiverr Outsourcing Institute slider image"
          />
          <iframe
            v-else-if="item.type === 'video'"
            class="w-full h-full px-2"
            :src="item.media_url"
          ></iframe>
        </div>
        <p
          v-if="item.title"
          class="text-2xl font-semibold"
          :class="item.title.length > 20 ? 'has-tooltip' : ''"
        >
          {{ item.title.slice(0, 20)
          }}<span v-if="item.title.length > 20">...</span>
          <span class="tooltip line-clamp-3">{{ item.title }}</span>
        </p>
      </div>
    </Slide>

    <template #addons>
      <div class="mt-7">
        <Navigation />
      </div>
    </template>
  </Carousel>
  <NoPageFound v-else minHeight="220" />
</template>

<style scoped>
.has-tooltip {
  @apply relative;
}
.tooltip {
  @apply absolute bg-primary-red text-white z-[100] left-8 -top-[56px] lg:-top-24 text-left invisible p-1.5 px-4 rounded-xl  shadow-lg w-full min-w-[340px] whitespace-normal break-words;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
</style>
