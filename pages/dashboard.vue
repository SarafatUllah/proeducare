<script setup lang="ts">
// import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useDashboardStore } from "~/stores/dashboard";
import { useMyCoursesStore } from "~/stores/myCourses";
import IconsDashboard from "~/components/icons/Dashboard.vue";
import IconsProfile from "~/components/icons/Profile.vue";
import IconsEnrolledCourses from "~/components/icons/EnrolledCourses.vue";
import IconsOrderHistory from "~/components/icons/OrderHistory.vue";
import IconsQuestionAnswer from "~/components/icons/QuestionAnswer.vue";
import IconsReviews from "~/components/icons/Reviews.vue";
import IconsSettings from "~/components/icons/Settings.vue";
import IconsGroupLink from "~/components/icons/GroupLink.vue";

const route = useRoute();
const router = useRouter();
const { locale } = useI18n();
const localeLang = computed(() => locale.value);
const { apiBaseUrl } = useUrls();
const { isSmaller } = useBreakpoints();
const localePath = useLocalePath();
const { logout, tokenCookie } = useAuth();
const { courseDetails, isProcessing, courseOverviewVideoTab } = storeToRefs(
  useMyCoursesStore()
);
const { getCourseDetails } = useMyCoursesStore();
const isMobile = computed(() => isSmaller(768));
const isDesktop = computed(() => isSmaller(1024));
const {
  isShowCourseVideo,
  showNotification,
  allNotifications,
  allUnreadNotificationsNumber,
  nextCursor,
  isLoading,
} = storeToRefs(useDashboardStore());
const {
  setSearchText,
  setShowNotification,
  nextPage,
  readAllNotifications,
  readSingleNotification,
  unreadSingleNotification,
  deleteAllNotifications,
  deleteSingleNotification,
} = useDashboardStore();
const showDashboard = ref(false);

const showSidebar = ref(false);
const showSearch = ref(true);
const currentIconCom = shallowRef(IconsDashboard);
const searchText = ref("");

const mobileSidebarTop = ref(112);

const activeRouteName = computed(() => {
  const routeValues: any = {
    dashboard: {
      icon: IconsDashboard,
      search: false,
      name: "Dashboard",
      nameBn: "ড্যাশবোর্ড",
    },
    "dashboard-profile": {
      icon: IconsProfile,
      search: false,
      name: "My Profile",
      nameBn: "প্রোফাইল বিস্তারিত",
    },
    "dashboard-edit-profile": {
      icon: IconsProfile,
      search: false,
      name: "Settings",
      nameBn: "প্রোফাইল সম্পাদনা করুন",
    },
    "dashboard-enrolled-courses": {
      icon: IconsEnrolledCourses,
      search: true,
      name: "Enrolled Courses",
      nameBn: "ইনরোলড কোর্স",
    },
    "dashboard-my-courses": {
      icon: IconsEnrolledCourses,
      search: true,
      name: "My Courses",
      nameBn: "আমার কোর্স",
    },
    "dashboard-order-history": {
      icon: IconsOrderHistory,
      search: false,
      name: "Order History",
      nameBn: "অর্ডার হিস্ট্রি",
    },
    "dashboard-my-quiz-attempts": {
      icon: IconsQuestionAnswer,
      search: true,
      name: "My Quiz Attempts",
      nameBn: "আমার কুইজ আটেম্পট",
    },
    "dashboard-reviews": {
      icon: IconsReviews,
      search: true,
      name: "Reviews",
      nameBn: "রিভিউস",
    },
    "dashboard-question-and-answer": {
      icon: IconsQuestionAnswer,
      search: true,
      name: "Question & Answer",
      nameBn: "প্রশ্ন ও উত্তর",
    },
    "dashboard-settings": {
      icon: IconsSettings,
      search: false,
      name: "Settings",
      nameBn: "সেটিংস",
    },
    "dashboard-group-link": {
      icon: IconsGroupLink,
      search: false,
      name: "Group Link",
      nameBn: "গ্রুপ লিংক",
    },
  };

  const routeName = (route.name as string).slice(0, -5);

  if (routeName in routeValues) {
    const { icon, search, name, nameBn } = routeValues[routeName];
    currentIconCom.value = icon;
    showSearch.value = search;
    return { name, nameBn };
  }
});

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
};

