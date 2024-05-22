<script setup>
const route = useRoute();
const { RECENT_FILES, TOP_FILES, SLIDER, FOLDERS_AND_FILES } = useUrls();
const localePath = useLocalePath();

const routePaths = computed(() => {
  const paths = route.path.split("/").filter((item) => {
    return item !== "" && item !== "en";
  });
  return paths;
});

const isGrid = ref(true);
const toggleGrid = () => {
  isGrid.value = !isGrid.value;
};
const { $toast } = useNuxtApp();
const { t } = useI18n();

const { data: firmwareSliderRes, error } = useFetch(`${SLIDER}/firmware`);
const firmwareSlider = computed(() => firmwareSliderRes.value?.data);

const selectedSortBy = ref(1);
const sortBy = ref([
  { id: 1, value: "created_at", label: "Date" },
  { id: 2, value: "file_size", label: "Size" },
  { id: 3, value: "download_count", label: "Download" },
  { id: 4, value: "view_count", label: "Visits" },
]);

const selectedSortOrder = ref(1);
const sortOrder = ref([
  { id: 1, value: "asc", label: "Ascending" },
  { id: 2, value: "desc", label: "Descending" },
]);

const firmwareSlugRef = ref(null);

const setSortBy = ref("");
const setSortOrder = ref("");

const handleSorting = () => {
  setSortBy.value = "";
  setSortOrder.value = "";

  sortBy.value.forEach((singleSortby, index) => {
    if (singleSortby.id === selectedSortBy.value) {
      setSortBy.value = singleSortby.value;
    }
  });

  sortOrder.value.forEach((singleSortOrder, index) => {
    if (singleSortOrder.id === selectedSortOrder.value) {
      setSortOrder.value = singleSortOrder.value;
    }
  });

  firmwareSlugRef.value.pageRef.getNestedFirmwareFiles(
    setSortBy.value,
    setSortOrder.value
  );
};

const { data: recentFilesRes } = useFetch(RECENT_FILES);
const recentFiles = computed(() => recentFilesRes.value?.file);

const { data: topFilesRes } = useFetch(TOP_FILES);
const topFiles = computed(() => topFilesRes.value?.file);

const searchText = ref("");
const searchType = ref("all");
const typeDropsDown = ref(false);
const setSearchParams = () => {
  if (searchText.value.length > 0) {
    if (firmwareSlugRef.value.pageRef.resultNotFound) {
      $toast("clear");
      $toast("error", {
        message: t("messages.no_search_result"),
        className: "toasted-bg-alert",
      });
    }
    navigateTo(
      localePath(
        `/firmware?search=${searchText.value}&type=${searchType.value}`
      )
    );
  } else {
    navigateTo(localePath(`/firmware`));
  }
};
watch(searchText, (newValue, oldValue) => {
  if (newValue) {
    firmwareSlugRef.value.pageRef.resultNotFound = false;
  }
});
watch(searchType, (newValue, oldValue) => {
  if (newValue) {
    firmwareSlugRef.value.pageRef.resultNotFound = false;
  }
});
onMounted(() => {
  setTimeout(async () => {
    searchText.value = route.query.search ? route.query.search : "";
    searchType.value = route.query.type ? route.query.type : "all";
  });
  window.scrollTo(0, 0);
});
// For Mobile
const selectedFolder = ref({});
const selectedSubFolder = ref({});
const isFolderExpanded = (id) => {
  return selectedFolder.value.id === id;
};
const isSubFolderExpanded = (id) => {
  return selectedSubFolder.value.id === id;
};
const toggleFolder = (folder) => {
  selectedSubFolder.value = {};
  if (selectedFolder.value && selectedFolder.value.id === folder.id) {
    selectedFolder.value = {};
  } else {
    selectedFolder.value = folder;
  }
};
const toggleSubFolder = (subFolder) => {
  if (selectedSubFolder.value && selectedSubFolder.value.id === subFolder.id) {
    selectedSubFolder.value = {};
  } else {
    selectedSubFolder.value = subFolder;
  }
};

const { data: parentFoldersRes } = useFetch(FOLDERS_AND_FILES);
const parentFolders = computed(() => parentFoldersRes.value?.data);

