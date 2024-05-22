<script setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import firstIcon from "~/assets/img/pagination/first.svg";
import prevIcon from "~/assets/img/pagination/prev.svg";
import nextIcon from "~/assets/img/pagination/next.svg";
import lastIcon from "~/assets/img/pagination/last.svg";

const props = defineProps({
  totalPages: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["goToPage"]);
const breakpoints = useBreakpoints(breakpointsTailwind);

const isMobile = breakpoints.isSmaller("sm");
const isTab = breakpoints.between("sm", "xl");
const isDesktop = breakpoints.greaterOrEqual("xl");

const { totalPages } = toRefs(props);
const currentPage = ref(1);

const perPagePaginationButton = computed(() => {
  if (isMobile) {
    return 1;
  } else if (isTab.value) {
    return 4;
  } else if (isDesktop.value) {
    return 6;
  }
});
const visiblePageNumbers = computed(() => {
  const startPage = Math.max(
    1,
    currentPage.value - Math.floor(perPagePaginationButton.value / 2)
  );
  const endPage = Math.min(
    totalPages.value,
    startPage + perPagePaginationButton.value - 1
  );

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );
});
const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
const gotToPage = (page) => {
  if (currentPage.value !== page) {
    currentPage.value = page;
  }
};
const isCurrentPage = (page) => {
  return currentPage.value === page;
};
const isPrevBtnDisabled = computed(() => {
  return currentPage.value <= 1;
});
const isNextBtnDisabled = computed(() => {
  return currentPage.value >= totalPages.value;
});

watch(currentPage, (newPage) => {
  emit("goToPage", newPage);
});
</script>

<template>
  <div class="w-fit flex flex-wrap gap-1 md:gap-[8px] lg:gap-[10px]">
    <button
      @click="gotToPage(1)"
      :disabled="isPrevBtnDisabled"
      class="pagination-btn inactive-btn font-medium !text-[#313131]"
      :class="{ 'opacity-50': isPrevBtnDisabled }"
    >
      <img :src="firstIcon" alt="first" class="md:mr-[9px]" />
      <span class="hidden md:block">First</span>
    </button>
    <button
      @click="goToPrevPage"
      :disabled="isPrevBtnDisabled"
      class="pagination-btn inactive-btn font-medium !text-[#313131]"
      :class="{ 'opacity-50': isPrevBtnDisabled }"
    >
      <img :src="prevIcon" alt="prev" class="md:mr-[9px]" />
      <span class="hidden md:block">Prev</span>
    </button>

    <button
      v-for="(page, index) in visiblePageNumbers"
      :key="index"
      @click="gotToPage(page)"
      class="pagination-btn font-bold"
      :class="{
        'active-btn': isCurrentPage(page),
        'inactive-btn': !isCurrentPage(page),
      }"
    >
      {{ page }}
    </button>

    <button
      @click="goToNextPage"
      :disabled="isNextBtnDisabled"
      class="pagination-btn inactive-btn !text-[#313131] font-medium"
      :class="{ 'opacity-50': isNextBtnDisabled }"
    >
      <span class="md:mr-[9px] hidden md:block">Next</span>
      <img :src="nextIcon" alt="next" />
    </button>
    <button
      :disabled="isNextBtnDisabled"
      @click="gotToPage(totalPages)"
      class="pagination-btn inactive-btn !text-[#313131] font-medium"
      :class="{ 'opacity-50': isNextBtnDisabled }"
    >
      <span class="md:mr-[9px] hidden md:block">Last</span>
      <img :src="lastIcon" alt="last" />
    </button>
  </div>
</template>

<style scoped>
.pagination-btn {
  @apply h-10 px-5 py-2 flex items-center rounded-md border;
}
.active-btn {
  @apply text-white border-orange-primary bg-orange-primary;
}
.inactive-btn {
  @apply border-[#E6E7EE] text-[#515B6F] bg-white;
}
</style>
