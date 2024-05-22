<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const { apiBaseUrl } = useUrls();
const tokenCookie = useCookie("token");
const showSuccessBody = ref(false);
const isProcessing = ref(false);

const handleTransaction = async () => {
  if (showSuccessBody.value) {
    isProcessing.value = true;
    setTimeout(async () => {
      try {
        const { data }: any = await useFetch(
          `${apiBaseUrl}/payment/aamarpay/fail`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`,
            },
            body: {
              transaction_id: route.query.tran_id,
            },
          }
        );
        if (data.value) {
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: data.value?.message,
            className: "toasted-bg-alert",
          });
          isProcessing.value = false;
        }
      } catch (error: any) {
        console.log(error);
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error?.response?._data?.message,
          className: "toasted-bg-alert",
        });
        isProcessing.value = false;
      }
    }, 500);
  }
};

onMounted(() => {
  if (
    !tokenCookie.value ||
    tokenCookie.value === "" ||
    tokenCookie.value === undefined
  ) {
    router.push(localePath("/auth/login"));
  } else {
    showSuccessBody.value = true;
    handleTransaction();
  }
});
</script>
<template>
  <div class="h-[60vh]">
    <div
      v-if="isProcessing"
      class="w-full h-full flex flex-col justify-center items-center"
    >
      <IconsIsLoading />
      <p class="text-lg pt-20">{{ $t("please_wait") }}</p>
    </div>

    <div
      v-else-if="showSuccessBody"
      class="h-full flex flex-col space-y-4 justify-center items-center text-4xl"
    >
      <p class="text-primary-red text-center break-words">
        {{ $t("order_failed") }}
      </p>
      <button
        class="text-base text-white p-5 rounded-full"
        :class="isProcessing ? 'bg-red-400' : 'bg-primary-red'"
      >
        <NuxtLink
          :to="localePath(`${!isProcessing ? `/dashboard/order-history` : ''}`)"
          class="font-bold"
        >
          {{ $t("go_order_history_btn") }}
        </NuxtLink>
      </button>
    </div>

    <div v-else class="w-full h-full flex flex-col justify-center items-center">
      <IconsIsLoading />
      <p class="text-lg pt-20">{{ $t("please_wait") }}</p>
    </div>
  </div>
</template>

<style scoped></style>
