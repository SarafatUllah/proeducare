<script setup>
import defaultCourseImage from "~/assets/img/default/hero-thumb.webp";
</script>

<template>
  <div>
    <div
      class="p-3 flex items-center justify-between gap-x-4 rounded-lg bg-white flex-wrap"
      style="box-shadow: 0px 20px 40px 0px rgba(183, 188, 201, 0.25)"
    >
      <div class="flex items-start gap-x-3 flex-wrap">
        <img
          :src="defaultCourseImage"
          alt="dummy title"
          class="w-full sm:w-[160px] h-[120px] sm:h-[90px] rounded-lg object-cover"
        />
        <div class="mt-2 sm:mt-0">
          <p
            class="text-lg text-[#1A2134] font-bold truncate w-[260px] sm:w-[300px] xl:w-[380px] 2xl:w-[500px]"
          >
            dummy title
          </p>
          <div
            class="mt-1 sm:mt-2 flex items-center gap-x-2 sm:gap-x-4 flex-wrap"
          >
            <p class="text-sm text-gray-secondary font-medium">dummy data</p>
            <div class="w-[6px] h-[6px] bg-[#515B6F] rounded-full"></div>
            <p class="text-sm text-gray-secondary font-medium">17 Lessions</p>
          </div>
          <div class="mt-2 flex items-center gap-x-3">
            <div class="bg-[#FFF9F6] h-[6px] rounded-full flex-1">
              <div
                class="bg-[#FF6E1F] h-[6px] rounded-full"
                style="width: 100%"
              ></div>
            </div>
            <p class="ml-auto text-sm text-gray-secondary font-medium">100%</p>
          </div>
        </div>
      </div>
      <button
        type="button"
        class="mt-2 lg:mt-0 py-[13px] px-6 text-base text-white font-bold bg-orange-primary rounded-lg"
        disabled
      >
        Completed
      </button>
    </div>
  </div>
</template>
