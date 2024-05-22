<script setup>
defineProps({
  courseDetails: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div
    class="video_list py-4 lg:!mt-[32px] mt-[22px] lg:w-[376px] w-full lg:max-w-[376px] min-w-[19.59vw] max-h-[604px] sticky top-[132px] right-0 z-10"
  >
    <div class="w-full h-full overflow-y-auto">
      <div
        v-for="unit in courseDetails.units"
        :key="unit.id"
        class="group py-4 border-t border-[#E6E7EE] first:pt-0 first:border-t-0 last:pb-0"
      >
        <summary
          class="flex items-start justify-between space-x-1 px-4 relative cursor-pointer group transition-all"
          @click="$emit('get-height', unit.id)"
        >
          <div
            class="text-base text-[#313131] font-medium group-hover:text-orange-primary duration-300"
          >
            {{ unit.title }}
            <div
              class="flex space-x-2 items-center text-[12px] text-[#515B6F] group-hover:text-orange-primary duration-300"
            >
              <span>1/{{ unit.videos.length }} </span><span>|</span>
              <span>2hr9min</span>
            </div>
          </div>
          <IconsChevronDown
            class="w-5 h-5 text-[#515B6F] group-hover:text-orange-primary duration-300 group-open:rotate-180"
          />
        </summary>
        <div
          :id="unit.id"
          class="overflow-hidden transition-all duration-500 ease-in-out"
          :style="{
            '--height': unit.select ? unit.height + 'px' : '',
          }"
          :class="
            unit.select ? 'video_list_height opacity-100' : 'h-0 opacity-0'
          "
        >
          <div
            v-for="videoItem in unit.videos"
            :key="videoItem.id"
            :id="videoItem.id"
            class="py-[11px] flex items-center justify-between space-x-2 px-4 hover:bg-[#FF6E1F] hover:bg-opacity-10 cursor-pointer select_box"
            :class="
              videoItem.itemSelect
                ? 'bg-[#FF6E1F] bg-opacity-10 text-[#313131]'
                : ''
            "
            @click="$emit('selected-video', unit.id, videoItem.id)"
          >
            <div class="flex items-center space-x-[10px]">
              <div
                class="size-[30px] rounded-full grid place-content-center play_button"
                :class="
                  videoItem.itemSelect ? 'bg-[#FF6E1F]' : 'bg-[#FF6E1F14]'
                "
              >
                <IconsVideoPlay
                  v-if="!videoItem.itemSelect"
                  class="w-3.5 h-3.5 play_icon"
                  :color="videoItem.itemSelect ? '#ffffff' : '#515B6F'"
                ></IconsVideoPlay>
                <ClientOnly v-else>
                  <fa
                    class="w-3.5 h-3.5 cursor-pointer text-white"
                    :icon="['fas', 'pause']"
                  />
                </ClientOnly>
              </div>
              <div
                v-if="videoItem.title !== null"
                class="w-[calc(100%-40px)] text-sm"
                :class="
                  videoItem.itemSelect
                    ? 'text-[#313131]'
                    : 'text-[#515B6F] hover:text-[#313131]'
                "
              >
                {{ videoItem.title }}
                <div class="flex space-x-2 items-center text-[12px] mt-1">
                  <IconsClock class="w-2.5 h-[11px]" />
                  <p>1hr 9min</p>
                </div>
              </div>
              <p
                v-if="videoItem.title === null"
                class="w-[calc(100%-40px)] text-sm text-gray-secondary"
              >
                Lession not available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video_list_height {
  height: var(--height);
}
@media (max-width: 1023px) {
  .video_list {
    border-radius: none !important;
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }
}
</style>
