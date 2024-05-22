<script setup>
import { storeToRefs } from "pinia";
import { useDashboardStore } from "~/stores/dashboard";
import debounce from "lodash.debounce";

const currentTab = ref("EnrolledCourses");
const tokenCookie = useCookie("token");
const { apiBaseUrl, DOWNLOAD_FILES } = useUrls();
const showCourseVideo = ref(false);
const showSubscriptionTable = ref(false);
const showFileCourseTable = ref(false);
const showAppModal = ref(false);
const { searchText } = storeToRefs(useDashboardStore());
const { setIsShowCourseVideo } = useDashboardStore();
const localePath = useLocalePath();
const { t } = useI18n();

const selectedVideoDetails = ref({});
const selectedLessonDetails = ref({});

// Pagination
const isLeftDisabled = ref(true);
const isRightDisabled = ref(false);

const allVideoCourses = ref([]);
const selectedPlayList = ref([]);
const isShowCompleteButton = ref(false);
const nuxtApp = useNuxtApp();
const isShowDropDownMenu = ref(false);

const loadVideoCourses = (loadFrom) => {
  if (tokenCookie.value) {
    try {
      const { data, pending } = useFetch(
        `${apiBaseUrl}/user/enrollments/video-courses/?is_completed=0&query=${searchText.value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          if (data.value.data.length > 0) {
            allVideoCourses.value = "";
            setTimeout(() => {
              allVideoCourses.value = data.value.data;
            }, 300);
          } else if (loadFrom !== "from_complete") {
            allVideoCourses.value = "";
            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message: t("messages.no_enrolled_course"),
              className: "toasted-bg-alert",
            });
          }
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

loadVideoCourses();

const loadSpecificCourses = async (value) => {
  if (tokenCookie.value) {
    try {
      const { data, pending } = useFetch(
        `${apiBaseUrl}/user/enrollments/video-courses/?${value}&query=${searchText.value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          if (data.value.data.length > 0) {
            allVideoCourses.value = "";
            setTimeout(() => {
              allVideoCourses.value = data.value.data;
            }, 300);
          } else {
            allVideoCourses.value = "";
            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message:
                currentTab.value === "ActiveCourses"
                  ? t("messages.no_active_course")
                  : t("messages.no_completed_course"),
              className: "toasted-bg-alert",
            });
          }
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

const userSubscription = ref({});
const userSubscriptionCondition = ref({});
const loadUserSubscriptionCondition = async () => {
  if (tokenCookie.value) {
    try {
      const { data } = await useFetch(
        `${apiBaseUrl}/user/enrollments/subscription-conditions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );
      if (data.value) {
        userSubscriptionCondition.value = data.value.conditions;
      }
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

const loadUserSubscription = async () => {
  if (tokenCookie.value) {
    try {
      const { data } = await useFetch(
        `${apiBaseUrl}/user/enrollments/current-subscription`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );
      if (data.value) {
        userSubscription.value = data.value.subscription;
        await loadUserSubscriptionCondition();
      }
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

const useFileCourses = ref([]);
const loadUserFileCourseDetails = async () => {
  if (tokenCookie.value) {
    try {
      const { data } = await useFetch(
        `${apiBaseUrl}/user/enrollments/file-courses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );
      if (data.value) {
        useFileCourses.value = [];
        setTimeout(() => {
          useFileCourses.value = data.value.data;
        }, 300);
      }
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

const handleDownloadFile = (downloadFileId) => {
  const { data, pending, error } = useFetch(
    `${DOWNLOAD_FILES}/${downloadFileId}/download`,
    {
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    }
  );

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        window.open(data.value.url, "_blank");
        loadUserFileCourseDetails();
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value?.data.message,
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

const capitalizeFirstCharacter = (inputString) => {
  if (typeof inputString !== "string" || inputString.length === 0) {
    if (inputString === true) {
      return "Yes";
    } else if (inputString === false) {
      return "No";
    } else {
      return inputString;
    }
  }
  return inputString?.charAt(0).toUpperCase() + inputString.slice(1);
};

const convertMBtoGBandMB = (fileSizeMB) => {
  const GB = Math.floor(fileSizeMB / 1024);
  const remainingMB = Math.round((fileSizeMB % 1024) * 100) / 100;

  if (GB === 0) {
    return remainingMB + "MB";
  } else {
    return GB + "." + remainingMB + "GB";
  }
};

const setCurrentTab = async (tab) => {
  currentTab.value = tab;
  showCourseVideo.value = false;

  if (currentTab.value === "CurrentSubscription") {
    showSubscriptionTable.value = true;
    await loadUserSubscription();
  } else if (currentTab.value === "FileCourses") {
    showSubscriptionTable.value = false;
    showFileCourseTable.value = true;
    await loadUserFileCourseDetails();
  } else if (currentTab.value === "EnrolledCourses") {
    loadVideoCourses();
    showSubscriptionTable.value = false;
    showFileCourseTable.value = false;
  } else if (
    currentTab.value === "ActiveCourses" ||
    currentTab.value === "CompletedCourses"
  ) {
    loadSpecificCourses(
      currentTab.value === "ActiveCourses"
        ? `status=1&is_completed=0`
        : `is_completed=1`
    );
    showSubscriptionTable.value = false;
    showFileCourseTable.value = false;
  }
};

const currentSelectedLessonId = ref(null);
const currentSelectedVideoId = ref(0);

const selectVideo = (selectedId) => {
  if (selectedVideoDetails.value.videoLink) {
    selectedVideoDetails.value.videoLink = "";
    setTimeout(() => {
      selectedVideoDetails.value = selectedLessonDetails.value.videos.find(
        (singleVideo) => singleVideo.id === selectedId
      );
    }, 400);
  } else {
    selectedVideoDetails.value = selectedLessonDetails.value.videos.find(
      (singleVideo) => singleVideo.id === selectedId
    );
  }

  isShowCompleteButton.value = false;
  selectedPlayList.value.units.forEach((singleUnit, unitIndex) => {
    if (singleUnit.id === selectedLessonDetails.value.id) {
      if (selectedPlayList.value.units.length === unitIndex + 1) {
        singleUnit.videos.forEach((singleVideo, videoIndex) => {
          if (singleVideo.id === selectedId) {
            if (singleUnit.videos.length === videoIndex + 1) {
              isShowCompleteButton.value = true;
            }
          }
        });
      }
    }
  });
  currentSelectedVideoId.value = selectedId;
};

const selectLesson = (selectedId) => {
  if (currentSelectedLessonId.value === selectedId) {
    currentSelectedLessonId.value = 0;
  } else {
    selectedLessonDetails.value = selectedPlayList.value.units.find(
      (singleVideo) => singleVideo.id === selectedId
    );
    currentSelectedLessonId.value = selectedId;
    if (currentSelectedVideoId.value === 0) {
      selectVideo(selectedLessonDetails.value.videos[0]?.id);
    }
    isLeftDisabled.value = true;
    isRightDisabled.value = false;
  }
};

const selectedCourseVideo = async (selectedCourseId) => {
  try {
    const { data } = await useFetch(
      `${apiBaseUrl}/user/enrollments/video-courses/${selectedCourseId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }
    );
    if (data.value.data) {
      let selectedPlayListUnit = [];
      if (data.value.data.units.length > 0) {
        data.value.data.units.forEach((singlePlayList) => {
          if (singlePlayList.videos.length > 0) {
            selectedPlayListUnit.push(singlePlayList);
          }
        });
        data.value.data.units = selectedPlayListUnit;
        selectedPlayList.value = data.value.data;
        handleIsShowCourseVideo(true);

        selectLesson(selectedPlayList.value?.units[0].id);
      } else {
        data.value.data.units.forEach((singlePlayList) => {
          if (singlePlayList.videos.length > 0) {
            selectedPlayListUnit.push(singlePlayList);
          }
        });
        data.value.data.units = selectedPlayListUnit;
        selectedPlayList.value = data.value.data;
        handleIsShowCourseVideo(true);

        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: t("messages.course_has_no_lesson"),
          className: "toasted-bg-alert",
        });
      }
    }
  } catch (error) {
    console.log(error);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
  }
};
const courseDisabled = (isDisabled) => {
  if (isDisabled) {
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: t("messages.disabled_course"),
      className: "toasted-bg-alert",
    });
  }
};
// Pagination
const handleIsShowCourseVideo = (value) => {
  showCourseVideo.value = value;
  setIsShowCourseVideo(!showCourseVideo.value);
  isLeftDisabled.value = true;
  isRightDisabled.value = false;
  isShowCompleteButton.value = false;
};

const nextPage = () => {
  selectedPlayList.value.units.forEach((singleUnit, index) => {
    if (singleUnit.id === currentSelectedLessonId.value) {
      singleUnit.videos.forEach((video, videoIndex) => {
        if (video.id === currentSelectedVideoId.value) {
          if (videoIndex === singleUnit.videos.length - 1) {
            selectedPlayList.value.units.forEach((singleNestedUnit, index) => {
              if (
                singleNestedUnit.id === currentSelectedLessonId.value &&
                selectedPlayList.value.units[index + 1].id
              ) {
                setTimeout(() => {
                  selectLesson(selectedPlayList.value?.units[index + 1].id);
                  selectVideo(
                    selectedPlayList.value?.units[index + 1]?.videos[0]?.id
                  );
                }, 400);
              } else {
                isRightDisabled.value = true;
                isShowCompleteButton.value = true;
              }
            });
          } else {
            setTimeout(() => {
              selectVideo(video.id + 1);
              isRightDisabled.value = false;
            }, 400);
          }
          if (videoIndex === 0) {
            isLeftDisabled.value = true;
          } else {
            isLeftDisabled.value = false;
          }
        }
      });
    }
  });
};

const prevPage = () => {
  selectedPlayList.value.videos.forEach((singleVideo, index) => {
    if (singleVideo.id === currentSelectedVideoId.value) {
      if (index > 0) {
        setTimeout(() => {
          selectVideo(selectedPlayList.value.videos[index - 1].id);
          isRightDisabled.value = false;
          isShowCompleteButton.value = false;
        }, 400);
      } else if (0 === index) {
        isLeftDisabled.value = true;
      }
    }
  });
};
const handleCompleteCourse = async () => {
  try {
    const { data, error } = await useFetch(
      `${apiBaseUrl}/user/enrollments/video-courses/${selectedPlayList.value.id}/complete/${selectedPlayList.value.item.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }
    );

    if (!error.value && data.value) {
      nuxtApp.$toast("clear");
      nuxtApp.$toast("success", {
        message: data.value.message,
        className: "toasted-bg-success",
      });
      currentTab.value = "CompletedCourses";
      loadVideoCourses("from_complete");
      loadSpecificCourses(
        currentTab.value === "ActiveCourses" ? `status=1` : `is_completed=1`
      );
    } else if (error.value) {
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-success",
      });
    }
  } catch (error) {
    console.log(error);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
  }
};

const showFullText = ref(false);
const htmlContentToShow = (fullDescription) => {
  if (showFullText.value) {
    return fullDescription;
  } else {
    return fullDescription?.slice(0, 5000);
  }
};
const showViewMore = (fullDescription) => {
  return fullDescription?.length > 5000 && !showFullText.value;
};

watch(
  () => searchText.value,
  debounce(async () => {
    if (currentTab.value === "EnrolledCourses") {
      loadVideoCourses();
    } else {
      loadSpecificCourses(
        currentTab.value === "ActiveCourses" ? `status=1` : `is_completed=1`
      );
    }
  }, 500)
);

onMounted(() => {});
</script>

<template>
  <div class="" :class="showCourseVideo ? 'py-5' : 'py-5 md:py-20 flex-grow'">
    <div
      v-if="!showCourseVideo"
      class="text-xs sm:!text-lg font-semibold text-center pb-2 whitespace-nowrap w-full xl:w-[80%] relative"
    >
      <div class="hidden md:flex items-start">
        <p
          class="border-b-[3px] pb-4 pr-2 w-fit xl:w-1/3"
          :class="
            currentTab === 'EnrolledCourses'
              ? 'border-primary-red'
              : 'border-[#9C9C9C]'
          "
        >
          <span
            class="cursor-pointer lg:px-1 py-1 hover:text-primary-red"
            @click="setCurrentTab('EnrolledCourses')"
            >{{ $t("enrolled_courses") }}</span
          >
        </p>
        <p
          class="border-b-[3px] pb-4 px-2 w-fit xl:w-1/3"
          :class="
            currentTab === 'ActiveCourses'
              ? 'border-primary-red'
              : 'border-[#9C9C9C]'
          "
        >
          <span
            class="cursor-pointer lg:px-1 py-1 hover:text-primary-red"
            @click="setCurrentTab('ActiveCourses')"
            >{{ $t("active_courses") }}</span
          >
        </p>
        <p
          class="border-b-[3px] pb-4 px-2 w-fit xl:w-1/3"
          :class="
            currentTab === 'CompletedCourses'
              ? 'border-primary-red'
              : 'border-[#9C9C9C]'
          "
        >
          <span
            class="cursor-pointer lg:px-1 py-1 hover:text-primary-red"
            @click="setCurrentTab('CompletedCourses')"
            >{{ $t("completed_courses") }}</span
          >
        </p>
        <p
          class="border-b-[3px] pb-4 px-2 w-fit xl:w-1/4 hidden"
          :class="
            currentTab === 'FileCourses'
              ? 'border-primary-red'
              : 'border-[#9C9C9C]'
          "
        >
          <span
            class="cursor-pointer lg:px-1 py-1 hover:text-primary-red"
            @click="setCurrentTab('FileCourses')"
            >{{ $t("file_courses") }}</span
          >
        </p>
        <p
          class="border-b-[3px] pb-4 px-2 w-fit xl:w-1/4 hidden"
          :class="
            currentTab === 'CurrentSubscription'
              ? 'border-primary-red'
              : 'border-[#9C9C9C]'
          "
        >
          <span
            class="cursor-pointer lg:px-1 py-1 hover:text-primary-red"
            @click="setCurrentTab('CurrentSubscription')"
            >{{ $t("current_subscription") }}</span
          >
        </p>
      </div>

      <div
        class="md:hidden text-sm w-full px-1 font-normal absolute bg-white z-[1]"
      >
        <div
          class="rounded-md px-2.5 py-1"
          style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25)"
        >
          <div
            class="flex justify-between py-1.5 font-bold"
            @click="isShowDropDownMenu = !isShowDropDownMenu"
          >
            <div>
              {{
                currentTab === "EnrolledCourses"
                  ? "Enrolled Courses"
                  : currentTab === "ActiveCourses"
                  ? "Active Courses"
                  : currentTab === "CompletedCourses"
                  ? "Completed Courses"
                  : currentTab === "FileCourses"
                  ? "File Courses"
                  : currentTab === "CurrentSubscription"
                  ? "Current Subscription"
                  : ""
              }}
            </div>
            <IconsChevronDown
              class="right-4 w-4 text-black transition-all duration-300 ease-in-out"
              :class="isShowDropDownMenu ? '-rotate-180' : 'rotate-0'"
            />
          </div>

          <div v-if="isShowDropDownMenu">
            <div
              v-if="currentTab !== 'EnrolledCourses'"
              class="py-1.5 text-left"
              @click="
                setCurrentTab('EnrolledCourses'), (isShowDropDownMenu = false)
              "
            >
              {{ $t("enrolled_courses") }}
            </div>
            <div
              v-if="currentTab !== 'ActiveCourses'"
              class="py-1.5 text-left"
              @click="
                setCurrentTab('ActiveCourses'), (isShowDropDownMenu = false)
              "
            >
              {{ $t("active_courses") }}
            </div>
            <div
              v-if="currentTab !== 'CompletedCourses'"
              class="py-1.5 text-left"
              @click="
                setCurrentTab('CompletedCourses'), (isShowDropDownMenu = false)
              "
            >
              {{ $t("completed_courses") }}
            </div>
            <div
              v-if="currentTab !== 'FileCourses'"
              class="py-1.5 text-left hidden"
              @click="
                setCurrentTab('FileCourses'), (isShowDropDownMenu = false)
              "
            >
              {{ $t("file_courses") }}
            </div>
            <div
              v-if="currentTab !== 'CurrentSubscription'"
              class="py-1.5 text-left hidden"
              @click="
                setCurrentTab('CurrentSubscription'),
                  (isShowDropDownMenu = false)
              "
            >
              {{ $t("current_subscription") }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!showSubscriptionTable && !showFileCourseTable">
      <div v-if="showCourseVideo" class="flex space-x-2 items-center">
        <IconsLeftArrow
          class="p-1.5 bg-red-500 rounded-lg my-2 w-5 h-5 md:!w-[30px] md:!h-[30px] xl:w-10 xl:h-10 cursor-pointer"
          @click="handleIsShowCourseVideo(false)"
        />
        <p class="font-bold text-xl">
          {{ selectedPlayList.item.title }}
        </p>
      </div>

      <div v-if="allVideoCourses.length > 0 && !showCourseVideo">
        <div
          class="flex flex-wrap gap-3 justify-center lg:justify-normal mb-3 mt-14 md:mt-3"
        >
          <div
            v-for="singleCourse in allVideoCourses"
            class="rounded-lg overflow-hidden"
          >
            <div
              class="border border-[#d1d7dc] w-[300px] rounded-lg cursor-pointer"
              @click="
                !singleCourse.is_disabled && !singleCourse.is_expired
                  ? (showAppModal = true)
                  : singleCourse.is_disabled
                  ? courseDisabled(singleCourse.is_disabled)
                  : ''
              "
            >
              <div class="course-image relative">
                <img
                  v-if="
                    singleCourse.item.banner_url &&
                    singleCourse.item.banner_url !== 'null'
                  "
                  :src="singleCourse.item.banner_url"
                  class="w-[300px] h-[300px] border-b border-[#d1d7dc]"
                  alt=""
                  srcset=""
                />
                <img
                  v-else
                  src="/images/course-details/courseIcon.png"
                  class="w-[300px] h-[300px] border-b border-[#d1d7dc]"
                  alt=""
                  srcset=""
                />
                <NuxtLink
                  v-if="singleCourse.is_expired"
                  :to="localePath(`/courses/${singleCourse.item.slug}`)"
                >
                  <ClientOnly>
                    <fa
                      v-if="singleCourse.is_expired"
                      class="text-gray-500 absolute top-0 w-[300px] h-[300px] opacity-50"
                      :icon="['fa-solid', 'lock']"
                  /></ClientOnly>
                </NuxtLink>
                <div
                  v-if="singleCourse.is_disabled"
                  class="fromDisabled text-gray-500 absolute top-0 w-[300px] h-[300px] opacity-50"
                >
                  <ClientOnly>
                    <fa class="w-full h-full" :icon="['fa-solid', 'lock']"
                  /></ClientOnly>
                </div>
              </div>
              <div class="p-4">
                <p class="font-bold has-tooltip">
                  {{ singleCourse.item.title.substring(0, 25)
                  }}<span v-if="singleCourse.item.title.length > 25">...</span>
                  <span
                    v-if="singleCourse.item.title.length > 25"
                    class="tooltip"
                  >
                    {{ singleCourse.item.title }}
                  </span>
                </p>
                <p>
                  <b>{{ $t("start_date") }}:</b>
                  {{ $dateFormat(singleCourse.start_date) }}
                </p>
                <p>
                  <b>{{ $t("end_date") }}:</b>
                  {{ $dateFormat(singleCourse.end_date) }}
                </p>
              </div>
            </div>
            <OpenAppModal
              v-if="showAppModal"
              :showAppModal="showAppModal"
              @closeAppModal="showAppModal = false"
            />
          </div>
        </div>
      </div>

      <div
        v-else-if="selectedPlayList.units?.length > 0 && showCourseVideo"
        class="w-full h-full flex flex-col 2xl:flex-row space-y-5 2xl:space-x-5 2xl:space-y-0"
      >
        <div class="w-full 2xl:w-[70%] 2xl:pr-2">
          <iframe
            ref="youtubeIframe"
            class="w-full h-[45vw] md:h-[35vw] 2xl:h-[25vw]"
            :src="selectedVideoDetails?.videoLink"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <!-- <CoursesYouTubePlayer /> -->

          <div class="flex justify-between items-center">
            <h2 class="font-bold my-4 text-2xl">
              {{ selectedVideoDetails?.title }}
            </h2>

            <div class="flex flex-col">
              <div class="flex justify-center items-center gap-5 py-4 hidden">
                <button
                  class="button bg-white text-[#374151]"
                  :class="isLeftDisabled ? 'opacity-50' : 'opacity-100'"
                  @click="prevPage"
                >
                  <ClientOnly>
                    <fa class="" :icon="['fa-solid', 'angles-left']"
                  /></ClientOnly>
                </button>

                <button
                  class="button bg-white text-[#374151]"
                  :class="isRightDisabled ? 'opacity-50' : 'opacity-100'"
                  @click="nextPage"
                >
                  <ClientOnly>
                    <fa class="" :icon="['fa-solid', 'angles-right']"
                  /></ClientOnly>
                </button>
              </div>

              <button
                v-if="isShowCompleteButton"
                class="rounded-lg p-2 h-10 whitespace-nowrap text-sm font-bold text-white transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                :class="
                  currentTab === 'CompletedCourses'
                    ? 'bg-green-600 opacity-70'
                    : 'bg-primary-red'
                "
                :disabled="currentTab === 'CompletedCourses'"
                @click="handleCompleteCourse()"
              >
                <span>{{
                  currentTab === "CompletedCourses"
                    ? "Course Completed!"
                    : "Complete Courses"
                }}</span>
              </button>
            </div>
          </div>

          <div
            v-html="htmlContentToShow(selectedVideoDetails?.description)"
            class="mt-2"
          ></div>
          <div
            v-if="showViewMore(selectedVideoDetails?.description)"
            class="bg-green-600 text-white px-3 py-1 rounded-full w-fit whitespace-nowrap h-10 flex flex-col justify-center cursor-pointer"
            @click="showFullText = true"
          >
            View More ...
          </div>
          <div
            v-if="showFullText"
            class="bg-green-600 text-white px-3 py-1 rounded-full w-fit whitespace-nowrap h-10 flex flex-col justify-center cursor-pointer"
            @click="showFullText = false"
          >
            View Less
          </div>
        </div>

        <div
          class="w-full 2xl:w-[30%] flex flex-col space-y-1 border border-[#d1d7dc] rounded-lg h-fit"
        >
          <CoursesIndividualCourseContent
            :selected-playlist="selectedPlayList"
            :current-selected-lesson-id="currentSelectedLessonId"
            :current-selected-video-id="currentSelectedVideoId"
            @selectLesson="selectLesson"
            @selectVideo="selectVideo"
          />
        </div>
      </div>

      <div
        v-else
        class="w-full h-full flex flex-col justify-center items-center pt-[100px]"
      >
        <IconsNoData class="" />
        <p class="text-lg pt-5">
          {{
            currentTab === "EnrolledCourses"
              ? $t("no_enrolled_course")
              : currentTab === "ActiveCourses"
              ? $t("no_active_course")
              : $t("no_completed_course")
          }}
        </p>
      </div>
    </div>

    <div v-else-if="showSubscriptionTable">
      <div
        v-if="userSubscription?.subscription"
        class="text-center font-bold text-xl py-4"
      >
        Your subscription details
      </div>
      <div ref="orderHistoryTable" class="overflow-x-auto mt-4 lg:mt-10">
        <table
          v-if="userSubscription?.subscription"
          class="w-full table-auto border-collapse border border-black whitespace-nowrap text-black"
        >
          <tr>
            <th class="bg-gray-300">Name</th>
            <td>{{ userSubscription.subscription.name }}</td>
          </tr>
          <tr>
            <th class="bg-gray-300">Type</th>
            <td>
              {{ capitalizeFirstCharacter(userSubscription.subscription.type) }}
            </td>
          </tr>
          <tr>
            <th class="bg-gray-300">Usage</th>
            <td>{{ userSubscription.subscription.usage }}</td>
          </tr>
          <tr>
            <th class="bg-gray-300">Amount</th>
            <td>{{ userSubscription.subscription.amount }}</td>
          </tr>
          <tr>
            <th class="bg-gray-300">Status</th>
            <td>
              {{
                capitalizeFirstCharacter(userSubscription.subscription.status)
              }}
            </td>
          </tr>
          <tr>
            <th class="bg-gray-300">Band Width</th>
            <td>
              {{ convertMBtoGBandMB(userSubscription.subscription.band_width) }}
            </td>
          </tr>
          <tr>
            <th class="bg-gray-300">Used Band Width</th>
            <td>
              {{
                convertMBtoGBandMB(
                  userSubscriptionCondition.used_total_band_width
                )
              }}
            </td>
          </tr>
          <tr>
            <th class="bg-gray-300">Total File</th>
            <td>{{ userSubscription.subscription.total_file }}</td>
          </tr>
          <tr>
            <th class="bg-gray-300">Used Total File</th>
            <td>{{ userSubscriptionCondition.used_total_file }}</td>
          </tr>
          <tr>
            <th class="bg-gray-300">Can Download all files?</th>
            <td>
              {{
                capitalizeFirstCharacter(userSubscriptionCondition.is_all_file)
              }}
            </td>
          </tr>
          <tr>
            <th class="bg-gray-300">Can Download featured files?</th>
            <td>
              {{
                capitalizeFirstCharacter(
                  userSubscriptionCondition.is_featured_file
                )
              }}
            </td>
          </tr>
          <tr>
            <th class="bg-gray-300">Can Download non featured files?</th>
            <td>
              {{
                capitalizeFirstCharacter(
                  userSubscriptionCondition.is_none_featured_file
                )
              }}
            </td>
          </tr>
          <tr>
            <th class="bg-gray-300">Duration(Month)</th>
            <td>{{ userSubscription.subscription.durations_as_month }}</td>
          </tr>
        </table>
        <div
          v-else
          class="w-full h-full flex flex-col justify-center items-center pt-[100px]"
        >
          <IconsNoData class="" />
          <p class="text-lg pt-5">You have no subscription!</p>
        </div>
      </div>
    </div>

    <div v-else>
      <div
        v-if="useFileCourses"
        class="text-center font-bold text-xl pt-20 md:pt-10 py-4"
      >
        {{ $t("file_details") }}
      </div>

      <div
        v-if="useFileCourses.length > 0"
        ref="fileCoursesTable"
        class="overflow-x-auto mt-4 lg:mt-10"
      >
        <table
          v-if="useFileCourses.length > 0"
          class="w-full table-auto border-collapse border border-black whitespace-nowrap text-black fileCourseTable"
        >
          <thead>
            <tr class="bg-gray-300">
              <th>{{ $t("name") }}</th>
              <th>{{ $t("file_size") }}</th>
              <th>{{ $t("file_type") }}</th>
              <th>{{ $t("purchase_date") }}</th>
              <th>{{ $t("expired") }}</th>
              <th>{{ $t("download") }}</th>
            </tr>
          </thead>

          <tbody>
            <template
              v-for="singleFileCourse in useFileCourses"
              :key="singleFileCourse.id"
              :class="
                singleFileCourse.id % 2 === 0 ? 'bg-[#ccc8c8]' : 'bg-white'
              "
            >
              <tr>
                <td>{{ singleFileCourse.item.title }}</td>
                <td>{{ singleFileCourse.item.file_size }}</td>
                <td>
                  {{
                    singleFileCourse.item.is_featured
                      ? "Featured"
                      : "Non-Featured"
                  }}
                </td>
                <td>{{ $dateFormat(singleFileCourse.start_date) }}</td>
                <td>{{ singleFileCourse.is_expired ? "True" : "False" }}</td>
                <td>
                  <div class="flex space-x-1 justify-center items-center">
                    <NuxtLink
                      v-if="singleFileCourse.is_expired"
                      :to="
                        localePath(`/download/${singleFileCourse.item.slug}`)
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8 rounded-full p-1 cursor-pointer bg-gray-600 text-white"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </NuxtLink>

                    <div v-else>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8 rounded-full p-1 cursor-pointer bg-green-600"
                        @click="handleDownloadFile(singleFileCourse.item.id)"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div
        v-else
        class="w-full h-full flex flex-col justify-center items-center pt-[100px]"
      >
        <IconsNoData class="" />
        <p class="text-lg pt-5">You have no file for download!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
th,
td {
  @apply text-left min-w-[80px] text-base lg:text-lg border border-black py-2 lg:py-3 px-5;
}

.fileCourseTable th,
td {
  @apply text-center;
}
.has-tooltip {
  @apply relative;
}
.tooltip {
  @apply absolute bg-primary-red text-white z-[100] left-20 -top-16 text-left invisible p-1.5 px-4 rounded-xl  shadow-lg w-full whitespace-normal break-words;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.button {
  @apply h-10 w-10 text-base rounded-md hover:bg-primary-red p-2 hover:text-white;
}
.activeButton {
  @apply bg-primary-red text-white;
}
.inactiveButton {
  @apply bg-white text-[#374151];
}
</style>
