<script setup lang="ts">
// const { PAGE_OVERVIEW_SECTION } = useUrls();
// const localePath = useLocalePath();

// const { data: pageOverViewRes } = useFetch<any>(
//   `${PAGE_OVERVIEW_SECTION}/browse-course`
// );
// const pageOverView = computed(() => pageOverViewRes.value?.data);

const { COURSES } = useUrls();
const { $toast } = useNuxtApp();
const totalPage = ref(1);
const totalCourseNumber = ref(1);
const perPageCourse = ref(6);
const allCourses = ref([]);
const isLoading = ref(false);
const { data: liveCourse } = await useFetch<any>(`${COURSES}?per_page=-1`);

const fetchCourse = async (page: Number) => {
  isLoading.value = true;
  try {
    const res = await $fetch<any>(
      `${COURSES}?per_page=${perPageCourse.value}&page=${page}`
    );
    allCourses.value = res.data;
    totalPage.value = res.meta.last_page;
    totalCourseNumber.value = res.meta.total;
    perPageCourse.value = res.meta.per_page;
    isLoading.value = false;
    if (process.client) {
      window.scrollTo(0, 0);
    }
  } catch (error: any) {
    isLoading.value = false;
    if (process.client) {
      $toast("clear");
      $toast("error", {
        message: error?.response?._data?.message,
        className: "toasted-bg-alert",
      });
    }
  } finally {
    isLoading.value = false;
  }
};

await fetchCourse(1);
</script>

<template>
  <div>
    <section id="recordedCourses" class="bg-[#FFF9F6] relative">
      <div
        class="custom-container !pt-[72px] !pb-[156px] flex flex-col space-y-12"
      >
        <div class="flex flex-col items-center">
          <div class="text-center max-w-[632px]">
            <p class="frame">RECORDED COURSES</p>
            <h1 class="h_tag_primary sm:!leading-[57px] mt-[10px]">
              Browse Our Popular Recorded Courses
            </h1>
            <p class="p_tag_secondary mt-[22px]">
              Education is the process of acquiring knowledge, developing the
              power of judgement, and prepare to live a standard life.
            </p>
          </div>
        </div>
        <Transition name="fade" mode="out-in">
          <div
            v-if="isLoading"
            class="w-full h-full flex justify-center items-center pt-20"
          >
            <span class="text-xl md:text-3xl xl:text-5xl">Loading...</span>
          </div>
          <CoursesAllCourses
            v-else-if="allCourses && allCourses.length > 0"
            :coursesData="allCourses"
          />
          <div
            v-else
            class="w-full h-full flex justify-center items-center pt-20"
          >
            <span class="text-xl md:text-3xl xl:text-5xl">No Data Found</span>
          </div>
        </Transition>
        <div
          v-if="totalCourseNumber > perPageCourse && allCourses.length > 0"
          class="w-full flex items-center justify-center !mt-[60px]"
        >
          <Pagination :total-pages="totalPage" @go-to-page="fetchCourse" />
        </div>
      </div>
      <img
        class="absolute top-0 left-0 md:w-auto w-[100px]"
        src="~/assets/img/about-us/upper-Intersect.svg"
        alt="upper-Intersect image"
      />
      <img
        class="absolute bottom-0 right-0 md:w-auto w-[100px]"
        src="~/assets/img/about-us/lower-Intersect.svg"
        alt="lower-Intersect image"
      />
    </section>
    <section>
      <div
        class="custom-container !pt-[72px] !pb-[156px] flex flex-col space-y-12"
      >
        <div class="flex flex-col items-center">
          <div class="text-center max-w-[632px]">
            <p class="frame">LIVE COURSES</p>
            <h1 class="h_tag_primary sm:!leading-[57px] mt-[10px]">
              Our Exclusive Live Course
            </h1>
            <p class="p_tag_secondary mt-[22px]">
              Education is the process of acquiring knowledge, developing the
              power of judgement, and prepare to live a standard life.
            </p>
          </div>
        </div>
        <div
          v-if="liveCourse.data && liveCourse.data.length > 0"
          class="flex flex-col space-y-[33px]"
        >
          <LazyCoursesLiveCourseCard
            v-for="(course, index) in liveCourse.data"
            :key="index"
            :card-data="course"
          />
        </div>
      </div>
    </section>
  </div>
</template>
