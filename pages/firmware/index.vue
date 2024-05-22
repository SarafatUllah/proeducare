<script setup>
const props = defineProps({
  isGrid: {
    type: Boolean,
    required: true,
    default: true,
  },
  searchType: {
    type: String,
    required: true,
    default: "all",
  },
});
const {
  FILE_SEARCH,
  USER_SUBSCRIPTIONS,
  DOWNLOAD_FILES,
  RANDOM_FILES,
  FIRMWARE_FILES,
} = useUrls();
const isProcessing = ref(false);
const currentPage = ref(0);
const totalPage = ref(0);
const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

const query = computed(() => route.query);
const loadMore = ref(false);
const firmwareFiles = ref([]);
const searchResult = ref([]);
const resultNotFound = ref(false);
const loadFirmwareFiles = async () => {
  if (query?.value?.search || query?.value?.type) {
    await loadSearchResult();
    return;
  }
  isProcessing.value = true;
  searchResult.value = [];
  try {
    const { data } = await useFetch(
      `${RANDOM_FILES}?page=${currentPage.value + 1}`
    );

    totalPage.value = data.value.meta.last_page;
    if (data.value.data.length > 0) {
      firmwareFiles.value = firmwareFiles.value.concat(data.value.data);
      isProcessing.value = false;
    } else {
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: t("messages.no_file_or_folder"),
        className: "toasted-bg-alert",
      });
      isProcessing.value = false;
    }
  } catch (error) {
    setTimeout(() => {
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: error?.response?._data?.message,
        className: "toasted-bg-alert",
      });
    }, 500);
    isProcessing.value = false;
  } finally {
    isProcessing.value = false;
  }
};

const loadSearchResult = async () => {
  isProcessing.value = true;
  firmwareFiles.value = [];
  searchResult.value = [];
  try {
    const { data } = await useFetch(
      `${FILE_SEARCH}?type=${query.value.type}&query=${query.value.search}`
    );
    if (data.value.data.length > 0) {
      searchResult.value = data.value.data;
      isProcessing.value = false;
      resultNotFound.value = false;
    } else {
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: t("messages.no_search_result"),
        className: "toasted-bg-alert",
      });
      setTimeout(() => {
        resultNotFound.value = true;
      }, 500);
      isProcessing.value = false;
    }
  } catch (error) {
    console.log(error);
    isProcessing.value = false;
  } finally {
    isProcessing.value = false;
  }
};
defineExpose({
  resultNotFound,
  firmwareFiles,
});
await loadFirmwareFiles();

// Pagination
// const isLeftDisabled = ref(true);
// const isRightDisabled = ref(false);

// const changePage = (page) => {
//   if (page > 1) {
//     if (isLeftDisabled.value) {
//       isLeftDisabled.value = false;
//     }
//   }
//   currentPage.value = page - 1;
//   loadFirmwareFiles();
// };

// const prevPage = () => {
//   if (isRightDisabled.value) {
//     isRightDisabled.value = false;
//   }
//   if (currentPage.value < 1) {
//     isLeftDisabled.value = true;
//     nuxtApp.$toast("clear");
//     nuxtApp.$toast("error", {
//       message: "There have no more file.",
//       className: "alert_error",
//     });
//     window.scrollTo(0, 0);
//     return;
//   } else {
//     currentPage.value = currentPage.value - 1;
//     loadFirmwareFiles();
//     isLeftDisabled.value = false;
//   }
// };

