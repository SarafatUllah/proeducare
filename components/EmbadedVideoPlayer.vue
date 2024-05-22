<script setup>
import { useElementVisibility } from "@vueuse/core";
import defaultThumb from "~/assets/img/default/video-thumbnail.webp";

const props = defineProps({
  playerId: {
    type: String,
    default: "playerId",
  },
  videoUrl: {
    type: String,
    default: "",
  },
  coverImage: {
    type: String,
    default: "",
  },
  videoTitle: {
    type: String,
    default: "Video Title",
  },
  videoClass: {
    type: String,
    default: "w-full aspect-video rounded-[32px]",
  },
  playBtnClass: {
    type: String,
    default: "w-10 sm:w-16 lg:w-20 xl:w-[106px]",
  },
});

const emit = defineEmits(["stopVideo"]);

const videoIsPlaying = ref(false);
const targetPlayer = ref(null);
const targetIsVisible = useElementVisibility(targetPlayer);

const playVideo = () => {
  videoIsPlaying.value = true;
  emit("stopVideo", videoIsPlaying.value);
};

watch(targetIsVisible, (newValue) => {
  if (!newValue) {
    videoIsPlaying.value = false;
  }
});
</script>

<template>
  <div
    :id="playerId"
    ref="targetPlayer"
    class="bg-[#15151F]"
    :class="videoClass"
  >
    <Transition name="page" mode="out-in">
      <div
        v-if="!videoIsPlaying"
        class="w-full h-full relative coverImage"
        :class="videoClass"
        :style="{
          '--coverImage': coverImage
            ? `url(${coverImage})`
            : `url(${defaultThumb})`,
        }"
      >
        <!-- <img
          class="z-[4]"
          :class="videoClass"
          :src="coverImage ? coverImage : defaultThumb"
          :alt="videoTitle"
        /> -->
        <div
          class="absolute inset-0 m-auto z-[5] flex justify-center items-center"
        >
          <IconsPlayBtn
            @click="playVideo"
            class="aspect-square cursor-pointer rounded-full"
            :class="playBtnClass"
          />
        </div>
      </div>
      <iframe
        v-else
        :class="videoClass"
        :src="`${videoUrl}?rel=0&autoplay=1&showinfo=0`"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </Transition>
  </div>
</template>

<style scoped>
.coverImage {
  background-image: var(--coverImage);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
