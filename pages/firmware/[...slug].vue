<script setup>
const route = useRoute();
const router = useRouter();
const { setRedirectUrl } = useAuth();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const { t } = useI18n();

const routePaths = computed(() => {
  const paths = route.path.split("/").filter((item) => {
    return item !== "";
  });
  return paths;
});
const tokenCookie = useCookie("token");

const { FIRMWARE_FILES, USER_SUBSCRIPTIONS, DOWNLOAD_FILES } = useUrls();

const props = defineProps({
  isGrid: {
    type: Boolean,
    required: true,
  },
});

const isLoading = ref(true);

// API call
const nestedFirmwareFiles = ref({});

const getNestedFirmwareFiles = async (setSortBy, setSortOrder) => {
  try {
    isLoading.value = true;
    let response;
    nestedFirmwareFiles.value = {};
    if (setSortBy !== undefined && setSortOrder !== undefined) {
      response = await $fetch(
        `${FIRMWARE_FILES}/${
          routePaths.value[routePaths.value.length - 1]
        }?filter=${setSortBy}&sort=${setSortOrder}`
      );
    } else {
      response = await $fetch(
        `${FIRMWARE_FILES}/${routePaths.value[routePaths.value.length - 1]}`
      );
    }

    nestedFirmwareFiles.value = response.data;
  } catch (error) {
    console.log(error);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
    isLoading.value = false;
  } finally {
    isLoading.value = false;
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
                responseType: "blob",
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

const convertMBtoGBandMB = (fileSizeMB) => {
  const GB = Math.floor(fileSizeMB / 1024);
  const remainingMB = Math.round((fileSizeMB % 1024) * 100) / 100;

  if (GB === 0) {
    return remainingMB + "MB";
  } else {
    return GB + "." + remainingMB + "GB";
  }
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

onMounted(() => {
  setTimeout(() => {
    getNestedFirmwareFiles();
  }, 500);
});

defineExpose({
  getNestedFirmwareFiles,
});
</script>

<template>
  <div class="min-h-[400px]">
    <Transition name="fade" mode="out-in">
      <div
        v-if="isLoading"
        class="isLoadingIcon flex flex-col justify-center items-center h-[200px] pt-20"
      >
        <IconsIsLoading />
      </div>
      <div v-else>
        <div
          v-if="
            nestedFirmwareFiles?.files.length > 0 ||
            nestedFirmwareFiles?.subItems.length > 0
          "
        >
          <div
            v-if="nestedFirmwareFiles?.files"
            class="custom-container pt-20 grid gap-4"
            :class="
              !isGrid
                ? 'grid-cols-1 justify-items-start'
                : 'grid-cols-1 lg:grid-cols-2'
            "
          >
            <div
              v-for="item in nestedFirmwareFiles?.files"
              :key="item.id"
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
          </div>

          <div
            v-if="nestedFirmwareFiles?.subItems"
            class="custom-container pt-[30px] md:pt-20 grid gap-5"
            :class="
              !isGrid
                ? 'grid-cols-1 justify-items-start'
                : 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
            "
          >
            <NuxtLink
              class="flex"
              :class="
                isGrid
                  ? 'flex-col md:flex-row items-center md:items-start justify-start space-y-2 md:space-y-0 md:space-x-3 text-center md:text-left'
                  : 'flex-row space-x-3 items-start'
              "
              v-for="file in nestedFirmwareFiles?.subItems"
              :key="file.id"
              :to="`${route.path}/${file.slug}`"
              @click="clickToScroll"
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
    </Transition>
  </div>
</template>

<style scoped></style>
