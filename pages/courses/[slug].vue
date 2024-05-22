<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCoursesStore } from "~/stores/courses";
import { useCartDataStore } from "~/stores/cartData";
import { useTheVideoStore } from "~/stores/theVideo";
import { useScroll } from "@vueuse/core";
const { setMediaUrl } = useTheVideoStore();
const { currentComp } = storeToRefs(useCoursesStore());
const { setSlugInformation, setAllCartData } = useCartDataStore();
const { setCurrentComp } = useCoursesStore();

const { apiBaseUrl } = useUrls();
const route = useRoute();
const router = useRouter();
const selectedRadioIndex = ref(0);
const showSubscriptionModal = ref(false);
const selectedProduct = ref("");
const selectedItemId = ref(0);
const selectedSubscription = ref("");
const tokenCookie = useCookie("token");
const oldCardData: any = ref([]);
const allSubscriptions: any = ref([]);
const nuxtApp = useNuxtApp();
const { isBetween, isLargerOrEqual } = useBreakpoints();
const localePath = useLocalePath();
const { t } = useI18n();
const isProcessing = ref(false);

const textCount = computed(() => {
  if (isLargerOrEqual(1920)) {
    return 90;
  } else if (isBetween(1700, 1919)) {
    return 80;
  } else if (isBetween(1440, 1700)) {
    return 60;
  } else if (isBetween(1280, 1440)) {
    return 50;
  } else if (isBetween(1100, 1280)) {
    return 40;
  } else if (isBetween(1024, 1100)) {
    return 24;
  } else if (isBetween(900, 1024)) {
    return 170;
  } else if (isBetween(768, 900)) {
    return 140;
  } else if (isBetween(640, 768)) {
    return 100;
  } else if (isBetween(500, 640)) {
    return 70;
  } else if (isBetween(400, 500)) {
    return 50;
  } else {
    return 40;
  }
});
const { COURSES } = useUrls();
const { data: courseData } = await useFetch(`${COURSES}?per_page=6`);
const courseDetails = ref<any>({});

const defaultSubscriptionId = computed(
  () => courseDetails.value?.default_subscription_id
);

