<script setup>
import { storeToRefs } from "pinia";
import { useCartDataStore } from "~/stores/cartData";
import { useSubscriptionPackageStore } from "~/stores/subscriptionPackage";
const { apiBaseUrl } = useUrls();
const { setAllCartData, setCartDataForApi } = useCartDataStore();
const { setSubscriptionPackageId } = useSubscriptionPackageStore();
const localePath = useLocalePath();

// pinia
const { allCartData, cartDataForApi, subscriptionDataForApi } = storeToRefs(
  useCartDataStore()
);
const { subscriptionPackageId } = storeToRefs(useSubscriptionPackageStore());

const tokenCookie = useCookie("token");
const nuxtApp = useNuxtApp();
const route = useRoute();
const { setRedirectUrl } = useAuth();
const router = useRouter();
const { t } = useI18n();

const totalPrice = computed(() => {
  const subTotal = ref(0);
  allCartData.value.forEach((item) => {
    subTotal.value = subTotal.value + item.totalItemPrice;
  });

  return subTotal.value;
});

const billingAddress = ref({
  firstName: "",
  lastName: "",
  companyName: "",
  country: "Bangladesh",
  district: "Dhaka",
  phone: "",
  email: "",
  orderNotes: "",
});

const payMethod = ref("bkash");
const isOrderBtnDisabled = ref(false);
const termsAccepted = ref(false);

const setPaymentMethod = (value) => {
  payMethod.value = value;
};
const placeOrder = async () => {
  isOrderBtnDisabled.value = true;
  window.removeEventListener("beforeunload", beforeunload);
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
    if (payMethod.value !== "") {
      if (allCartData.value.length > 0) {
        try {
          const { data } = await useFetch(`${apiBaseUrl}/order`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`,
            },
            body: {
              code: allCartData.value.code ? allCartData.value.code : "",
              type: "video",
              payment_method: payMethod.value,
              items: cartDataForApi,
            },
          });
          if (!data.value.error) {
            nuxtApp.$toast("clear");
            nuxtApp.$toast("success", {
              message: data.value.message,
              className: "toasted-bg-success",
            });
            window.open(data.value.url, "_self");
            setTimeout(() => {
              setAllCartData([]);
              setCartDataForApi([]);
            }, 400);
          }
        } catch (error) {
          isOrderBtnDisabled.value = false;
          window.addEventListener("beforeunload", beforeunload);
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: error?.response?._data?.message,
            className: "toasted-bg-alert",
          });
        }
      } else {
        const fileDetails = subscriptionDataForApi.value.downloadFileDetails;
        setRedirectUrl(`/download/${fileDetails.slug}`);
        try {
          const { data } = await useFetch(`${apiBaseUrl}/order`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`,
            },
            body: {
              code: "",
              type: `${subscriptionDataForApi.value.type === "file"}`
                ? `${subscriptionDataForApi.value.type}`
                : `${subscriptionPackageId.value[0]?.subscriptionFrom}`,
              payment_method: payMethod.value,
              items: `${subscriptionDataForApi.value.type === "file"}`
                ? [{ item_id: fileDetails.id }]
                : [
                    {
                      subscription_id:
                        subscriptionPackageId.value[0].subscription_id,
                    },
                  ],
            },
          });

          if (!data.value.error) {
            nuxtApp.$toast("clear");
            nuxtApp.$toast("success", {
              message: data.value.message,
              className: "toasted-bg-success",
            });
            window.open(data.value.url, "_self");
            setTimeout(() => {
              setAllCartData([]);
              setCartDataForApi([]);
              setSubscriptionPackageId([]);
            }, 400);
          }
        } catch (error) {
          isOrderBtnDisabled.value = false;
          window.addEventListener("beforeunload", beforeunload);
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: error.response?.message,
            className: "toasted-bg-alert",
          });
        }
      }
    }
  }
};
const showFileModal = ref(false);
const convertMBtoGBandMB = (fileSizeMB) => {
  const GB = Math.floor(fileSizeMB / 1024);
  const remainingMB = Math.round((fileSizeMB % 1024) * 100) / 100;

  if (GB === 0) {
    return remainingMB + "MB";
  } else {
    return GB + "." + remainingMB + "GB";
  }
};
const beforeunload = (e) => {
  e.preventDefault();
  e.returnValue = "Data will be lost if you reload the page.";
};

