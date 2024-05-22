<script setup>
const {
  PAGE_OVERVIEW_SECTION,
  SUCCESS_STORY_STUDENTS,
  SUCCESS_STUDENT_VIDEOS,
  COURSES,
  GET_ALL_DISTRICTS,
  apiBaseUrl,
} = useUrls();

const nuxtApp = useNuxtApp();
const { isSmaller, isLargerOrEqual, isBetween } = useBreakpoints();

const { data: pageOverViewRes } = useFetch(
  `${PAGE_OVERVIEW_SECTION}/success-story`
);
const pageOverView = computed(() => pageOverViewRes.value?.data);

const videoCurrentPage = ref(1);
const videoTotalPages = ref(1);
const currentSuccessStudentVideos = ref([]);

const videoPerPages = computed(() => {
  if (isLargerOrEqual(1920)) {
    return 3;
  } else if (isBetween(768, 1919)) {
    return 2;
  } else if (isSmaller(768)) {
    return 2;
  }
});

const getVideos = async () => {
  const { data, pending, error } = await useFetch(
    `${SUCCESS_STUDENT_VIDEOS}?per_page=${videoPerPages.value}&page=${videoCurrentPage.value}`
  );
  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        currentSuccessStudentVideos.value.push(...data.value.data);
        videoTotalPages.value = data.value.meta.last_page;
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value.data.message.code,
          className: "toasted-bg-success",
        });
      }
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};
onMounted(() => {
  setTimeout(() => {
    getVideos();
  }, 500);
  window.scrollTo(0, 0);
});

const loadMoreVideos = () => {
  if (isLastPage.value) {
    currentSuccessStudentVideos.value = [];
    videoCurrentPage.value = 1;
    getVideos();
  } else {
    videoCurrentPage.value++;
    getVideos();
  }
};
const isLastPage = computed(() => {
  return videoCurrentPage.value === videoTotalPages.value;
});

const { data: coursesRes } = useFetch(COURSES);
const courses = computed(() => coursesRes.value?.data);

const { data: popularCourseRes } = useFetch(
  `${apiBaseUrl}/most-popular-courses`
);
const popularCourse = computed(() => popularCourseRes.value?.data);

const isMobile = computed(() => isSmaller(768));

const closeMenu = () => {
  if (isMobile.value) {
    showDistricts.value = false;
  } else {
    showDistricts.value = true;
  }
};
watch(isMobile, (val) => {
  if (val) {
    showDistricts.value = false;
  } else {
    showDistricts.value = true;
  }
});

const perPage = ref(9);
const totalPages = ref(1);
const currentPage = ref(1);
const perPagePaginationButton = ref(6);

const showDistricts = ref(false);
const selectedDistrict = ref({});
const searchInput = ref(null);
const searchInputText = ref("");

const fetchStudentsByDistrict = async (districtId) => {
  try {
    const res = await $fetch(
      `${SUCCESS_STORY_STUDENTS}/${districtId}?per_page=${perPage.value}&page=${currentPage.value}`
    );
    currentDistrictStudents.value = res.data;
    totalPages.value = res.meta.last_page;
  } catch (error) {
    console.log(error);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
  }
};

const setSelectedDistrict = (district) => {
  selectedDistrict.value = district;
  currentPage.value = 1;
  fetchStudentsByDistrict(district.id !== undefined ? district.id : 'null');
};

const districts = ref([]);
const getAllDistrict = () => {
  const { data, pending, error } = useFetch(GET_ALL_DISTRICTS);

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        districts.value = data.value.data;
        setSelectedDistrict({});
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value.data.message.code,
          className: "toasted-bg-success",
        });
      }
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};
getAllDistrict();

