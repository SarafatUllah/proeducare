<script setup>
import { storeToRefs } from "pinia";
import { useSubscriptionPackageStore } from "~/stores/subscriptionPackage";
import { useCartDataStore } from "~/stores/cartData";

const nuxtApp = useNuxtApp();
const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();
const tokenCookie = useCookie("token");
const { apiBaseUrl } = useUrls();
const { setRedirectUrl } = useAuth();
const allSubscriptions = ref([]);
const getSubscription = async () => {
  const { data } = await useFetch(`${apiBaseUrl}/subscriptions/file`, {});

  allSubscriptions.value = data._rawValue?.data;
};
await getSubscription();

const { setSubscriptionPackageId } = useSubscriptionPackageStore();
const { setAllCartData, setCartDataForApi, setSubscriptionDataForApi } =
  useCartDataStore();

const { subscriptionDataForApi } = storeToRefs(useCartDataStore());

const handleSubscription = (subscriptionPackage, subscriptionPackageId) => {
  if (
    !tokenCookie.value ||
    tokenCookie.value === "" ||
    tokenCookie.value === undefined
  ) {
    setRedirectUrl(route.fullPath);
    router.push(localePath("/auth/login"));
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: t("messages.login_first"),
      className: "toasted-bg-alert",
    });
  } else {
    const subscriptionDetails = [
      {
        subscriptionPackage: subscriptionPackage,
        subscription_id: subscriptionPackageId,
        subscriptionFrom: "subscription",
      },
    ];
    subscriptionDataForApi.value.downloadFileDetails[0].subscription_id =
      subscriptionDetails[0].subscription_id;

    setSubscriptionDataForApi(subscriptionDataForApi.value);
    setSubscriptionPackageId(subscriptionDetails);
    setAllCartData([]);

    router.push(localePath("/billing"));
  }
};
</script>

<template>
  <div class="custom-container pt-10 md:!pt-[70px] xd:!pt-20 pb-36">
    <h2
      class="text-[32px] md:!text-[40px] xl:!text-6xl font-bold text-center text-primary-red"
    >
      Firmware subscription
    </h2>
    <div
      class="pt-10 flex flex-wrap justify-center items-start gap-5 lg:!gap-[54px]"
    >
      <div
        v-for="(item, index) in allSubscriptions"
        :key="item.id"
        class="pt-[30px] w-[300px] lg:!w-[300px] rounded-[20px] shadow-[0px_4px_25px_-1px_rgba(0,0,0,0.25)]"
      >
        <div class="text-center px-10">
          <h3
            class="text-[30px] md:!text-4xl font-bold"
            :class="
              index === 0
                ? 'text-[#3D3B3B]'
                : index === 1
                ? 'text-[#404DC0]'
                : index === 2
                ? 'text-[#63bc3a]'
                : 'text-[#EC1F27]'
            "
          >
            {{ item.name }}
          </h3>
          <p class="pt-1 pb-6 text-sm font-bold text-[#747474]">
            Perfect For {{ item.perfectFor }}
          </p>
          <div class="flex justify-center font-bold pb-7 text-black">
            <p class="relative flex space-x-2">
              <span class="text-xl md:!text-2xl">TK</span>
              <span class="text-4xl md:!text-5xl">{{ item.amount }}</span>
              <span class="text-sm whitespace-nowrap self-end"
                >/{{ item.durations_as_month }}
                {{ item.durations_as_month > 1 ? "months" : "month" }}</span
              >
            </p>
          </div>

          <button
            class="w-[180px] h-9 rounded-full text-white font-bold"
            :class="
              index === 0
                ? 'bg-[#3D3B3B]'
                : index === 1
                ? 'bg-[#404DC0]'
                : index === 2
                ? 'bg-[#63bc3a]'
                : 'bg-[#EC1F27]'
            "
            @click="handleSubscription(item, item.id)"
          >
            {{ $t("get_started") }}
          </button>
        </div>
        <div class="h-[1px] w-full bg-[#907B7B] my-2"></div>
        <div class="flex flex-col items-center text-sm font-bold pb-4">
          <div class="flex flex-col pt-[30px] pb-7">
            <ul class="space-y-4">
              <li class="flex items-center space-x-2">
                <IconsCheck class="w-4" />
                <span>Band Width: {{ item.band_width }}</span>
              </li>

              <li class="flex items-center space-x-2">
                <IconsCheck class="w-4" />
                <span>Total Duration: {{ item.durations_as_month }}</span>
              </li>

              <li class="flex items-center space-x-2">
                <IconsCheck class="w-4" />
                <span>Total File: {{ item.total_file }}</span>
              </li>

              <li class="flex items-center space-x-2">
                <IconsCheck class="w-4" />
                <span>Type: {{ item.type }}</span>
              </li>

              <li class="flex items-center space-x-2">
                <IconsCheck class="w-4" />
                <span
                  >Access File Type:
                  {{
                    item.is_all_file
                      ? "All"
                      : item.is_featured_file
                      ? "Featured"
                      : "Non Featured"
                  }}</span
                >
              </li>

              <li class="flex items-center space-x-2">
                <IconsCheck class="w-4" />
                <span>Total Usage: {{ item.usage }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
