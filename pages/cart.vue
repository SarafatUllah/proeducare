<script setup lang="ts">
import { useCartDataStore } from "~/stores/cartData";
const { apiBaseUrl } = useUrls();
const tokenCookie = useCookie("token");
const cartDataCookie: any = useCookie("cartData");
const { setAllCartData, setCartDataForApi } = useCartDataStore();
// pinia
const { allCartData, cartDataForApi, subscriptionDataForApi, slugInformation } =
  storeToRefs(useCartDataStore());
const { setRedirectUrl } = useAuth();
const localePath = useLocalePath();
const { t } = useI18n();
import { useTheVideoStore } from "~/stores/theVideo";
const { setMediaUrl } = useTheVideoStore();

const enableCheckoutButton = ref(false);

const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const { isSmaller } = useBreakpoints();
const isProcessing = ref(false);

const isMobile = computed(() => isSmaller(768));

const cart: any = ref([]);
const loadCart = async () => {
  if (tokenCookie.value) {
    const cartDataCookie: any = useCookie("cartData");

    if (
      cartDataCookie.value?.length > 0 &&
      cartDataCookie.value !== undefined
    ) {
      const addCartFromCookie: any = [];

      cartDataCookie.value.forEach((singleCart: any) => {
        // if (singleCart.id === slugInformation.value.id) {
        const singleItem = {
          item_id: singleCart.id,
          subscription_id: singleCart.subscription_id,
        };
        addCartFromCookie.push(singleItem);
        // }
      });
      isProcessing.value = true;

      const { data, pending, error }: any = useFetch(
        `${apiBaseUrl}/carts/add-all`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
          body: {
            items: addCartFromCookie,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          if (data.value) {
            if (data.value.cart.length > 0) {
              isProcessing.value = false;
              cart.value = data.value.cart || [];

              cartDataCookie.value = JSON.stringify([]);
            } else {
              nuxtApp.$toast("clear");
              nuxtApp.$toast("error", {
                message: t("messages.no_item_in_cart"),
                className: "toasted-bg-success",
              });
              isProcessing.value = false;
            }
          } else if (error.value) {
            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message: error.value?.data.message.code,
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
    } else {
      const { data, pending, error }: any = await useFetch(
        `${apiBaseUrl}/carts`,
        {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          if (data.value) {
            if (data.value.data.length > 0) {
              data.value.data.forEach((element) => {
                cart.value.push(element);
              });

              const makeCardDataForApi: any = [];

              cart.value.forEach((singleCart: any) => {
                singleCart.check = true;
                // if (singleCart.item.id === slugInformation.value.id) {
                const singleItem = {
                  item_id: singleCart.item.id,
                  subscription_id: singleCart.subscription?.id,
                  item_slug: singleCart.item.slug,
                };
                makeCardDataForApi.push(singleItem);
                setAllCartData(cart.value);
                // }
              });
              // getCourseDetails(makeCardDataForApi.item_slug);
              setCartDataForApi(makeCardDataForApi);
            } else {
              nuxtApp.$toast("clear");
              nuxtApp.$toast("error", {
                message: t("messages.no_item_in_cart"),
                className: "toasted-bg-success",
              });
            }
            isProcessing.value = false;
          } else if (error.value) {
            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message: error.value?.data.message.code,
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
    }
  } else if (!tokenCookie.value || tokenCookie.value === "") {
    const cartDataCookie: any = useCookie("cartData");

    cart.value = cartDataCookie.value;
    cart.value.forEach((element) => {
      element.check = true;
    });
    isProcessing.value = false;
  }
};
loadCart();
const totalPriceOfCourses: Number = ref(0);
const totalDiscountPrice: Number = ref(0);
const totalCoursePrice = computed(() => {
  totalPriceOfCourses.value = 0;
  totalDiscountPrice.value = 0;
  cart.value.forEach((element) => {
    if (element.check) {
      totalPriceOfCourses.value =
        totalPriceOfCourses.value +
        (element.item
          ? element.item.special_price
            ? element.item.special_price
            : element.item?.price
          : element.special_price
          ? element.special_price
          : element.price);
      totalDiscountPrice.value =
        totalDiscountPrice.value +
        (element.item
          ? element.item.special_price
            ? element.item?.price
            : 0
          : element.special_price
          ? element.price
          : 0);
      element.item?.special_price ? element.item?.price : 0;
    }
  });
  return totalPriceOfCourses.value;
});
const courseDetails = ref<any>({});
const getCourseDetails = (slug: string) => {
  isProcessing.value = true;
  const { data, pending, error }: any = useFetch(
    `${apiBaseUrl}/courses/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${tokenCookie.value ? tokenCookie.value : ""}`,
      },
    }
  );

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        courseDetails.value = data.value.data;
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value?.data.message,
          className: "toasted-bg-success",
        });
      }
      isProcessing.value = false;
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};

const removeProduct = async (id: number) => {
  if (tokenCookie.value) {
    const { data, error }: any = await useFetch(
      `${apiBaseUrl}/carts/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }
    );

    if (!error.value && data.value) {
      cart.value = data.value.data || [];
      loadCart();
      nuxtApp.$toast("clear");
      nuxtApp.$toast("success", {
        message: data.value.message,
        className: "toasted-bg-success",
      });
    }
  } else {
    const currentCartDataCookie: any = useCookie("cartData");

    const updatedItems = currentCartDataCookie.value.filter(
      (cookieItem: any) =>
        cookieItem.id !== id && cookieItem.item && cookieItem.item.id !== id
    );

    cartDataCookie.value = JSON.stringify(updatedItems);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("success", {
      message: t("messages.delete_from_cart"),
      className: "toasted-bg-success",
    });
    cart.value = updatedItems;
    setAllCartData(updatedItems);
  }
};
const removeAll = async () => {
  if (tokenCookie.value) {
    const { data, error }: any = await useFetch(`${apiBaseUrl}/carts/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    });

    if (!error.value && data.value) {
      cart.value = data.value.data || [];
      loadCart();
      nuxtApp.$toast("clear");
      nuxtApp.$toast("success", {
        message: data.value.message,
        className: "toasted-bg-success",
      });
    }
  } else {
    const currentCartDataCookie: any = useCookie("cartData");

    const updatedItems = [];

    cartDataCookie.value = JSON.stringify(updatedItems);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("success", {
      message: t("messages.delete_from_cart"),
      className: "toasted-bg-success",
    });
    cart.value = updatedItems;
    setAllCartData(updatedItems);
  }
};
const allSubscriptions: any = ref([]);
const getSubscription = async () => {
  const { data }: any = await $fetch(`${apiBaseUrl}/subscriptions/video`, {});

  allSubscriptions.value = data;
};
getSubscription();