const { data: profileRes, refresh } = useFetch<any>(
  `${apiBaseUrl}/auth/users`,
  {
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
  }
);
const profile = computed(() => profileRes.value);

const handleLogOut = async () => {
  await logout(tokenCookie.value);
};

// For Notifications
const toggleNotification = () => {
  if (showNotification.value) {
    setShowNotification(false);
  } else {
    setShowNotification(true);
  }
};

// For Dropdown
const selectedTooltip = ref<any>({});

const toggleTooltip = (item: any) => {
  if (selectedTooltip.value?.id === item.id) {
    selectedTooltip.value = {};
  } else {
    selectedTooltip.value = item;
  }
};
const isExpanded = (id: any) => {
  return selectedTooltip.value.id === id;
};

const isMouseOver = ref(false);
const mouseOver = () => {
  isMouseOver.value = true;
};
const mouseLeave = () => {
  isMouseOver.value = false;
  setTimeout(() => {
    selectedTooltip.value = {};
  }, 200);
};

const scrollTop = ref(-1);
const isScrollOnBottom = ref(false);
const handleScroll = (e: any) => {
  scrollTop.value = e.target.scrollTop;
  if (
    e.target.scrollHeight - e.target.scrollTop - 10 <=
    e.target.clientHeight
  ) {
    nextPage();
    isScrollOnBottom.value = true;
  } else {
    isScrollOnBottom.value = false;
  }
};
watch(
  () => searchText.value,
  () => {
    setSearchText(searchText.value);
  }
);
// const breakpoints = useBreakpoints(breakpointsTailwind);
// const isDesktop = breakpoints.greaterOrEqual("lg");
const handleScrollMobileSidebar = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  if (scrollTop > 10 && mobileSidebarTop.value > 42 && isDesktop.value) {
    mobileSidebarTop.value = mobileSidebarTop.value - 5;
  } else if (
    scrollTop > 10 &&
    mobileSidebarTop.value > 150 &&
    !isDesktop.value
  ) {
    mobileSidebarTop.value = mobileSidebarTop.value - 5;
  } else if (scrollTop < 10) {
    mobileSidebarTop.value = 95;
  }
};

