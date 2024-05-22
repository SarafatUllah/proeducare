import { defineStore } from "pinia";

export const useBlogsStore = defineStore("blogs", () => {
  // state
  const { BLOGS } = useUrls();
  const { $toast } = useNuxtApp();
  const latestBlogs = ref([]);
  const perPageBlogs = ref(2);
  const isLatestBlogsLoading = ref(false);

  // actions
  const fetchLatestBlogs = async () => {
    try {
      isLatestBlogsLoading.value = true;
      const res = await $fetch<any>(`${BLOGS}?per_page=${perPageBlogs.value}`);
      latestBlogs.value = res.data;
      isLatestBlogsLoading.value = false;
    } catch (error: any) {
      if (process.client) {
        $toast("clear");
        $toast("error", {
          message: error?.response?._data?.message,
          className: "toasted-bg-alert",
        });
      }
      isLatestBlogsLoading.value = false;
    } finally {
      isLatestBlogsLoading.value = false;
    }
  };
  return {
    fetchLatestBlogs,
    latestBlogs,
    isLatestBlogsLoading,
  };
});