const productPrice = (
  productId: number,
  subscriptionDuration: number,
  monthlyServiceCharge: number,
  subscriptionAmount: number,
  specialPrice: number,
  regularPrice: number
) => {
  const totalItemPrice =
    subscriptionDuration * monthlyServiceCharge +
    subscriptionAmount +
    (specialPrice > 0 ? specialPrice : regularPrice);

  cart.value.forEach((element: any) => {
    if (element.id === productId) {
      element.totalItemPrice = totalItemPrice;
    } else if (element.item && element.item.id === productId) {
      element.item.totalItemPrice = totalItemPrice;
    }
  });

  return totalItemPrice;
};

const totalPrice: any = computed(() => {
  const subPrice = ref(0);
  cart.value.forEach((element: any) => {
    subPrice.value =
      subPrice.value + element.item
        ? element.item.totalItemPrice
        : element.totalItemPrice;
  });

  return subPrice.value;
});

const subTotal = computed(() => {
  const subPrice = ref(0);
  cart.value.forEach((element: any) => {
    subPrice.value =
      subPrice.value + element.item ? element.item.price : element.price;
  });

  return subPrice.value;
});

const updateSubscription = async (productId: any) => {
  cart.value.forEach(async (singleItemCart: any) => {
    if (singleItemCart.id === productId) {
      isProcessing.value = true;
      const { data, pending, error }: any = useFetch(
        `${apiBaseUrl}/carts/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
          body: {
            item_id: singleItemCart.item.id,
            subscription_id: singleItemCart.subscription?.id,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          if (data.value) {
            isProcessing.value = false;
            loadCart();
          } else if (error.value) {
            isProcessing.value = false;
            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message: error.value?.data.message,
              className: "toasted-bg-alert",
            });
          }
        } else {
          setTimeout(() => {
            setData();
          }, 300);
        }
      };
      setData();
    }
  });
};

const getSubscriptionDuration = (productId: number) => {
  const isExist = allSubscriptions.value.find(
    (singleCartData: any) => singleCartData.id === productId
  );
  if (isExist) {
    return isExist?.durations_as_month;
  }
};

const getSubscriptionAmount = (productId: number) => {
  const isExist = allSubscriptions.value.find(
    (singleCartData: any) => singleCartData.id === productId
  );
  if (isExist) {
    return isExist?.amount;
  }
};

const applyCoupon = ref("");
const promoError = ref(false);
const couponDiscount: any = ref("0");
const inputPromo = () => {
  if (applyCoupon.value !== "") {
    promoError.value = false;
  } else {
    promoError.value = true;
  }
};
const submitProcessing = ref(false);
const showPromoBox = ref(true);
const handleApplyCoupon = () => {
  if (applyCoupon.value !== "") {
    promoError.value = false;
    submitProcessing.value = true;
    const selectedCart: any = [];

    cart.value.forEach((singleCart: any) => {
      const singleItem = {
        item_id:
          tokenCookie.value !== "" && tokenCookie.value !== undefined
            ? singleCart.item.id
            : singleCart.id,
        subscription_id: singleCart.subscription_id
          ? singleCart.subscription_id
          : singleCart.subscription?.id,
      };
      selectedCart.push(singleItem);
    });

    const { data, pending, error }: any = useFetch(
      `${apiBaseUrl}/carts/apply-coupon`,
      {
        method: "POST",
        body: {
          code: applyCoupon.value,
          items: selectedCart,
        },
      }
    );

    const setData = () => {
      if (!pending.value) {
        if (data.value) {
          couponDiscount.value = data._rawValue.data;
          cart.value.couponDiscount = couponDiscount.value;
          cart.value.code = applyCoupon.value;
          submitProcessing.value = false;
          showPromoBox.value = false;
          nuxtApp.$toast("clear");
          nuxtApp.$toast("success", {
            message: t("messages.coupon_applied"),
            className: "toasted-bg-success",
          });
        } else if (error.value.data) {
          submitProcessing.value = false;
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: error.value.data.message.code,
            className: "toasted-bg-success",
          });
        }
      } else {
        setTimeout(() => {
          setData();
        }, 300);
      }
    };

    setData();
  } else {
    promoError.value = true;
  }
};

const afterAppliedCoupon = (totalPriceValue: any, couponDiscountValue: any) => {
  const grandTotal =
    totalPriceValue - parseFloat(couponDiscountValue.replace(/,/g, ""));

  cart.value.grandTotal = grandTotal;
  return grandTotal;
};

const processToCheckout = () => {
  if (!tokenCookie.value || tokenCookie.value === "") {
    setRedirectUrl(route.fullPath);
    router.push(localePath("/auth/login"));
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: t("messages.login_first"),
      className: "toasted-bg-alert",
    });
  } else {
    if (cart.value.couponDiscount === undefined) {
      cart.value.couponDiscount = 0;
    }

    setAllCartData(cart.value);
    // router.push(localePath("/billing"));
    placeOrder();
  }
};
const isOrderBtnDisabled = ref(false);
const payMethod = ref("bkash");
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
const discountCode = ref(300);
const convertTimeToHoursAndMinutes = (time: string) => {
  // Split the time string into hours, minutes, and seconds
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parseInt(parts[2], 10);

  // Calculate total minutes
  const totalMinutes = hours * 60 + minutes + Math.floor(seconds / 60);

  // Calculate hours and minutes for the output
  const outputHours = Math.floor(totalMinutes / 60);
  const outputMinutes = totalMinutes % 60;

  // Format the output
  return `${outputHours}hr ${outputMinutes}min`;
};
const showPromoField = ref(false);
const getMainUrl = (mediaUrl: string) => {
  if (mediaUrl.includes("v=")) {
    const mainMediaUrl = mediaUrl.split("v=");
    return "https://www.youtube.com/embed/" + mainMediaUrl[1];
  } else {
    return mediaUrl;
  }
};
const showPayment = ref(false);
const beforeunload = (e) => {
  e.preventDefault();
  e.returnValue = "Data will be lost if you reload the page.";
};
onMounted(() => {
  window.addEventListener("beforeunload", beforeunload);
  setMobileCheckoutModal()
});
const showMobileCheckoutModal = ref(false);
const showMobilePriceListModal = ref(false);
const setMobileCheckoutModal = () => {
  showMobilePriceListModal.value = false;
  setTimeout(() => {
    showMobileCheckoutModal.value = true;
  }, 550);
};
const setMobilePriceListModal = () => {
  showMobileCheckoutModal.value = false;
  setTimeout(() => {
    showMobilePriceListModal.value = true;
  }, 550);
};
watch(isMobile, (value: boolean) => {
  if (value) {  
    showMobileCheckoutModal.value = true;
    showMobilePriceListModal.value = false;
  } else {
    showMobileCheckoutModal.value = true;
    showMobilePriceListModal.value = true;
  }
});
</script>

<template>
  <div class="bg-[#ff6e1f0a]">
    <div class="2xl:max-w-[1292px] w-full pt-[43px] pb-[98px] mx-auto">
      <div v-if="cart && cart.length > 0 && !isProcessing">
        <button
          class="flex justify-center items-center space-x-4 mr-auto px-[4.62vw] lg:px-[2.62vw] xl:px-[8.62vw] 2xl:px-0"
          @click.stop="showPayment ? (showPayment = false) : $router.back()"
        >
          <IconsLeftArrow
            class="w-5 h-5 transform rotate-180"
            color="#313131"
          />
          <p class="p_tag_secondary !text-lg !font-medium">My Cart</p>
        </button>
        <div
          class="flex justify-center w-full mt-[49px] px-[4.62vw] lg:px-[2.62vw] xl:px-[8.62vw] 2xl:px-0"
        >
          <div class="flex justify-center items-start w-full max-w-[613px]">
            <div class="flex flex-col items-center relative space-y-5">
              <div
                class="w-10 min-w-10 h-10 min-h-10 flex justify-center items-center rounded-full step_one text-2xl"
                :class="!showPayment ? '' : 'active'"
              >
                <p>1</p>
              </div>
              <p
                class="md:text-xl text-base font-semibold text-[#515B6F] whitespace-nowrap absolute top-10 md:left-auto left-0"
              >
                Order Confirmation
              </p>
            </div>
            <IconsDottedLine
              class="flex-grow mt-5"
              :show-Payment="showPayment"
            ></IconsDottedLine>
            <div class="flex flex-col items-center space-y-5 relative">
              <div
                class="w-10 min-w-10 h-10 min-h-10 flex justify-center items-center rounded-full step_two text-2xl"
                :class="showPayment ? '' : 'active'"
              >
                <p>2</p>
              </div>
              <p
                class="md:text-xl text-base font-semibold text-[#515B6F] whitespace-nowrap absolute top-10 md:right-auto right-0"
              >
                Payment
              </p>
            </div>
          </div>
        </div>
        <Transition name="page" mode="out-in">
          <ClientOnly
            v-if="cart && cart.length > 0 && !isProcessing && !showPayment"
          >
            <div
              class="flex lg:flex-row flex-col md:justify-between md:items-start items-center lg:space-x-[20px] lg:space-y-0 space-y-6 mt-[124px] relative"
              :class="
                !isMobile
                  ? 'px-[4.62vw] lg:px-[2.62vw] xl:px-[8.62vw] 2xl:px-0'
                  : ''
              "
            >
              <div
                class="flex-grow lg:w-auto w-full"
                :class="isMobile ? 'px-0' : ''"
              >
                <div id="courseDetailsCard" class="h-min course_overview card">
                  <div
                    class="flex justify-between items-center lg:py-6 lg:p-[32px] p-4 border-b-[0.05rem] border-[#E3E3E3]"
                  >
                    <p class="md:text-xl text-base font-bold text[#313131]">
                      {{ cart.length }} Courses in Cart
                    </p>
                    <p
                      class="md:text-xl text-base text-[#515B6F] flex space-x-2 items-center cursor-pointer"
                      @click.stop="removeAll"
                    >
                      <img
                        class="md:w-[18px] md:h-[22px] w-[13px] h-[16px]"
                        src="~/assets/img/icon/removeIcon.svg"
                        alt="remove icon"
                      /><span>Remove</span>
                    </p>
                    <!-- <h2
                    class="h_tag_forth md:!text[24px] !text-[20px] !font-bold line-clamp-1"
                  >
                    {{ cart[0].title }}
                  </h2> -->
                  </div>
                  <div class="lg:px-[32px] px-4 flex flex-col space-y-5">
                    <div
                      v-for="(individualCart, index) in cart"
                      :key="index"
                      class="lg:py-5 py-4 border-b-[0.05rem] border-[#E3E3E3] flex sm:flex-row flex-col justify-between items-center sm:space-x-4 sm:space-y-0 space-y-8"
                    >
                      <div class="flex space-x-4 items-center sm:w-auto w-full">
                        <div
                          class="w-5 min-w-5 h-5 border-2 rounded-[4px] border-[#313131] overflow-hidden relative block"
                        >
                          <input
                            :id="individualCart.id"
                            type="checkbox"
                            v-model="individualCart.check"
                            class="appearance-none w-5 h-5 toggle-check-1"
                          />
                          <label
                            :for="individualCart.id"
                            class="check-1 text-red-deep w-3.5 h-3.5 absolute top-[0px] left-[1px] font-normal cursor-pointer opacity-0"
                          >
                            <ClientOnly>
                              <fa class="" :icon="['fas', 'check']" />
                            </ClientOnly>
                          </label>
                        </div>
                        <div
                          class="flex flex-row space-x-2.5 items-center w-auto"
                        >
                          <img
                            v-if="
                              individualCart.item
                                ? individualCart.item.banner_url
                                : individualCart.banner_url
                            "
                            class="sm:w-[102px] sm:h-[70px] w-[87px] h-[60px] rounded-[3px]"
                            :src="
                              individualCart.item
                                ? individualCart.item.banner_url
                                : individualCart.banner_url
                            "
                            :alt="
                              individualCart.item
                                ? individualCart.item.title
                                : individualCart.title
                            "
                          />
                          <img
                            v-else
                            class="sm:w-[102px] sm:h-[70px] w-full h-[158px] rounded-[3px]"
                            src="~/assets/img/default/video-thumbnail2.webp"
                            alt="default banner"
                          />

                          <div class="flex flex-col space-y-[9px]">
                            <p
                              class="text-[#1A2134] font-bold line-clamp-1 text-sm md:text-base"
                            >
                              {{
                                individualCart.item
                                  ? individualCart.item.title
                                  : individualCart.title
                              }}
                            </p>
                            <p
                              class="text-[#313131] md:text-sm text-[12px] !mt-[5px]"
                            >
                              By Brooklyn Simmons and 1 other
                            </p>
                            <div
                              class="flex space-x-[22px] text-[#515B6F] text-[12px] w-full"
                            >
                              <div
                                class="flex space-x-1 flex-nowrap whitespace-nowrap"
                              >
                                <img
                                  src="~/assets/img/icon/lessonIcon.svg"
                                  alt="lesson icon"
                                />
                                <p>17 Lessions</p>
                              </div>
                              <div
                                class="flex space-x-1 flex-nowrap whitespace-nowrap"
                              >
                                <div
                                  class="w-5 h-5 flex justify-center items-center rounded-full bg-white border border-[#E6E7EE]"
                                >
                                  <img
                                    src="~/assets/img/icon/clockIcon.svg"
                                    alt="lesson icon"
                                  />
                                </div>
                                <p class="flex flex-nowrap space-x-2">
                                  <span class="md:block hidden"
                                    >Duration :</span
                                  >
                                  <span class="text-[#313131]">5hr 42min</span>
                                </p>
                              </div>
                            </div>
                            <div
                              class="md:hidden flex sm:flex-col flex-row !mt-[12px] sm:space-y-[27px] sm:items-end justify-between sm:w-auto w-full ml-0"
                            >
                              <div
                                class="flex-grow flex items-center space-x-[8px] text-[#FF6E1F] font-bold md:text-base text-sm"
                              >
                                <p
                                  v-if="
                                    individualCart.item
                                      ? individualCart.item.special_price &&
                                        individualCart.item.special_price > 0
                                      : individualCart.special_price &&
                                        individualCart.special_price > 0
                                  "
                                  class=""
                                >
                                  ৳{{
                                    individualCart.item
                                      ? individualCart.item.special_price
                                      : individualCart.special_price
                                  }}
                                </p>
                                <p
                                  :class="
                                    (individualCart.item &&
                                      individualCart.item.special_price &&
                                      individualCart.item.special_price > 0) ||
                                    (individualCart.special_price &&
                                      individualCart.special_price > 0)
                                      ? 'md:text-[14px] text-[#515B6F] line-through font-normal mt[2px]'
                                      : ''
                                  "
                                >
                                  ৳{{
                                    individualCart.item
                                      ? individualCart.item.price
                                      : individualCart.price
                                  }}
                                </p>
                              </div>
                              <img
                                class="w-[13px] h-[16px] cursor-pointer"
                                src="~/assets/img/icon/removeIcon.svg"
                                alt="remove icon"
                                @click.stop="removeProduct(individualCart.id)"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="md:flex hidden sm:flex-col flex-row sm:space-y-[27px] sm:items-end justify-between sm:w-auto w-full sm:ml-0 ml-[70px]"
                      >
                        <div
                          class="flex-grow flex items-center space-x-[8px] text-[#FF6E1F] font-bold md:text-base text-sm"
                        >
                          <p
                            v-if="
                              individualCart.item
                                ? individualCart.item.special_price &&
                                  individualCart.item.special_price > 0
                                : individualCart.special_price &&
                                  individualCart.special_price > 0
                            "
                            class=""
                          >
                            ৳{{
                              individualCart.item
                                ? individualCart.item.special_price
                                : individualCart.special_price
                            }}
                          </p>
                          <p
                            :class="
                              (individualCart.item &&
                                individualCart.item.special_price &&
                                individualCart.item.special_price > 0) ||
                              (individualCart.special_price &&
                                individualCart.special_price > 0)
                                ? 'md:text-[14px] text-[#515B6F] line-through font-normal mt[2px]'
                                : ''
                            "
                          >
                            ৳{{
                              individualCart.item
                                ? individualCart.item.price
                                : individualCart.price
                            }}
                          </p>
                        </div>
                        <img
                          class="w-[18px] h-[22px] cursor-pointer"
                          src="~/assets/img/icon/removeIcon.svg"
                          alt="remove icon"
                          @click.stop="removeProduct(individualCart.id)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="pr-[4.62vw] lg:pr-[2.62vw] xl:pr-[8.62vw] 2xl:px-0 lg:w-1/2 lg:max-w-[478px] w-full"> -->
              <div
                class="transition-all duration-300 ease-in-out lg:w-1/2 lg:max-w-[478px] w-full md:h-fit bg-white course_overview lg:p-[32px] p-4 md:static sticky bottom-0"
                :class="
                  showMobilePriceListModal && !showMobileCheckoutModal
                    ? 'h-[242px]'
                    : showPromoField
                    ? 'h-[300px]'
                    : ' delay-500 h-[200px]'
                "
                @click.stop="
                  isMobile && showMobileCheckoutModal
                    ? setMobilePriceListModal()
                    : ''
                "
              >
                <div
                  v-if="showMobilePriceListModal"
                  class="flex justify-between items-center"
                >
                  <h2 class="h_tag_forth !text-lg font-semibold">
                    Order Summary
                  </h2>
                  <IconsCross
                    class="w-4 h-4 md:hidden"
                    @click.stop="setMobileCheckoutModal()"
                  />
                </div>
                <div class="border-b border-[#E3E3E3] pb-5">
                  <Transition name="page">
                    <div
                      v-if="showMobilePriceListModal"
                      class="w-full md:mt-[30px] mt-[18px] flex justify-between items-center space-x-2 whitespace-nowrap lg:text-xl md:text-lg text-base text-[#313131] font-normal"
                    >
                      <p>Course Start Date</p>
                      <p class="font-medium">20 December, 2024</p>
                    </div>
                  </Transition>
                  <Transition name="page">
                    <div
                      v-if="showMobilePriceListModal"
                      class="w-full mt-[20px] flex justify-between items-center space-x-2 whitespace-nowrap lg:text-xl md:text-lg text-base text-[#313131] font-normal"
                    >
                      <p>Course Price</p>
                      <div class="flex items-center space-x-[18px] font-medium">
                        <p v-if="totalCoursePrice > 0" class="">
                          ৳{{ totalPriceOfCourses }}
                        </p>
                        <p
                          v-if="totalDiscountPrice > 0"
                          class="font-medium"
                          :class="
                            totalDiscountPrice && totalDiscountPrice > 0
                              ? 'md:text-[16px] text-[#515B6F] line-through font-normal md:mt-[2px] mt-[2px]'
                              : ''
                          "
                        >
                          ৳{{ totalDiscountPrice }}
                        </p>
                        <p v-else class="font-medium">৳0</p>
                      </div>
                    </div>
                  </Transition>
                  <Transition name="page">
                    <div
                      v-if="!showPromoBox && showMobilePriceListModal"
                      class="w-full mt-[20px] flex justify-between items-center space-x-2 whitespace-nowrap lg:text-xl md:text-lg text-base text-[#313131] font-normal"
                    >
                      <div class="flex items-center">
                        Promo Code:
                        <div
                          class="flex items-center space-x-2 promo_code_box p-0.5 ml-2"
                        >
                          <span>{{ applyCoupon }}</span>
                          <ClientOnly>
                            <fa
                              class="w-4 h-4 cursor-pointer text-[#FF6E1F]"
                              :icon="['fas', 'times']"
                              @click.stop="showPromoBox = true"
                            />
                          </ClientOnly>
                        </div>
                      </div>
                      <p class="text-[#FF6E1F] font-medium">
                        - ৳{{ discountCode }}
                      </p>
                    </div>
                  </Transition>
                  <Transition name="page">
                    <div
                      v-if="showPromoBox && showMobileCheckoutModal"
                      class="w-full p-[13px] relative text-base transition-all duration-500 ease-in-out"
                      :class="
                        showPromoField
                          ? 'promo_box mt-[30px]'
                          : 'initial_box mt-[20px]'
                      "
                      @click.stop="showPromoField = true"
                    >
                      <input
                        class="w-full outline-none border-none"
                        v-model="applyCoupon"
                        :readonly="showPromoField ? false : true"
                        @input="inputPromo()"
                      />

                      <div
                        class="bg-white px-1 absolute transform text-sm flex items-center transition-all duration-500 ease-in-out"
                        :class="
                          showPromoField
                            ? 'text-[#1C1B1F] -top-[11px] left-2 space-x-0'
                            : 'text-[#FF6E1F] top-1/2 -translate-y-1/2 left-[13px] space-x-3'
                        "
                      >
                        <IconsPromoIcon
                          class="transition-all duration-500 ease-in-out"
                          :class="showPromoField ? 'w-0 h-0' : 'w-6 h-8'"
                        />
                        <p>Add Promo Code</p>
                      </div>
                    </div>
                  </Transition>
                  <template v-if="promoError">
                    <p class="text-[#EC1F27] text-base">
                      The field is required!
                    </p>
                  </template>
                  <Transition name="page">
                    <div
                      v-if="
                        showPromoField &&
                        showPromoBox &&
                        showMobileCheckoutModal
                      "
                      class="flex justify-between space-x-9 mt-[12px]"
                    >
                      <button
                        class="orange_button w-1/2 xl:!px-[0px] lg:!px-[0px] md:!px-[0px] !px-[0px] !font-semibold !text-[#FF6E1F] !shadow-none !bg-transparent border border-[#FF6E1F] flex items-center justify-center space-x-3"
                        :disabled="submitProcessing"
                        @click.stop="
                          (showPromoField = false), (promoError = false)
                        "
                      >
                        <span>Cancel</span>
                      </button>
                      <button
                        class="orange_button w-1/2 xl:!px-[0px] lg:!px-[0px] md:!px-[0px] !px-[0px] !font-semibold !shadow-none flex items-center justify-center space-x-3"
                        :disabled="submitProcessing"
                        @click.stop="handleApplyCoupon()"
                      >
                        <span>Submit</span>
                      </button>
                    </div>
                  </Transition>
                </div>
                <Transition name="page">
                  <div
                    v-if="showMobilePriceListModal"
                    class="w-full mt-[20px] flex justify-between items-center md:text-xl text-[#313131] font-bold"
                  >
                    <p>Total</p>
                    <p v-if="totalPriceOfCourses && totalPriceOfCourses > 0">
                      ৳{{
                        totalPriceOfCourses - (!showPromoBox ? discountCode : 0)
                      }}
                    </p>
                    <p v-else>৳0</p>
                  </div>
                </Transition>
                <div class="flex justify-between items-center mt-5">
                  <Transition name="page">
                    <div
                      v-if="showMobileCheckoutModal && isMobile"
                      class="flex items-center space-x-4 font-bold"
                    >
                      <p v-if="totalCoursePrice > 0">
                        ৳{{
                          totalPriceOfCourses -
                          (!showPromoBox ? discountCode : 0)
                        }}
                      </p>
                      <p v-else>৳0</p>
                      <IconsPrice class="w-5 h-5" />
                    </div>
                  </Transition>
                  <Transition name="page">
                    <NuxtLink
                      v-if="!isMobile"
                      :to="
                        !tokenCookie || tokenCookie === '' ? '/auth/login' : ''
                      "
                      class="orange_button md:!text-xl !text-base md:!py-[15px] !py-2 md:w-full w-[138px] flex items-center justify-center space-x-3"
                      @click.native="
                        !tokenCookie || tokenCookie === ''
                          ? setRedirectUrl('/cart')
                          : (showPayment = true)
                      "
                    >
                      <span class="hidden md:block">Proceed to Checkout</span>
                      <span class="md:hidden">Checkout</span>
                    </NuxtLink>
                    <NuxtLink
                      v-else-if="showMobileCheckoutModal"
                      :to="
                        !tokenCookie || tokenCookie === '' ? '/auth/login' : ''
                      "
                      class="orange_button md:!text-xl !text-base md:!py-[15px] !py-2 md:w-full w-[138px] flex items-center justify-center space-x-3"
                      @click.native="
                        !tokenCookie || tokenCookie === ''
                          ? setRedirectUrl('/cart')
                          : (showPayment = true)
                      "
                    >
                      <span class="hidden md:block">Proceed to Checkout</span>
                      <span class="md:hidden">Checkout</span>
                    </NuxtLink>
                  </Transition>
                </div>
              </div>
              <!-- </div> -->
            </div>
          </ClientOnly>
          <div
            v-else-if="showPayment"
            class="payment_box w-full max-w-[784px] mt-[124px] md:p-[32px] p-[24px] mx-auto"
          >
            <div class="border-b border-[#E3E3E3] pb-5">
              <div
                class="w-full flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 md:justify-between justify-center items-center whitespace-nowrap lg:text-xl text-lg text-[#313131] font-normal"
              >
                <p>Course Start Date</p>
                <p>20 December, 2024</p>
              </div>
              <div
                class="w-full mt-[20px] flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 md:justify-between justify-center items-center md:whitespace-nowrap lg:text-xl text-lg text-[#313131] font-normal"
              >
                <p class="font-medium line-clamp-1">Course Price</p>
                <div class="flex items-center space-x-[18px] font-medium">
                  <p v-if="totalPriceOfCourses > 0" class="">
                    ৳{{ totalPriceOfCourses }}
                  </p>
                  <p
                    v-if="totalDiscountPrice > 0"
                    :class="
                      totalDiscountPrice && totalDiscountPrice > 0
                        ? 'md:text-[16px] text-[#515B6F] line-through font-normal md:mt-[2px] mt-[2px]'
                        : ''
                    "
                  >
                    ৳{{ totalDiscountPrice }}
                  </p>
                </div>
              </div>
              <Transition name="page" mode="out-in">
                <div
                  v-if="!showPromoBox"
                  class="w-full mt-[20px] flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 md:justify-between justify-center items-center whitespace-nowrap lg:text-xl text-lg text-[#313131] font-normal"
                >
                  <div class="flex items-center">
                    Total Promo Applied:
                    <div
                      class="flex items-center space-x-2 promo_code_box p-0.5 ml-2"
                    >
                      <!-- <span>{{ applyCoupon }}</span> -->
                      <ClientOnly>
                        <fa
                          class="w-4 h-4 cursor-pointer text-[#FF6E1F]"
                          :icon="['fas', 'times']"
                          @click.stop="showPromoBox = true"
                        />
                      </ClientOnly>
                    </div>
                  </div>
                  <p class="text-[#FF6E1F] font-medium">
                    - ৳{{ discountCode }}
                  </p>
                </div>
              </Transition>
            </div>
            <div
              class="w-full mt-[20px] flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 md:justify-between justify-center items-center md:text-xl text-lg text-[#313131] font-bold"
            >
              <p>Total</p>
              <p v-if="totalPriceOfCourses > 0">
                ৳{{ totalPriceOfCourses - (!showPromoBox ? discountCode : 0) }}
              </p>
            </div>
            <div
              class="w-full mt-[43px] whitespace-nowrap flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 md:justify-between justify-center items-center md:text-xl text-lg text-[#313131] font-semibold"
            >
              <p>Payment Method</p>
              <div
                class="flex items-center space-x-2 px-3 py-2.5 rounded-full border border-black text-black text-base font-normal"
              >
                <div
                  class="flex w-[26px] h-[26px] justify-center items-center bg-[#FF6E1F] rounded-full"
                >
                  <img
                    class="w-3 h-3.5"
                    src="~/assets/img/cart/lock.svg"
                    alt="lock icon"
                  />
                </div>
                <p>Completely secured payment</p>
              </div>
            </div>
            <div
              class="w-full mt-[29px] p-[20px] whitespace-nowrap payment_method_box flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 md:justify-between justify-center md:items-center md:text-xl text-lg text-[#313131] font-semibold"
            >
              <p class="md:text-left text-center">Payment Method</p>
              <div
                class="flex md:justify-end justify-center flex-wrap items-center space-x-2"
              >
                <img
                  class="w-[66px] h-10"
                  src="~/assets/img/cart/bkash.svg"
                  alt="bkash"
                />
                <img
                  class="w-[66px] h-10"
                  src="~/assets/img/cart/rocket.svg"
                  alt="rocket"
                />
                <img
                  class="w-[66px] h-10"
                  src="~/assets/img/cart/nogot.svg"
                  alt="nogot"
                />
                <img
                  class="w-[66px] h-10"
                  src="~/assets/img/cart/upay.svg"
                  alt="upay"
                />
                <img
                  class="w-[66px] h-10"
                  src="~/assets/img/cart/master-card.svg"
                  alt="master-card"
                />
                <img
                  class="w-[66px] h-10"
                  src="~/assets/img/cart/visa.svg"
                  alt="visa"
                />
              </div>
            </div>
            <button
              class="orange_button !font-semibold w-full mt-10 flex items-center justify-between space-x-4"
              @click.stop="processToCheckout()"
            >
              <span>Get Started</span>
              <span
                >৳{{
                  totalPriceOfCourses - (!showPromoBox ? discountCode : 0)
                }}</span
              >
            </button>
          </div>
        </Transition>
      </div>
      <div
        class="w-full h-full flex flex-col justify-center items-center pt-[140px]"
        v-else
      >
        <IconsNoData />
        <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.video_thumbnail {
  background-image: var(--bgImage);
}
th,
td {
  @apply text-left min-w-[80px] text-base lg:text-lg border border-black py-2 lg:py-3 px-5;
}
th:last-child {
  @apply text-center;
}
.has-tooltip {
  @apply relative;
}
.tooltip {
  @apply absolute bg-primary-red text-white z-[100] left-20 -top-[56px] lg:-top-24 text-left invisible p-1.5 px-4 rounded-xl  shadow-lg w-full min-w-[300px] whitespace-normal break-words;
}

.has-tooltip:hover .tooltip {
  @apply visible;
  transition: all 0.3s linear;
}
.course_overview {
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
}
@media (max-width: 767px) {
  .course_overview {
    border-radius: 20px 20px 0px 0px;
    background: #fff9f6;
    box-shadow: 4px 0px 10px 0px rgba(49, 49, 49, 0.25);
  }
  .course_overview.card {
    border-radius: 0px;
    border: 1px solid #eff0f6;
    background: #fff;
    box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
      0px 1px 104px 0px rgba(255, 110, 31, 0.04),
      0px 54px 54px 0px rgba(255, 110, 31, 0.02);
  }
}
.initial_box,
.promo_code_box,
.payment_method_box,
.payment_box {
  border-radius: 8px;
  border: 0.5px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
}
.promo_box {
  border-radius: 4px;
  border: 0.5px solid #79747e;
  background: #fff;
}
/* .promo_code_box,
.payment_method_box,
.payment_box {
  border-radius: 8px;
  border: 0.5px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
} */
.payment_box {
  border-radius: 19px;
  border: 1px solid #eff0f6;
}

.step_one {
  transition: all 1s ease-in-out;
  background: linear-gradient(to top, #ff6e1f 50%, #e3e3e3 50%);
  background-size: 100% 200%;
  background-position: bottom;
  color: white;
  font-weight: 600;
}
.step_one.active {
  color: #313131;
  background-position: top;
}
.step_two {
  transition: all 1s ease-in-out;
  background: linear-gradient(to top, #ff6e1f 50%, #e3e3e3 50%);
  background-size: 100% 200%;
  background-position: bottom;
  color: white;
  font-weight: 600;
}
.step_two.active {
  color: #313131;
  background-position: top;
}
.toggle-check-1 {
  &:checked {
    @apply bg-[#FF6E1F];
  }
  &:checked + .check-1 {
    @apply opacity-100;
    color: white;
  }
}
</style>