const filteredDistricts = computed(() => {
  if (districts.value) {
    return districts.value.filter((district) =>
      district.name.toLowerCase().includes(searchInputText.value.toLowerCase())
    );
  }
});
const toggleDistricts = () => {
  if (!isMobile.value) {
    return;
  }
  showDistricts.value = !showDistricts.value;
  if (showDistricts.value) {
    setTimeout(() => {
      searchInput.value.focus();
    }, 100);
  } else {
    searchInputText.value = "";
  }
};
const formatDate = (fullDate) => {
  const time = new Date(fullDate).toLocaleString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
  const date = new Date(fullDate).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${time} . ${date}`;
};
const currentDistrictStudents = ref([]);

closeMenu();

// pagination
const goToPrevPage = () => {
  if (isPrevBtnDisabled.value) {
    return;
  }
  currentPage.value = currentPage.value - 1;
  fetchStudentsByDistrict(selectedDistrict.value.id);
};
const goToNextPage = () => {
  if (isNextBtnDisabled.value) {
    return;
  }
  currentPage.value = currentPage.value + 1;
  fetchStudentsByDistrict(selectedDistrict.value.id);
};
const gotToPage = (page) => {
  currentPage.value = page;
  fetchStudentsByDistrict(selectedDistrict.value.id);
};
const isCurrentPage = (page) => {
  return currentPage.value === page;
};

const isPrevBtnDisabled = computed(() => {
  return currentPage.value <= 1;
});
const isNextBtnDisabled = computed(() => {
  return currentPage.value >= totalPages.value;
});
const visiblePageNumbers = computed(() => {
  const startPage = Math.max(
    1,
    currentPage.value - Math.floor(perPagePaginationButton.value / 2)
  );
  const endPage = Math.min(
    totalPages.value,
    startPage + perPagePaginationButton.value - 1
  );

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
});
</script>

<template>
  <div class="pt-8 md:pt-16 lg:pt-20 pb-20 custom-container">
    <div class="space-y-5 md:space-y-20">
      <div v-if="pageOverView" class="text-center md:text-left">
        <h2
          class="text-primary-red font-bold text-[32px] md:text-[40px] xl:text-6xl pb-4"
        >
          {{ pageOverView.title }}
        </h2>
        <div
          class="w-full lg:w-[80%] text-justify text-base md:text-xl xl:text-2xl"
          v-html="pageOverView.content"
        ></div>
      </div>
      <NoPageFound v-else minHeight="400" />
      <div
        v-if="currentSuccessStudentVideos.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 3xl:grid-cols-3 gap-5"
      >
        <div
          class="w-full h-[225px] sm:h-[250px] md:h-[384px] dx:h-[520px]"
          v-for="(video, index) in currentSuccessStudentVideos"
          :key="video.id"
        >
          <iframe
            v-if="video.type === 'video'"
            class="w-full h-full object-cover"
            :src="video.media_url"
          >
          </iframe>
          <img
            v-if="video.type === 'image'"
            class="w-full h-full object-cover"
            :src="video.media_url"
          />
        </div>
      </div>
      <div v-if="videoTotalPages > 1" class="flex items-center justify-between !mt-5">
        <div></div>
        <button
          class="inline-block rounded-100px text-primary-red opacity-100 px-5 py-1 text-sm font-bold leading-normal transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] self-end border border-black"
          @click="loadMoreVideos"
        >
          {{ !isLastPage ? "View More" : "View Less" }}
        </button>
      </div>
    </div>
    <div class="py-16 md:py-20">
      <div class="md:w-1/2 md:mx-auto">
        <h3 class="sub-heading text-center">
          {{ $t("popular_courses_title") }}
        </h3>
        <p class="text-small pt-4 pb-10 text-center">
          {{ $t("popular_courses_text") }}
        </p>
      </div>
      <CourseDetails v-if="popularCourse" :courses="popularCourse" />
    </div>
    <div class="">
      <p
        class="pb-10 mx-auto text-2xl md:text-[28px] xl:text-3xl text-center text-primary-red font-bold max-w-[700px]"
      >
        {{ $t("success_student_text") }}
      </p>

      <div class="pt-5 pb-10 lg:pb-20">
        <div
          class="flex flex-col md:flex-row gap-2.5 md:gap-10 xl:gap-16 pt-4 md:pt-10 h-full min-h-[calc(100vh-200px)]"
        >
          <div class="relative min-w-[200px] w-[200px] pb-2">
            <div
              @click="toggleDistricts"
              class="z-[2] relative flex items-center justify-between px-4 w-full h-[50px] outline-none bg-primary-red text-white rounded-t-2xl cursor-pointer"
              :class="showDistricts ? 'rounded-b-0' : 'rounded-b-2xl'"
            >
              <span class="font-semibold">{{
                selectedDistrict?.name ? selectedDistrict.name : "Random Data"
              }}</span>
              <IconsChevronDown
                class="transition-all duration-500 ease-in-out w-5 text-white md:hidden"
                :class="showDistricts ? 'rotate-180' : 'rotate-0 '"
              />
            </div>
            <div
              v-if="showDistricts"
              @click="toggleDistricts"
              class="fixed top-0 right-0 left-0 bottom-0 z-[1] md:hidden"
            ></div>
            <div
              v-if="showDistricts"
              class="w-full h-[400px] md:h-[calc(100%-50px)] absolute top-12 left-0 z-[2] bg-white rounded-b-2xl shadow-md"
            >
              <input
                ref="searchInput"
                class="w-full h-[50px] outline-none border border-[#0000007e] px-4"
                type="text"
                placeholder="Search"
                v-model="searchInputText"
              />
              <div class="pb-4 bg-[#F1F1F1] rounded-b-2xl h-[calc(100%-50px)]">
                <div class="h-auto max-h-full overflow-y-auto">
                  <div
                    v-for="(district, index) in filteredDistricts"
                    :key="district.id"
                    class="py-[7px] px-4 cursor-pointer"
                    :class="
                      district.id === selectedDistrict.id ? 'bg-[#D9D9D9]' : ''
                    "
                    @click="setSelectedDistrict(district)"
                  >
                    <span class="pr-4 w-full">{{ district.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="currentDistrictStudents.length > 0"
            class="w-full h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 content-start gap-5"
          >
            <div
              v-for="(item, index) in currentDistrictStudents"
              :key="item.id"
              class="card-shadow h-auto p-5 text-lg flex flex-col gap-5 justify-between"
            >
              <div class="flex flex-col gap-5">
                <div class="flex items-center justify-start gap-4">
                  <img
                    v-if="item.avatar"
                    :src="item.avatar"
                    class="w-14 aspect-square rounded-full border border-black"
                    alt=""
                  />
                  <div
                    v-else
                    class="w-14 aspect-square rounded-full border border-black bg-gray-200"
                  ></div>
                  <h2 class="text-[30px] font-semibold line-clamp-1 break-all">
                    {{ item.name }}
                  </h2>
                </div>
                <h3>{{ item.subtitle }}</h3>
                <div v-html="item.bio"></div>
              </div>
              <p class="w-full text-right">{{ formatDate(item.created_at) }}</p>
            </div>
          </div>
          <NoPageFound v-else minHeight="420" />
        </div>
        <!-- Pagination  -->
        <div
          v-if="totalPages > 1 && currentDistrictStudents.length > 0"
          class="flex justify-center items-center gap-16 md:gap-3.5 xl:gap-5 pt-20"
        >
          <button
            @click="goToPrevPage"
            :disabled="isPrevBtnDisabled"
            class="pagination-btn"
            :class="{
              'opacity-50': isPrevBtnDisabled,
              'active-btn': isMobile,
              'inactive-btn': !isMobile,
            }"
          >
            <IconsChevronDown v-if="isMobile" class="w-6 rotate-90" />
            <IconsCaretDown v-else class="w-6 rotate-90" />
          </button>
          <template v-if="!isMobile">
            <button
              v-if="!isMobile"
              :disabled="isPrevBtnDisabled"
              @click="gotToPage(1)"
              class="pagination-btn inactive-btn"
              :class="{ 'opacity-50': isPrevBtnDisabled }"
            >
              <IconsAnglesRight class="w-4 md:w-6 rotate-180" />
            </button>
            <button
              v-for="(page, index) in visiblePageNumbers"
              :key="index"
              @click="gotToPage(page)"
              class="pagination-btn"
              :class="{
                'active-btn': isCurrentPage(page),
                'inactive-btn': !isCurrentPage(page),
              }"
            >
              <span>{{ page }}</span>
            </button>
            <button
              v-if="!isMobile"
              :disabled="isNextBtnDisabled"
              @click="gotToPage(totalPages)"
              class="pagination-btn inactive-btn"
              :class="{ 'opacity-50': isNextBtnDisabled }"
            >
              <IconsAnglesRight class="w-4 md:w-6 rotate-0" />
            </button>
          </template>
          <button
            @click="goToNextPage"
            :disabled="isNextBtnDisabled"
            class="pagination-btn"
            :class="{
              'opacity-50': isNextBtnDisabled,
              'active-btn': isMobile,
              'inactive-btn': !isMobile,
            }"
          >
            <IconsChevronDown v-if="isMobile" class="w-6 -rotate-90" />
            <IconsCaretDown v-else class="w-6 -rotate-90" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-shadow {
  border-radius: 10px;
  background: #fff;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25),
    -4px -4px 4px 0px rgba(0, 0, 0, 0.25);
}
.pagination-btn {
  @apply w-12 h-12 md:w-[60px] md:h-[60px] rounded-[10px] text-xl md:text-[30px] font-bold flex items-center justify-center outline-none shadow-[0px_0px_5px_#222831];
}
.active-btn {
  @apply bg-[#EC1F27] text-white;
}
.inactive-btn {
  @apply bg-white text-[#EC1F27];
}
</style>
