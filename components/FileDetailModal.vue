<script setup>
defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  fileDetail: {
    type: String,
    default: "No Details Found!",
  },
});
</script>

<template>
  <Transition name="modal">
    <div
      v-if="showModal"
      class="modal-mask fixed p-4 inset-0 flex items-center justify-center z-[999999]"
    >
      <div
        class="fixed inset-0 bg-gray-600 opacity-50"
        @click="$emit('closeModal')"
      >
        <div class="modal-mask absolute inset-0 opacity-75"></div>
      </div>

      <div
        class="modal-container min-h-[260px] w-full md:min-w-[460px] sm:max-w-[80%] lg:w-[60%] 2xl:w-[40%]"
      >
        <IconsCross
          class="w-4 text-gray-700 absolute top-4 right-4 m-2 cursor-pointer"
          @click="$emit('closeModal')"
        />
        <div class="pt-4 mx-6 border-b-2 border-gray-400">
          <h4 class="text-lg text-primary-red pb-2 font-semibold">
            File Details
          </h4>
        </div>
        <div
          class="p-6 max-h-[calc(100vh-160px)] overflow-y-auto"
          v-html="fileDetail"
        ></div>
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
