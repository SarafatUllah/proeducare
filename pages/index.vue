<script setup>
// import { Viewer } from "@photo-sphere-viewer/core";
// import "@photo-sphere-viewer/core/index.css";
import heroThumb from "~/assets/img/default/hero-thumb.webp";
import testimonialThumb from "~/assets/img/default/testimonial-thumb.webp";
import userIcon from "~/assets/img/icon/user.png";
import CodeIcon from "~/assets/img/why-choose-us/code.svg";
import GridIcon from "~/assets/img/why-choose-us/grid.svg";
import GroupIcon from "~/assets/img/why-choose-us/group.svg";
import GrowthIcon from "~/assets/img/why-choose-us/growth.svg";
import IdeaIcon from "~/assets/img/why-choose-us/idea.svg";
import JobIcon from "~/assets/img/why-choose-us/job.svg";
import ScheduleIcon from "~/assets/img/why-choose-us/schedule.svg";
import SuccessIcon from "~/assets/img/why-choose-us/success.svg";
import SupportIcon from "~/assets/img/why-choose-us/support.svg";
import InstructorCard from "~/components/instructors/instructorCard.vue";
import Card from "../components/learning-section/card.vue";
import { useInstructorStore } from "~/stores/instructors";
import { useBlogsStore } from "~/stores/blogs";
import { storeToRefs } from "pinia";
import PointingIcon from "~/assets/img/speciality/pointing.svg";
import CodingIcon from "~/assets/img/speciality/coding.svg";
import FocusedIcon from "~/assets/img/speciality/focused.svg";
import EspeciallyIcon from "~/assets/img/speciality/especially.svg";
import OpportunityIcon from "~/assets/img/speciality/opportunity.svg";
import FundingIcon from "~/assets/img/speciality/funding.svg";
import MentoringIcon from "~/assets/img/speciality/mentoring.svg";
import VideoThumbnail from "~/assets/img/speciality/foiAsset.svg";
import { useTheVideoStore } from "~/stores/theVideo";

// const { isSmallerOrEqual } = useBreakpoints();
// const nuxtApp = useNuxtApp();
// const isSmallDesktop = computed(() => isSmallerOrEqual(1024));
// const isMedium = computed(() => isSmallerOrEqual(768));
// const isMobile = computed(() => isSmallerOrEqual(550));
const localePath = useLocalePath();
const { latestBlogs } = storeToRefs(useBlogsStore());
const { setMediaUrl } = useTheVideoStore();

const specialies = ref([
  {
    icon: PointingIcon,
    text: "Why choose ProEdu Care?",
    type: "video",
    thumbnail: VideoThumbnail,
    description:
      "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
    selected: true,
  },
  {
    icon: CodingIcon,
    text: "Prioritizing learning & outcome",
    type: "video",
    thumbnail: VideoThumbnail,
    description:
      "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
    selected: false,
  },
  {
    icon: FocusedIcon,
    text: "Focused ourse curriculum for being a truly skilled professional",
    type: "video",
    thumbnail: VideoThumbnail,
    description:
      "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
    selected: false,
  },
  {
    icon: EspeciallyIcon,
    text: "Especially designed for advanced career growth",
    type: "video",
    thumbnail: VideoThumbnail,
    description:
      "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
    selected: false,
  },
  {
    icon: OpportunityIcon,
    text: "Working opportunity with real projects",
    type: "video",
    thumbnail: VideoThumbnail,
    description:
      "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
    selected: false,
  },
  {
    icon: FundingIcon,
    text: "Opportunity to pitch idea and get funding",
    type: "video",
    thumbnail: VideoThumbnail,
    description:
      "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
    selected: false,
  },
  {
    icon: MentoringIcon,
    text: "Mentoring for being a successful entrepreneur",
    type: "video",
    thumbnail: VideoThumbnail,
    description:
      "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
    selected: false,
  },
]);
const selectedSpecialy = ref({
  icon: PointingIcon,
  text: "Why choose ProEdu Care?",
  type: "video",
  thumbnail: VideoThumbnail,
  description:
    "Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy. Whether you prefer the convenience and flexibility of online classes.Explore a new era of education with ProEdu Care Academy.",
  selected: true,
});

const setSelectedSpecialy = (text) => {
  specialies.value.forEach((element) => {
    if (element.text === text) {
      element.selected = true;
      selectedSpecialy.value = element;
    } else {
      element.selected = false;
    }
  });
};

const getMainUrl = (mediaUrl) => {
  if (mediaUrl.includes("v=")) {
    const mainMediaUrl = mediaUrl.split("v=");
    return "https://www.youtube.com/embed/" + mainMediaUrl[1];
  } else {
    return mediaUrl;
  }
};

