<script setup>
defineProps({
  showAppModal: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <Transition name="modal">
    <div
      v-if="showAppModal"
      class="modal-mask fixed p-4 inset-0 flex items-center justify-center z-[999999]"
    >
      <div
        class="fixed inset-0 bg-gray-600 opacity-50"
        @click="$emit('closeAppModal')"
      >
        <div class="modal-mask absolute inset-0 opacity-75"></div>
      </div>
      <div
        class="modal-container min-h-[260px] w-full md:min-w-[460px] sm:max-w-[80%] lg:w-[60%] 2xl:w-[40%]"
      >
        <IconsCross
          class="w-4 text-red-600 absolute top-4 right-4 m-2 cursor-pointer"
          @click="$emit('closeAppModal')"
        />
        <div class="pt-4 mx-6 border-b-2 border-gray-400">
          <h4 class="text-md text-primary-red pb-2 font-semibold">
            {{ $t("cautions") }}
          </h4>
        </div>
        <div
          class="py-16 px-6 md:px-20 mx-6 md:mx-12 text-center font-bold text-2xl max-h-[calc(100vh-160px)] overflow-y-auto"
        >
          <p>{{ $t("open_the_apps") }}</p>
        </div>
        <div class="flex justify-center">
          <NuxtLink :to="'https://play.google.com/store/games'" target="_blank">
            <button
              class="text-lg mx-auto px-3 p-2 mb-14 bg-primary-red text-white rounded-md"
            >
              {{ $t("download_apps") }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.modal-container {
  @apply bg-white rounded-lg overflow-hidden shadow-xl relative border-[#00000048];
  transition: all 0.3s ease;
}
.modal-mask {
  transition: opacity 0.3s ease;
}
.modal-enter-from .modal-mask,
.modal-leave-to .modal-mask {
  opacity: 0;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  opacity: 0;
  transform: scale(1.1);
  -webkit-transform: scale(1.1);
}
</style>
