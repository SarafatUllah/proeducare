<template>
  <div class="custom-container !py-[10px] sm:!py-[14px]">
    <div class="flex items-center justify-start">
      <div class="w-full flex flex-row items-center justify-end gap-4">
        <div class="w-full h-full flex justify-between text-white font-[inter]">
          <div class="hidden lg:flex items-center lg:gap-x-[21px]">
            <NuxtLink
              class="flex"
              :to="`tel:+8801752-202128`"
              aria-label="GoToPhone"
            >
              <img src="/icons/icon-phone.svg" alt="phone icon" />
              <p class="text-sm tracking-[0.28px]">+880 1234567890</p>
            </NuxtLink>
            <NuxtLink
              class="flex gap-x-[10px]"
              :to="`mailto:info@fiverroutsourcinginstitute.com`"
              aria-label="GoToMail"
            >
              <img
                src="/icons/icon-email.svg"
                class="self-center"
                alt="email icon"
              />
              <p class="text-sm font-medium tracking-[0.36px]">
                demo.google@gmail.com
              </p>
            </NuxtLink>
          </div>
          <div
            class="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-x-[50px]"
          >
            <div class="flex items-center gap-x-[10px]">
              <img
                src="/icons/icon-clock.svg"
                class="w-5 sm:w-auto"
                alt="clock icon"
              />
              <p class="text-xs sm:text-sm tracking-[0.28px]">
                Mon - Fri: 9:00 - 17:30
              </p>
            </div>
            <div class="flex items-center gap-x-[10px]">
              <a href="https://www.instagram.com" target="_blank">
                <img
                  src="/icons/icon-instagram.svg"
                  class="w-4 sm:w-[18px]"
                  alt="instagram icon"
                />
              </a>
              <a href="https://www.facebook.com" target="_blank">
                <img
                  src="/icons/icon-facebook.svg"
                  class="w-4 sm:w-[18px]"
                  alt="facebook icon"
                />
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <img
                  src="/icons/icon-twitter.svg"
                  class="w-4 sm:w-[18px]"
                  alt="twitter icon"
                />
              </a>
              <a href="https://www.pintarest.com" target="_blank">
                <img
                  src="/icons/icon-pintarest.svg"
                  class="w-4 sm:w-[18px]"
                  alt="pintarest icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
