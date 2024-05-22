<template>
  <div class="custom-container !pt-[146px]">
    <div
      class="footer-banner rounded-3xl flex space-x-6 md:justify-start justify-center relative py-[56px] xl:px-[84px] lg:px-[64px] px-[24px]"
    >
      <div class="text-white md:text-left text-center">
        <h4
          class="font-semibold md:text-[44px] text-[24px] md:leading-[58px] lg:max-w-[389px] md:max-w-[289px]"
        >
          Grow your career. Start learning now!
        </h4>
        <p
          class="opacity-75 md:text-lg text-sm font-normal mt-2 lg:max-w-[548px] md:max-w-[348px]"
        >
          Level up your life with ProEdu Care Institute – Where Knowledge Meets
          Judgment for a standout existence!
        </p>
        <div
          class="flex md:flex-row flex-col lg:space-x-6 md:space-x-4 space-x-0 md:space-y-0 space-y-4 md:mt-[43px] mt-[24px]"
        >
          <!-- <NuxtLink
            to="/courses"
            class="lg:py-[15px] py-[10px] lg:px-[22px] px-[18px] lg:text-lg text-[12px] text-[#313131] font-medium bg-white rounded-md md:mr-0 md:ml-0 mx-auto"
            >Browse Courses</NuxtLink
          > -->

          <a
            href="https://www.facebook.com/people/ProEdu-Care/61556164828334/"
            target="_blank"
            class="md:!mr-0 md:!ml-[0px] !mx-auto lg:py-[15px] py-[10px] lg:px-[22px] px-[18px] lg:text-lg text-[12px] text-white font-medium bg-transparent border-white border rounded-md"
          >
            Join In our FB Community
          </a>
        </div>
      </div>
      <!-- <img
        class="md:block hidden absolute bottom-0 xl:right-[80px] lg:right-10 right-4 h-[500px] hero_image"
        src="~/assets/img/footer/hero.webp"
        alt="footer-hero-image"
      /> -->
    </div>
  </div>
</template>

<style scoped>
.footer-banner {
  background-image: url("~/assets/img/footer/footer-banner.webp");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.hero_image {
  transform: rotateY(180deg);
}
@media (max-width: 767px) {
  .footer-banner {
    background-image: url("~/assets/img/footer/footer-mobile-banner.webp");
  }
}
</style>
