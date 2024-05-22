<script setup>
const { SEMINARS } = useUrls();

const currentTab = ref("online");
const setCurrentTab = async (tab) => {
  currentTab.value = tab;
};

const isLoading = ref(false);
const allSeminars = ref([]);
const nextCursor = ref("");
const prevCursor = ref("");
const currentCursor = ref("");

const fetchAllSeminar = async () => {
  isLoading.value = true;
  let url = `${SEMINARS}?per_page=10`;
  if (currentCursor.value) {
    url += `&cursor=${currentCursor.value}`;
  }
  const { data, error } = await useFetch(`${url}`);
  if (!error.value && data.value) {
    isLoading.value = false;
    allSeminars.value = data.value.data;
    nextCursor.value = data.value.meta.next_cursor;
    prevCursor.value = data.value.meta.prev_cursor;
  } else if (error.value) {
    isLoading.value = false;
    $toast("clear");
    $toast("error", {
      message: error.value?.data.message,
      className: "toasted-bg-error",
    });
  }
};

fetchAllSeminar();

const nextPage = async () => {
  currentCursor.value = nextCursor.value;
  fetchAllSeminar();
  window.scrollTo(0, 0);
};
const prevPage = async () => {
  currentCursor.value = prevCursor.value;
  fetchAllSeminar();
  window.scrollTo(0, 0);
};
</script>
<template>
  <div class="custom-container py-20">
    <div class="w-full lg:w-[80%] flex flex-col gap-10">
      <h3
        class="text-3xl md:text-4xl 2xl:text-6xl font-semibold text-primary-red"
      >
        {{ $t("join_our_free_seminar") }}
      </h3>
      <p>
        {{ $t("join_our_free_seminar_text_2") }}
      </p>
    </div>

    <div class="pt-20">
      <div class="flex gap-6 pb-2 border-b border-gray-500">
        <button
          @click="setCurrentTab('online')"
          class="px-4 py-1.5 rounded-lg font-bold hover:text-primary-red"
          :class="currentTab === 'online' ? 'text-primary-red' : ''"
        >
          {{ $t("online") }}
        </button>
        <button
          @click="setCurrentTab('office')"
          class="px-4 py-1.5 rounded-lg font-bold hover:text-primary-red"
          :class="currentTab === 'office' ? 'text-primary-red' : ''"
        >
          {{ $t("office") }}
        </button>
      </div>
      <Transition name="fade" mode="out-in">
        <div v-if="currentTab === 'online'">
          <div v-if="allSeminars.length > 0">
            <Seminars :seminars="allSeminars" />
            <div
              v-if="prevCursor || nextCursor"
              class="w-full flex justify-center items-center gap-10 pt-10 font-semibold"
            >
              <button
                @click="prevPage"
                :disabled="!prevCursor || isLoading"
                class="px-4 py-2 border border-gray-500 rounded-md hover:text-white hover:bg-primary-red hover:border-primary-red"
                :class="!prevCursor ? 'opacity-50 cursor-not-allowed' : ''"
              >
                {{ $t("prev") }}
              </button>
              <button
                @click="nextPage"
                :disabled="!nextCursor || isLoading"
                class="px-4 py-2 border border-gray-500 rounded-md hover:text-white hover:bg-primary-red hover:border-primary-red"
                :class="!nextCursor ? 'opacity-50 cursor-not-allowed' : ''"
              >
                {{ $t("next") }}
              </button>
            </div>
          </div>
          <div
            v-else-if="allSeminars.length == 0 && isLoading"
            class="isLoadingIcon flex flex-col w-full justify-center items-center py-20"
          >
            <IconsIsLoading />
            <p class="pt-28 text-xl font-bold">{{ $t("please_wait") }}</p>
          </div>
          <div v-else-if="allSeminars.length == 0 && !isLoading">
            <p class="text-4xl text-center py-20">
              {{ $t("no_online_seminar") }}
            </p>
          </div>
        </div>
        <div v-else-if="currentTab === 'office'">
          <p class="text-2xl text-left py-20">
            {{ $t("office_section") }}
          </p>
        </div>
      </Transition>
    </div>

    <div class="flex flex-col pt-20">
      <div class="w-full text-black pb-10 text-center space-y-4">
        <p class="text-2xl md:text-5xl font-semibold">
          {{ $t("admission_form") }}
        </p>
        <p class="text-xl md:text-2xl">{{ $t("fill_carefully") }}</p>
      </div>
      <div class="custom-container pb-20">
        <iframe
          src="https://docs.google.com/forms/d/13CnbhFbEghLeKPqQqkcCHAKRQNWl0ohCGCeE2j0MY3w/viewform?edit_requested=true"
          height="1000"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="min-w-[340px] w-full sm:w-[600px] lg:w-[700px]"
          >Loading…</iframe
        >
      </div>
    </div>
  </div>
</template>
