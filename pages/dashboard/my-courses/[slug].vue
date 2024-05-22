<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMyCoursesStore } from "~/stores/myCourses";
const { apiBaseUrl } = useUrls();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const { t } = useI18n();
const { setDashboardCurrentComp, setCourseOverviewVideoTab } =
  useMyCoursesStore();
const { courseDetails, courseOverviewVideoTab } = storeToRefs(
  useMyCoursesStore()
);
const { isSmaller } = useBreakpoints();
const isDesktop = computed(() => isSmaller(1024));

watch(
  courseDetails,
  (newValue) => {
    if (newValue && courseOverviewVideoTab.value === "CoursesVideoLists") {
      setTimeout(() => {
        getHeight(courseDetails.value.units[0].id);
      }, 1000);
    }
  },
);
watch(courseOverviewVideoTab, (newValue) => {
  if (
    newValue === "CoursesVideoLists" &&
    !courseDetails.value.units[0].select
  ) {
    setTimeout(() => {
      getHeight(courseDetails.value.units[0].id);
    }, 1000);
  }
});
const options = [
  { title: "Overview", componentName: "CoursesVideoOverview" },
  { title: "Course Content", componentName: "CoursesVideoLists" },
];
const getHeight = (id) => {
  courseDetails.value.units.forEach((unit, index) => {
    if (unit.id === id && !unit.select) {
      unit.select = true;
      unit.videos.forEach((item) => {
        unit.height =
          unit.height + document.getElementById(item.id).clientHeight;
      });
    } else if (unit.id === id && unit.select) {
      unit.select = false;
      unit.height = 0;
      // if (
      //   courseDetails.value.units.every((element) => element.select === false)
      // ) {
      //   courseDetails.value.units.forEach((item, index) => {
      //     item.videos.forEach((video) => {
      //       video.itemSelect = false;
      //     });
      //   });
      // }
    }
  });
};
const selectedVideo = (unitId, id) => {
  courseDetails.value.units.forEach((unit, index) => {
    if (unit.id === unitId) {
      unit.videos.forEach((item) => {
        if (item.id === id) {
          item.itemSelect = true;
        } else {
          item.itemSelect = false;
        }
      });
    } else {
      unit.videos.forEach((item) => {
        item.itemSelect = false;
      });
    }
  });
};
</script>

<template>
  <div class="flex justify-center items-center w-full h-full py-8">
    <div v-if="courseDetails" class="flex space-x-8 w-full h-full relative">
      <div class="flex flex-col lg:space-y-8 space-y-[22px] flex-grow">
        <div class="flex flex-col space-y-[22px]">
          <div class="flex space-x-4 items-center text-[#313131] px-4">
            <div class="space-x-4 items-center lg:flex hidden">
              <IconsCourses class="w-[22px] h-[19.47px]" />
              <span class="whitespace-nowrap">My Courses</span>
            </div>
            <IconsPureRightArrow
              class="w-[7px] h-[11px] lg:block hidden"
              color="#000"
            />
            <NuxtLink
              to="/dashboard/my-courses"
              class="whitespace-nowrap lg:block hidden"
              >All Courses</NuxtLink
            >
            <IconsPureRightArrow
              class="w-[7px] h-[11px] lg:block hidden"
              color="#000"
            />
            <NuxtLink
              to="/dashboard/my-courses"
              class="!ml-0"
              @click.native="
                setDashboardCurrentComp('CoursesDashboardCourseCard'),
                  setCourseOverviewVideoTab(courseOverviewVideoTab)
              "
            >
              <IconsPureRightArrow
                class="w-[16px] h-[16px] transform rotate-180 lg:hidden"
                color="#000"
            /></NuxtLink>

            <span class="text-[rgba(49,49,49,0.50)] line-clamp-1">{{
              courseDetails.title
            }}</span>
          </div>
          <EmbadedVideoPlayer
            videoClass="w-full aspect-video lg:rounded-lg overflow-hidden"
            videoUrl="https://www.youtube.com/embed/W8e0X7VlKz8"
          />
        </div>
        <CoursesVideoOverview
          class="lg:block hidden"
          :course-details="courseDetails"
        />
        <Menu
          class="lg:hidden menu_bar"
          :menuItems="options"
          :subQuery="false"
        />
        <Transition name="page" mode="out-in">
          <component
            v-if="isDesktop"
            class="lg:hidden px-4"
            :is="courseOverviewVideoTab"
            :course-details="courseDetails"
            @get-height="getHeight"
            @selected-video="selectedVideo"
          ></component>
        </Transition>
      </div>
      <!-- <div
        class="video_list w-[376px] max-w-[376px] min-w-[19.59vw] h-[604px] overflow-x-auto sticky top-0 right-0 z-10"
      ></div> -->
    </div>
    <div v-else>
      <div class="w-full h-full flex flex-col justify-center items-center">
        <IconsNoData />
        <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video_list {
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 54px 54px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 98px 66px 0px rgba(255, 110, 31, 0.02);
}
</style>
