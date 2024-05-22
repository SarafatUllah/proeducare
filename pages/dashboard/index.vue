<script setup>
const { apiBaseUrl } = useUrls();
const tokenCookie = useCookie("token");

const nuxtApp = useNuxtApp();

const allCourseStatus = ref({});
const loadCourseStatus = () => {
  if (tokenCookie.value) {
    try {
      const { data, pending } = useFetch(
        `${apiBaseUrl}/user/enrollments/course-counts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          allCourseStatus.value = data.value.data;
        } else {
          setTimeout(() => {
            setData();
          }, 300);
        }
      };

      setData();
    } catch (error) {
      console.log(error);
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: error?.response?._data?.message,
        className: "toasted-bg-alert",
      });
    }
  }
};

loadCourseStatus();

const myCourses = ref([]);
const loadMyCourses = async (value) => {
  if (tokenCookie.value) {
    try {
      const { data, pending } = await useLazyFetch(
        `${apiBaseUrl}/user/enrollments/video-courses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          myCourses.value = [];
          myCourses.value = data.value.data;
        } else {
          setTimeout(() => {
            setData();
          }, 300);
        }
      };

      setData();
    } catch (error) {
      console.log(error);
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: error?.response?._data?.message,
        className: "toasted-bg-alert",
      });
    }
  }
};
loadMyCourses();

onMounted(() => {});
</script>

<template>
  <div class="mt-14">
    <div
      class="grid grid-cols-1 px-12 md:!px-0 md:!grid-cols-3 gap-5 lg:!gap-5 text-black text-center"
    >
      <div
        class="py-5 flex flex-col justify-center items-center space-y-[25px] dashboard_box"
      >
        <div
          class="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#FF6E1F] bg-opacity-15"
        >
          <IconsOrangeFillCourses />
        </div>
        <span class="text-[24px] text-[#313131] font-bold">{{
          allCourseStatus.total_count
        }}</span>
        <p class="text-base text-[#515B6F] !mt-0.5">
          {{ $t("enrolled_courses") }}
        </p>
      </div>

      <div
        class="py-5 flex flex-col justify-center items-center space-y-[25px] dashboard_box"
      >
        <div
          class="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#FF6E1F] bg-opacity-15"
        >
          <IconsActiveCourses />
        </div>
        <span class="text-[24px] text-[#313131] font-bold">{{
          allCourseStatus.total_active
        }}</span>
        <p class="text-base text-[#515B6F] !mt-0.5">
          {{ $t("active_courses") }}
        </p>
      </div>

      <div
        class="py-5 flex flex-col justify-center items-center space-y-[25px] dashboard_box"
      >
        <div
          class="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#FF6E1F] bg-opacity-15"
        >
          <IconsCompletedCourses />
        </div>
        <span class="text-[24px] text-[#313131] font-bold">{{
          allCourseStatus.total_completed
        }}</span>
        <p class="text-base text-[#515B6F] !mt-0.5">
          {{ $t("completed_courses") }}
        </p>
      </div>
    </div>

    <!-- <div class="pt-20">
      <h3 class="text-2xl md:!text-[30px] font-semibold text-black">
        {{ $t("my_courses") }}
      </h3>

      <div class="pt-9 overflow-x-auto">
        <table
          class="w-full table-auto border-collapse border border-black whitespace-nowrap"
        >
          <thead class="bg-[#434343]">
            <tr>
              <th class="">{{ $t("my_courses") }}</th>
              <th class="">{{ $t("start_date") }}</th>
              <th class="">{{ $t("end_date") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="myCourse in myCourses">
              <td class="px-4">{{ myCourse.item.title }}</td>
              <td class="pr-4">{{ $dateFormat(myCourse.start_date) }}</td>
              <td class="">{{ $dateFormat(myCourse.end_date) }}</td>
              <td class="flex items-center justify-center hidden">
                <div
                  class="md:!hidden flex items-center justify-center space-x-2"
                >
                  <span>2.5</span>
                  <IconsStar rating="full" class="" />
                </div>
                <div class="hidden md:block"><Rating :rating="2.5" /></div>
              </td>
            </tr>
          </tbody>
        </table>
        <p
          v-if="myCourses.length < 1"
          class="mt-5 text-center text-lg text-gray-500 font-medium"
        >
          No courses found
        </p>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
th {
  @apply h-11 text-center text-base lg:!text-lg font-semibold text-white;
}
td {
  @apply text-center h-[72px] text-lg lg:!text-2xl font-semibold text-black;
}
th:first-child,
td:first-child {
  @apply text-start pl-5;
}
.dashboard_box {
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
}
</style>
