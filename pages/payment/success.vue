<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const { apiBaseUrl } = useUrls();
const localePath = useLocalePath();
const tokenCookie = useCookie("token");
const redirectUrl = useCookie("redirectUrl");
const showSuccessBody = ref(false);
const isProcessing = ref(false);

const handleTransaction = async () => {
  if (showSuccessBody.value) {
    isProcessing.value = true;
    setTimeout(async () => {
      try {
        const { data }: any = await useFetch(
          `${apiBaseUrl}/payment/aamarpay/success`,
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
          nuxtApp.$toast("success", {
            message: data.value?.message,
            className: "toasted-bg-success",
          });
          if (redirectUrl.value?.includes("/download")) {
            router.push(localePath(`${redirectUrl.value}`));
            redirectUrl.value = "";
          }
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

onMounted(async () => {
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
  <div class="w-full flex justify-center bg-[#ff6e1f0a]">
    <!-- v-if="isProcessing" -->
    <!-- <div class="w-full h-full flex flex-col justify-center items-center">
      <IconsIsLoading />
      <p class="text-lg pt-20">{{ $t("please_wait") }}</p>
    </div> -->
    <!-- v-else-if="showSuccessBody" -->
    <div class="h-full flex flex-col items-center success_box mt-[60px]">
      <div
        class="md:w-20 md:min-w-20 md:min-h-20 md:h-20 w-12 h-12 min-w-12 min-h-12 flex justify-center items-center rounded-full bg-[#FF6E1F]"
      >
        <img
          class="md:w-[48px] w-[38px] md:h-[37px] h-[27px]"
          src="~/assets/img/cart/tick.svg"
          alt="tick icon"
        />
      </div>
      <h1
        class="md:text-[32px] text-[24px] text-[#313131] font-bold mt-7 text-center"
      >
        Congratulations
      </h1>
      <p class="md:text-xl text-lg text-[#313131] font-normal mt-4 text-center">
        Your payment is successfully completed, for receipe please check your
        SMS or Email.
      </p>
      <div class="w-full h-[0.5px] bg-[#E3E3E3] mt-8"></div>
      <div
        class="w-full flex flex-col space-y-5 whitespace-nowrap mt-[20px] md:text-xl text-lg font-normal text-[#313131]"
      >
        <div
          class="w-full flex md:flex-row flex-col md:space-y-0 space-y-2 md:justify-between justify-center items-center md:space-x-4"
        >
          <h2 class="font-semibold">Course Name</h2>
          <p>Email List Building Zero to Hero Course</p>
        </div>
        <div
          class="w-full flex md:flex-row flex-col md:space-y-0 space-y-2 md:justify-between justify-center items-center md:space-x-4"
        >
          <h2 class="font-semibold">Order Id</h2>
          <p>LMS25674321</p>
        </div>
        <div
          class="w-full flex md:flex-row flex-col md:space-y-0 space-y-2 md:justify-between justify-center items-center md:space-x-4"
        >
          <h2 class="font-semibold">Total Price</h2>
          <p>৳350</p>
        </div>
        <div
          class="w-full flex md:flex-row flex-col md:space-y-0 space-y-2 md:justify-between justify-center items-center md:space-x-4"
        >
          <h2 class="font-semibold">Account Name</h2>
          <p>Sabbir Ahmed</p>
        </div>
        <div
          class="w-full flex md:flex-row flex-col md:space-y-0 space-y-2 md:justify-between justify-center items-center md:space-x-4"
        >
          <h2 class="font-semibold">Account Email</h2>
          <p>sabbir.ahmed@devxhub.com</p>
        </div>
        <div
          class="w-full flex md:flex-row flex-col md:space-y-0 space-y-2 md:justify-between justify-center items-center md:space-x-4 !mt-[42px]"
        >
          <h2 class="font-semibold">Start the course of your choice</h2>
          <NuxtLink
            :to="localePath('/courses')"
            class="orange_button flex items-center justify-center space-x-3 mx-auto md:ml-0"
          >
            <span>Get Start</span>
            <IconsLeftArrow class="w-[19px] h-4 text-white" color="#FFFFFF" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- v-else -->
    <!-- <div class="w-full h-full flex flex-col justify-center items-center">
      <IconsIsLoading />
      <p class="text-lg pt-20">{{ $t("please_wait") }}</p>
    </div> -->
  </div>
</template>

<style scoped>
.success_box {
  max-width: 660px;
  padding: 32px;
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
}
</style>