const {
  HOME_HERO,
  SUCCESS_RATES,
  SLIDER,
  SUCCESS_STUDENT_VIDEOS,
  SEE_INSTITUTES,
  apiBaseUrl,
  SUCCESS_STORY_STUDENTS,
  COURSES,
} = useUrls();

// API call
const { data: pageOverViewRes } = await useFetch(HOME_HERO);
const pageOverView = computed(() => pageOverViewRes.value?.data);

const { data: courseData } = await useFetch(`${COURSES}?per_page=6`);

// const courseSlider = computed(() => data.value?.data);
// const courses = computed(() => {
//   const live = data.value?.data?.filter(
//     (course) => course?.video_course_type === "live"
//   );
//   const recorded = data.value?.data?.filter(
//     (course) => course?.video_course_type === "recorded"
//   );
//   return { live, recorded };
// });

// const { data: popularCourseSliderRes } = await useFetch(
//   `${apiBaseUrl}/most-popular-courses`
// );
// const popularCourseSlider = computed(() => popularCourseSliderRes.value?.data);

// const { data: successRatesRes } = await useFetch(SUCCESS_RATES);
// const successRates = computed(() => successRatesRes.value?.data);

// const { data: courseDetailsSliderRes } = await useFetch(
//   `${SLIDER}/course-details`
// );
// const courseDetailsSlider = computed(() => courseDetailsSliderRes.value?.data);

// const { data: consultationSliderRes } = await useFetch(
//   `${SLIDER}/consultation`
// );
// const consultationSlider = computed(() => consultationSliderRes.value?.data);

// const { data: practicalSliderRes } = await useFetch(`${SLIDER}/practical`);
// const practicalSlider = computed(() => practicalSliderRes.value?.data);

// const { data: techniciansSliderRes } = await useFetch(`${SLIDER}/technicians`);
// const techniciansSlider = computed(() => techniciansSliderRes.value?.data);

// const { data: successReportsSliderRes } = await useFetch(
//   `${SLIDER}/success-reports`
// );
// const successReportsSlider = computed(
//   () => successReportsSliderRes.value?.data
// );

// const { data: successStudentVideosRes } = await useFetch(
//   SUCCESS_STUDENT_VIDEOS
// );
// const successStudentVideos = computed(
//   () => successStudentVideosRes.value?.data
// );

// const seeInstitutes = ref("");
// const getInstitute = async () => {
//   const { data, pending, error } = await useFetch(SEE_INSTITUTES);

//   const setData = () => {
//     if (!pending.value) {
//       if (data.value) {
//         seeInstitutes.value = data.value.data;
//         setTimeout(() => {
//           if (seeInstitutes.value.is_360_degree_content === 1) {
//             if (process.client) {
//               const viewer = new Viewer({
//                 container: document.getElementById("viewer"),
//                 panorama: seeInstitutes.value.media_url,
//               });
//             }
//           }
//         }, 500);
//       } else if (error.value) {
//         nuxtApp.$toast("clear");
//         nuxtApp.$toast("error", {
//           message: error.value.data.message,
//           className: "toasted-bg-success",
//         });
//       }
//     } else {
//       setTimeout(() => {
//         setData();
//       }, 300);
//     }
//   };
//   setData();
// };

const successStoryStudent = ref([]);
const currentStudent = ref(null);
const currentStudentindex = ref(0);

const fetchSuccessStoryStudent = async () => {
  const { data: successStoryStudentRes, pending } = await useFetch(
    `${SUCCESS_STORY_STUDENTS}/null?per_page=5`
  );
  if (!pending.value) {
    successStoryStudent.value = successStoryStudentRes.value.data;
    currentStudent.value = successStoryStudentRes.value.data[0];
  }
};
await fetchSuccessStoryStudent();
const isPreviousEnable = computed(() => currentStudentindex.value > 0);
const isNextEnable = computed(
  () => currentStudentindex.value < successStoryStudent.value.length - 1
);
const previoueStudent = () => {
  if (isPreviousEnable.value) {
    currentStudentindex.value--;
    currentStudent.value = successStoryStudent.value[currentStudentindex.value];
  }
};

const nextStudent = () => {
  if (isNextEnable.value) {
    currentStudentindex.value++;
    currentStudent.value = successStoryStudent.value[currentStudentindex.value];
  }
};

// const currentTab = ref("liveCourse");
// const setCurrentTab = async (tab) => {
//   currentTab.value = tab;
// };

