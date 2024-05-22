<script setup>
const props = defineProps({
  selectedPlaylist: {
    type: Object,
    required: true,
  },
  currentSelectedLessonId: {
    type: [Number, String],
    required: false,
  },
  currentSelectedVideoId: {
    type: Number,
    required: false,
  },
  isLocked: {
    type: Boolean,
    default: false,
    required: false,
  },
});
const nuxtApp = useNuxtApp();
const { t } = useI18n();

const isShowAllUnits = ref(false);

const handleVideoSelectInLocked = () => {
  nuxtApp.$toast("clear");
  nuxtApp.$toast("error", {
    message: t("messages.please_enroll"),
    className: "toasted-bg-alert",
  });
};
</script>
<template>
  <div class="flex flex-col space-y-2">
    <div class="courseContentWrap border border-[#bcc7cf] rounded-lg p-5">
      <div class="border border-[#bcc7cf] rounded-lg">
        <div
          v-for="(singleLesson, index) in selectedPlaylist?.units.slice(
            0,
            !isShowAllUnits ? 7 : selectedPlaylist?.units.length
          )"
          class="flex flex-col cursor-pointer shadow-[0px_10px_19px_#d1d7dc] border-b border-[#bcc7cf] rounded-md"
          @click.stop="$emit('selectLesson', singleLesson.id)"
        >
          <div
            class="flex gap-2 px-5 py-[18px]"
            :class="[
              currentSelectedLessonId === singleLesson.id
                ? 'border-b border-[#bcc7cf] bg-primary-red text-white'
                : '',
              currentSelectedLessonId === singleLesson.id && index === 0
                ? 'rounded-t-lg'
                : '',
            ]"
          >
            <div class="max-h-64 relative">
              <img
                class="min-w-[150px] max-w-[150px] h-[70px] md:h-[100px] hidden"
                :src="singleLesson.coverImage"
              />
              <div class="bg-black text-white text-xs text-right pr-1">
                {{ singleLesson.duration }}
              </div>
            </div>
            <div class="text-lg flex-grow">
              {{ singleLesson.title }}
            </div>
            <div class="self-center">
              <svg
                :fill="
                  currentSelectedLessonId === singleLesson.id
                    ? '#fff'
                    : '#000000'
                "
                height="16px"
                width="16px"
                class="transition-all duration-300 ease-in-out"
                :class="
                  currentSelectedLessonId === singleLesson.id
                    ? '-rotate-180'
                    : 'rotate-0 '
                "
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xml:space="preserve"
              >
                <path
                  id="XMLID_225_"
                  d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
      c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
      s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                />
              </svg>
            </div>
          </div>

          <div
            v-if="currentSelectedLessonId === singleLesson.id"
            class="pb-2 transition-all duration-300 ease-in-out max-h-[500px] overflow-y-auto rounded-b-lg"
          >
            <div v-for="singleVideo in singleLesson.videos" class="">
              <div
                class="flex space-x-2 cursor-pointer shadow-[0px_10px_19px_#d1d7dc] px-4 py-3"
                :class="
                  currentSelectedVideoId === singleVideo.id
                    ? 'bg-gray-400 '
                    : ''
                "
                @click.stop="
                  isLocked
                    ? handleVideoSelectInLocked()
                    : $emit('selectVideo', singleVideo.id)
                "
              >
                <div class="max-h-64 relative">
                  <div
                    class="min-w-[70px] md:min-w-[150px] max-w-[70px] md:max-w-[150px] h-[60px] md:h-[70px]"
                  >
                    <img
                      v-if="
                        singleVideo.coverImage && singleVideo.coverImage !== ''
                      "
                      class="w-full h-full object-contain"
                      :src="singleVideo.coverImage"
                    />
                    <img
                      v-else
                      class="w-full h-full object-contain"
                      src="/images/course-details/lessonIcon.png"
                    />
                  </div>
                  <div class="bg-black text-white text-xs text-right pr-1">
                    {{ singleVideo.duration }}
                  </div>
                </div>
                <div class="text-sm flex-grow md:py-2 self-center line-clamp-2">
                  {{ singleVideo.title }}
                </div>
                <ClientOnly>
                  <fa
                    v-if="isLocked"
                    class="text-gray-400 min-w-[40px] md:min-w-[60px] max-w-[40px] md:max-w-[60px] h-[80%] opacity-80 self-center pr-2"
                    :icon="['fa-solid', 'lock']"
                /></ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="selectedPlaylist?.units?.length > 3"
      class="inline-block rounded-100px text-primary-red opacity-100 px-5 py-1 text-sm font-bold leading-normal transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] self-end border border-black"
      @click="isShowAllUnits = !isShowAllUnits"
    >
      {{ !isShowAllUnits ? "View More" : "View Less" }}
    </button>
  </div>
</template>

<style lang="scss" scoped></style>
