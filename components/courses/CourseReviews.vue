<template>
  <div>
    <p class="text-[24px] sm:text-[32px] text-gray-primary font-bold">
      Student Reviews
    </p>

    <Carousel
      v-if="courseDetails?.reviews?.length > 1"
      :items-to-show="1"
      ref="carousel"
      @slide-start="handleDisabled"
    >
      <Slide v-for="(review, index) in courseDetails?.reviews" :key="index">
        <div class="carousel__item mt-5 p-8 mx-2 bg-[#FFF9F6] rounded-2xl">
          <div class="font-base text-gray-secondary leading-6">
            <div v-html="review?.description"></div>
          </div>
          <div class="mt-8 flex items-center justify-between">
            <div class="flex items-center gap-x-3">
              <div class="bg-gray-light border border-gray-light rounded-full">
                <img
                  :src="getUserImage(review?.user?.image)"
                  class="size-[38px] rounded-full"
                  alt="user"
                />
              </div>
              <p class="text-base text-gray-primary font-bold">
                {{ review?.user?.name }}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="38"
              viewBox="0 0 41 38"
              fill="none"
            >
              <path
                d="M16.4 -0.000274658V13.7757C16.4 20.1171 15.0333 25.3651 12.3 29.5197C9.45733 33.6744 5.35733 36.4077 0 37.7197V31.9797C3.28 31.1051 5.63067 29.4651 7.052 27.0597C8.47333 24.7637 9.29333 21.7571 9.512 18.0397H3.28L3.28 -0.000274658L16.4 -0.000274658ZM41 -0.000274658L41 13.7757C41 20.1171 39.6333 25.3651 36.9 29.5197C34.0573 33.6744 29.9573 36.4077 24.6 37.7197V31.9797C27.88 31.1051 30.2307 29.4651 31.652 27.0597C33.0733 24.7637 33.8933 21.7571 34.112 18.0397H27.88L27.88 -0.000274658H41Z"
                fill="#FFBE17"
              />
            </svg>
          </div>
        </div>
      </Slide>

      <template #addons>
        <div class="carousel__pagination !mt-6 !justify-end gap-x-4">
          <button
            type="button"
            class="carousel__pagination-item grid place-content-center border border-orange-primary rounded-full size-10 text-orange-primary hover:text-white hover:bg-orange-primary transition-all duration-300"
            :class="{ 'opacity-60': isFirstSlide }"
            :disabled="isFirstSlide"
            @click="prevSlide"
          >
            <IconsRightArrow class="size-5 rotate-[180deg]" />
          </button>
          <button
            type="button"
            class="carousel__pagination-item grid place-content-center border border-orange-primary rounded-full size-10 text-orange-primary hover:text-white hover:bg-orange-primary transition-all duration-300"
            :class="{ 'opacity-60': isLastSlide }"
            :disabled="isLastSlide"
            @click="nextSlide"
          >
            <IconsRightArrow class="size-5" />
          </button>
        </div>
      </template>
    </Carousel>

    <div
      v-if="courseDetails?.reviews?.length === 0"
      class="mt-5 text-gray-secondary text-lg font-medium"
    >
      Review not available
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue3-carousel";
export default {
  components: { Carousel, Slide },
  props: {
    courseDetails: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isFirstSlide: true,
      isLastSlide: false,
    };
  },
  methods: {
    getUserImage(userImage) {
      return userImage ? userImage : "/images/dashboard/user.svg";
    },
    prevSlide() {
      this.$refs.carousel.prev();
    },
    nextSlide() {
      this.$refs.carousel.next();
    },
    handleDisabled(index) {
      this.isFirstSlide = index.slidingToIndex === 0;
      this.isLastSlide =
        index.slidingToIndex === this.courseDetails.reviews.length - 1;
    },
  },
};
</script>
