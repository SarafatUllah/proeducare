<script setup lang="ts">
const { apiBaseUrl } = useUrls();
const route = useRoute();
const localePath = useLocalePath();
const { playVideos } = usePlayVideos();

const isLoading = ref(true);
const perPageCourses = ref(10);
const demoClasses = ref<any[]>([]);
const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const totalCourses = ref<number>(1);

const { data } = await useFetch<any>(
  `${apiBaseUrl}/demo-videos?per_page=${perPageCourses.value}`
);
if (data.value) {
  demoClasses.value = data.value?.data;
  currentPage.value = data.value?.meta?.current_page;
  totalPages.value = data.value?.meta?.last_page;
  totalCourses.value = data.value?.meta?.total;
}

const goToPrevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    navigateTo(localePath(`/demo-class?page=${currentPage.value}`));
  }
};
const goToNextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    navigateTo(localePath(`/demo-class?page=${currentPage.value}`));
  }
};
const goToPage = async (page: number) => {
  if (currentPage.value !== page) {
    navigateTo(localePath(`/demo-class?page=${page}`));
  }
};
const isCurrentPage = (page: number) => {
  return currentPage.value === page;
};
const isPrevBtnDisabled = computed(() => {
  return currentPage.value <= 1;
});
const isNextBtnDisabled = computed(() => {
  return currentPage.value >= totalPages.value;
});

watch(
  () => route.query,
  async () => {
    isLoading.value = true;
    const { data } = await useFetch<any>(
      `${apiBaseUrl}/demo-videos?page=${route.query.page}`
    );
    if (data.value) {
      demoClasses.value = data.value?.data;
      currentPage.value = data.value?.meta?.current_page;
      totalPages.value = data.value?.meta?.last_page;
      totalCourses.value = data.value?.meta?.total;
    }
  },
  { deep: true }
);
onMounted(() => {
  isLoading.value = false;
  playVideos();
});
</script>

<template>
  <main
    class="custom-container pt-8 md:pt-12 xl:pt-20 pb-20 text-center md:text-left"
  >
    <h1
      class="text-[#EC1F27] text-[32px] md:text-[40px] xl:text-6xl font-bold pb-10 md:pb-12 xl:pb-20"
    >
      {{ $t("demo_class") }}
    </h1>
    <div class="space-y-10 md:space-y-12 xl:space-y-20">
      <template v-if="demoClasses && demoClasses.length > 0">
        <div v-for="(content, index) in demoClasses" :key="index">
          <h1 class="text-[#EC1F27] text-3xl font-bold pb-2">
            {{ content.title }}
          </h1>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-5 mt-5"
          >
            <template
              v-if="content.demoVideos && content.demoVideos.length > 0"
            >
              <div
                class="w-full"
                v-for="video in content.demoVideos"
                :key="video.id"
              >
                <iframe
                  v-if="
                    video.video_url &&
                    video.video_url.startsWith('https://www.youtube.com')
                  "
                  class="w-full"
                  height="286px"
                  :src="video.video_url"
                >
                </iframe>
                <video
                  :poster="video.cover_image"
                  v-if="
                    video.video_url &&
                    video.video_url.startsWith('https://cdn.fiverroutsourcinginstitute.com')
                  "
                  class="w-full"
                  style="height: 286px; width: 100%; object-fit: cover"
                  height="286px"
                  controls
                >
                  <source :src="video.video_url" />
                </video>
                <IconsNoData
                  v-else
                  class="col-span-1 md:col-span-2 lg:col-span-3 text-center mx-auto"
                  minHeight="220"
                />
              </div>
            </template>
            <NoPageFound
              v-else
              class="col-span-1 md:col-span-2 lg:col-span-3 text-center"
              minHeight="220"
            />
          </div>
          <div class="flex justify-end md:justify-start w-full pt-2"></div>
        </div>
      </template>
      <NoPageFound v-else minHeight="220" />
    </div>
    <!-- Pagination  -->
    <div
      v-if="totalCourses > perPageCourses && demoClasses.length > 0"
      class="flex justify-center items-center space-x-5 mt-20"
    >
      <button
        @click="goToPrevPage"
        :disabled="isPrevBtnDisabled"
        class="pagination-btn inactive-btn"
        :class="{ 'opacity-50': isPrevBtnDisabled }"
      >
        <IconsCaretDown class="w-6 rotate-90" />
      </button>
      <button
        v-for="(page, index) in totalPages"
        :key="index"
        @click="goToPage(page)"
        class="pagination-btn"
        :class="{
          'active-btn': isCurrentPage(page),
          'inactive-btn': !isCurrentPage(page),
        }"
      >
        <span>{{ page }}</span>
      </button>
      <button
        @click="goToNextPage"
        :disabled="isNextBtnDisabled"
        class="pagination-btn inactive-btn"
        :class="{ 'opacity-50': isNextBtnDisabled }"
      >
        <IconsCaretDown class="w-6 -rotate-90" />
      </button>
    </div>
  </main>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0px -4px 4px 0px #00000040;
}

.provider-card-top-shadow {
  box-shadow: 0px -4px 4px 0px #00000040, 0px 4px 4px 0px #00000040;
}
</style>
