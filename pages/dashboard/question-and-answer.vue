<script setup>
const showSort = ref(false);
const selectedSort = ref({});
const toggleSort = () => {
  showSort.value = !showSort.value;
};
const sortTypes = ref([
  { id: 1, name: "All", total: "10" },
  { id: 2, name: "Read", total: "4" },
  { id: 3, name: "Unread", total: "4" },
  { id: 4, name: "Important", total: "1" },
  { id: 5, name: "Archive", total: "0" },
]);

const setSelectedSort = (id) => {
  selectedSort.value = sortTypes?.value.find((sort) => sort.id === id);
};
onMounted(() => {
  setSelectedSort(1);
});
</script>

<template>
  <div class="py-5 md:py-20">
    <div class="">
      <div class="flex items-center space-x-5 text-lg">
        <label for="question-sort" class="font-semibold whitespace-nowrap"
          >Sort By</label
        >
        <div class="relative w-full">
          <div
            @click="toggleSort"
            class="z-[2] relative flex items-center justify-between px-4 h-[50px] w-full md:!w-[316px] border border-black outline-none bg-white rounded-md cursor-pointer"
          >
            <span class="font-semibold">{{
              selectedSort.name
                ? selectedSort.name + " (" + selectedSort.total + ")"
                : "All"
            }}</span>
            <IconsChevronDown
              class="transition-all duration-500 ease-in-out w-5 text-black"
              :class="showSort ? 'rotate-180' : 'rotate-0 '"
            />
          </div>
          <div
            v-if="showSort"
            @click="toggleSort"
            class="fixed top-0 right-0 left-0 bottom-0 z-[1]"
          ></div>
          <div
            v-if="showSort"
            class="w-full md:!w-[316px] h-[284px] absolute top-20 left-0 z-[2] bg-white"
          >
            <div
              class="border border-black rounded-md shadow-md px-4 pb-4 pt-1"
            >
              <div
                class="flex items-center space-x-3.5 h-[50px] border-black border-b-2 pl-2"
              >
                <IconsSearch />
                <input
                  class="w-full h-[46px] outline-none"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div
                v-for="(sort, index) in sortTypes"
                :key="sort.id"
                class="mt-3.5"
              >
                <span
                  class="font-semibold cursor-pointer pr-4"
                  @click="setSelectedSort(sort.id)"
                  >{{ sort.name + " (" + sort.total + ")" }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full h-full flex flex-col justify-center items-center pt-[100px]"
    >
      <IconsNoData class="" />
      <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
    </div>
  </div>
</template>

<style scoped></style>
