<script setup>
import { Carousel, Slide, Navigation } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  slider: {
    type: Array,
    required: true,
  },
});

const localePath = useLocalePath();

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
    <Slide v-for="slider in props.slider" :key="slider.id">
      <NuxtLink :to="localePath(`/courses/${slider.slug}`)">
        <div class="carousel__item w-full max-h-[300px] mb-4">
          <iframe
            v-if="slider.video"
            class="w-full h-full px-2"
            :src="slider.video"
          ></iframe>
          <img
            v-else-if="slider.banner_url && slider.banner_url !== 'null'"
            class="object-cover object-top w-[305px] h-[200px]"
            width="100%"
            :src="slider.banner_url"
            :alt="slider.title"
          />
          <img
            v-else
            class="object-cover object-top w-[305px] h-[200px]"
            width="100%"
            src="/images/course-details/courseIcon.png"
            :alt="slider.title"
          />
        </div>
        <p
          v-if="slider.title"
          class="text-2xl font-semibold"
          :class="slider.title.length > 20 ? 'has-tooltip' : ''"
        >
          {{ slider.title.slice(0, 20) }}
          <span v-if="slider.title.length > 20">...</span>
          <span class="tooltip">{{ slider.title }}</span>
        </p>
      </NuxtLink>
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
  @apply absolute bg-primary-red text-white z-[100] left-8 -top-[56px] lg:-top-24 text-left invisible p-1.5 px-4 rounded-xl  shadow-lg w-full min-w-[320px] whitespace-normal break-words;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
</style>