onMounted(() => {
  window.addEventListener("beforeunload", beforeunload);

  if (
    allCartData.value.length === 0 &&
    subscriptionPackageId.value?.length === 0 &&
    subscriptionDataForApi.value?.type !== "file"
  ) {
    setTimeout(() => {
      router.back();
    }, 300);
  }
});
onUnmounted(() => {
  window.removeEventListener("beforeunload", beforeunload);
});
</script>

<template>
  <div class="custom-container pt-[30px] md:pt-[70px] xl:pt-20 pb-20 xl:pb-36">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-28">
      <div class="w-full hidden">
        <h3
          class="text-2xl md:text-[28px] lg:text-[30px] font-semibold text-primary-red"
        >
          {{ $t("billing_shipping_title") }}
        </h3>
        <div class="w-full pt-5 flex flex-col gap-5 text-lg">
          <div class="grid grid-cols-2 gap-5 w-full">
            <div class="flex flex-col gap-2.5">
              <label for="billingFirstName" class="font-semibold"
                >First Name
                <span class="align-middle text-primary-red">*</span></label
              >
              <input
                id="billingFirstName"
                name="billingFirstName"
                class="h-[50px] border border-black rounded-xl px-3 outline-none"
                type="text"
                placeholder="First Name"
                v-model="billingAddress.firstName"
              />
            </div>
            <div class="flex flex-col gap-2.5">
              <label for="billingLastName" class="font-semibold"
                >Last Name
                <span class="align-middle text-primary-red">*</span></label
              >
              <input
                id="billingLastName"
                name="billingLastName"
                class="h-[50px] border border-black rounded-xl px-3 outline-none"
                type="text"
                placeholder="Last Name"
                v-model="billingAddress.lastName"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2.5 w-full">
            <label for="billingCompanyName" class="font-semibold">
              Company name (optional)
            </label>
            <input
              id="billingCompanyName"
              name="billingCompanyName"
              class="h-[50px] border border-black rounded-xl px-3 outline-none"
              type="text"
              placeholder="Company name"
              v-model="billingAddress.companyName"
            />
          </div>
          <div class="flex flex-col gap-2.5 w-full">
            <label for="billingCountry" class="font-semibold"
              >Country / Region
              <span class="align-middle text-primary-red">*</span></label
            >
            <div class="relative">
              <select
                id="billingCountry"
                name="billingCountry"
                class="appearance-none px-4 py-3 w-full border border-black outline-none bg-white rounded-xl"
                v-model="billingAddress.country"
              >
                <option selected>Bangladesh</option>
                <option>USA</option>
              </select>

              <IconsChevronDown
                class="absolute top-0 bottom-0 my-auto right-4 w-5 text-black"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2.5 w-full">
            <label for="billingDistrict" class="font-semibold"
              >District
              <span class="align-middle text-primary-red">*</span></label
            >
            <div class="relative">
              <select
                id="billingDistrict"
                name="billingDistrict"
                class="appearance-none px-4 py-3 w-full border border-black outline-none bg-white rounded-xl"
                v-model="billingAddress.district"
              >
                <option selected>Dhaka</option>
                <option>Rajshahi</option>
                <option>Chittagong</option>
              </select>

              <IconsChevronDown
                class="absolute top-0 bottom-0 my-auto right-4 w-5 text-black"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2.5 w-full">
            <label for="billingPhone" class="font-semibold">
              Phone
              <span class="align-middle text-primary-red">*</span></label
            >
            <input
              id="billingPhone"
              name="billingPhone"
              class="h-[50px] border border-black rounded-xl px-3 outline-none"
              type="text"
              placeholder="Phone"
              v-model="billingAddress.phone"
            />
          </div>
          <div class="flex flex-col gap-2.5 w-full">
            <label for="billingEmail" class="font-semibold">
              Email address
              <span class="align-middle text-primary-red">*</span></label
            >
            <input
              id="billingEmail"
              name="billingEmail"
              class="h-[50px] border border-black rounded-xl px-3 outline-none"
              type="text"
              placeholder="Email address"
              v-model="billingAddress.email"
            />
          </div>
        </div>
      </div>

      <div class="w-full doLater hidden">
        <h3
          class="text-2xl md:text-[28px] lg:text-[30px] font-semibold text-primary-red"
        >
          Additional information
        </h3>

        <div class="pt-5 flex flex-col gap-2.5 w-full text-lg">
          <label for="billingOrdernotes" class="font-semibold">
            Order notes (optional)
          </label>
          <textarea
            id="billingOrdernotes"
            name="billingOrdernotes"
            class="border border-black rounded-xl px-4 outline-none py-4 resize-none"
            type="text"
            rows="4"
            placeholder="Notes about your order, e.g. special notes for delivery."
            v-model="billingAddress.orderNotes"
          ></textarea>
        </div>
      </div>
    </div>

    <div
      v-if="
        !isOrderBtnDisabled &&
        (allCartData.length > 0 ||
          subscriptionPackageId[0]?.subscriptionFrom === 'subscription' ||
          subscriptionDataForApi.type === 'file')
      "
      class="pt-10 md:pt-20 pb-10"
    >
      <h3
        class="text-2xl md:text-[28px] lg:text-[30px] font-semibold text-primary-red"
      ></h3>
      <div v-if="allCartData.length > 0" class="overflow-x-auto pt-5">
        <table
          class="w-full table-auto border-collapse border border-black whitespace-nowrap text-black"
        >
          <thead class="font-semibold">
            <tr>
              <th class="">{{ $t("product") }}</th>
              <th class="">{{ $t("sub_total") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in allCartData"
              :key="item.id"
              :class="index % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'"
            >
              <td class="">{{ item.item.title }}</td>
              <td class="">
                ৳{{ $bdNumberFormat(Number(item.totalItemPrice)) }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("total_price") }}</td>
              <td class="font-semibold">
                ৳{{ $bdNumberFormat(Number(totalPrice)) }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("coupon_discount") }}</td>
              <td class="font-semibold">
                <span class="font-bold text-2xl">-</span> ৳{{
                  allCartData.couponDiscount
                }}
              </td>
            </tr>
            <tr>
              <td class="font-semibold">{{ $t("total") }}</td>
              <td class="font-semibold">
                ৳{{
                  $bdNumberFormat(
                    totalPrice -
                      (allCartData.couponDiscount !== 0
                        ? allCartData.couponDiscount.replace(/,/g, "")
                        : allCartData.couponDiscount)
                  )
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-else-if="
          subscriptionPackageId[0]?.subscriptionFrom === 'subscription'
        "
      >
        <table
          class="w-full table-auto border-collapse border border-black whitespace-nowrap text-black"
        >
          <thead class="font-semibold">
            <tr>
              <th class="">Name</th>
              <th class="">Duration (in months)</th>
              <th class="">Amount</th>
              <th class="">Band Width</th>
              <th class="">Total File</th>
              <th class="">Type</th>
              <th class="">Usage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ subscriptionPackageId[0].subscriptionPackage.name }}</td>
              <td>
                {{
                  subscriptionPackageId[0].subscriptionPackage
                    .durations_as_month
                }}
              </td>
              <td>
                {{ subscriptionPackageId[0].subscriptionPackage.amount }}
              </td>
              <td>
                {{ subscriptionPackageId[0].subscriptionPackage.band_width }}
              </td>
              <td>
                {{ subscriptionPackageId[0].subscriptionPackage.total_file }}
              </td>
              <td>
                {{ subscriptionPackageId[0].subscriptionPackage.type }}
              </td>
              <td>
                {{ subscriptionPackageId[0].subscriptionPackage.usage }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else-if="subscriptionDataForApi.type === 'file'">
        <div
          class="mt-4 border border-[#00000048] rounded-[20px] px-4 pt-5 md:pt-10 pb-7 md:pb-[55px] text-center"
        >
          <h2
            v-if="subscriptionDataForApi.downloadFileDetails.title"
            class="text-[30px] xl:text-5xl font-extrabold"
          >
            {{ subscriptionDataForApi.downloadFileDetails.title }}
          </h2>
          <div
            v-if="subscriptionDataForApi.downloadFileDetails?.isNew"
            class="flex items-center justify-center py-4 md:py-5"
          >
            <p
              class="w-16 h-8 md:w-20 md:h-10 bg-[#EC1F27] flex justify-center items-center"
            >
              <span class="text-white font-semibold">New</span>
            </p>
          </div>
          <p
            v-if="subscriptionDataForApi.downloadFileDetails?.fileName"
            class="text-base md:text-lg font-semibold"
          >
            {{ subscriptionDataForApi.downloadFileDetails?.fileName }}
          </p>
          <div class="py-6 xl:py-10 flex items-center justify-center space-x-5">
            <div class="flex space-x-2.5">
              <NuxtLink
                :to="`https://www.facebook.com/share.php?u=${fileUrl}`"
                target="_blank"
              >
                <IconsFacebookShare class="w-20 md:w-[100px]" />
              </NuxtLink>
              <div
                v-if="subscriptionDataForApi.downloadFileDetails?.fbCount"
                class="couter-bg w-16 text-sm"
              >
                {{ subscriptionDataForApi.downloadFileDetails?.fbCount }}
              </div>
            </div>
            <div class="flex space-x-2.5">
              <NuxtLink
                :to="`http://twitter.com/share?&url=${fileUrl}&text=Fiverr Outsourcing Institute firmware - ${subscriptionDataForApi.downloadFileDetails.title}.`"
                target="_blank"
              >
                <IconsTwitterShare class="w-20 md:w-[100px]" />
              </NuxtLink>
              <span
                v-if="subscriptionDataForApi.downloadFileDetails?.twCount"
                class="couter-bg w-16 text-sm"
                >{{ subscriptionDataForApi.downloadFileDetails?.twCount }}</span
              >
            </div>
          </div>
          <div class="h-0.5 w-full bg-[#00000048]"></div>
          <p
            v-if="subscriptionDataForApi.downloadFileDetails?.created_at"
            class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4"
          >
            {{ $t("date") }} -
            {{
              $dateFormat(
                subscriptionDataForApi.downloadFileDetails?.created_at
              )
            }}
          </p>
          <div class="h-0.5 w-full bg-[#00000048]"></div>
          <p
            v-if="subscriptionDataForApi.downloadFileDetails?.file_size"
            class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4"
          >
            {{ $t("file_size") }} -
            {{
              convertMBtoGBandMB(
                subscriptionDataForApi.downloadFileDetails?.file_size
              )
            }}
          </p>
          <div class="h-0.5 w-full bg-[#00000048]"></div>
          <p
            v-if="subscriptionDataForApi.downloadFileDetails?.file_size"
            class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4"
          >
            {{ $t("file_type") }} -
            {{
              subscriptionDataForApi.downloadFileDetails?.is_featured
                ? "Featured"
                : "Non Featured"
            }}
          </p>
          <div class="h-0.5 w-full bg-[#00000048]"></div>
          <p class="text-sm md:text-xl xl:text-2xl font-semibold py-3 md:py-4">
            {{ $t("visits") }} -
            {{ subscriptionDataForApi.downloadFileDetails?.order }}
          </p>
          <div class="h-0.5 w-full bg-[#00000048]"></div>
          <div
            v-if="subscriptionDataForApi.downloadFileDetails?.special_price"
            class="flex items-center justify-center text-sm md:text-xl xl:text-2xl font-semibold pt-3 md:pt-4"
          >
            <p class="mr-4">{{ $t("price") }} -</p>
            <p class="line-through text-[#ADA7A7] font-bold">৳</p>
            <p class="line-through text-[#ADA7A7] mr-3">
              {{ subscriptionDataForApi.downloadFileDetails?.price }}
            </p>
            <p class="">৳</p>
            <p class="">
              {{ subscriptionDataForApi.downloadFileDetails?.special_price }}
            </p>
          </div>
          <div
            v-else
            class="flex items-center justify-center text-sm md:text-xl xl:text-2xl font-semibold pt-3 md:pt-4"
          >
            <p class="mr-4">{{ $t("price") }} -</p>
            <p class="font-bold">৳</p>
            <p class="">
              {{ subscriptionDataForApi.downloadFileDetails?.price }}
            </p>
          </div>
          <button
            class="w-full h-10 md:h-[50px] bg-[#EC1F27] text-white font-semibold text-xl xl:text-2xl rounded-md mt-3 md:mt-4"
            @click="showFileModal = true"
          >
            {{ $t("show_details_btn") }}
          </button>
        </div>
        <FileDetailModal
          v-if="showFileModal"
          :fileDetail="subscriptionDataForApi.downloadFileDetails?.description"
          :showModal="showFileModal"
          @closeModal="showFileModal = false"
        />
      </div>
    </div>

    <div
      v-else
      class="w-full h-[50vh] flex flex-col justify-center items-center"
    >
      <IconsIsLoading />
      <p class="text-lg pt-20">{{ $t("please_wait") }}</p>
    </div>

    <div class="bg-[#EBE9EB] w-full rounded-md">
      <div
        class="p-5 flex flex-wrap justify-center gap-3 border rounded-t-md border-b-black"
      >
        <img
          src="/images/billing-methods/dbbl-nexus.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'dbbl_nexus'
              ? 'border-2 border-green-700 rounded-xl'
              : ''
          "
          @click="setPaymentMethod('dbbl_nexus')"
        />
        <img
          src="/images/billing-methods/visa.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'visa' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('visa')"
        />
        <img
          src="/images/billing-methods/master-card.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'master_card'
              ? 'border-2 border-green-700 rounded-xl'
              : ''
          "
          @click="setPaymentMethod('master_card')"
        />
        <img
          src="/images/billing-methods/amex.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'amex' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('amex')"
        />

        <img
          src="/images/billing-methods/rocket.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'rocket' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('rocket')"
        />
        <img
          src="/images/billing-methods/bkash.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'bkash' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('bkash')"
        />
        <img
          src="/images/billing-methods/nagad.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'nagad' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('nagad')"
        />
        <img
          src="/images/billing-methods/upay.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'upay' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('upay')"
        />
        <img
          src="/images/billing-methods/tap.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'tap' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('tap')"
        />
        <img
          src="/images/billing-methods/wallet.svg"
          alt=""
          srcset=""
          class="h-16"
          :class="
            payMethod === 'wallet' ? 'border-2 border-green-700 rounded-xl' : ''
          "
          @click="setPaymentMethod('wallet')"
        />
      </div>
      <div class="flex items-start gap-4 p-5">
        <input
          type="checkbox"
          v-model="termsAccepted"
          class="w-6 h-6 md:w-7 md:h-7"
        />
        <p class="font-semibold pt-0.5">
          {{ $t("billing_policy_text") }}
          <NuxtLink
            :to="localePath('/privacy-policy')"
            target="_blank"
            class="text-primary-red"
          >
            {{ $t("privacy_policy") }} </NuxtLink
          >,
          <NuxtLink
            :to="localePath('/terms-of-use')"
            target="_blank"
            class="text-primary-red"
          >
            {{ $t("terms_conditions") }} </NuxtLink
          >,
          <NuxtLink
            :to="localePath('/refund-policy')"
            target="_blank"
            class="text-primary-red"
          >
            {{ $t("refund_policy") }}
          </NuxtLink>
          {{ $t("and") }}
          <NuxtLink
            :to="localePath('/cancellation-policy')"
            target="_blank"
            class="text-primary-red"
          >
            {{ $t("cancellation_policy") }} </NuxtLink
          >.
        </p>
      </div>

      <div class="flex p-5 justify-end">
        <button
          class="outline-none text-white font-semibold py-2 md:py-3 rounded-sm w-40"
          :class="
            (allCartData.length === 0 &&
              subscriptionPackageId.length === 0 &&
              subscriptionDataForApi.type !== 'file') ||
            isOrderBtnDisabled ||
            !termsAccepted
              ? 'bg-red-300'
              : 'bg-primary-red'
          "
          type="button"
          :disabled="
            (allCartData.length === 0 &&
              subscriptionPackageId.length === 0 &&
              subscriptionDataForApi.type !== 'file') ||
            isOrderBtnDisabled ||
            !termsAccepted
          "
          @click="placeOrder"
        >
          {{ $t("place_order_btn") }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
th,
td {
  @apply text-left min-w-[80px] text-base lg:text-lg border border-black py-2 lg:py-3 px-5;
}
input[type="radio"] {
  accent-color: #ec1f27;
}
</style>