// New for Desktop
const isExpandedParentFolder = ref(false);
const isExpandedSubFolder = ref(false);
const isMouseOnParentFolderContainer = ref(false);
const isMouseOnSubFolderContainer = ref(false);

const mouseOnParentFolder = (folder) => {
  selectedFolder.value = folder;
  isExpandedParentFolder.value = true;
  isExpandedSubFolder.value = false;
  isMouseOnSubFolderContainer.value = false;
  isMouseOnParentFolderContainer.value = true;
};
const mouseOnParentFolderContainer = () => {
  isMouseOnSubFolderContainer.value = false;
  isMouseOnParentFolderContainer.value = true;
};
const mouseLeaveFromParentFolderContainer = () => {
  setTimeout(() => {
    if (!isMouseOnSubFolderContainer.value) {
      isExpandedParentFolder.value = false;
      selectedFolder.value = {};
      selectedSubFolder.value = {};
    }
  }, 300);
};
const mouseOnSubAndFilesContainer = () => {
  isMouseOnSubFolderContainer.value = true;
  isMouseOnParentFolderContainer.value = false;
};
const mouseLeaveFromSubAndFilesContainer = () => {
  setTimeout(() => {
    if (isMouseOnParentFolderContainer.value) {
      isExpandedSubFolder.value = false;
      selectedSubFolder.value = {};
      isMouseOnSubFolderContainer.value = false;
    } else {
      isExpandedParentFolder.value = false;
      isExpandedSubFolder.value = false;
      isMouseOnSubFolderContainer.value = false;
      selectedFolder.value = {};
      selectedSubFolder.value = {};
    }
  }, 300);
};
const mouseOnSubFolder = (subFolder) => {
  isMouseOnSubFolderContainer.value = true;
  isExpandedSubFolder.value = true;
  selectedSubFolder.value = subFolder;
};
const mouseOnSubFile = () => {
  isExpandedSubFolder.value = false;
  isMouseOnSubFolderContainer.value = true;
  selectedSubFolder.value = {};
};
const clickOnSubFolder = () => {
  isExpandedParentFolder.value = false;
  isExpandedSubFolder.value = false;
  isMouseOnSubFolderContainer.value = false;
  selectedFolder.value = {};
  selectedSubFolder.value = {};
  clickToScroll();
};
const clickToScroll = () => {
  setTimeout(() => {
    const el = document.getElementById("firmware-filepath");
    if (el) {
      const scrollTop = el?.offsetTop - 140;
      window.scrollTo(0, scrollTop);
    }
  }, 1000);
};
</script>

