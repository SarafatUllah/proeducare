<script setup>
import { storeToRefs } from "pinia";
import { useCartDataStore } from "~/stores/cartData";
import { useSubscriptionPackageStore } from "~/stores/subscriptionPackage";
const { USER_SUBSCRIPTIONS, DOWNLOAD_FILES, FIRMWARE_FILES, siteUlr } =
  useUrls();
const localePath = useLocalePath();
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const tokenCookie = useCookie("token");
const { setRedirectUrl } = useAuth();
const { setSubscriptionDataForApi } = useCartDataStore();

const { isActiveSubscription } = storeToRefs(useSubscriptionPackageStore());

const isLoading = ref(true);

const fileDetail = ref({});

const getFileDetails = () => {
  const { data, pending, error } = useFetch(
    `${FIRMWARE_FILES}/${route.params.slug}/details`,
    {
      headers: {
        Authorization: `Bearer ${tokenCookie.value ? tokenCookie.value : ""}`,
      },
    }
  );

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        fileDetail.value = data.value;
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value?.data.message,
          className: "toasted-bg-success",
        });
        isProcessing.value = false;
      }
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};
getFileDetails();

const fileUrl = computed(() => {
  return `${siteUlr}/download/${fileDetail?.value?.data?.slug}`;
});

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
  downloadFile,
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
      if (isActiveSubscription.value) {
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
                `${DOWNLOAD_FILES}/${downloadFile.id}/download`,
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
      } else {
        const { data, pending, error } = useFetch(
          `${DOWNLOAD_FILES}/${downloadFile.id}/download`,
          {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`,
            },

          }
        );

        const setData = () => {
          if (!pending.value) {
            if (data.value) {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(data.value);

              link.download = "download.zip";
              link.click();

              URL.revokeObjectURL(link.href);
              setRedirectUrl("/");
            } else if (error.value) {
              nuxtApp.$toast("clear");
              nuxtApp.$toast("error", {
                message: error.value?.data.message,
                className: "toasted-bg-success",
              });

              const makeSubscriptionDataForApi = {
                type: "file",
                downloadFileDetails: downloadFile,
                downloadFileId: [
                  {
                    item_id: downloadFile.id,
                  },
                ],
              };
              setSubscriptionDataForApi(makeSubscriptionDataForApi);

              if(error.value?.statusCode === 403){
                 setTimeout(() => {
                router.push(localePath("/billing"));
              }, 300);
              }

             
            }
          } else {
            setTimeout(() => {
              setData();
            }, 300);
          }
        };
        setData();
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
const showFileDetail = ref(false);
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="custom-container pt-10 pb-24 w-full md:w-[80%]">
    <div class="flex flex-col space-y-4">
      <div class="flex justify-between items-center">
        <div
          class="flex items-center justify-start space-x-3"
          @click="router.back()"
        >
          <IconsLeftArrow class="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
          <span class="text-2xl font-semibold line-clamp-1">
            {{ $t("back") }}
          </span>
        </div>
      </div>
    </div>
    <div
      class="mt-4 border border-[#00000048] rounded-[20px] px-4 pt-5 md:pt-10 pb-7 md:pb-[55px]"
    >
      <h2
        v-if="fileDetail?.data?.title"
        class="text-[30px] xl:text-5xl font-extrabold text-center"
      >
        {{ fileDetail?.data?.title }}
      </h2>
      <div
        v-if="fileDetail?.data?.isNew"
        class="flex items-center justify-center py-4 md:py-5 text-center"
      >
        <p
          class="w-16 h-8 md:w-20 md:h-10 bg-[#EC1F27] flex justify-center items-center"
        >
          <span class="text-white font-semibold">New</span>
        </p>
      </div>
      <p
        v-if="fileDetail?.data?.fileName"
        class="text-base md:text-lg font-semibold text-center"
      >
        {{ fileDetail?.data?.fileName }}
      </p>
      <div
        class="py-6 xl:py-10 flex items-center justify-center space-x-5 text-center"
      >
        <div class="flex space-x-2.5">
          <NuxtLink
            :to="`https://www.facebook.com/share.php?u=${fileUrl}`"
            target="_blank"
          >
            <IconsFacebookShare class="w-20 md:w-[100px]" />
          </NuxtLink>
          <div v-if="fileDetail?.data?.fbCount" class="couter-bg w-16 text-sm">
            {{ fileDetail?.data?.fbCount }}
          </div>
        </div>
        <div class="flex space-x-2.5">
          <NuxtLink
            :to="`http://twitter.com/share?&url=${fileUrl}&text=Fiverr Outsourcing Institute firmware - ${fileDetail?.data?.title}.`"
            target="_blank"
          >
            <IconsTwitterShare class="w-20 md:w-[100px]" />
          </NuxtLink>
          <span
            v-if="fileDetail?.data?.twCount"
            class="couter-bg w-16 text-sm"
            >{{ fileDetail?.data?.twCount }}</span
          >
        </div>
      </div>
      <div class="h-0.5 w-full bg-[#00000048]"></div>
      <p
        v-if="fileDetail?.data?.created_at"
        class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4 text-center"
      >
        {{ $t("date") }} - {{ $dateFormat(fileDetail?.data?.created_at) }}
      </p>
      <div class="h-0.5 w-full bg-[#00000048]"></div>
      <p
        v-if="fileDetail?.data?.file_size"
        class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4 text-center"
      >
        {{ $t("file_size") }} -
        {{ convertMBtoGBandMB(fileDetail?.data?.file_size) }}
      </p>
      <div class="h-0.5 w-full bg-[#00000048]"></div>
      <p
        v-if="fileDetail?.data?.file_size"
        class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4 text-center"
      >
        {{ $t("file_type") }} -
        {{ fileDetail?.data?.is_featured ? "Featured" : "Non Featured" }}
      </p>
      <div class="h-0.5 w-full bg-[#00000048]"></div>
      <p
        class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4 text-center"
      >
        {{ $t("visits") }} - {{ fileDetail?.data?.order }}
      </p>
      <div class="h-0.5 w-full bg-[#00000048]"></div>
      <div
        v-if="fileDetail?.data?.special_price"
        class="flex items-center justify-center text-sm md:text-xl xl:text-2xl font-semibold pt-3 md:pt-4"
      >
        <p class="mr-4">{{ $t("price") }} -</p>
        <p class="line-through text-[#ADA7A7] font-bold">৳</p>
        <p class="line-through text-[#ADA7A7] mr-3">
          {{ fileDetail?.data?.price }}
        </p>
        <p class="">৳</p>
        <p class="">
          {{ fileDetail?.data?.special_price }}
        </p>
      </div>
      <div
        v-else
        class="flex items-center justify-center text-sm md:text-xl xl:text-2xl font-semibold pt-3 md:pt-4"
      >
        <p class="mr-4">{{ $t("price") }} -</p>
        <p class="font-bold">৳</p>
        <p class="">
          {{ fileDetail?.data?.price }}
        </p>
      </div>
      <button
        target="_blank"
        @click="
          checkDownloadCondition(
            fileDetail?.data,
            fileDetail?.data?.id,
            fileDetail?.data?.is_featured,
            fileDetail?.data?.file_size
          )
        "
        class="w-full h-10 md:h-[50px] bg-[#EC1F27] text-white font-semibold text-xl xl:text-2xl rounded-md mt-3 md:mt-4"
      >
        {{ $t("download") }}
      </button>
      <button
        class="flex justify-center items-center gap-2 w-full h-10 md:h-[50px] bg-[#EC1F27] text-white font-semibold text-xl xl:text-2xl rounded-md mt-3 md:mt-4"
        @click="showFileDetail = !showFileDetail"
      >
        <span>{{ $t("show_details_btn") }}</span>
        <IconsChevronDown
          class="w-5 h-5 inline-block transition-all duration-500 ease-in-out"
          :class="showFileDetail ? 'rotate-180' : 'rotate-0'"
        />
      </button>
      <div v-if="showFileDetail">
        <div
          v-if="fileDetail?.data?.description"
          class="text-sm md:text-xl pt-3 md:pt-4"
          v-html="fileDetail?.data?.description"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.couter-bg {
  background-image: url("/icons/speech-bubble.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
