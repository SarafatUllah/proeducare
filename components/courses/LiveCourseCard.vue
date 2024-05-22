<script setup>
defineProps({
  cardData: {
    type: Object,
    required: true,
  },
});
const localePath = useLocalePath();
</script>
<template>
  <section
    v-if="cardData && cardData.video_course_type === 'live'"
    class="bg-white"
  >
    <NuxtLink :to="localePath(`/courses/${cardData.slug}`)">
      <div
        class="rounded-[8px] card-body flex lg:flex-row flex-col lg:space-y-0 space-y-6 lg:space-x-[53px] lg:p-[32px] p-5"
      >
        <div>
          <img
            v-if="cardData.banner_url"
            class="w-full h-full aspect-video rounded-[17px] lg:max-w-[376px] !min-w-[29.38vw]"
            :src="cardData.banner_url"
            :alt="cardData.title"
          />
          <img
            v-else
            class="w-full h-full aspect-video rounded-[17px] lg:max-w-[376px] !min-w-[29.38vw]"
            src="~/assets/img/default/video-thumbnail2.webp"
          />
        </div>
        <div class="flex flex-col flex-grow">
          <div>
            <h2
              class="lg:!text-[32px] !text-xl !text-[#1A2134] font-semibold lg:!leading-[40px] !leading-[28px] lg:pt-[16px] line-clamp-1"
            >
              {{ cardData.title }}
            </h2>
            <p
              v-if="cardData.video_course_type === 'live'"
              class="italic lg:!text-[32px] !text-xl !text-[#FF6E1F] font-semibold lg:!leading-[40px] !leading-[28px]"
            >
              Live Course
            </p>
          </div>
          <div class="flex flex-col space-y-[25px] text-[#515B6F] mt-[32px]">
            <div class="flex space-x-6 items-center">
              <img
                class="w-7 h-7"
                src="~/assets/img/courses/duration.svg"
                alt="clock icon"
              />
              <p>
                <span class="text-[#515B6F]">Live Class Starting from :</span
                ><span class="text-[#313131]"> 10 January</span>
              </p>
            </div>
            <div class="flex space-x-6 items-center">
              <img
                class="w-7 h-7"
                src="~/assets/img/courses/videos.svg"
                alt="video icon"
              />
              <p>
                <span class="text-[#515B6F]">Live Class :</span
                ><span class="text-[#313131]"> 15</span>
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex lg:flex-col flex-row justify-between items-center lg:items-end"
        >
          <div
            class="flex flex-col items-start lg:text-[34px] text-xl text-[#313131] font-semibold"
          >
            <p
              v-if="cardData.special_price && cardData.special_price > 0"
              class=""
            >
              ৳{{ cardData.special_price }}
            </p>
            <p
              :class="
                cardData.special_price && cardData.special_price > 0
                  ? 'lg:text-[19px] text-sm text-[#515B6F] line-through font-normal lg:mt-4 mt-1'
                  : ''
              "
            >
              ৳{{ cardData.price }}
            </p>
          </div>
          <NuxtLink
            :to="localePath(`/courses/${cardData.slug}`)"
            class="orange_button !px-4 !py-2 !text-[17px] flex items-center justify-center space-x-3 lg:mx-auto !mr-0"
          >
            <span>Book Your Sit Now</span>
          </NuxtLink>
        </div>
      </div>
    </NuxtLink>
  </section>
</template>

<style scoped>
.card-body {
  border-radius: 17px;
  border: 1px solid #e8e8e8;
  background: #fff;
  box-shadow: 0px 2px 40px 0px rgba(183, 188, 201, 0.25);
}
</style>