<template>
  <div class="w-full pb-20 md:pb-28 xl:pb-[150px]">
    <!-- Firmware file start -->
    <div class="flex mt-[50px] custom-container">
      <div
        @mouseover.stop="mouseOnParentFolderContainer"
        @mouseleave.stop="mouseLeaveFromParentFolderContainer"
        class="hidden md:block border-2 border-gray-400 w-[200px] lg:w-[240px] xl:w-[300px] py-4 h-[64vh] max-h-[500px] mr-5 rounded-[20px]"
      >
        <div class="overflow-y-auto h-full font-semibold">
          <div
            v-for="(folder, index) in parentFolders"
            :key="folder.id"
            class="px-6 py-3 cursor-pointer"
            :class="
              isFolderExpanded(folder.id)
                ? 'bg-[#D9D9D9] text-primary-red'
                : 'text-black'
            "
            @mouseover.stop="mouseOnParentFolder(folder)"
          >
            <div class="flex justify-between">
              <div class="flex gap-4">
                <IconsFolderSvg class="min-w-[24px]" />
                <p class="line-clamp-1 break-words">{{ folder.title }}</p>
              </div>
              <IconsChevronDown
                v-if="isFolderExpanded(folder.id)"
                class="w-6 min-w-[24px] text-primary-red acpect-video -rotate-90"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- carousel -->
      <div
        class="relative rounded-[20px] flex-grow w-[calc(100%-200px)] lg:w-[calc(100%-240px)] xl:w-[calc(100%-300px)]"
      >
        <div
          v-if="isExpandedParentFolder || isExpandedSubFolder"
          @mouseleave.stop="mouseLeaveFromSubAndFilesContainer"
          @mouseover.stop="mouseOnSubAndFilesContainer"
          class="hidden md:flex inner-container rounded-[20px] h-[64vh] max-h-[500px]"
          :class="
            isExpandedParentFolder && isExpandedSubFolder
              ? 'w-full'
              : 'w-[200px] lg:w-[240px] xl:w-[300px]'
          "
        >
          <div
            v-if="isExpandedParentFolder"
            class="border-2 border-gray-400 w-[200px] lg:w-[240px] xl:w-[300px] h-full py-4 rounded-l-[20px]"
            :class="
              isExpandedParentFolder && isExpandedSubFolder
                ? 'border-r-0'
                : 'rounded-r-[20px]'
            "
          >
            <div class="overflow-y-auto h-full font-semibold">
              <template v-if="selectedFolder.sub_items.length > 0">
                <div
                  v-for="(folder, index) in selectedFolder.sub_items"
                  :key="folder.id"
                  class="px-6 py-3 cursor-pointer border-none"
                  :class="
                    isSubFolderExpanded(folder.id)
                      ? 'bg-[#D9D9D9] text-primary-red'
                      : 'text-black'
                  "
                  @mouseover.stop="mouseOnSubFolder(folder)"
                >
                  <div class="flex justify-between">
                    <div class="flex gap-4">
                      <IconsFolderSvg class="min-w-[24px]" />
                      <p class="line-clamp-1 break-words">{{ folder.title }}</p>
                    </div>
                    <IconsChevronDown
                      v-if="isSubFolderExpanded(folder.id)"
                      class="w-6 min-w-[24px] text-primary-red acpect-video -rotate-90"
                    />
                  </div>
                </div>
              </template>
              <template v-if="selectedFolder.files.length > 0">
                <div
                  v-for="(file, index) in selectedFolder.files"
                  :key="file.id"
                  class="px-6 py-3 cursor-pointer border-none"
                  @mouseover.stop="mouseOnSubFile"
                >
                  <NuxtLink
                    :to="localePath(`/download/${file.slug}`)"
                    class="flex justify-between"
                  >
                    <div class="flex gap-4 hover:text-primary-red">
                      <img
                        class="w-6 min-w-[24px]"
                        src="/images/firmware/file.png"
                      />
                      <p class="line-clamp-1 break-words">{{ file.title }}</p>
                    </div>
                  </NuxtLink>
                </div>
              </template>
              <div
                v-if="
                  selectedFolder.sub_items.length === 0 &&
                  selectedFolder.files.length === 0
                "
                class="flex justify-center items-center h-full"
              >
                <p class="text-xl">{{ $t("no_file_folder") }}</p>
              </div>
            </div>
          </div>
          <div
            v-if="isExpandedSubFolder"
            class="py-4 w-[calc(100%-200px)] lg:w-[calc(100%-240px)] xl:w-[calc(100%-300px)] h-full pl-2 rounded-r-[20px] rounded-br-[20px] border-r-2 border-t-2 border-b-2 border-gray-400"
          >
            <div class="border-l-2 h-full px-4 border-black font-semibold">
              <h2 class="text-[28px] pb-2 line-clamp-1">
                {{ selectedSubFolder?.title }}
              </h2>
              <div
                class="flex gap-5 flex-col overflow-y-auto h-full max-h-[calc(100%-50px)]"
              >
                <div
                  v-if="selectedSubFolder.sub_items.length > 0"
                  class="flex gap-4 flex-wrap"
                >
                  <NuxtLink
                    v-for="(folder, index) in selectedSubFolder.sub_items"
                    :to="
                      localePath(
                        `/firmware/${selectedFolder.slug}/${selectedSubFolder.slug}/${folder.slug}`
                      )
                    "
                    :key="folder.id"
                    @click.stop="clickOnSubFolder"
                    class="w-20 text-center hover:text-primary-red cursor-pointer"
                  >
                    <IconsFolder class="w-full" />
                    <p class="line-clamp-2">{{ folder.title }}</p>
                  </NuxtLink>
                </div>

                <div
                  v-if="selectedSubFolder.files.length > 0"
                  class="flex gap-4 flex-wrap"
                >
                  <NuxtLink
                    v-for="(file, index) in selectedSubFolder.files"
                    :key="file.id"
                    :to="localePath(`/download/${file.slug}`)"
                    class="w-20 text-center hover:text-primary-red cursor-pointer"
                  >
                    <img
                      class="w-full"
                      src="/images/firmware/file.png"
                      alt=""
                    />
                    <p class="line-clamp-2">{{ file.title }}</p>
                  </NuxtLink>
                </div>
                <div
                  v-if="
                    selectedSubFolder.sub_items.length === 0 &&
                    selectedSubFolder.files.length === 0
                  "
                  class="flex justify-center items-center h-full"
                >
                  <p class="text-xl">{{ $t("no_file_folder") }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex justify-center items-center">
          <div v-if="!firmwareSlider && !error" class="pb-16">
            <IconsIsLoading />
          </div>
          <div v-else-if="error" class="pb-16">
            {{ error.data.message }}
          </div>
          <BaseFirmwareCarousel
            v-else
            :slider="firmwareSlider"
            :carouselItemsClass="'h-[300px] md:h-[64vh] md:max-h-[500px]'"
            class="w-full"
          />
        </div>
      </div>
    </div>
    <!-- File section start for mobile -->
    <div class="mt-5 custom-container md:hidden">
      <div
        class="border-2 border-gray-500 rounded-[10px] max-h-[400px] overflow-y-auto"
      >
        <div class="flex flex-col">
          <div
            v-for="(folder, index) in parentFolders"
            :key="folder.id"
            class="flex flex-col"
          >
            <div
              @click="toggleFolder(folder)"
              class="flex items-center justify-between px-3 py-2.5 hover:bg-[#ECECEC]"
            >
              <div class="flex gap-3">
                <IconsFolderSvg class="text-black min-w-[24px]" />
                <p class="line-clamp-1">{{ folder.title }}</p>
              </div>
              <IconsCaretDown
                class="w-4 min-w-[16px] text-black acpect-video transform-all duration-500 ease-in-out"
                :class="isFolderExpanded(folder.id) ? 'rotate-180' : 'rotate-0'"
              />
            </div>
            <div v-if="isFolderExpanded(folder.id)" class="flex flex-col">
              <template v-if="selectedFolder.sub_items.length > 0">
                <div
                  v-for="(subFolder, index) in folder?.sub_items"
                  :key="subFolder.id"
                  class="flex flex-col"
                  :class="{
                    'bg-[#ECECEC]': isSubFolderExpanded(subFolder.id),
                  }"
                >
                  <div
                    @click="toggleSubFolder(subFolder)"
                    class="flex items-center justify-between pl-9 px-3 py-2.5"
                  >
                    <div class="flex gap-3">
                      <IconsFolderSvg class="text-black min-w-[24px]" />
                      <p class="line-clamp-1">{{ subFolder.title }}</p>
                    </div>
                    <IconsCaretDown
                      class="w-4 min-w-[16px] text-black acpect-video transform-all duration-500 ease-in-out"
                      :class="
                        isSubFolderExpanded(subFolder.id)
                          ? 'rotate-180'
                          : 'rotate-0'
                      "
                    />
                  </div>
                  <div
                    v-if="isSubFolderExpanded(subFolder.id)"
                    class="flex flex-wrap items-center gap-5 pl-9 pb-5"
                    :class="{
                      'pt-5':
                        selectedSubFolder.sub_items.length > 0 ||
                        selectedSubFolder.files.length > 0,
                    }"
                  >
                    <template v-if="selectedSubFolder.sub_items.length > 0">
                      <NuxtLink
                        v-for="(file, index) in subFolder?.sub_items"
                        :key="file.id"
                        :to="
                          localePath(
                            `/firmware/${folder.slug}/${subFolder.slug}/${file.slug}`
                          )
                        "
                        class="flex flex-col gap-2 text-center w-[70px]"
                        @click.stop="clickToScroll"
                      >
                        <IconsFolder class="w-full" />
                        <p class="line-clamp-1 break-words">
                          {{ file.title }}
                        </p>
                      </NuxtLink>
                    </template>
                    <template v-if="selectedSubFolder.files.length > 0">
                      <NuxtLink
                        v-for="(file, index) in subFolder?.files"
                        :key="file.id"
                        :to="localePath(`/download/${file.slug}`)"
                        class="flex flex-col gap-2 text-center w-[70px]"
                      >
                        <img
                          class="w-full aspect-square"
                          src="/images/firmware/file.png"
                        />
                        <p class="line-clamp-1 break-words">
                          {{ file.title }}
                        </p>
                      </NuxtLink>
                    </template>
                    <div
                      v-if="
                        selectedSubFolder.sub_items.length === 0 &&
                        selectedSubFolder.files.length === 0
                      "
                      class="flex justify-start items-center w-full"
                    >
                      <p class="text-sm">{{ $t("no_file_folder") }}</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-if="selectedFolder.files.length > 0">
                <NuxtLink
                  v-for="(subFolder, index) in folder?.files"
                  :key="subFolder.id"
                  :to="localePath(`/download/${subFolder.slug}`)"
                  class="flex flex-col gap-5 hover:bg-[#ECECEC]"
                >
                  <div
                    class="flex items-center justify-between pl-9 px-3 py-2.5"
                  >
                    <div class="flex gap-3">
                      <img
                        class="w-6 min-w-[24px]"
                        src="/images/firmware/file.png"
                      />
                      <p class="line-clamp-1">{{ subFolder.title }}</p>
                    </div>
                  </div>
                </NuxtLink>
              </template>
              <div
                v-if="
                  selectedFolder.sub_items.length === 0 &&
                  selectedFolder.files.length === 0
                "
                class="pl-9 px-3 py-2.5"
              >
                <p class="text-sm">{{ $t("no_file_folder") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Firmware file end -->
    <!-- Search bar start -->
    <div class="w-full py-5 mt-[30px]">
      <div class="custom-container flex flex-row">
        <div
          class="w-full h-10 md:h-[60px] rounded-full flex flex-row items-center bg-white border border-black"
        >
          <input
            class="text-sm md:text-2xl h-9 md:h-14 ml-6 md:mx-6 lg:mx-10 outline-none flex-grow"
            type="text"
            :placeholder="$t('search_keyword')"
            v-model="searchText"
            @keyup.enter="setSearchParams"
          />
          <div class="md:hidden relative">
            <div
              @click="typeDropsDown = !typeDropsDown"
              class="p-0.5 border border-black rounded-md min-w-8 w-8 h-8 flex items-center justify-center"
            >
              <IconsSmallFolder
                v-if="searchType === 'all'"
                class="w-full h-full aspect-square"
              />
              <IconsFile
                v-else-if="searchType === 'file'"
                class="w-full h-full aspect-square"
              />
              <IconsFileFolder
                v-else="searchType === 'folder'"
                class="w-full h-full aspect-square"
              />
            </div>
            <div
              v-if="typeDropsDown"
              class="absolute top-10 -left-10 flex flex-col gap-2 bg-white rounded whitespace-nowrap shadow-xl"
            >
              <p
                @click="(searchType = 'all'), (typeDropsDown = false)"
                class="hover:bg-slate-200 px-2 py-1"
              >
                {{ $t("files") }} / {{ $t("folders") }}
              </p>
              <p
                @click="(searchType = 'file'), (typeDropsDown = false)"
                class="hover:bg-slate-200 px-2 py-1"
              >
                {{ $t("files") }}
              </p>
              <p
                @click="(searchType = 'folder'), (typeDropsDown = false)"
                class="hover:bg-slate-200 px-2 py-1"
              >
                {{ $t("folders") }}
              </p>
            </div>
          </div>
          <div class="relative hidden md:block">
            <select
              class="appearance-none px-4 h-10 w-[230px] border border-black outline-none bg-white rounded-md"
              id="folders"
              name="Folders"
              v-model="searchType"
            >
              <option value="all">
                {{ $t("files") }} / {{ $t("folders") }}
              </option>
              <option value="file">{{ $t("files") }}</option>
              <option value="folder">{{ $t("folders") }}</option>
            </select>
            <IconsCaretDown
              class="absolute top-0 bottom-0 my-auto right-4 text-black w-4"
            />
          </div>
          <button
            class="ml-2.5 text-sm md:text-lg xl:text-xl h-10 md:!h-[60px] rounded-r-full min-w-[80px] px-5 bg-black text-white font-semibold whitespace-nowrap"
            @click="setSearchParams"
          >
            {{ $t("search") }}
          </button>
        </div>
      </div>
    </div>
    <!-- Search bar end -->
    <!-- Recent and top files start -->
    <div class="bg-[#F1F1F1] py-4 md:!mb-[46px]" v-if="routePaths.length === 1">
      <div class="custom-container space-y-2.5 text-base md:text-xl">
        <div
          v-if="recentFiles"
          class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        >
          <p
            class="flex flex-row items-center space-x-2 min-w-[190px] whitespace-nowrap"
          >
            <IconsHistory class="min-w-[20px]" />
            <span>{{ $t("recent_files") }}</span>
          </p>
          <marquee
            class="w-full bg-white h-10 rounded-full flex items-center px-5 space-x-3 overflow-hidden"
          >
            <div class="flex space-x-2">
              <span
                v-for="(file, index) in recentFiles"
                :key="file.id"
                class="flex flex-row items-center space-x-2 whitespace-nowrap"
              >
                <NuxtLink
                  :to="localePath(`/download/${file.slug}`)"
                  class="text-[#EC1F27] font-semibold"
                  >{{ file.title }}</NuxtLink
                >
                <span
                  v-if="file.is_featured === 1"
                  class="px-3 text-white rounded-full font-semibold bg-[#0073B7]"
                >
                  FEATURED
                </span>
                <span class="text-[#929292]">
                  [ {{ $dateFormat(file.created_at) }} ]
                </span>
              </span>
            </div>
          </marquee>
        </div>
        <div
          v-if="topFiles"
          class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        >
          <p
            class="flex flex-row items-center space-x-2 min-w-[190px] whitespace-nowrap"
          >
            <IconsTopFiles class="min-w-[20px]" />
            <span>{{ $t("top_files") }}</span>
          </p>
          <marquee
            class="bg-white h-10 rounded-full w-full flex items-center px-5 space-x-3 overflow-hidden"
          >
            <div class="flex space-x-2">
              <span
                class="flex flex-row items-center space-x-2 whitespace-nowrap"
                v-for="file in topFiles"
                :key="file.id"
              >
                <NuxtLink
                  :to="localePath(`/download/${file.slug}`)"
                  class="text-[#EC1F27] font-semibold"
                  >{{ file.title }}</NuxtLink
                >
                <p class="text-[#929292]">[ {{ file.total[0] }} ]</p>
              </span>
            </div>
          </marquee>
        </div>
      </div>
    </div>
    <!-- Recent and top files end -->
    <!-- Firmware filepath with icon start -->
    <div
      v-if="routePaths.length > 1"
      class="h-[50px] w-full border-y border-black flex items-center"
    >
      <ul
        class="w-full h-full flex items-center custom-container text-lg xl:text-2xl overflow-hidden"
      >
        <template v-for="(item, index) in routePaths" :key="index">
          <li
            class="h-full min-w-[120px] flex items-center pr-3 font-semibold border-black whitespace-nowrap cursor-pointer"
            :class="
              index === routePaths.length - 1
                ? 'text-black border-0'
                : 'border-r text-[#929292]'
            "
            @click="$redirectToExactPath(item)"
          >
            <IconsFolder v-if="index != 0" class="w-6 h-5 mx-2" />
            <span>{{
              item.length <= 10 ? item : item.slice(0, 9) + "..."
            }}</span>
          </li>
        </template>
      </ul>
    </div>
    <!-- Firmware filepath with icon end -->
    <!-- Back button of slug page start -->
    <div
      id="firmware-filepath"
      v-if="routePaths.length > 1"
      class="custom-container pt-10"
    >
      <div class="flex flex-col space-y-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center justify-start space-x-3">
            <IconsLeftArrow
              class="w-5 h-5 md:!w-[30px] md:!h-[30px] xl:w-10 xl:h-10 cursor-pointer"
              @click="$redirectToParentPath(), clickToScroll()"
            />
            <p
              class="text-xl md:!text-[28px] xl:text-3xl font-semibold line-clamp-1"
            >
              {{ routePaths[routePaths.length - 1] }}
            </p>
          </div>
        </div>
        <!-- Back button of slug page end -->
        <div class="flex justify-between items-center">
          <NuxtLink
            :to="localePath('/firmware')"
            class="text-[#929292] text-sm md:text-lg font-semibold"
          >
            {{ $t("all_files") }}
          </NuxtLink>
          <!-- Grid/List for mobile start -->
          <p
            @click="toggleGrid"
            class="md:hidden cursor-pointer text-[#ED1C24]"
          >
            <IconsGrid v-if="isGrid" />
            <IconsList v-else />
          </p>
          <!-- Grid/List for mobile end -->
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-between custom-container"
      :class="routePaths.length === 1 ? 'pt-10' : 'pt-5'"
    >
      <div>
        <!-- Sort Ascending descending start -->
        <div v-if="routePaths.length > 1" class="flex items-center space-x-4">
          <div class="relative">
            <select
              class="appearance-none px-4 h-10 w-[134px] md:!h-[50px] md:!w-[200px] border border-black outline-none bg-white rounded-md"
              id="sortBy"
              name="SortBy"
              v-model="selectedSortBy"
            >
              <option
                v-for="(option, index) in sortBy"
                :key="index"
                :value="option.id"
                :selected="option.isSelected"
              >
                {{ option.label }}
              </option>
            </select>

            <IconsCaretDown
              class="absolute top-0 bottom-0 my-auto right-4 text-black w-4"
            />
          </div>

          <div class="relative">
            <select
              class="appearance-none px-4 h-10 w-[134px] md:!h-[50px] md:!w-[200px] border border-black outline-none bg-white rounded-md"
              id="sortOrder"
              name="SortOrder"
              v-model="selectedSortOrder"
            >
              <option
                v-for="(option, index) in sortOrder"
                :key="index"
                :value="option.id"
                :selected="option.isSelected"
              >
                {{ option.label }}
              </option>
            </select>
            <IconsCaretDown
              class="absolute top-0 bottom-0 my-auto right-4 text-black w-4"
            />
          </div>

          <button
            class="bg-[#EC1F27] text-white rounded-md font-bold text-lg h-10 md:h-[50px] px-4"
            @click="handleSorting"
          >
            <IconsSort class="md:hidden mx-auto" />
            <span class="hidden md:block mx-auto">{{ $t("sort") }}</span>
          </button>
        </div>
        <!-- Sort Ascending descending end -->
      </div>
      <!-- Grid/List for Desktop start -->
      <div
        class="items-center space-x-3"
        :class="routePaths.length === 1 ? 'flex' : 'hidden md:flex'"
      >
        <p
          @click="toggleGrid"
          class="flex items-center space-x-2.5 cursor-pointer"
        >
          <IconsGrid :class="isGrid ? 'text-[#EC1F27]' : 'text-[#929292]'" />
          <span>{{ $t("grid") }}</span>
        </p>
        <p
          @click="toggleGrid"
          class="flex items-center space-x-2.5 cursor-pointer"
        >
          <IconsList :class="isGrid ? 'text-[#929292]' : 'text-[#EC1F27]'" />
          <span>{{ $t("list") }}</span>
        </p>
      </div>
      <!-- Grid/List for Desktop end -->
    </div>

    <NuxtPage
      ref="firmwareSlugRef"
      :is-grid="isGrid"
      :search-type="searchType"
    />
  </div>
</template>

<style scoped>
.inner-container {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 9;
  background-color: white;
}
.inner-container-child {
  position: absolute;
  top: 0px;
  z-index: 9;
  background-color: white;
  @apply left-[200px] lg:left-[240px] xl:left-[300px];
}
.parent-folder:hover {
  background-color: rgb(160, 156, 156);
  color: red;
}
.parent-folder:hover .folder {
  color: red;
}
.parent-folder:hover .arrow {
  display: block;
}
</style>
