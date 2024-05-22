<script setup>
import { storeToRefs } from "pinia";
import { useTheVideoStore } from "~/stores/theVideo";

const { mediaUrl } = storeToRefs(useTheVideoStore());
const { setMediaUrl } = useTheVideoStore();
</script>

<template>
  <div
    v-if="JSON.stringify(mediaUrl) !== '{}'"
    class="bg-black bg-opacity-30 flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-[9999]"
    @click.stop="setMediaUrl({})"
  >
    <div class="absolute top-4 right-4" @click.stop="setMediaUrl({})">
      <ClientOnly>
        <fa
          class="w-5 h-5 cursor-pointer text-white"
          :icon="['fas', 'times']"
        />
      </ClientOnly>
    </div>
    <!-- max-h-[700px] w-full h-full -->
    <div
      class="custom-container !w-full !max-w-[1640px] xl:!p-[200px] md:p-[24px] rounded-[32px] flex justify-center items-center overflow-hidden lg:px-[60px] px-0"
    >
      <!-- class="w-full max-h-[700px] aspect-video rounded-[32px]" -->
      <iframe
        v-if="mediaUrl.type === 'video'"
        class="w-full aspect-video rounded-[32px]"
        :src="`${mediaUrl.media_url}`"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        @click.stop=""
      ></iframe>
      <img
        v-else-if="mediaUrl.type === 'image'"
        :src="mediaUrl.media_url"
        :alt="mediaUrl.title"
        @click.stop=""
      />
    </div>
  </div>
</template>
