<script setup>
const { FAQS } = useUrls();

const { data: faqs, pending, error } = useFetch(`${FAQS}?per_page=50`);

const expandedItem = ref(null);
const toggle = (id) => {
  if (expandedItem.value === id) {
    expandedItem.value = null;
  } else {
    expandedItem.value = id;
  }
};
const isExpanded = (id) => {
  return expandedItem.value === id;
};
</script>
<template>
  <div class="min-h-screen">
    <div class="py-20 h-60 bg-image flex justify-center items-center">
      <h3 class="text-center text-white font-semibold text-3xl lg:text-[40px]">
        {{ $t("frequently_asked_questions") }}
      </h3>
    </div>
    <div class="custom-container py-20 h-full">
      <div
        v-if="pending"
        class="w-full h-[50vh] flex flex-col justify-center items-center"
      >
        <IconsIsLoading />
      </div>
      <div v-else-if="!pending && !error">
        <div
          v-if="faqs.data?.length > 0"
          class="flex flex-col mt-4 border-2 border-gray-200 rounded-lg"
        >
          <div
            v-for="(item, index) in faqs.data"
            :key="item.id"
            class="flex flex-col text-lg"
            :class="
              index === faqs.length - 1
                ? 'border-0'
                : 'border-b border-gray-400'
            "
          >
            <h4
              @click="toggle(item.id)"
              class="flex items-center justify-between py-3 font-semibold cursor-pointer bg-[#F7F7F7] px-4 hover:text-blue-800"
            >
              <span>{{ item.question }}</span>
              <IconsCaretDown
                class="w-3 transition-all duration-300 ease-in-out"
                :class="isExpanded(item.id) ? 'rotate-180' : 'rotate-0'"
              />
            </h4>
            <div
              v-if="isExpanded(item.id)"
              class="py-2 px-4 opacity-70"
              v-html="item.answer"
            ></div>
          </div>
        </div>
        <div
          v-else
          class="w-full h-full flex flex-col justify-center items-center"
        >
          <IconsNoData class="" />
          <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: url("~/assets/img/admission-information.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