const addToCart = async (product: any, itemId: number) => {
  if (product.purchase_allowed) {
    // showSubscriptionModal.value = !showSubscriptionModal.value;

    selectedProduct.value = product;
    selectedItemId.value = itemId;
    const cartDataCookie: any = useCookie("cartData");

    // if (selectedSubscription.value !== "") {
    if (tokenCookie.value) {
      try {
        const checkItemExist = ref(false);
        const { data }: any = await useFetch(`${apiBaseUrl}/carts`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        });
        data.value.data.forEach((singleItem: any) => {
          if (singleItem.item.id === itemId) {
            checkItemExist.value = true;
            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message: t("messages.already_added_to_cart"),
              className: "toasted-bg-alert",
            });
            // router.push(localePath("/cart"));
          }
        });

        // subscription_id: selectedSubscription.value,
        if (!checkItemExist.value) {
          const { data, error }: any = await useFetch(
            `${apiBaseUrl}/carts/add`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${tokenCookie.value}`,
              },
              body: {
                item_id: itemId,
              },
            }
          );
          if (!error.value && data.value) {
            nuxtApp.$toast("clear");
            nuxtApp.$toast("success", {
              message: data.value.message,
              className: "toasted-bg-success",
            });
            // router.push(localePath("/cart"));
          }
          getAllCardDta();
          return data.value.cart;
        }
        getAllCardDta();
      } catch (err) {
        console.log(err);
      }
    } else {
      const addNewProduct = {
        id: product.id,
        item_category_id: product.item_category_id,
        title: product.title,
        banner_url: product.banner_url,
        price: product.price,
        special_price: product.special_price,
        subscription_id: selectedSubscription.value,
        monthly_service_charge: product.monthly_service_charge,
      };

      if (cartDataCookie.value?.length > 0) {
        const isExist = cartDataCookie.value.find(
          (singleCartData: any) => singleCartData.id === addNewProduct.id
        );

        if (isExist) {
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: t("messages.already_added_to_cart"),
            className: "toasted-bg-success",
          });
          setAllCartData(cartDataCookie.value);
          // router.push(localePath("/cart"));
        } else {
          cartDataCookie.value = JSON.stringify(cartDataCookie.value);

          oldCardData.value = JSON.parse(cartDataCookie.value);
          cartDataCookie.value = JSON.stringify([]);
          oldCardData.value.push(addNewProduct);
          cartDataCookie.value = JSON.stringify(oldCardData.value);
          nuxtApp.$toast("clear");
          nuxtApp.$toast("success", {
            message: t("messages.added_to_cart"),
            className: "toasted-bg-success",
          });

          setAllCartData(JSON.parse(cartDataCookie.value));
          // router.push(localePath("/cart"));
        }
      } else {
        oldCardData.value.push(addNewProduct);
        cartDataCookie.value = JSON.stringify(oldCardData.value);
        nuxtApp.$toast("clear");
        nuxtApp.$toast("success", {
          message: t("messages.added_to_cart"),
          className: "toasted-bg-success",
        });
        setAllCartData(JSON.parse(cartDataCookie.value));
        // router.push(localePath("/cart"));
      }
    }
  }
  // } else {
  //   nuxtApp.$toast("clear");
  //   nuxtApp.$toast("error", {
  //     message: t("messages.course_already_purchased"),
  //     className: "toasted-bg-alert",
  //   });
  // }
};

const getAllCardDta = async () => {
  const { data }: any = await useFetch(`${apiBaseUrl}/carts`, {
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
  });
  setAllCartData(data.value.data);
};

const selectedSubscriptionId = ref(0);

// for subscription modal
const getSubscription = async () => {
  const { data, pending, error }: any = useFetch(
    `${apiBaseUrl}/subscriptions/video`
  );

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        allSubscriptions.value = data.value.data;
        if (defaultSubscriptionId.value) {
          selectedSubscriptionId.value = defaultSubscriptionId.value;
        } else {
          selectedSubscriptionId.value = allSubscriptions.value[0]?.id;
        }
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value?.data.message,
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
};
getSubscription();

const handleSubscription = (
  subscriptionId: any,
  product: any,
  productId: any
) => {
  selectedSubscription.value = subscriptionId;
  addToCart(product, productId);
};

//youMightBeThinking
const expandedYouMightBeThinking = ref<number[]>([]);
const toggleYouMightBeThinking = (id: number) => {
  if (expandedYouMightBeThinking.value.includes(id)) {
    expandedYouMightBeThinking.value = expandedYouMightBeThinking.value.filter(
      (item) => item !== id
    );
  } else {
    expandedYouMightBeThinking.value.push(id);
  }
};
const isExpandedYouMightBeThinking = (id: number) => {
  return expandedYouMightBeThinking.value.includes(id);
};
// Course Details
const expandedCourseDetails = ref(<number[]>[]);
const toggleCourseDetail = (id: number) => {
  if (expandedCourseDetails.value.includes(id)) {
    expandedCourseDetails.value = expandedCourseDetails.value.filter(
      (item) => item !== id
    );
  } else {
    expandedCourseDetails.value.push(id);
  }
};
const isExpandedCourseDetail = (id: number) => {
  return expandedCourseDetails.value.includes(id);
};
// FAQ
const expandedItems = ref(<number[]>[]);
const toggle = (id: number) => {
  if (expandedItems.value.includes(id)) {
    expandedItems.value = expandedItems.value.filter((item) => item !== id);
  } else {
    expandedItems.value.push(id);
  }
};
const isExpanded = (id: number) => {
  return expandedItems.value.includes(id);
};
const setSelectedRadioIndex = (index: number, id: number) => {
  selectedRadioIndex.value = index;
  selectedSubscriptionId.value = id;
};

// course content
const selectedLessonDetails = ref<any>({});
const selectedVideoDetails = ref({});

const currentSelectedLessonId = ref(-1);
const currentSelectedVideoId = ref(-1);
const selectVideo = (selectedId: number) => {
  selectedVideoDetails.value = selectedLessonDetails.value.videos.find(
    (singleVideo: any) => singleVideo.id === selectedId
  );

  currentSelectedVideoId.value = selectedId;

  setTimeout(() => {
    const body = document.getElementsByTagName("iframe")[0];
  }, 500);
};

const selectLesson = (selectedId: number) => {
  if (currentSelectedLessonId.value === selectedId) {
    currentSelectedLessonId.value = -1;
  } else {
    selectedLessonDetails.value = courseDetails.value.units.find(
      (singleVideo: any) => singleVideo.id === selectedId
    );
    currentSelectedLessonId.value = selectedId;
    selectVideo(courseDetails.value?.units[0]?.videos[0]?.id);
  }
};

const initialExpand = () => {
  if (courseDetails.value) {
    if (courseDetails.value?.youMightBeThinking?.length > 0) {
      toggleYouMightBeThinking(courseDetails.value?.youMightBeThinking[0]?.id);
    }
    if (courseDetails.value?.allDescriptions?.length > 0) {
      toggleCourseDetail(courseDetails.value?.allDescriptions[0]?.id);
    }
    if (courseDetails.value?.faqs?.length > 0) {
      toggle(courseDetails.value?.faqs[0]?.id);
    }
    if (courseDetails.value?.units?.length > 0) {
      selectLesson(courseDetails.value?.units[0]?.id);
    }
  }
};

const getCourseDetails = () => {
  isProcessing.value = true;
  const { data, pending, error }: any = useFetch(
    `${apiBaseUrl}/courses/${route.params.slug}`,
    {
      headers: {
        Authorization: `Bearer ${tokenCookie.value ? tokenCookie.value : ""}`,
      },
    }
  );

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        courseDetails.value = data.value.data;
        setTimeout(() => {
          const rightSection = document.getElementById("rightSection");
          let rightSectionHeight;
          if (rightSection) {
            rightSectionHeight = rightSection?.clientHeight;
          }
          const leftSection = document.getElementById("leftSection");
          if (leftSection) {
            if (window.innerWidth > 1023) {
              leftSection.style.height = rightSectionHeight + "px";
            } else {
              leftSection.style.height = "auto";
            }
          }
          const courseTitle = document.getElementById("courseTitle");

          const moreCourses = document.getElementById("moreCourses");
          const demoDiv = document.getElementById("demoDiv");
          if (courseTitle && demoDiv) {
            demoDiv.style.height = courseTitle.clientHeight + 191 + "px";
          }
          if (moreCourses && rightSectionHeight) {
            moreCourses.style.opacity = 1;
            if (window.innerWidth > 1023) {
              moreCourses.style.paddingTop = rightSectionHeight + 260 + "px";
            } else {
              moreCourses.style.paddingTop =
                rightSectionHeight + leftSection.clientHeight + 260 + "px";
            }
          }
        }, 800);

        initialExpand();
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value?.data.message,
          className: "toasted-bg-success",
        });
      }
      isProcessing.value = false;
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};
getCourseDetails();

const scrollTop = ref(-1);
const isScrollOnBottom = ref(false);
const handleScroll = (e: any) => {
  scrollTop.value = e.target.scrollTop;
  if (
    e.target.scrollHeight - e.target.scrollTop - 20 <=
    e.target.clientHeight
  ) {
    isScrollOnBottom.value = true;
  } else {
    isScrollOnBottom.value = false;
  }
};

watch(showSubscriptionModal, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      const el = document.getElementById("subscriptionModalScroll");
      el?.addEventListener("scroll", handleScroll);
      handleScroll({ target: el });
    }, 300);
  } else {
    const el2 = document.getElementById("subscriptionModalScroll");
    el2?.removeEventListener("scroll", handleScroll);
    scrollTop.value = -1;
  }
});
const handelMenuScroll = () => {
  const menuWrapper2 = document.querySelector(".menu-wrapper2");
  const maxScrollLeft = menuWrapper2.scrollWidth - menuWrapper2.clientWidth;
  const scrollLeft = menuWrapper2.scrollLeft;
  // const menuWrapper = document.querySelector(".menu-wrapper");
  const leftOverlay = document.querySelector(".left-overlay");
  const rightOverlay = document.querySelector(".right-overlay");
  // Adjust blur based on scroll position
  if (scrollLeft === 0) {
    // At the start, blur the right side
    rightOverlay.style.setProperty("opacity", "1");
    leftOverlay.style.setProperty("opacity", "0");
  } else if (scrollLeft === maxScrollLeft) {
    // At the end, blur the left side
    rightOverlay.style.setProperty("opacity", "0");
    leftOverlay.style.setProperty("opacity", "1");
  } else {
    // In the middle, blur both sides
    rightOverlay.style.setProperty("opacity", "1");
    leftOverlay.style.setProperty("opacity", "1");
  }
};
const getCurrentElementsHeight = () => {
  const rightSection = document.getElementById("rightSection");
  const rightSectionHeight = rightSection?.clientHeight;
  const leftSection = document.getElementById("leftSection");
  if (window.innerWidth > 1023) {
    leftSection.style.height = rightSectionHeight + "px";
  } else {
    leftSection.style.height = "auto";
  }
  const courseTitle = document.getElementById("courseTitle");

  const moreCourses = document.getElementById("moreCourses");
  const demoDiv = document.getElementById("demoDiv");
  demoDiv.style.height = courseTitle.clientHeight + 191 + "px";
  moreCourses.style.opacity = 1;
  if (window.innerWidth > 1023) {
    moreCourses.style.paddingTop = rightSectionHeight + 260 + "px";
  } else {
    moreCourses.style.paddingTop =
      rightSectionHeight + leftSection.clientHeight + 260 + "px";
  }
};
onMounted(() => {
  window.scrollTo(0, 0);
  window.addEventListener("resize", getCurrentElementsHeight);

  setTimeout(() => {
    if (document.querySelector(".menu-wrapper2")) {
      const menuWrapper2 = document.querySelector(".menu-wrapper2");
      menuWrapper2.addEventListener("scroll", handelMenuScroll);
      handelMenuScroll();
    }
  }, 1000);
});

const selectedInstructors = ref<number[]>([]);
const toggleInstructionDetail = (id: number) => {
  if (selectedInstructors.value.includes(id)) {
    selectedInstructors.value = selectedInstructors.value.filter(
      (item) => item !== id
    );
  } else {
    selectedInstructors.value.push(id);
  }
};
const isShowMore = (id: number) => {
  return selectedInstructors.value.includes(id);
};
const getMainUrl = (mediaUrl: string) => {
  if (mediaUrl.includes("v=")) {
    const mainMediaUrl = mediaUrl.split("v=");
    return "https://www.youtube.com/embed/" + mainMediaUrl[1];
  } else {
    return mediaUrl;
  }
};
const options = [
  { title: "About The Course", componentName: "CoursesAboutTheCourse" },
  { title: "Course Content", componentName: "CoursesCourseContent" },
  { title: "Reviews", componentName: "CoursesCourseReviews" },
];
setCurrentComp("CoursesAboutTheCourse");
const convertTimeToHoursAndMinutes = (time: string) => {
  // Split the time string into hours, minutes, and seconds
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  // Calculate total minutes
  const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);

  // Calculate hours and minutes for the output
  const outputHours = Math.floor(totalMinutes / 60);
  const outputMinutes = totalMinutes % 60;

  // Format the output
  return `${outputHours}hr ${outputMinutes}min`;
};
</script>
<template>
  <section :class="isProcessing ? 'justify-start' : 'justify-between'">
    <div class="relative hero_section flex justify-center">
      <div
        id="demoDiv"
        class="bg-[#FFF9F6] absolute top-0 left-0 z-[1] w-full h-screen flex justify-center items-center"
      >
        <div v-if="isProcessing" class="w-full">
          <IconsIsLoading class="h-24" />
          <p class="text-lg tex-center flex justify-center">Please wait...</p>
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
      </div>
      <div
        class="custom-container bg-white absolute top-0 !pt-[97px] flex flex-col-reverse lg:flex-row lg:justify-center lg:items-start items-center"
      >
        <div
          v-if="courseDetails?.title && !isProcessing"
          id="rightSection"
          class="w-full lg:w-[56%] lg:mt-0 mt-[24px] z-[1]"
        >
          <div id="courseTitle" class="block text-center md:text-left">
            <div class="lg:text-left text-center">
              <h1 class="h_tag_primary mt-20 min-w-[640]:mt-12 lg:mt-0">
                <span>{{ courseDetails?.title }}</span>
                <span
                  v-if="courseDetails?.video_course_type === 'live'"
                  class="italic !text-[#FF6E1F]"
                >
                  Live Course</span
                >
              </h1>
              <div
                v-if="courseDetails.short_description !== null"
                class="p_tag_secondary mt-[20px]"
                v-html="courseDetails?.short_description"
              ></div>
            </div>
            <div
              class="grid grid-cols-2 gap-y-[29px] lg:max-w-[450px] mt-[30px] lg:justify-items-start justify-items-center"
            >
              <div
                class="flex md:flex-row md:space-x-[15px] flex-col md:space-y-0 space-y-[10px] items-center"
              >
                <img
                  class="w-[26px] h-[26px]"
                  src="~/assets/img/courses/online-class.svg"
                  alt="online-class"
                />
                <p class="p_tag_third lg:!text-base !text-sm">Online Class</p>
              </div>
              <div
                class="flex md:flex-row md:space-x-[15px] flex-col md:space-y-0 space-y-[10px] items-center"
              >
                <img
                  class="w-[26px] h-[26px]"
                  src="~/assets/img/courses/multiple-resources.svg"
                  alt="multiple-resources"
                />
                <p class="p_tag_third lg:!text-base !text-sm">
                  Multiple Resources
                </p>
              </div>
              <div
                class="flex md:flex-row md:space-x-[15px] flex-col md:space-y-0 space-y-[10px] items-center"
              >
                <img
                  class="w-[26px] h-[26px]"
                  src="~/assets/img/courses/fb-community.svg"
                  alt="fb-community"
                />
                <p class="p_tag_third lg:!text-base !text-sm">FB Community</p>
              </div>
              <div
                class="flex md:flex-row md:space-x-[15px] flex-col md:space-y-0 space-y-[10px] items-center"
              >
                <img
                  class="w-[26px] h-[26px]"
                  src="~/assets/img/courses/mentorship.svg"
                  alt="mentorship"
                />
                <p class="p_tag_third lg:!text-base !text-sm">
                  One-on-One Mentorship
                </p>
              </div>
            </div>
            <div
              v-if="
                courseDetails.instructors &&
                courseDetails.instructors.length > 0
              "
              class="grid sm:grid-cols-2 grid-cols-1 gap-y-[29px] w-full mt-[49px] lg:justify-items-start justify-items-center"
            >
              <div
                v-for="(instructor, index) in courseDetails?.instructors"
                :key="index"
                class="flex space-x-5 items-center"
              >
                <img
                  v-if="instructor.image"
                  class="w-[57px] h-[57px] rounded-full"
                  :src="instructor.image"
                  :alt="instructor.title"
                />
                <div class="flex flex-col space-y-1">
                  <h2 class="h_tag_third">
                    {{ instructor.title }}
                  </h2>
                  <p
                    v-if="instructor.type === 'item_instructors'"
                    class="p_tag_third"
                  >
                    INSTRUCTOR
                  </p>
                </div>
              </div>
            </div>
            <div class="flex lg:justify-start justify-center">
              <div
                v-if="courseDetails?.video_course_type === 'live'"
                class="px-[22px] py-[13px] rounded-lg border border-[#FF6E1F] mt-[41px] inline-block"
              >
                <span class="p_tag_secondary"
                  >Live Class Starting from
                  <span class="!text-[#FF6E1F] !font-extrabold">
                    10 January</span
                  ></span
                >
              </div>
            </div>
          </div>
          <div
            v-if="courseDetails"
            class="bg-white w-full lg:mt-[160px] mt-[66px]"
          >
            <Menu :menuItems="options" :subQuery="false" />
            <Transition name="page" mode="out-in">
              <component
                :is="currentComp"
                :course-details="courseDetails"
                class="w-full h-full mt-[37px]"
              ></component>
            </Transition>
          </div>
        </div>
        <div
          v-if="!isProcessing"
          id="leftSection"
          class="relative w-full lg:w-[44%] lg:ml-[101px] z-[1]"
        >
          <!-- <div
            v-if="courseDetails?.title"
            class="w-full lg:absolute lg:top-[0px] lg:right-0 z-[1]"
          > -->
          <div
            class="lg:sticky lg:top-[120px] h-min course_overview lg:p-[32px] p-4 h-full"
          >
            <!-- <div
          v-if="courseDetails.over_view_video_url"
          class="w-full aspect-video"
        >
          <iframe
            width="100%"
            height="100%"
            :src="courseDetails.over_view_video_url"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div> -->

            <!-- <div v-if="courseDetails.banner_url" class="w-full flex justify-center">
          <img
            :src="courseDetails.banner_url"
            class="w-full aspect-auto object-contain max-w-[465px] max-h-[310px]"
            alt="courseDetails title"
          />
        </div> -->
            <div
              class="cursor-pointer rounded-[20px] md:min-h-[307px] min-h-[260px] !bg-[length:100%_100%] w-full flex justify-center items-center"
              :style="{
                '--bgImage': courseDetails.banner_url
                  ? `url('${courseDetails.banner_url}')`
                  : '',
              }"
              :class="
                courseDetails.banner_url
                  ? 'video_thumbnail'
                  : 'video_thumbnail_slug'
              "
              @click="
                setMediaUrl({
                  type: 'video',
                  media_url: getMainUrl(courseDetails.over_view_video_url),
                })
              "
            >
              <div
                class="w-[62px] h-[62px] flex justify-center items-center bg-white rounded-full"
              >
                <IconsPlay class="w-[27px] h-[24px] aspect-square" />
              </div>
            </div>
            <!-- <img
              v-else
              src="/images/course-details/courseIcon.png"
              class="w-full aspect-auto object-contain"
              alt="courseDetails title"
            /> -->
            <div
              class="flex items-center space-x-[18px] md:text-[36px] text-[#313131] font-semibold mt-[34px]"
            >
              <p
                v-if="
                  courseDetails.special_price && courseDetails.special_price > 0
                "
                class=""
              >
                ৳{{ courseDetails.special_price }}
              </p>
              <p
                :class="
                  courseDetails.special_price && courseDetails.special_price > 0
                    ? 'md:text-[20px] text-[#515B6F] line-through font-normal md:mt-[10px] mt[6px]'
                    : ''
                "
              >
                ৳{{ courseDetails.price }}
              </p>
            </div>

            <div class="mt-6">
              <button
                class="orange_button w-full"
                @click="
                  addToCart(courseDetails, courseDetails.id),
                    setSlugInformation(courseDetails)
                "
              >
                {{ $t("add_to_cart") }}
              </button>
            </div>
            <div class="mt-8">
              <!-- <p class="font-bold text-[22px] pb-4 hidden">This course includes:</p> -->
              <ul class="flex flex-col space-y-[36px] w-full text-lg">
                <li class="flex items-center space-x-6 h-auto">
                  <img
                    class="w-[28px] h-[28px] min-w-[28px]"
                    src="~/assets/img/courses/level.svg"
                  />
                  <p>
                    <span class="text-[#515B6F]">Level :</span
                    ><span class="text-[#313131]"> Beginner</span>
                  </p>
                </li>
                <li class="flex items-center space-x-6 h-auto">
                  <img
                    class="w-[28px] h-[28px] min-w-[28px]"
                    src="~/assets/img/courses/duration.svg"
                  />
                  <p>
                    <span class="text-[#515B6F]"
                      >{{ $t("total_video_duration") }} : </span
                    ><span class="text-[#313131]">
                      {{
                        convertTimeToHoursAndMinutes(courseDetails?.total_time)
                      }}</span
                    >
                  </p>
                </li>
                <li class="flex items-center space-x-6 h-auto">
                  <img
                    class="w-[28px] h-[28px] min-w-[28px]"
                    src="~/assets/img/courses/videos.svg"
                  />
                  <p>
                    <span class="text-[#515B6F]"
                      >{{ $t("total_videos") }} : </span
                    ><span class="text-[#313131]">
                      {{ courseDetails?.total_videos }}</span
                    >
                  </p>
                </li>
                <li class="flex items-center space-x-6 h-auto">
                  <img
                    class="w-[28px] h-[28px] min-w-[28px]"
                    src="~/assets/img/courses/download-files.svg"
                  />
                  <p>
                    <span class="text-[#515B6F]">Downloadable Files :</span
                    ><span class="text-[#313131]"> 8</span>
                  </p>
                </li>
                <li class="flex items-center space-x-6 h-auto">
                  <img
                    class="w-[28px] h-[28px] min-w-[28px]"
                    src="~/assets/img/courses/access.svg"
                  />
                  <span class="text-[#313131]">Lifetime Access</span>
                </li>
                <li class="flex items-center space-x-6 h-auto">
                  <img
                    class="w-[28px] h-[28px] min-w-[28px]"
                    src="~/assets/img/courses/device.svg"
                  />
                  <span class="text-[#313131]"
                    >Access from any Computer, Tablet or Mobile</span
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <!-- <div
      v-if="!isProcessing"
      class="custom-container flex lg:flex-row flex-col min-h-[70vh]"
    >
      <div v-if="courseDetails" class="bg-white w-full lg:w-[56%]">
        <Menu :menuItems="options" :subQuery="false" />
        <Transition name="page" mode="out-in">
          <component
            :is="currentComp"
            :course-details="courseDetails"
            class="w-full h-full mt-[37px]"
          ></component>
        </Transition>
      </div>
      <div class="lg:w-[44%] w-full"></div>
    </div> -->
    <section
      id="moreCourses"
      :class="
        courseDetails?.title && !isProcessing ? 'opacity-100' : 'opacity-0'
      "
    >
      <div class="bg-[#FFF9F6]">
        <div class="custom-container flex flex-col space-y-12">
          <div
            class="flex md:flex-row flex-col md:justify-between justify-center md:space-x-6 md:space-y-0 space-y-8"
          >
            <h2 class="h_tag_primary md:text-left text-center">
              Browser More Courses
            </h2>
            <NuxtLink
              :to="localePath('/courses')"
              class="orange_button flex items-center justify-center space-x-3 mx-auto"
            >
              <span>See All</span>
              <IconsLeftArrow class="w-3.5 h-3.5 text-white" color="#FFFFFF" />
            </NuxtLink>
          </div>
          <LazyCoursesAllCourses
            v-if="courseData.data && courseData.data.length > 0"
            :coursesData="courseData.data"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.video_thumbnail {
  background-image: var(--bgImage);
}
.video_thumbnail_slug {
  background-image: url("~/assets/img/default/video-thumbnail2.webp");
  background-repeat: no-repeat;
  background-size: contain;
  @apply bg-[length:100%_100%];
}
.hero_section {
  height: var(--height);
}
.modal-container {
  @apply bg-white rounded-lg shadow-xl relative border-[#00000048];
  transition: all 0.3s ease;
}
.course_overview {
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
}
.modal-mask {
  transition: opacity 0.3s ease;
}

.modal-enter-from .modal-mask,
.modal-leave-to .modal-mask {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
}

.has-tooltip {
  @apply relative;
}

.tooltip {
  @apply absolute text-sm bg-primary-red text-white z-[100] -left-2 -top-14 lg:-top-20 text-left invisible p-1.5 rounded-xl shadow-lg w-full min-w-[200px] whitespace-normal break-words;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}

.scroll::-webkit-scrollbar {
  width: 6px;
}

/* Handle */
.scroll::-webkit-scrollbar-thumb {
  background: red;
}

.top-box {
  box-shadow: inset 0 7px 9px -7px rgba(0, 0, 0, 0.4);
}

.bottom-box {
  box-shadow: inset 0 -7px 9px -7px rgba(0, 0, 0, 0.4);
}

.top-bottom-box {
  box-shadow: inset 0px 11px 8px -10px rgba(0, 0, 0, 0.4),
    inset 0px -11px 8px -10px rgba(0, 0, 0, 0.4);
}
.menu-wrapper {
  overflow-x: auto;
  white-space: nowrap;
  position: relative;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5); /* Optional: adds shadow to indicate depth */
}

.menu-content {
  display: inline-block;
  padding: 20px;
}

.menu-item {
  display: inline-block;
  padding: 10px;
  margin: 0 20px;
  background-color: lightgray; /* Example styling */
}

/* Initial state, both sides blurred */
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px; /* Adjust based on your design */
  pointer-events: none;
  background: rgba(255, 255, 255, 0.9);
  /* background: linear-gradient(to left, transparent, rgba(255, 255, 255, 1)); */
}

.left-overlay {
  left: 0;
  transform: rotateY(180deg);
}

.right-overlay {
  right: 0;
}
</style>
