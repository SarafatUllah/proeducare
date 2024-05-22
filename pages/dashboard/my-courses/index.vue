<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useScroll } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useMyCoursesStore } from "~/stores/myCourses";

const { COURSES } = useUrls();
const { $toast } = useNuxtApp();
const totalPage = ref(1);
const totalCourseNumber = ref(1);
const perPageCourse = ref(6);
const allCourses = ref([]);
const isLoading = ref(false);
const menuElement = ref(null);

const menuItems = [
  {
    id: 1,
    title: "All Courses",
    componentName: "CoursesDashboardCourseCard",
  },
  {
    id: 2,
    title: "Completed Courses",
    componentName: "CoursesDashboardCompletedCourse",
  },
];

const { currentDashboardComp } = storeToRefs(useMyCoursesStore());
const { arrivedState } = useScroll(menuElement);

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
onMounted(async () => {
  await fetchCourse(1);
});
</script>

<template>
  <div class="mt-8">
    <div class="relative">
      <Menu :menuItems="menuItems" :subQuery="false" />
    </div>
    <div class="mt-8 space-y-5">
      <Transition name="fade">
        <div
          v-if="isLoading"
          class="w-full h-full flex justify-center items-center pt-20"
        >
          <IconsIsLoading />
        </div>
        <CoursesDashboardCourseCard
          v-else-if="
            allCourses &&
            allCourses.length > 0 &&
            currentDashboardComp === 'CoursesDashboardCourseCard'
          "
          :coursesData="allCourses"
        />
        <CoursesDashboardCompletedCourse
          v-else-if="currentDashboardComp === 'CoursesDashboardCompletedCourse'"
          :coursesData="allCourses"
        />
        <div
          v-else-if="!isLoading && allCourses && allCourses.length > 0"
          class="py-5 md:py-20"
        >
          <div class="w-full h-full flex flex-col justify-center items-center">
            <IconsNoData />
            <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
          </div>
        </div>
      </Transition>
      <div
        v-if="
          totalCourseNumber > perPageCourse &&
          allCourses.length > 0 &&
          currentDashboardComp === 'CoursesDashboardCourseCard'
        "
        class="w-full flex items-center justify-center !mt-[60px]"
      >
        <Pagination :total-pages="totalPage" @go-to-page="fetchCourse" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  @apply pb-2.5 border-b-[4px] transition-all duration-150 ease-in-out px-0 text-gray-secondary text-center;
}
.inactive-menu:hover,
.inactive-menu button:hover {
  @apply text-orange-primary;
}
.active-menu,
.active-menu button {
  @apply border-orange-primary text-orange-primary font-bold;
}
.inactive-menu {
  @apply border-white text-gray-secondary;
}
</style>
