<template>
  <div>
    <h2 class="text-[24px] sm:text-[32px] text-gray-primary font-bold">
      Course Content
    </h2>
    <div
      v-if="courseDetails.units.length > 0"
      class="content-wrapper mt-5 px-6 py-4 sm:py-5 lg:py-6 bg-white border border-[#EFF0F6] rounded-[20px]"
    >
      <details
        v-for="unit in courseDetails.units.slice(0, showUnits)"
        :key="unit.id"
        class="group py-5 border-t border-[#E6E7EE] first:pt-0 first:border-t-0 last:pb-0"
      >
        <summary
          class="flex items-center justify-between gap-x-1 relative cursor-pointer group transition-all"
        >
          <p
            class="text-base sm:text-lg text-gray-primary font-bold group-hover:text-orange-primary duration-300"
          >
            {{ unit.title }}
          </p>
          <IconsChevronDown
            class="w-5 sm:w-6 text-gray-secondary group-hover:text-orange-primary duration-300 group-open:rotate-180"
          />
        </summary>
        <NuxtLink
          v-for="videoItem in unit.videos"
          :key="videoItem.id"
          class="mt-[22px] flex items-center justify-between gap-x-2 cursor-not-allowed"
        >
          <div class="flex items-center gap-x-[10px]">
            <div
              class="size-[30px] bg-[#FF6E1F14] rounded-full grid place-content-center"
            >
              <img src="/icons/icon-play.svg" class="size-[13px]" alt="play" />
            </div>
            <p
              v-if="videoItem.title !== null"
              class="w-[calc(100%-40px)] text-sm sm:text-base text-gray-secondary"
            >
              {{ videoItem.title }}
            </p>
            <p
              v-if="videoItem.title === null"
              class="w-[calc(100%-40px)] text-sm sm:text-base text-gray-secondary"
            >
              Lession not available
            </p>
          </div>
          <img src="/icons/icon-lock.svg" class="block" alt="lock" />
        </NuxtLink>
      </details>
      <div
        v-if="courseDetails.units.length > showUnits"
        class="pt-5 border-t border-[#E6E7EE] grid place-items-center"
      >
        <button
          type="button"
          class="w-[204px] h-10 text-base text-gray-secondary font-medium border border-[#EFF0F6] rounded-[20px] flex items-center justify-center gap-x-1 hover:bg-orange-primary hover:text-white transition-all duration-300 group"
          @click="showUnits += 10"
        >
          See More Content
          <IconsChevronDown
            class="w-4 text-gray-secondary group-hover:text-white"
          />
        </button>
      </div>
    </div>
    <div v-if="courseDetails.units.length === 0" class="mt-5">
      <p class="text-base sm:text-lg text-gray-secondary font-medium">
        Content not available
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showUnits: 10,
    };
  },
  props: {
    courseDetails: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style>
.content-wrapper,
.content-wrapper button {
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
}
</style>
