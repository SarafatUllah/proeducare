<script setup>
import { storeToRefs } from "pinia";
import { useInstructorStore } from "~/stores/instructors";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const { instructorsInfo } = storeToRefs(useInstructorStore());
const { setInstructorsInfo } = useInstructorStore();
const myCarousel = ref(null);
const instructorCourses = ref([
  {
    image: "/images/homepage/instructors-section/wordpress.webp",
    courseType: "Web & Software",
    courseName: "WordPress Plugin Development",
  },
]);
const route = useRoute();
setInstructorsInfo({ id: Number(route.params.slug) });
</script>

<template>
  <div>
    <div class="bg-[#28293e]">
      <div
        class="flex lg:flex-row flex-col lg:space-x-8 lg:space-y-0 space-y-8 justify-center custom-container"
      >
        <div class="flex flex-col space-y-6 lg:max-w-[690px] lg:w-[60%] w-full">
          <p class="text-[#d0ccde] text-xl">Hey! Nice to see you.</p>
          <div class="text-[64px] text-white leading-[76.8px]">
            <p class="font-normal">This is</p>
            <h2
              v-if="instructorsInfo && instructorsInfo.name"
              class="font-bold"
            >
              {{ instructorsInfo.name }}
            </h2>
          </div>
          <p class="text-white text-lg">
            I am a Full Stack Developer with a passion for modern technologies
            and I specialize in using PHP, JavaScript, Alpine.js, Vue.js,
            React.js, Laravel, and other headless technologies to create
            intuitive and scalable web applications. With extensive experience
            in API development, RDBMS, and system architecture, I am adept at
            designing and implementing efficient solutions for complex projects.
            I am also proficient in WordPress, providing end-to-end solutions
            for clients.
          </p>
          <div class="text-white text-lg !mt-[50px] flex flex-col space-y-6">
            <h2 class="font-bold">Expert in:</h2>
            <div
              class="flex flex-wrap space-x-3 space-y-4 md:justify-start justify-center"
            >
              <div class="bg-[#484967] rounded-lg px-[23px] py-[12px] !mt-4">
                HTML
              </div>
              <div class="bg-[#484967] rounded-lg px-[23px] py-[12px]">CSS</div>
              <div class="bg-[#484967] rounded-lg px-[23px] py-[12px]">
                TailwindCSS
              </div>
              <div class="bg-[#484967] rounded-lg px-[23px] py-[12px]">
                Javascript
              </div>
              <div class="bg-[#484967] rounded-lg px-[23px] py-[12px]">
                Vue.js
              </div>
            </div>
          </div>
        </div>
        <div
          class="lg:w-1/2 w-full max-w-[512px] h-[583px] flex lg:justify-start justify-center relative"
        >
          <img
            class="absolute bottom-0 left-0 w-[400px] h-[400px]"
            src="/images/homepage/instructors-section/OthersAsset1.webp"
            alt="circle object"
          />
          <div
            v-if="instructorsInfo && instructorsInfo.imageSrc"
            class="w-full max-w-[360px] h-[440px] rounded-t-full rounded-b-2xl bg-white overflow-hidden absolute top-0 right-0"
          >
            <img
              class="max-w-[552px] h-[440px] transform -translate-x-[88px] rounded-t-full rounded-b-md"
              :src="instructorsInfo.imageSrc"
              :alt="instructorsInfo.name"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="my-courses-section">
      <div class="custom-container pt-[128px] flex flex-col items-center">
        <h1 class="h_tag_primary sm:!leading-[57px] mt-[10px]">My Courses</h1>
        <p class="p_tag_secondary mt-[22px]">
          Curated Courses Designed for Every Learner
        </p>
        <ClientOnly>
          <Carousel
            ref="myCarousel"
            :itemsToShow="1"
            :transition="500"
            :autoplay="0"
            napAlign="center"
            :wrapAround="false"
            :pauseAutoplayOnHover="true"
            class="w-full"
          >
            <slide
              v-for="(item, sIndex) in instructorCourses"
              :key="'s-image' + sIndex"
              class="transition-scale duration-500 ease-in-out"
            >
              <div
                class="w-full course-card lg:flex-row flex-col lg:space-x-12 lg:space-y-0 space-y-6"
              >
                <img
                  class="lg:w-[334px] w-full h-full rounded-[10px]"
                  :src="item.image"
                  :alt="item.name"
                />
                <div class="flex flex-col lg:items-start items-center">
                  <h2 class="text-[#758598] leading-[30.4px]">
                    {{ item.courseType }}
                  </h2>
                  <p
                    class="line-clamp-1 mt-2 text-[#4f5b6d] font-semibold text-2xl leading-[31.2px]"
                  >
                    {{ item.courseName }}
                  </p>
                  <div
                    class="flex md:flex-row flex-col items-center md:space-x-5 md:space-y-0 space-y-4 mt-6"
                  >
                    <div
                      class="bg-[#fcb900] px-3 py-1 rounded-full text-sm text-black"
                    >
                      Online Course
                    </div>
                    <p class="text-lg text-[#d9d9d9] md:block hidden">|</p>
                    <div class="flex items-center space-x-5">
                      <p class="text-[#758598] font-bold">
                        <span class="text-[#758598] font-normal">Class: </span
                        >36
                      </p>
                      <p class="text-lg text-[#d9d9d9]">|</p>
                      <p class="text-[#758598] font-bold">
                        <span class="text-[#758598] font-normal"
                          >Duration: </span
                        >04 Months
                      </p>
                    </div>
                  </div>
                  <NuxtLink class="w-fit orange_button xl:hidden !mt-6"
                    >View Details</NuxtLink
                  >
                </div>
                <NuxtLink class="w-fit orange_button !ml-auto xl:block hidden"
                  >View Details</NuxtLink
                >
              </div>
            </slide>
          </Carousel>
          <div
            v-if="instructorCourses && instructorCourses.length > 1"
            class="flex justify-center space-x-8 mt-8"
          >
            <button
              class="h-10 w-10 rounded-full border border-orange-primary flex justify-center items-center bg-white text-orange-primary hover:bg-orange-primary hover:text-white"
              @click="myCarousel.prev()"
            >
              <IconsRightArrow class="rotate-180" />
            </button>
            <button
              class="h-10 w-10 rounded-full border border-orange-primary flex justify-center items-center bg-white text-orange-primary hover:bg-orange-primary hover:text-white"
              @click="myCarousel.next()"
            >
              <IconsRightArrow class="" />
            </button>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.my-courses-section {
  background-image: linear-gradient(
    82deg,
    rgba(206, 159, 252, 0) 6.18%,
    rgba(115, 103, 240, 0.08) 94.61%
  );
}
.course-card {
  background-color: #ffffff;
  border-color: #e8e8f2;
  border-width: 1px;
  border-radius: 10px;
  margin-top: 5rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  @apply md:px-8 px-4;
  display: flex;
  align-items: center;
}
</style>
