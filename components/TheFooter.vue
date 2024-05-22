<script setup>
const { FOOTER_COURSE } = useUrls();
const localePath = useLocalePath();
const route = useRoute();

const { data: footerCourseRes } = await useFetch(FOOTER_COURSE);
const footerCourse = computed(() => footerCourseRes.value?.data);

const outlined = reactive({
  backgroundColor: "rgba(255, 255, 255, 1)",
  color: "rgba(0, 0, 0, 1)",
  outline: "2px solid rgba(0, 0, 0, 1)",
});
const primaryRed = reactive({
  backgroundColor: "rgba(236, 31, 39, 1)",
  color: "rgba(255, 255, 255, 1)",
});
</script>

<template>
  <section>
    <!-- <div
      v-if="!route.path.includes('/auth/')"
      class="py-12 shadow-lg mt-2.5"
      style="box-shadow: 0px 30px 35px 10px gray"
    >
      <div
        class="flex flex-col justify-center font-normal md:mx-8 text-center gap-8"
      >
        <h3
          class="text-2xl md:text-4xl 2xl:text-5xl font-semibold text-primary-red"
        >
          {{ $t("footer_title") }}
        </h3>
        <p
          class="font-normal px-8 md:px-0 text-base md:text-xl md:leading-8 leading-6 2dx:text-2xl 2dx:leading-8 mx-auto w-full sm:w-[600px]"
        >
          {{ $t("footer_text") }}
        </p>
      </div>
      <div
        class="text-base mt-10 flex gap-[21px] md:gap-[26px] items-center justify-center flex-wrap"
      >
        <NuxtLink :to="localePath('/free-seminar')">
          <BaseButton :title="$t('live_course')" class="animate-button" />
        </NuxtLink>
        <NuxtLink :to="localePath('/browse-course')">
          <BaseButton :title="$t('recorded_course')" :styles="primaryRed" />
        </NuxtLink>
      </div>
    </div> -->
    <div class="bg-[#202430]">
      <footer class="custom-container lg:!pb-[42px] !pb-[30px]">
        <div
          class="flex flex-col lg:space-y-[70px] space-y-[30px] lg:mt-[14px]"
        >
          <div
            class="container-fluid footer-top flex lg:flex-row lg:items-start items-center flex-col space-y-10 lg:space-y-0 space-x-0 2xl:space-x-24 xl:space-x-24 lg:space-x-10 justify-start"
          >
            <div
              class="flex flex-col items-start text-left space-y-7 2xl:w-[50%] lg:w-[50%] w-full md:text-base text-sm"
            >
              <img
                class="h-[115px] w-[200px]"
                src="~/assets/img/logo/ProEdu-Care-white.png"
                alt="LMS logo"
              />
              <div class="text-[#D6DDEB]">
                <p>
                  Craft your brilliance at ProEdu Care Institute. Knowledge
                  fuels judgment for a life well-lived. Ready to soar?
                </p>
              </div>
              <div class="flex flex-col space-y-[23px]">
                <div class="flex md:space-x-[26px] space-x-[18px]">
                  <img
                    class="w-[20px] h-[24px]"
                    src="~/assets/img/footer/phone.svg"
                    alt="phone icon"
                  />
                  <p class="text-white font-semibold">+880 1326 506464</p>
                </div>
                <div class="flex md:space-x-[26px] space-x-[18px]">
                  <img
                    class="w-[20px] h-[24px]"
                    src="~/assets/img/footer/mail.svg"
                    alt="mail icon"
                  />
                  <p class="text-white font-semibold">info@proeducare.com</p>
                </div>
                <div class="flex md:space-x-[26px] space-x-[18px]">
                  <img
                    class="w-[20px] h-[24px]"
                    src="~/assets/img/footer/location.svg"
                    alt="location icon"
                  />
                  <div class="flex flex-col">
                    <p class="text-white font-semibold block">
                      158/27, Boalia, Kazla,
                    </p>
                    <p class="text-white font-semibold block">Rajshahi-6204,</p>
                    <p class="text-white font-semibold block">Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col md:text-base text-sm lg:!mt-[110px] items-start text-left lg:space-y-5 space-y-[4px] lg:w-[10%] w-full whitespace-nowrap"
            >
              <h4 class="text-[#FF6E1F] font-bold">Company</h4>
              <ul
                class="flex lg:flex-col flex-row flex-wrap lg:space-y-4 text-[#D6DDEB]"
              >
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/"> Home </NuxtLink>
                </li>
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/about-us">About </NuxtLink>
                </li>
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="courses">Courses </NuxtLink>
                </li>
                <!-- <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/blog">Blog</NuxtLink>
                </li> -->
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/contact-us">Contact </NuxtLink>
                </li>
              </ul>
            </div>
            <!-- <div
              class="flex flex-col md:text-base text-sm lg:!mt-[52px] lg:!ml-[97px] items-start text-left lg:space-y-5 space-y-[4px] lg:w-1/5 w-full whitespace-nowrap"
            >
              <h4 class="text-[#FF6E1F] font-bold">Useful Links</h4>
              <ul
                class="flex lg:flex-col lg:flex-nowrap flex-row flex-wrap lg:space-y-4 text-[#D6DDEB]"
              >
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/refund-policy"> Refund Policy </NuxtLink>
                </li>
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/terms-of-use">Terms & Conditions</NuxtLink>
                </li>
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>
                </li>
                <li class="lg:mr-0 mt-[12px] mr-[33px]">
                  <NuxtLink to="/purchase-and-withdraw"
                    >Purchase and Withdraw</NuxtLink
                  >
                </li>
              </ul>
            </div>
            <div
              class="flex flex-col md:text-base text-sm lg:!mt-[52px] lg:!ml-[36px] items-start text-left lg:space-y-5 space-y-4 lg:w-1/3 w-full whitespace-nowrap"
            >
              <h4 class="text-[#FF6E1F] font-bold">Get job notifications</h4>
              <ul class="flex flex-col text-[#D6DDEB] w-full">
                <li>
                  <p class="whitespace-pre-line">
                    The latest job news, articles, sent to your inbox weekly.
                  </p>
                </li>
                <li class="flex flex-row space-x-4 mt-[40px]">
                  <input
                    class="lg:w-[15.49vw] lg:max-w-[223px] lg:flex-grow-0 flex-grow text-base outline-none rounded-md border border-[#D6DDEB] bg-white py-3 px-4 placeholder-[#A8ADB7] text-gray-primary"
                    placeholder="Email"
                  />
                  <button
                    class="orange_button !py-[10px] !px-[16px] lg:!py-[8px] lg:!px-[8px] xl:!py-[16px] xl:!px-[32px] !text-base"
                  >
                    Subscribe
                  </button>
                </li>
              </ul>
            </div> -->
          </div>
          <div>
            <hr class="h-0.5 pb-[28px] border-white opacity-10" />
            <div
              class="footer-bottom flex flex-col md:flex-row md:justify-between items-center lg:text-base text-sm md:space-y-0 space-y-5 text-white text-center font-normal"
            >
              <div class="flex space-x-6">
                <a
                  href="https://www.facebook.com/people/ProEdu-Care/61556164828334/"
                  target="_blank"
                >
                  <img
                    class="w-8 h-8"
                    src="~/assets/img/footer/Facebook.svg"
                    alt="facebook icon"
                  />
                </a>
                <!-- <img
                  class="w-8 h-8"
                  src="~/assets/img/footer/Instagram.svg"
                  alt="instagram icon"
                />
                <img
                  class="w-8 h-8"
                  src="~/assets/img/footer/Dribbble.svg"
                  alt="dribbble icon"
                /> -->
                <a
                  href="https://www.linkedin.com/company/99407111/admin/feed/posts/"
                  target="_blank"
                >
                  <img
                    class="w-8 h-8"
                    src="~/assets/img/footer/LinkedIn.svg"
                    alt="linkedIn icon"
                  />
                </a>
                <!-- <img
                  class="w-8 h-8"
                  src="~/assets/img/footer/Twitter.svg"
                  alt="twitter icon"
                /> -->
              </div>
              <p class="md:mt-0 mt-4 leading-6 text-white opacity-50">
                2024 @ ProEdu Care Institute. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>