const nextPage = () => {
  if (currentPage.value >= totalPage.value - 1) {
    if (loadMore.value) {
      loadMore.value = false;
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: t("messages.all_files_loaded"),
        className: "alert_error",
      });
    }
    return;
  } else {
    loadMore.value = true;
    currentPage.value = currentPage.value + 1;
    loadFirmwareFiles();
  }
};
const handleScroll = () => {
  const elem = document?.getElementById("firmwareContainer");
  const offsetTop = elem?.offsetTop;
  const offsetHeight = elem?.offsetHeight;
  const distance = offsetTop + offsetHeight;

  if (window.scrollY + window.innerHeight >= distance && !isProcessing.value) {
    nextPage();
  }
};
// Hooks
watch(
  () => route.query,
  (query) => {
    if (query.search || query.type) {
      loadSearchResult();
    } else {
      loadFirmwareFiles();
    }
  }
);
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const tokenCookie = useCookie("token");
const { setRedirectUrl } = useAuth();
const isLoading = ref(true);
const convertMBtoGBandMB = (fileSizeMB) => {
  const GB = Math.floor(fileSizeMB / 1024);
  const remainingMB = Math.round((fileSizeMB % 1024) * 100) / 100;

  if (GB === 0) {
    return remainingMB + "MB";
  } else {
    return GB + "." + remainingMB + "GB";
  }
};
const checkDownloadCondition = async (
  downloadFileId,
  isThisFeatured,
  requestFileSize
) => {
  try {
    isLoading.value = true;
    if (!tokenCookie.value || tokenCookie.value === "") {
      setRedirectUrl(route.fullPath);
      router.push(localePath("/auth/login"));
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: t("messages.login_first"),
        className: "toasted-bg-alert",
      });
    } else {
      let response = await $fetch(`${USER_SUBSCRIPTIONS}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      });
      if (
        response.conditions.total_band_width >
          response.conditions.used_total_band_width &&
        response.conditions.total_file > response.conditions.used_total_file
      ) {
        if (
          response.conditions.total_band_width >=
          response.conditions.used_total_band_width + requestFileSize
        ) {
          if (
            response.conditions.is_all_file ||
            (response.conditions.is_featured_file && isThisFeatured) ||
            (response.conditions.is_none_featured_file && !isThisFeatured)
          ) {
            let downloadUrl = await $fetch(
              `${DOWNLOAD_FILES}/${downloadFileId}/download`,
              {
                headers: {
                  Authorization: `Bearer ${tokenCookie.value}`,
                },
              }
            );
            isLoading.value = false;

            const link = document.createElement("a");
            link.href = URL.createObjectURL(downloadUrl);

            link.download = "download.zip";
            link.click();

            URL.revokeObjectURL(link.href);
            // window.open(downloadUrl.url, "_blank");
          } else {
            isLoading.value = false;
            setRedirectUrl(route.fullPath);
            router.push(localePath("/subscription"));

            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message: t("messages.upgrade_subscription"),
              className: "toasted-bg-alert",
            });
          }
        } else {
          isLoading.value = false;
          setRedirectUrl(route.fullPath);
          router.push(localePath("/subscription"));

          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: t("messages.exceeded_download_limit"),
            className: "toasted-bg-alert",
          });
        }
      } else {
        isLoading.value = false;
        setRedirectUrl(route.fullPath);
        router.push(localePath("/subscription"));

        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: t("messages.upgrade_subscription"),
          className: "toasted-bg-alert",
        });
      }
    }
  } catch (error) {
    console.log(error);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
  }
};

const isShowFirmwareNestedFile = ref(false);
const handleFirmwareNestedFile = () => {
  isShowFirmwareNestedFile.value = true;
  setTimeout(() => {
    isShowFirmwareNestedFile.value = false;
  }, 500);
};
</script>

<template>
  <div>
    <div
      v-if="isProcessing && !loadMore"
      class="isLoadingIcon flex flex-col justify-center items-center h-[200px]"
    >
      <IconsIsLoading />
    </div>

    <div id="firmwareContainer" v-else-if="firmwareFiles.length > 0">
      <!-- <div
        class="custom-container pt-[30px] md:pt-28 xl:pt-[80px] grid gap-5"
        :class="
          !isGrid ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
        "
      >
        <NuxtLink
          class="flex"
          :class="[
            isGrid
              ? 'flex-col md:flex-row items-center md:items-start justify-start space-y-2 md:space-y-0 md:space-x-3 text-center md:text-left'
              : 'flex-row space-x-3 items-start',
            isShowFirmwareNestedFile ? 'pointer-events-none' : '',
          ]"
          v-for="file in firmwareFiles"
          :key="file.id"
          :to="localePath(`firmware/${file.slug}`)"
          @click="handleFirmwareNestedFile"
        >
          <IconsNewFolder v-if="file.isNew" class="w-[90px] xl:w-[120px]" />
          <IconsFolder v-else class="w-[90px] xl:w-[120px]" />
          <div class="flex flex-col space-y-0.5 md:space-y-3">
            <p
              class="text-lg md:text-xl xl:text-2xl font-semibold line-clamp-2"
            >
              {{ file.title }}
            </p>
            <p class="text-[#929292]">{{ file.subTitle }}</p>
          </div>
        </NuxtLink>
      </div> -->
      <div
        class="custom-container pt-20 grid gap-4"
        :class="
          !isGrid
            ? 'grid-cols-1 justify-items-start'
            : 'grid-cols-1 lg:grid-cols-2'
        "
      >
        <template v-for="item in firmwareFiles" :key="item.id">
          <div
            class="relative min-h-[160px] flex flex-col md:flex-row md:items-center md:justify-between border border-[#00000048] rounded-[20px] px-5 py-5 md:py-0 w-full"
          >
            <div
              v-if="!item.is_paid"
              class="mt-1 absolute top-[0px] flex justify-center items-center bg-green-400 text-white rounded-md font-bold w-[70px]"
            >
              <p>Free</p>
            </div>
            <div
              class="flex space-x-0 items-start md:space-x-5 md:items-center"
            >
              <IconsDeviceGreen
                v-if="!item.is_paid"
                class="w-[68px] h-[84px] hidden md:block"
              />
              <IconsDevice v-else class="w-[68px] h-[84px] hidden md:block" />
              <div
                class="font-semibold text-base xl:text-lg space-y-2.5 md:space-y-3"
              >
                <div class="flex items-center">
                  <IconsDevice
                    class="w-[68px] h-[84px] mr-2.5 block md:hidden"
                  />
                  <h2 class="text-xl xl:text-2xl line-clamp-2">
                    {{ item.title }}
                  </h2>
                </div>
                <div
                  v-if="item?.isNew"
                  class="w-[50px] h-6 bg-[#EC1F27] text-white flex items-center justify-center"
                >
                  <span>new</span>
                </div>
                <p class="text-[#929292]">{{ item.fileName }}</p>
                <p class="text-[#929292]">
                  Date: {{ $dateFormat(item.created_at) }} | Size:
                  {{ convertMBtoGBandMB(item.file_size) }}
                </p>
              </div>
            </div>

            <NuxtLink
              :to="localePath(`/download/${item.slug}`)"
              class="mt-2.5 md:mt-0 flex justify-center items-center bg-[#EC1F27] text-white rounded-md font-bold h-10 w-[100px] md:h-[50px] md:w-[140px]"
            >
              <span class="text-sm md:text-lg">{{ $t("download") }}</span>
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
    <div v-else-if="searchResult.length > 0">
      <div
        class="custom-container pt-20 grid gap-4"
        :class="
          !isGrid
            ? 'grid-cols-1 justify-items-start'
            : 'grid-cols-1 lg:grid-cols-2'
        "
      >
        <template v-for="item in searchResult" :key="item.id">
          <div
            v-if="item.access_type === 'file'"
            class="min-h-[160px] flex flex-col md:flex-row md:items-center md:justify-between border border-[#00000048] rounded-[20px] px-5 py-5 md:py-0 w-full"
          >
            <div
              class="flex space-x-0 items-start md:space-x-5 md:items-center"
            >
              <IconsDevice class="w-[68px] h-[84px] hidden md:block" />
              <div
                class="font-semibold text-base xl:text-lg space-y-2.5 md:space-y-3"
              >
                <div class="flex items-center">
                  <IconsDevice
                    class="w-[68px] h-[84px] mr-2.5 block md:hidden"
                  />
                  <h2 class="text-xl xl:text-2xl line-clamp-2">
                    {{ item.title }}
                  </h2>
                </div>
                <div
                  v-if="item.isNew"
                  class="w-[50px] h-6 bg-[#EC1F27] text-white flex items-center justify-center"
                >
                  <span>new</span>
                </div>
                <p class="text-[#929292]">{{ item.fileName }}</p>
                <p class="text-[#929292]">
                  Date: {{ $dateFormat(item.created_at) }} | Size:
                  {{ convertMBtoGBandMB(item.file_size) }}
                </p>
              </div>
            </div>

            <NuxtLink
              :to="localePath(`/download/${item.slug}`)"
              class="mt-2.5 md:mt-0 flex justify-center items-center bg-[#EC1F27] text-white rounded-md font-bold h-10 w-[100px] md:h-[50px] md:w-[140px]"
            >
              <span class="text-sm md:text-lg">{{ $t("download") }}</span>
            </NuxtLink>
          </div>
        </template>
      </div>

      <div
        class="custom-container pt-[30px] md:pt-20 grid gap-5"
        :class="
          !isGrid
            ? 'grid-cols-1 justify-items-start'
            : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
        "
      >
        <template v-for="file in searchResult" :key="file.id">
          <NuxtLink
            v-if="file.access_type === 'folder'"
            class="flex"
            :class="
              isGrid
                ? 'flex-col md:flex-row items-center md:items-start justify-start space-y-2 md:space-y-0 md:space-x-3 text-center md:text-left'
                : 'flex-row space-x-3 items-start'
            "
            :to="`${route.path}/${file.slug}`"
          >
            <IconsNewFolder v-if="file.isNew" class="w-[90px] xl:w-[120px]" />
            <IconsFolder v-else class="w-[90px] xl:w-[120px]" />
            <div class="flex flex-col space-y-0.5 md:space-y-3">
              <p
                class="text-lg md:text-xl xl:text-2xl font-semibold line-clamp-2"
              >
                {{ file.title }}
              </p>
              <p class="text-[#929292]">{{ file.subTitle }}</p>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>

    <div
      v-else
      class="w-full h-full flex flex-col justify-center items-center pt-[100px]"
    >
      <IconsNoData class="" />
      <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
    </div>
  </div>
</template>

<style scoped>
.button {
  @apply h-10 w-10 text-base rounded-md hover:bg-primary-red p-2 hover:text-white;
}
.activeButton {
  @apply bg-primary-red text-white;
}
.inactiveButton {
  @apply bg-white text-[#374151];
}
</style>
