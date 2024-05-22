import { defineStore, Store } from "pinia";
import { SuccessVideos } from "~/types/testimonial";

export const useTheVideoStore = defineStore("theVideo", () => {
  // state
  const mediaUrlRef = ref<SuccessVideos>({});

  // computed
  const mediaUrl = computed(() => mediaUrlRef.value);

  // actions
  const setMediaUrl = (payload: SuccessVideos) => {
    mediaUrlRef.value = payload;
  };
  return {
    mediaUrl,
    setMediaUrl,
  };
});