watch(showNotification, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      const el = document.getElementById("notificationDiv");
      el?.addEventListener("scroll", handleScroll);
      handleScroll({ target: el });
    }, 300);
  } else {
    const el2 = document.getElementById("notificationDiv");
    el2?.removeEventListener("scroll", handleScroll);
    scrollTop.value = -1;
  }
});
watch(courseDetails, (newValue) => {
  if (newValue && !isDesktop.value && courseDetails.value && courseDetails.value.units) {
    setTimeout(() => {
      getHeight(courseDetails.value.units[0].id);
    }, 1000);
  } else if (
    newValue &&
    isDesktop.value &&
    courseOverviewVideoTab.value === "CoursesVideoLists" &&
    courseDetails.value && courseDetails.value.units
  ) {
    setTimeout(() => {
      getHeight(courseDetails.value.units[0].id);
    }, 1000);
  }
});
watch(isDesktop, (newValue) => {
  if (courseDetails.value && courseDetails.value.units && !courseDetails.value.units[0].select) {
    setTimeout(() => {
      getHeight(courseDetails.value.units[0].id);
    }, 1000);
  } else if(courseDetails.value && courseDetails.value.units) {
    setTimeout(() => {
      courseDetails.value.units.forEach((unit, index) => {
        if (unit.id === courseDetails.value.units[0].id) {
          unit.select = true;
          unit.videos.forEach((item) => {
            unit.height = 0;
            unit.height =
              unit.height + document.getElementById(item.id).clientHeight;
          });
        }
      });
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
if (route.params.slug) {
  getCourseDetails(route.params.slug);
}
onMounted(async () => {
  if (
    !tokenCookie.value ||
    tokenCookie.value === "" ||
    tokenCookie.value === undefined
  ) {
    router.push(localePath("/auth/login"));
  } else {
    showDashboard.value = true;
  }
  window.scrollTo(0, 0);
  window.addEventListener("scroll", handleScrollMobileSidebar);
});
</script>

<template>
  <div class="custom-container !pt-0 pb-0">
    <div
      v-if="showDashboard && !route.params.slug"
      class="flex flex-row h-full w-full relative dashboard"
    >
      <div
        v-if="showSidebar"
        @click="toggleSidebar"
        class="fixed top-0 right-0 left-0 bottom-0 z-[3]"
      ></div>
      <div
        class="sidebar mobile-sidebar desktop-sidebar pt-[33px] pb-[98px]"
        :class="showSidebar ? 'left-0' : '-left-[100%]'"
        :style="{ top: `${mobileSidebarTop}px` }"
      >
        <NuxtLink
          :to="localePath('/dashboard')"
          class="link"
          :class="
            activeRouteName?.name === 'Dashboard'
              ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
              : 'text-[#515B6F]'
          "
          @click="isMobile ? (showSidebar = false) : ''"
        >
          <IconsDashboard
            class="min-w-[22px] h-[18px]"
            :color="
              activeRouteName?.name === 'Dashboard' ? '#ffffff' : '#515B6F'
            "
          />
          <span class="link-text">{{ $t("dashboard") }}</span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/dashboard/profile')"
          class="link"
          :class="
            activeRouteName?.name === 'My Profile'
              ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
              : 'text-[#515B6F]'
          "
          @click="isMobile ? (showSidebar = false) : ''"
        >
          <IconsMyProfile
            class="min-w-[22px] h-6"
            :color="
              activeRouteName?.name === 'My Profile' ? '#ffffff' : '#515B6F'
            "
          />
          <span class="link-text">{{ $t("my_profile") }}</span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/dashboard/my-courses')"
          class="link"
          :class="
            activeRouteName?.name === 'My Courses'
              ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
              : 'text-[#515B6F]'
          "
          @click="isMobile ? (showSidebar = false) : ''"
        >
          <IconsCourses
            class="min-w-[22px] h-[19.47px]"
            :color="
              activeRouteName?.name === 'My Courses' ? '#ffffff' : '#515B6F'
            "
          />
          <span class="link-text">{{ $t("my_courses") }}</span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/dashboard/order-history')"
          class="link"
          :class="
            activeRouteName?.name === 'Order History'
              ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
              : 'text-[#515B6F]'
          "
          @click="isMobile ? (showSidebar = false) : ''"
        >
          <IconsOrderHistory
            class="min-w-[22px] h-5"
            :color="
              activeRouteName?.name === 'Order History' ? '#ffffff' : '#515B6F'
            "
          />
          <span class="link-text">{{ $t("order_history") }}</span>
        </NuxtLink>
        <NuxtLink
          :to="localePath('/dashboard/edit-profile')"
          :class="
            activeRouteName?.name === 'Settings'
              ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
              : 'text-[#515B6F]'
          "
          @click="isMobile ? (showSidebar = false) : ''"
        >
          <div class="link">
            <IconsSettings
              class="min-w-[22px] h-5"
              :color="
                activeRouteName?.name === 'Settings' ? '#ffffff' : '#515B6F'
              "
            />
            <span class="link-text">{{ $t("settings") }}</span>
          </div>
        </NuxtLink>
        <div class="hidden">
          <NuxtLink
            :to="localePath('/dashboard/group-link')"
            class="link"
            :class="
              activeRouteName?.name === 'Group Link'
                ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
                : 'text-[#515B6F]'
            "
            @click="isMobile ? (showSidebar = false) : ''"
          >
            <IconsGroupLink class="min-w-[40px] h-10" />
            <span class="link-text">{{ $t("group_link") }}</span>
          </NuxtLink>
        </div>
        <div class="hidden">
          <NuxtLink
            :to="localePath('/dashboard/my-quiz-attempts')"
            class="link"
            :class="
              activeRouteName?.name === 'My Quiz Attempts'
                ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
                : 'text-[#515B6F]'
            "
          >
            <IconsQuestionAnswer class="min-w-[40px] h-10" />
            <span class="link-text">{{ $t("my_quiz_attempts") }}</span>
          </NuxtLink>
        </div>
        <div class="hidden">
          <NuxtLink
            :to="localePath('/dashboard/reviews')"
            class="link hidden"
            :class="
              activeRouteName?.name === 'Reviews'
                ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
                : 'text-[#515B6F]'
            "
          >
            <IconsReviews class="min-w-[40px] h-10" />
            <span class="link-text">{{ $t("reviews") }}</span>
          </NuxtLink>
        </div>
        <div class="hidden">
          <NuxtLink
            :to="localePath('/dashboard/question-and-answer')"
            class="link hidden"
            :class="
              activeRouteName?.name === 'Question & Answer'
                ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
                : 'text-[#515B6F]'
            "
          >
            <IconsQuestionAnswer class="min-w-[40px] h-10" />
            <span class="link-text">{{ $t("question_answer") }}</span>
          </NuxtLink>
        </div>
        <div class="h-0.5 bg-black w-full !my-5 hidden"></div>
        <!-- <NuxtLink
          :to="localePath('/dashboard/settings')"
          :class="
            activeRouteName?.name === 'Settings'
            ? 'text-white bg-[#FF6E1F] rounded-tl-5px rounded-bl-5px'
              : 'text-[#515B6F]'
          "
        >
          <div class="link">
            <IconsSettings class="min-w-[40px] h-10" />
            <span class="link-text">{{ $t("settings") }}</span>
          </div>
        </NuxtLink> -->
        <button class="link outline-none !hidden" @click="handleLogOut">
          <IconsLogOut class="min-w-[40px] h-10" />
          <span class="link-text">{{ $t("logout") }}</span>
        </button>
      </div>

      <div
        class="flex flex-col w-full min-h-[650px] max-h-full overflow-x-hidden"
        :class="
          !route.params.slug
            ? 'py-5 md:pl-10 pt-[24px] pb-[98px] md:border-l md:border-solid md:border-[#E3E3E3]'
            : ''
        "
      >
        <div
          v-if="isShowCourseVideo"
          class="flex flex-row items-center justify-between space-x-2 lg:!overflow-x-visible"
        >
          <div class="flex items-center w-full">
            <span
              class="md:!hidden w-10 h-10 bg-[#EDEDED] rounded-[10px] flex items-center justify-center mr-2.5 hover:border border-black"
              @click="toggleSidebar"
            >
              <component :is="currentIconCom" class="w-6"></component>
            </span>
            <p class="text-lg md:text-2xl font-medium text-[#313131] flex-grow">
              {{
                localeLang === "en"
                  ? activeRouteName?.name
                  : activeRouteName?.nameBn
              }}
            </p>
            <NuxtLink
              v-if="route.fullPath === '/dashboard/profile'"
              to="/dashboard/edit-profile"
              class="flex space-x-[9px] items-center orange_button !px-[14px] !py-[12px]"
            >
              <ClientOnly>
                <fa
                  class="text-white w-5 h-5 cursor-pointer"
                  :icon="['fas', 'pencil-alt']"
                />
              </ClientOnly>
              <span>Edit Profile</span>
            </NuxtLink>
          </div>
          <div
            v-if="showSearch"
            class="hidden w-[408px] h-[50px] bg-white pl-3 ml-auto md:flex flex-row items-center border border-[#EFF0F6] rounded-lg"
            style="box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.07)"
          >
            <IconsSearch />
            <input
              v-model="searchText"
              type="text"
              placeholder="Search for courses..."
              class="px-3 outline-none w-full h-full text-base rounded-r-lg"
            />
          </div>
          <div
            class="hidden items-center justify-between space-x-5 md:!space-x-2 lg:!space-x-3 xl:!space-x-4"
          >
            <!-- <div class="flex justify-center items-center relative">
              <IconsBell
                @click.stop="toggleNotification"
                class="h-8 w-8 cursor-pointer"
              />
              <span
                v-if="allUnreadNotificationsNumber > 0"
                class="w-2 h-2 bg-primary-red rounded-full absolute top-0 right-0"
              ></span>
              <div
                v-if="showNotification"
                @click.stop=""
                class="absolute top-12 -right-14 lg:-right-32 w-[330px] sm:w-[420px] bg-white rounded-md n-shadow text-[#333333] z-[1] pb-4"
              >
                <div
                  class="flex items-center justify-between px-5 pt-3.5 pb-2.5 border-b border-[#E0E0DD]"
                >
                  <h1 class="text-base font-bold">{{ $t("notification") }}</h1>
                  <div class="flex gap-4">
                    <p class="flex gap-2 items-center text-xs">
                      <button
                        @click="readAllNotifications"
                        :disabled="allUnreadNotificationsNumber === 0"
                        class="text-[#3E87BF]"
                      >
                        {{ $t("mark_all_as_read") }}
                      </button>
                      <span class="text-[#3E87BF]">|</span>
                      <button
                        @click="deleteAllNotifications"
                        :disabled="allNotifications?.length === 0"
                        class="text-[#3E87BF]"
                      >
                        {{ $t("delete_all") }}
                      </button>
                    </p>
                    <IconsCross
                      @click="setShowNotification(false)"
                      class="w-4 cursor-pointer"
                    />
                  </div>
                </div>
                <div
                  id="notificationDiv"
                  class="px-5 max-h-[464px] overflow-y-auto"
                >
                  <template v-if="allNotifications">
                    <ul v-if="allNotifications?.length > 0">
                      <li
                        v-for="(item, index) in allNotifications"
                        :key="item.id"
                      >
                        <div
                          class="flex justify-between items-start gap-2 mt-2.5 py-2.5 px-4 rounded-sm border border-[#EDEDED]"
                          :class="!item.read_at ? 'bg-[#EDEDED]' : ''"
                          @click.stop="
                            item.read_at
                              ? setShowNotification(false)
                              : readSingleNotification(item.id)
                          "
                        >
                          <div>
                            <template
                              v-if="
                                item.type === 'App\\Notifications\\NotifyLogin'
                              "
                            >
                              <div>
                                <p class="line-clamp-2 text-xs font-medium">
                                  You are logged in a new device.
                                </p>
                                <p
                                  class="line-clamp-2 text-[10px] opacity-60 pt-1 break-all"
                                >
                                  Platform: {{ item?.data?.platform }}.
                                </p>
                                <p class="text-[10px] pt-2">
                                  {{ $dateFormat(item?.created_at) }}
                                </p>
                              </div>
                            </template>

                            <template
                              v-if="
                                item.type ===
                                'App\\Notifications\\UploadNewVideo'
                              "
                            >
                              <NuxtLink :to="localePath(item?.data?.link)">
                                <div>
                                  <p class="line-clamp-2 text-xs font-medium">
                                    New video is uploaded in
                                    <span class="font-semibold"
                                      >{{ item?.data.course.title }} </span
                                    >.
                                  </p>
                                  <p
                                    class="line-clamp-2 text-[10px] opacity-60 pt-1 break-all"
                                  >
                                    Go to your Enrolled Courses for details
                                  </p>
                                  <p class="text-[10px] pt-2">
                                    {{ $dateFormat(item?.created_at) }}
                                  </p>
                                </div>
                              </NuxtLink>
                            </template>
                            <template
                              v-if="
                                item.type === 'App\\Notifications\\MessageSend'
                              "
                            >
                              <div>
                                <p class="line-clamp-2 text-xs font-medium">
                                  You got a new message.
                                </p>

                                <p
                                  class="line-clamp-3 text-[10px] opacity-60 pt-1 break-all"
                                >
                                  Message: {{ item?.data?.message }}.
                                </p>
                                <p class="text-[10px] pt-2">
                                  {{ $dateFormat(item?.created_at) }}
                                </p>
                              </div>
                            </template>
                            <template
                              v-else-if="
                                item.type ===
                                'App\\Notifications\\OrderComplete'
                              "
                            >
                              <PaymentNotification :payment="item" />
                            </template>
                            <template
                              v-else-if="
                                item.type ===
                                'App\\Notifications\\PaymentComplete'
                              "
                            >
                              <PaymentNotification :payment="item" />
                            </template>
                            <template
                              v-else-if="
                                item.type ===
                                'App\\Notifications\\PaymentFailed'
                              "
                            >
                              <PaymentNotification :payment="item" />
                            </template>
                          </div>
                          <div
                            @mouseover.stop="mouseOver"
                            @mouseleave.stop="mouseLeave"
                            class="relative"
                          >
                            <div
                              @click.stop="toggleTooltip(item)"
                              class="p-[3px] cursor-pointer text-gray-800 rounded-full hover:bg-slate-200 hover:text-white"
                            >
                              <IconsThreeDots
                                class="min-w-[14px] min-h-[14px] w-1.5 rotate-90"
                              />
                            </div>
                            <div
                              v-if="isExpanded(item.id)"
                              class="text-xs absolute top-4 -right-4 w-[120px] flex flex-col z-10"
                            >
                              <div class="top-0 left-0 w-full h-2"></div>
                              <p
                                class="shadow-xl tooltip-shdow flex flex-col bg-white"
                              >
                                <span
                                  @click.stop="
                                    unreadSingleNotification(item.id)
                                  "
                                  class="py-1.5 px-4 hover:text-white hover:bg-[#3E87BF] cursor-pointer"
                                  >{{ $t("mark_as_unread") }}</span
                                >
                                <span
                                  @click.stop="
                                    deleteSingleNotification(item.id)
                                  "
                                  class="py-1.5 px-4 hover:text-white hover:bg-[#3E87BF] cursor-pointer"
                                  >{{ $t("delete") }}</span
                                >
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          v-if="index !== allNotifications.length - 1"
                          class="w-[calc(100%-32px)] h-0.5 mt-1 mx-auto bg-[#E0E0DD]"
                        ></div>
                      </li>
                      <li v-if="!nextCursor" class="pt-2 text-center text-xs">
                        {{ $t("no_more_notification") }}
                      </li>
                      <li
                        v-else-if="isLoading"
                        class="pt-2 text-center text-xs"
                      >
                        {{ $t("loading") }}
                      </li>
                    </ul>
                    <p v-else class="py-4">{{ $t("no_notification") }}</p>
                  </template>
                </div>
              </div>
            </div> -->
          </div>
        </div>
        <div
          v-if="showSearch"
          class="md:!hidden w-full h-[50px] md:h-60 mt-5 pl-4 flex flex-row items-center border border-primary-red rounded-[20px]"
        >
          <IconsSearch />
          <input
            v-model="searchText"
            type="text"
            placeholder="Search here..."
            class="pl-3 pr-2 outline-none h-[44px] md:h-54 text-lg w-full rounded-r-[20px]"
          />
        </div>
        <NuxtPage :profile="profile" @updateProfile="refresh" />
      </div>
    </div>
    <div
      v-else-if="
        showDashboard && route.params.slug && courseDetails && !isProcessing
      "
      class="flex lg:flex-row flex-col lg:space-x-8 lg:space-y-0 space-y-[21px] relative"
    >
      <NuxtPage></NuxtPage>
      <CoursesVideoLists
        v-if="!isDesktop"
        class="lg:block hidden mt-8"
        :course-details="courseDetails"
        @get-height="getHeight"
        @selected-video="selectedVideo"
      />
      <!-- <Menu :menuItems="options" :subQuery="false" />
      <Transition name="page" mode="out-in">
        <div class="w-full h-full">
          <component :is="courseOverviewVideoTab"></component>
        </div>
      </Transition> -->
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
.link {
  @apply flex items-center space-x-4 lg:space-x-[19px] hover:bg-[#FF6E1F] hover:text-white px-[26px] py-[11px];
}
.link:hover {
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
  @apply rounded-tl-5px rounded-bl-5px;
}
.link-text {
  @apply text-xl;
}
.sidebar {
  /* transition:  */
  @apply h-full min-h-full flex flex-col space-y-[22px] sticky top-[162px];
}
@media (min-width: 768px) and (max-width: 1023px) {
  .sidebar:hover {
    @apply min-w-[230px] xl:!min-w-[270px];
  }
}
@media (max-width: 1023px) {
  /* .custom-container {
    padding-left: 16px !important;
  } */
}
@media (max-width: 767px) {
  .mobile-sidebar {
    transition: left 0.5s ease-in-out;
    @apply bg-[#FCFCFC] z-10 w-[270px] fixed top-[112px] min-h-screen pl-9 shadow-xl;
  }
}
@media (max-width: 600px) {
  .mobile-sidebar {
    @apply pl-6;
  }
}
@media (max-width: 400px) {
  .mobile-sidebar {
    @apply pl-4;
  }
}
@media (min-width: 768px) {
  .desktop-sidebar {
    transition: all 0.5s ease-in-out;
    @apply w-[64px] min-w-[64px] lg:!min-w-[240px] xl:!min-w-[280px] whitespace-nowrap overflow-hidden;
  }
}
.n-shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}
.has-tooltip {
  @apply relative;
}
.tooltip {
  @apply absolute bg-primary-red text-white z-[100] left-0 top-0 text-left invisible rounded-sm shadow-lg;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}

.tooltip-shdow {
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25));
}

.select_box:hover .play_button {
  background-color: #ff6e1f;
}
.select_box:hover .play_icon {
  fill: #ffffff;
}
@media (max-width: 1023px) {
  .custom-container {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .dashboard {
    @apply !px-[4.62vw];
  }
}
</style>