const blogsOverview = {
  frame: "BLOGS",
  title: "Check out our latest blog posts on freelancing",
};
const overview = ref([
  // {
  //   id: 1,
  //   name: "Success Stories",
  //   value: "10K+",
  // },
  {
    id: 2,
    name: "Expert Instructors",
    // value: "168+",
  },
  {
    id: 3,
    name: "Expert Mentors",
    // value: "24K+",
  },
  {
    id: 4,
    name: "Full time Support",
    // value: "1000",
  },
]);
const testimonial = ref({
  name: "TESTIMONIALS",
  title: "Hear What Our Successful Students Say About Us",
  sub_title:
    "Craft your brilliance at Your Institute. Knowledge fuels judgment for a life well-lived. Ready to soar?",
  rating: 4.8,
  review: `"Really glad to have a call with Lorem – super invaluable. She is
              full of energy and her ability to listen, and offer thoughtful
              advice was very helpful. Will definitely be booking with her in
              the future. Thanks"`,
  profileImage: "http://img.youtube.com/vi/6P9SjEKdvVY/0.jpg",
  username: "Lorem Ipsum",
  userLavel: "Level 2 Seller at Fiverr",
  media_link: "https://www.youtube.com/embed/r-oy_fIcK90",
  cover_image: testimonialThumb,
  type: "video",
});

const whyChooseUsData = {
  frame: "WHY CHOOSE US",
  title: "Why Learning With Us?",
  description:
    "Empower your journey Knowledge, Judgment, Life. Join  The Best Digital Marketing IT Institute in Bangladesh. ",
  features: [
    {
      image: GridIcon,
      title: "Diverse & Exclusive Courses",
      description:
        "Explore a diverse range of courses tailored to your interests and career...",
    },
    {
      image: GroupIcon,
      title: "Expert Instructors",
      description:
        "Trust our committed Instructors to lead you toward excellence in your pursuit of knowledge.",
    },
    {
      image: ScheduleIcon,
      title: "Flexible Schedule",
      description:
        "Learn at your own pace with flexible scheduling options to fit your busy lifestyle.",
    },
    {
      image: SupportIcon,
      title: "Continuous Support",
      description:
        "Receive ongoing support and access additional resources for an enriching learning journey.",
    },
    {
      image: SuccessIcon,
      title: "Especially designed for advanced career growth",
      description:
        "In the fast-paced world of technology, LMS is your launchpad to the growth of your career.",
    },
    {
      image: CodeIcon,
      title: "Working opportunity with real projects",
      description:
        "You’re coding, creating, and collaborating on the same types of projects you’ll encounter in your...",
    },
    {
      image: GrowthIcon,
      title: "Opportunity to pitch idea and get funding",
      description:
        "Our commitment to your success extends past the final lecture, past the certification, into the realm where...",
    },
    {
      image: IdeaIcon,
      title: "Mentoring for being a successful entrepreneur",
      description:
        "Our visionary mentorship program selects high-caliber graduates and welcomes them into an elite...",
    },
    {
      image: JobIcon,
      title: "Get directly job offer from (Company Name)",
      description:
        "In the fast-paced world of technology, LMS is your launchpad to the growth of your career.",
    },
  ],
};

const { instructors } = storeToRefs(useInstructorStore());
const router = useRouter();
// router.replace(localePath("/coming-soon"))
</script>

