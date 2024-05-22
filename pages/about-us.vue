<script setup>
import Group from "~/assets/img/about-us/group.svg";
import Web from "~/assets/img/about-us/web.svg";
import StarYellow from "~/assets/img/about-us/star-yellow.svg";
import StarPurpel from "~/assets/img/about-us/star-purpel.svg";
import { useTheVideoStore } from "~/stores/theVideo";

const { SUCCESS_STUDENT_VIDEOS } = useUrls();
const { setMediaUrl } = useTheVideoStore();
const localePath = useLocalePath();

onMounted(() => {
  window.scrollTo(0, 0);
});
const ourValues = [
  {
    background: "bg-[#FD346E]",
    image: Group,
    title: "Collaboration",
    description:
      "Youthful, passionate, and innovative, we redefine the job search industry.",
  },
  {
    background: "bg-[#1EE2CF]",
    image: Web,
    title: "Growth mindset",
    description: "Committed to continuous improvement and development.",
  },
  {
    background: "bg-[#FCDC02]",
    image: StarYellow,
    title: "Do the impossible",
    description: "Embraces challenges and relentlessly pursues innovative.",
  },
  {
    background: "bg-[#726FFC]",
    image: StarPurpel,
    title: "Inclusivity",
    description:
      "Our diverse team values inclusivity and diverse perspectives.",
  },
];
const { data: successStudentVideos } = await useFetch(
  `${SUCCESS_STUDENT_VIDEOS}?per_page=6`
);

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
</script>
<template>
  <main>
    <section id="about-hero" class="bg-[#FFF9F6] relative">
      <div
        class="custom-container xl:!pt-[97px] !pt-[107px] flex md:flex-row flex-col-reverse md:space-x-[54px] md:justify-center"
      >
        <!-- <img
          class="md:w-[54%] w-full h-[40%] md:mt-0 mt-[33px]"
          src="~/assets/img/about-us/about-us-hero.webp"
          alt="about-us hero image"
        /> -->
        <div class="w-full flex flex-col space-y-11">
          <div class="md:text-left text-center">
            <p class="frame">ABOUT US</p>
            <h1 class="h_tag_primary sm:!leading-[57px] mt-[10px]">
              Our Mission Is To Ensure You Always Get The Best Course
            </h1>
            <p class="p_tag_secondary mt-[22px]">
              Transform through education. Judge wisely. Live exceptionally.
              Join at ProEdu Care Institute
            </p>
            <p class="p_tag_secondary mt-[22px]">
              ProEdu Care offers personalized learning paths tailored to
              individual student needs and learning objectives. ProEdu Care is
              committed to re-imagining education for the digital age,
              leveraging the power of technology to create engaging,
              personalized, and effective learning experiences. Join us in our
              mission to empower the next generation of learners and educators
              through innovative educational solutions
            </p>
          </div>
          <ul class="flex flex-col space-y-[26px]">
            <li class="flex flex-row flex-nowrap space-x-[21px] items-start">
              <img
                class="mt-1"
                src="~/assets/img/about-us/orange-circle-check-list.svg"
                alt="orange-circle-check-list icon"
              />
              <div
                class="flex flex-col md:text-[15px] text-[14px] space-y-[4px]"
              >
                <h2 class="font-bold text-[#313131]">Expert Instructors</h2>
                <p class="font-normal text-[#515B6F]">
                  Dedicated to connecting job seekers with their ideal careers.
                </p>
              </div>
            </li>
            <li class="flex flex-row flex-nowrap space-x-[21px] items-start">
              <img
                class="mt-1"
                src="~/assets/img/about-us/orange-circle-check-list.svg"
                alt="orange-circle-check-list icon"
              />
              <div
                class="flex flex-col md:text-[15px] text-[14px] space-y-[4px]"
              >
                <h2 class="font-bold text-[#313131]">Lifetime Access</h2>
                <p class="font-normal text-[#515B6F]">
                  Achieve personal and professional growth.
                </p>
              </div>
            </li>
            <li class="flex flex-row flex-nowrap space-x-[21px] items-start">
              <img
                class="mt-1"
                src="~/assets/img/about-us/orange-circle-check-list.svg"
                alt="orange-circle-check-list icon"
              />
              <div
                class="flex flex-col md:text-[15px] text-[14px] space-y-[4px]"
              >
                <h2 class="font-bold text-[#313131]">Remote Learning</h2>
                <p class="font-normal text-[#515B6F]">
                  Built on a foundation of empathy.
                </p>
              </div>
            </li>
            <li class="flex flex-row flex-nowrap space-x-[21px] items-start">
              <img
                class="mt-1"
                src="~/assets/img/about-us/orange-circle-check-list.svg"
                alt="orange-circle-check-list icon"
              />
              <div
                class="flex flex-col md:text-[15px] text-[14px] space-y-[4px]"
              >
                <h2 class="font-bold text-[#313131]">Self Development</h2>
                <p class="font-normal text-[#515B6F]">
                  Built on a foundation of empathy.
                </p>
              </div>
            </li>
          </ul>
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
    <!-- <section id="our-valus">
      <div class="custom-container flex flex-col items-center space-y-[58px]">
        <div class="text-center">
          <p class="frame">OUR VALUES</p>
          <h2 class="h_tag_primary mt-[10px]">We Care About Success</h2>
        </div>
        <div
          v-if="ourValues && ourValues.length > 0"
          class="grid grid-cols-4 md:gap-[31px] gap-3 justify-items-center"
        >
          <LazyAboutUsOurValues
            v-for="(ourValue, index) in ourValues"
            :key="index"
            :our-value="ourValue"
          />
        </div>
      </div>
    </section> -->
    <!-- <section id="ceo-info" class="bg-[#FFF9F6]">
      <div
        class="custom-container !pt-[72px] !pb-[52px] flex md:flex-row flex-col justify-center md:items-start items-center md:space-x-8 md:space-y-0 space-y-8"
      >
        <div class="text-left md:w-1/2 w-full">
          <div
            class="flex md:flex-col flex-row md:space-x-0 space-x-[18px] md:items-start items-center"
          >
            <img
              class="w-[66px] h-[66px]"
              src="~/assets/img/about-us/ceo-avater.svg"
              alt="ceo avater"
            />
            <div>
              <h2 class="h_tag_third md:mt-[42px]">NAME HERE</h2>
              <p class="p_tag_third md:mt-3 mt-1">CEO LOREM IPSUM INSTITUTE</p>
            </div>
          </div>
          <p
            class="text-[#313131] lg:text-3xl md:text-xl text-base font-normal mt-9"
          >
            "As the CEO, I am thrilled to offer a marketing course that not only
            imparts knowledge but ignites the spark of strategic thinking,
            empowering every learner to navigate the dynamic landscape of
            marketing with confidence and creativity."
          </p>
        </div>
        <div class="md:w-1/2 w-full flex md:justify-start justify-center">
          <img
            class="w-[300px] lg:w-[418px] h-[325px] lg:h-[454px]"
            src="~/assets/img/about-us/CEO.webp"
            alt="ceo cover"
          />
        </div>
      </div>
      <div class="bg-[#FF6E1F]">
        <div
          class="flex md:flex-nowrap justify-between md:justify-center flex-wrap custom-container md:!py-[71px] !py-[32px] min-[1400px]:space-x-[90px] lg:space-x-[60px] md:space-x-[22px]"
        >
          <LazyTheOverview
            v-for="(item, index) in overview"
            :key="index"
            :item="item"
            :index="index"
          >
          </LazyTheOverview>
        </div>
      </div>
    </section> -->
    <!-- <section id="testimonials">
      <div class="custom-container !pb-0 flex flex-col items-center space-y-[58px]">
        <div class="text-center md:max-w-[632px] w-full">
          <p class="frame">TESTIMONIALS</p>
          <h2 class="h_tag_primary mt-[6px]">
            Hear What Our Successful Students Say About Us
          </h2>
          <p class="p_tag_secondary mt-[6px]">
            Embark on a transformative learning journey with our dynamic
            courses, meticulously crafted for success in the digital landscape.
          </p>
        </div>
        <div
          v-if="
            successStudentVideos.data && successStudentVideos.data.length > 0
          "
          class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-[25px] lg:gap-0 lg:gap-y-6 xl:gap-[25px] gap-3 lg:justify-items-start justify-items-center"
        >
          <div
            v-for="(successStudentVideo, index) in successStudentVideos.data"
            :key="index"
            class="cursor-pointer rounded-[20px] video_thumbnail col-span-1 w-full sm:max-h-[272px] md:h-[18.5vw] xl:h-[220px] min-[1300px]:h-[236px] min-[1440px]:h-[250px] 2xl:h-[272px] h-[222px] flex justify-center items-center"
            @click="setMediaUrl(successStudentVideo)"
          >
            <div
              class="w-[62px] h-[62px] flex justify-center items-center bg-white rounded-full"
            >
              <IconsPlay class="w-[27px] h-[24px] aspect-square" />
            </div>
          </div>
        </div>
        <NuxtLink
          :to="localePath('/courses')"
          class="orange_button flex items-center justify-center space-x-3 mx-auto"
        >
          <span>See All</span>
          <IconsLeftArrow class="w-3.5 h-3.5 text-white" color="#FFFFFF" />
        </NuxtLink>
      </div>
    </section> -->
  </main>
</template>

<style scoped></style>