<template>
  <div>
    <section class="w-full h-full relative">
      <div v-if="pageOverView" class="hero-container w-full h-full">
        <div
          class="flex md:space-y-[10px] space-y-5 flex-col justify-center items-center w-full h-full 2xl:py-[200px] py-[100px] lg:px-0 px-4"
        >
          <p
            class="text-white lg:text-xl md:text-xl text-base font-semibold text-center lg:max-w-[905px] w-full"
          >
            Empower Your Future - Learn form the Best, with the Best!
          </p>
          <h1
            class="text-white lg:text-[72px] lg:leading-[88px] md:text-[52px] md:leading-[68px] text-[32px] leading-[48px] font-bold text-center lg:max-w-[905px] w-full"
          >
            Elevate Your Skills at ProEdu Care Academy
          </h1>
          <p
            class="text-white lg:text-[22px] md:leading-[34px] md:text-xl text-base text-center lg:max-w-[905px] w-full"
          >
            Discover top-tier courses in WordPress Plugin Development, Web
            Application Development, Flutter, Laravel, Product Management,
            Digital Marketing and more. At ProEdu Care Academy, we equip you
            with the essential skills for today’s digital world.
          </p>
          <NuxtLink
            to="/courses"
            class="orange_button !font-medium mx-auto md:!mt-[80px] !mt-[70px]"
            >View Courses</NuxtLink
          >
        </div>
      </div>
      <NoPageFound v-else minHeight="420" class="custom-container" />
      <!-- <div
        class="flex md:flex-nowrap flex-wrap custom-container min-[1400px]:space-x-[90px] lg:space-x-[60px] md:space-x-[22px]"
      >
        <LazyTheOverview
          v-for="(item, index) in overview"
          :key="index"
          :item="item"
          :index="index"
          scoureColor="text-[#FF6E1F]"
          titleColor="text-[#515B6F]"
          lineColor="bg-[#FF6E1F]"
        >
        </LazyTheOverview>
      </div> -->
    </section>
    <section id="speciality" class="custom-container !pt-[120px]">
      <div class="text-center lg:w-2/3 lg:mx-auto w-full">
        <p class="frame">OUR SPECIALITY</p>
        <h2 class="h_tag_primary mt-[3px]">Why Should You Choose Us?</h2>
        <p class="lg:px-[50px] pt-[18px] pb-[73px] p_tag_secondary">
          Explore a new era of education with ProEdu Care Academy. Whether you
          prefer the convenience and flexibility of online classes.
        </p>
      </div>
      <div
        class="flex md:flex-row flex-col justify-center lg:space-x-[102px] md:space-x-6 md:space-y-0 space-y-8"
      >
        <div class="flex flex-col space-y-[5px] lg:w-[45%] w-full">
          <div
            class="cursor-pointer flex space-x-5 items-center py-[15px] px-5 rounded-[10px] text-[#1A2134] font-bold text-xl"
            :class="specialy.selected ? 'bg-[#FFEAE1]' : ''"
            v-for="(specialy, index) in specialies"
            :key="index"
            @click.stop="setSelectedSpecialy(specialy.text)"
          >
            <img
              width="70"
              height="70"
              :src="specialy.icon"
              :alt="specialy.text"
            />
            <p>{{ specialy.text }}</p>
          </div>
        </div>
        <div
          class="content-box flex flex-col lg:w-[55%] w-full md:max-w-[580px] md:p-10 p-4 md:self-start self-center"
        >
          <div
            v-if="selectedSpecialy.type"
            class="cursor-pointer video_thumbnail w-full 2xl:min-h-[15vw] md:h-[22vw] min-h-[48vw] flex justify-center items-center"
            :style="{
              '--bgImage': selectedSpecialy.thumbnail
                ? `url('${selectedSpecialy.thumbnail}')`
                : '',
            }"
            @click="
              setMediaUrl({
                type: selectedSpecialy.type,
                media_url: getMainUrl(
                  'https://www.youtube.com/embed/https://www.youtube.com/watch?v=rKFja-ZUGAk'
                ),
              })
            "
          >
            <div
              class="w-[62px] h-[62px] flex justify-center items-center bg-white rounded-full"
            >
              <IconsPlay
                class="w-[27px] h-[24px] aspect-square"
                color="#DF0400"
              />
            </div>
          </div>
          <img
            v-else
            class="w-full h-full md:max-h-[282px] max-h-[338px]"
            src="~/assets/img/speciality/foiAsset.svg"
            alt=""
          />
          <p class="text-lg text-[#515B6F] mt-5">
            {{ selectedSpecialy.description }}
          </p>
        </div>
      </div>
    </section>
    <!-- popular courses -->
    <section id="our-courses" class="bg-[#FFF9F6]">
      <div class="custom-container">
        <div class="text-center lg:w-2/3 lg:mx-auto w-full">
          <p class="frame">OUR COURSE</p>
          <h2 class="h_tag_primary mt-[3px]">Browse our popular courses</h2>
          <p class="lg:px-[50px] pt-[18px] pb-[73px] p_tag_secondary">
            Elevate your life with education where knowledge meets judgment for
            a standout existence. Join us at Company name here – Your Gateway to
            Brilliance!
          </p>
        </div>
        <LazyCoursesAllCourses
          v-if="courseData.data && courseData.data.length > 0"
          :coursesData="courseData.data"
        />
      </div>
    </section>

    <section id="instructors" class="bg-[white] lg:pt-5">
      <div
        class="!pl-0 !pr-0 text-center lg:mx-auto w-full !pb-[74px] pt-[43px]"
      >
        <div
          class="mx-auto px-[4.62vw] lg:px-[2.62vw] xl:px-[8.62vw] 2xl:px-0 2xl:max-w-[1292px] w-full"
        >
          <p class="frame">INSTRUCTOR</p>
          <h2 class="h_tag_primary mt-[3px]">Learn from Industry Titans</h2>
          <p class="mt-[18px] mb-[73px] p_tag_secondary lg:px-[130px]">
            Our educators aren’t just teachers; they’re industry professionals
            ready to share the blueprint to their success. With personalized
            mentoring and deep insights, prepare to learn from the real-world
            experiences of your mentors.
          </p>
        </div>
        <div class="flex space-x-8 w-full h-[420px] sliding-container relative overflow-hidden">
          <div class="flex space-x-8 sliding-animation h-[343px]">
            <InstructorCard
              v-for="(instructor, index) in instructors"
              :key="index"
              :instructor="instructor"
            />
          </div>
          <div class="flex space-x-8 sliding-animation h-[343px]">
            <InstructorCard
              v-for="(instructor, index) in instructors"
              :key="index"
              :instructor="instructor"
            />
          </div>
        </div>
        <NuxtLink to="/instructors" class="orange_button !font-medium"
          >View All Mentors</NuxtLink
        >
      </div>
    </section>
    <!-- 
    <section id="whyChooseUs" class="bg-[#FFF9F6]">
      <div
        class="custom-container lg:!pl-0 flex lg:flex-row lg:justify-center xl:items-start items-center flex-col lg:space-y-0 space-y-8 lg:space-x-11 space-x-0"
      >
        <div>
          <img
            class="xl:w-[681px] xl:h-[730px] xl:min-w-[681px] md:w-[481px] md:h-[530px] md:min-w-[481px] w-[281px] h-[300px] min-w-[281px]"
            src="~/assets/img/why-choose-us/why-choose-us-hero.webp"
            alt="why-choose-us-hero image"
          />
        </div>

        <div v-if="whyChooseUsData" class="flex flex-col space-y-14">
          <div class="inline-block lg:text-left text-center">
            <p class="frame mt-[27px]">{{ whyChooseUsData.frame }}</p>
            <h2 class="h_tag_primary mt-[10px]">{{ whyChooseUsData.title }}</h2>
            <p class="p_tag_secondary mt-[18px]">
              {{ whyChooseUsData.description }}
            </p>
          </div>
          <div
            v-if="
              whyChooseUsData.features && whyChooseUsData.features.length > 0
            "
            class="grid grid-cols-2 sm:gap-5 gap-3 lg:max-w-[600px] w-full lg:justify-items-start justify-items-center"
          >
            <LazyWhyChooseUsCard
              v-for="(feature, index) in whyChooseUsData.features"
              :key="index"
              :feature="feature"
            />
          </div>
          <NuxtLink
            to="/about-us"
            class="orange_button lg:ml-0 lg:mr-auto mx-auto"
            >About Us</NuxtLink
          >
        </div>
      </div>
    </section> -->

    <section id="whyChooseUs" class="bg-[#FFF9F6]">
      <div class="custom-container">
        <div
          class="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between"
        >
          <div class="lg:w-1/2 flex flex-col items-center lg:items-start">
            <p class="frame">{{ whyChooseUsData.frame }}</p>
            <h2 class="h_tag_primary mt-[10px]">{{ whyChooseUsData.title }}</h2>
            <p class="p_tag_secondary mt-[18px] text-center lg:text-left">
              {{ whyChooseUsData.description }}
            </p>
          </div>
          <NuxtLink to="/about-us" class="w-fit orange_button hidden lg:block"
            >About Us</NuxtLink
          >
        </div>

        <div
          v-if="whyChooseUsData.features && whyChooseUsData.features.length > 0"
          class="mt-[57px] grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-2 gap-4 lg:gap-8"
        >
          <LazyWhyChooseUsCard
            v-for="(feature, index) in whyChooseUsData.features"
            :key="index"
            :feature="feature"
          />
        </div>
        <NuxtLink
          to="/about-us"
          class="mt-[30px] w-fit mx-auto orange_button !text-sm lg:!text-xl block lg:hidden"
          >About Us</NuxtLink
        >
      </div>
    </section>

    <!-- <section id="learning" class="bg-[#FFF9F6] lg:pt-5">
      <div class="custom-container text-center lg:mx-auto w-full">
        <p class="frame">LEARNING</p>
        <h2 class="h_tag_primary mt-[3px]">
          Online or On-site: The Future of Learning Awaits
        </h2>
        <p class="pt-[18px] pb-[73px] p_tag_secondary lg:px-[130px]">
          Explore a new era of education with LMS. Whether you prefer the
          convenience and flexibility of online classes from the comfort of your
          home, or the immersive and interactive experience of our in-person
          sessions, we’ve got you covered.
        </p>
        <div
          class="flex flex-col md:flex-row gap-8 items-center justify-center"
        >
          <Card label="Online" />
          <Card label="On-Site" />
        </div>
      </div>
    </section> -->

    <!-- <section id="testimonial" class="custom-container pt-[90px]">
      <p class="frame">
        {{ testimonial.name }}
      </p>
      <div
        class="flex flex-col md:flex-row items-start justify-center space-y-20 md:space-y-0 md:space-x-10 lg:space-x-20 pt-4"
      >
        <div class="w-full md:w-[60%]">
          <div class="w-full">
            <h2 class="h_tag_primary pb-2">
              {{ testimonial.title }}
            </h2>
            <p class="p_tag_secondary">
              {{ testimonial.sub_title }}
            </p>
          </div>
          <div
            class="bg-[#FFF9F6] rounded-4 p-[34px] w-full lg:w-[calc(100%-32px)] mt-[52px] relative"
          >
            <IconsDoubleCote
              class="absolute top-[22px] right-10 w-4 md:w-8 lg:w-10"
            />
            <div class="flex space-x-2">
              <Rating :rating="testimonial.rating" />
              <p class="text-sm font-medium">{{ testimonial.rating }}</p>
            </div>
            <div
              class="p_tag_secondary pt-3 pb-[22px]"
              v-html="currentStudent?.bio"
            ></div>
            <div class="flex items-center justify-start space-x-2 text-sm">
              <img
                :src="
                  currentStudent?.avatar ? currentStudent?.avatar : userIcon
                "
                :alt="currentStudent.name"
                class="w-[38px] aspect-square rounded-full border object-cover"
              />
              <p class="p_tag_third">{{ currentStudent.name }}</p>
              <span class="px-4">|</span>
              <p class="p_tag_third">{{ testimonial.userLavel }}</p>
            </div>
          </div>
          <div
            class="flex items-center justify-center md:justify-end pt-7 lg:pr-8"
          >
            <div class="flex space-x-4">
              <button
                @click="previoueStudent"
                :disabled="!isPreviousEnable"
                class="h-10 w-10 rounded-full border border-orange-primary flex justify-center items-center bg-white text-orange-primary hover:bg-orange-primary hover:text-white"
                :class="!isPreviousEnable ? 'opacity-60' : ''"
              >
                <IconsRightArrow class="rotate-180" />
              </button>
              <button
                @click="nextStudent"
                :disabled="!isNextEnable"
                class="h-10 w-10 rounded-full border border-orange-primary flex justify-center items-center bg-white text-orange-primary hover:bg-orange-primary hover:text-white"
                :class="!isNextEnable ? 'opacity-60' : ''"
              >
                <IconsRightArrow class="" />
              </button>
            </div>
          </div>
        </div>
        <div class="w-full md:w-[40%] px-10 md:px-0">
          <div class="w-full h-full rounded-2xl relative">
            <img
              src="/icons/school.svg"
              class="absolute -top-[30px] -right-5 lg:-top-[46px] lg:-right-[26px] h-[60px] w-[60px] md:w-20 md:h-20 xl:w-[96px] xl:h-[96px] rounded-xl z-[1]"
              :alt="testimonial.title"
            />
            <EmbadedVideoPlayer
              v-if="testimonial.type === 'video'"
              playerId="testimonialPlayer"
              videoClass="w-full aspect-[480/598] rounded-2xl"
              playBtnClass="w-10 sm:w-16 xl:w-[82px]"
              :videoTitle="testimonial.title"
              :videoUrl="testimonial.media_link"
              :coverImage="
                testimonial?.cover_image ? testimonial?.cover_image : heroThumb
              "
            />
            <img
              v-else
              :src="testimonial.media_link"
              class="object-cover w-full aspect-[480/598] rounded-2xl"
              :alt="testimonial.title"
            />
          </div>
        </div>
      </div>
    </section> -->

    <!-- <section id="latestBlogs" class="bg-[#FFF9F6]">
      <div class="custom-container flex flex-col items-center space-y-[66.5px]">
        <div
          class="w-full flex sm:flex-row flex-col sm:justify-between sm:space-x-6 sm:space-y-0 space-y-6"
        >
          <div class="inline-block sm:text-left text-center">
            <p class="frame">{{ blogsOverview.frame }}</p>
            <h2 class="h_tag_primary mt-[10px] max-w-[620px]">
              {{ blogsOverview.title }}
            </h2>
          </div>
          <NuxtLink
            :to="localePath('/blog')"
            class="orange_button lg:ml-0 lg:mr-auto mx-auto !mb-auto"
            >All Blogs</NuxtLink
          >
        </div>
        <div
          v-if="latestBlogs && latestBlogs.length > 0"
          class="grid grid-cols-2 sm:gap-8 gap-3 lg:justify-items-start justify-items-center"
        >
          <BlogLatestCard
            v-for="(blog, index) in latestBlogs"
            :key="index"
            :blog="blog"
          />
        </div>
      </div>
    </section> -->

    <!-- <section id="courses" class="custom-container">
      <div v-if="courseSlider" class="grid grid-cols-1 py-20">
        <div class="flex flex-col items-center text-center">
          <h3 class="sub-heading">{{ $t("popular_courses_title") }}</h3>
          <p class="text-small w-full md:w-1/2 pt-4 pb-10">
            {{ $t("popular_courses_text") }}
          </p>
        </div>
        <BaseCourseCarousel :slider="courseSlider" class="mb-4" />
      </div>
      <div class="hidden justify-center py-20">
        <BaseSecondaryCarousel
          :slider="courseDetailsSlider ? courseDetailsSlider : []"
          class="w-[916px]"
        />
      </div>
    </section> -->

    <!-- <section v-if="popularCourseSlider" class="py-20 hidden custom-container">
      <div class="flex flex-col items-center text-center">
        <h3 class="sub-heading mt-0">{{ $t("popular_courses_title") }}</h3>
        <p class="text-small w-full md:w-1/2 pt-4 pb-10">
          {{ $t("popular_courses_text") }}
        </p>
      </div>
      <CourseDetails :courses="popularCourseSlider" />
    </section> -->
    <!-- <section class="py-20 custom-container">
      <div class="grid grid-cols-1">
        <div class="flex flex-col items-center text-center">
          <h3 class="sub-heading mt-0 pb-6">{{ $t("success_story_title") }}</h3>
          <p class="text-small w-full md:w-1/2 pb-10 hidden">
            {{ $t("success_story_text") }}
          </p>
        </div>
        <BaseSuccessStoryCarousel
          :slider="successStudentVideos ? successStudentVideos : []"
          class="mb-4"
        />
        <NuxtLink
          :to="localePath('/success-story')"
          class="font-medium hover:font-bold px-6 py-2 text-center mx-auto rounded-full border bg-primary-red text-white"
        >
          {{ $t("see_more") }}
        </NuxtLink>
      </div>
    </section> -->

    <!-- <section class="py-20 custom-container">
      <div class="flex flex-col items-center text-center">
        <h3 class="sub-heading mt-0">{{ $t("special_service_title") }}</h3>
        <p class="text-small px-4 w-full md:w-7/12 pt-4 hidden">
          {{ $t("special_service_text") }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        <div
          v-for="success in successRates"
          :key="success.id"
          class="min-h-[335px] h-auto flex justify-center items-start shadow-[0_0px_15px_-6px_rgba(0,0,0,0.5)]"
        >
          <div class="h-full text-center px-10 pt-10 pb-4">
            <span
              v-if="success.is_show_percentage"
              class="sub-heading md:text-4xl font-extrabold"
              >{{ success.percentage }}%</span
            >
            <h3
              v-if="success.title"
              class="sub-heading text-2xl md:text-[28px] pt-2"
            >
              {{ success.title }}
            </h3>
            <div
              v-if="success.content"
              class="pt-4 break-word"
              v-html="success.content"
            ></div>
          </div>
        </div>
      </div>
    </section> -->

    <!-- <section v-if="courseSlider" class="py-20 custom-container">
      <div class="flex flex-col items-center text-center">
        <h3 class="sub-heading mt-0">{{ $t("admission_going_title_2") }}</h3>
        <p class="text-small w-full md:w-1/2 pt-4 pb-10">
          {{ $t("admission_going_subtitle") }}
        </p>
      </div>

      <div
        class="w-full flex gap-10 items-center text-center text-xl font-semibold my-10"
      >
        <p
          class="border-b-[3px] pb-4 pr-2 w-fit xl:w-1/2"
          :class="
            currentTab === 'liveCourse'
              ? 'border-primary-red text-primary-red'
              : 'border-[#9C9C9C]'
          "
        >
          <span
            class="cursor-pointer lg:px-1 py-1 hover:text-primary-red w-full"
            @click="setCurrentTab('liveCourse')"
            >{{ $t("live_course") }}</span
          >
        </p>
        <p
          class="border-b-[3px] pb-4 px-2 w-fit xl:w-1/2"
          :class="
            currentTab === 'recordedCourse'
              ? 'border-primary-red text-primary-red'
              : 'border-[#9C9C9C]'
          "
        >
          <span
            class="cursor-pointer lg:px-1 py-1 hover:text-primary-red w-full"
            @click="setCurrentTab('recordedCourse')"
            >{{ $t("recorded_course") }}</span
          >
        </p>
      </div>
      <Transition name="fade" mode="out-in">
        <CourseDetails
          v-if="currentTab === 'liveCourse'"
          :courses="courses.live"
        />
        <CourseDetails
          v-else-if="currentTab === 'recordedCourse'"
          :courses="courses.recorded"
        />
      </Transition>
    </section> -->

    <!-- <section class="space-y-10 text-center lg:text-left py-20 custom-container">
      <div>
        <h2 class="sub-heading pb-10">
          {{ $t("join_our_free_seminar") }}
        </h2>
        <div
          class="flex flex-col-reverse lg:flex-row gap-10 xl:gap-16 2dx:gap-24 items-center md:px-10 lg:px-0"
        >
          <BaseImageVideoCarousel
            class="w-full md:max-w-[630px] lg:max-w-full lg:w-1/2"
            :slider="consultationSlider ? consultationSlider : []"
            :show-navigation="true"
          />
          <div
            class="flex flex-col items-start gap-4 w-full lg:w-1/2 text-sm md:text-base lg:text-2xl"
          >
            <p class="w-full">
              {{ $t("consultation_slider_text") }}
            </p>
            <NuxtLink
              :to="localePath('/free-seminar')"
              class="px-6 py-2 bg-primary-red text-white rounded-full font-semibold"
            >
              {{ $t("free_seminar_schedule") }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div>
        <div
          class="flex flex-col lg:flex-row gap-10 xl:gap-16 2dx:gap-24 items-center"
        >
          <div class="w-full lg:w-1/2 space-y-4 md:px-10 lg:px-0">
            <h2 class="sub-heading">{{ $t("eligible_slider") }}</h2>

            <p class="text-sm md:text-base lg:text-2xl">
              {{ $t("eligible_slider_text") }}
            </p>
          </div>
          <BaseImageVideoCarousel
            class="w-full md:max-w-[630px] lg:max-w-full lg:w-1/2"
            :slider="practicalSlider ? practicalSlider : []"
            :show-navigation="true"
          />
        </div>
      </div>

      <div>
        <div
          class="flex flex-col-reverse lg:flex-row gap-10 xl:gap-16 2dx:gap-24 items-center"
        >
          <BaseImageVideoCarousel
            class="w-full md:max-w-[630px] lg:max-w-full lg:w-1/2"
            :slider="techniciansSlider ? techniciansSlider : []"
            :show-navigation="true"
          />
          <div class="w-full lg:w-1/2 space-y-4 md:px-10 lg:px-0">
            <h2 class="sub-heading">
              {{ $t("glorius_years") }}
            </h2>
            <p class="text-sm md:text-base lg:text-2xl">
              {{ $t("glorius_years_text") }}
            </p>
          </div>
        </div>
      </div>
    </section> -->
    <!-- <ClientOnly>
      <section
        v-if="seeInstitutes && seeInstitutes.media_url !== null"
        class="pt-20 hidden"
      >
        <h4 class="sub-heading mb-10 text-center">{{ $t("panorma_title") }}</h4>
        <div
          v-if="seeInstitutes.is_360_degree_content === 1"
          id="viewer"
          style="height: 500px; margin: auto"
          :style="[
            isMobile
              ? { width: '320px' }
              : isMedium
              ? { width: '500px' }
              : isSmallDesktop
              ? { width: '600px' }
              : { width: '100%' },

            isSmallDesktop ? { height: '500px' } : { height: '80vh' },
          ]"
        ></div>
        <div
          v-else-if="seeInstitutes.media_type === 'image'"
          style="height: 500px; margin: auto"
          :style="[
            isMobile
              ? { width: '320px' }
              : isMedium
              ? { width: '500px' }
              : isSmallDesktop
              ? { width: '600px' }
              : { width: '100%' },

            isSmallDesktop ? { height: '500px' } : { height: '80vh' },
          ]"
        >
          <img
            :src="seeInstitutes.media_url"
            class="object-cover h-full w-full"
            :alt="seeInstitutes.media_url"
          />
        </div>

        <div
          v-else
          style="height: 500px; margin: auto"
          :style="[
            isMobile
              ? { width: '320px' }
              : isMedium
              ? { width: '500px' }
              : isSmallDesktop
              ? { width: '600px' }
              : { width: '100%' },

            isSmallDesktop ? { height: '500px' } : { height: '80vh' },
          ]"
        >
          <iframe
            class="w-full aspect-video"
            :src="seeInstitutes.media_url"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </ClientOnly> -->
    <!-- <section
      class="hidden text-center w-full md:max-w-[630px] mx-auto mb-[150px] mt-20 custom-container"
    >
      <p class="sub-heading mb-10">
        {{ $t("success_report_title") }}
      </p>
      <BaseSecondaryCarousel
        :slider="successReportsSlider ? successReportsSlider : []"
        carouselItemsClass="h-[230px] xs:h-[300px] sm:h-[360px] md:h-[420px] 3xl:h-[440px]"
        headingClass="text-xl sm:text-2xl md:text-3xl"
        subHeadingClass="text-base sm:text-xl lg:text-2xl"
      />
    </section> -->
  </div>
</template>
<style scoped>
.hero-container {
  background-image: url("~/assets/img/default/hero-section.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.content-box {
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}
.video_thumbnail {
  background-image: var(--bgImage);
}
.button-shadow {
  box-shadow: 0px 4px 20px 0px rgba(32, 170, 144, 0.24);
}

.psv-download-button {
  display: none !important;
}
.break-word {
  word-break: break-word;
}
@media (min-width: 768px) {
  .sliding-container::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 250px;
    height: 100%;
    background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
    content: "";
    z-index: 2;
  }
  .sliding-container::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 250px;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
    content: "";
    z-index: 2;
  }
}
.sliding-animation {
  animation: sliding 50s linear infinite;
  animation-fill-mode: forwards;
}
.sliding-container:hover .sliding-animation {
  animation-play-state: paused;
}
@keyframes sliding {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
