<script setup>
import { useDashboardStore } from "~/stores/dashboard";
import { useAuthStore } from "~/stores/auth";
import { useBlogsStore } from "~/stores/blogs";
import { useCartDataStore } from "~/stores/cartData";

const { setAllCartData } = useCartDataStore();
const cartDataCookie = useCookie("cartData");

const route = useRoute();
const {
  setShowNotification,
  setAllNotifications,
  setShowProfileOptions,
  setShowNotificationOptions,
  setUpdateAllShowNotificationOptions,
} = useDashboardStore();
const { joinToChannel } = useNotification();
const { setCountryDropdown } = useAuthStore();
const { fetchLatestBlogs } = useBlogsStore();
const { ME } = useUrls();

const headerRef = ref(null);

const closeMenu = () => {
  // headerRef.value.closeMenu();
  closeAllModal();
};
const closeAllModal = () => {
  setShowNotification(false);
  setCountryDropdown(false);
  setShowProfileOptions(false);
  setShowNotificationOptions(false);
  setUpdateAllShowNotificationOptions(false);
};

// Security
const disableF12 = () => {
  document.onkeydown = function (event) {
    if (event.key === "F12") {
      event.preventDefault();
    }
  };
};
const disableSelectCopyRightClickAndPrint = () => {
  // Disable text selection
  document.onselectstart = function () {
    return false;
  };

  // Disable right-click
  document.oncontextmenu = function () {
    return false;
  };

  // Prevent printing
  window.onbeforeprint = function () {
    alert("Printing is disabled for this page.");
    return false;
  };
};

watch(
  () => route.fullPath,
  (routerPath) => {
    const greCaptchaBadge = document.getElementsByClassName("grecaptcha-badge");

    const setRecaptchaBadgeStyle = () => {
      if (greCaptchaBadge) {
        if (
          routerPath.includes("/auth/login") ||
          routerPath.includes("/auth/register")
        ) {
          greCaptchaBadge[0].style.opacity = "1";
        } else {
          greCaptchaBadge[0].style.opacity = "0";
        }
      } else {
        setTimeout(() => {
          setRecaptchaBadgeStyle();
        }, 200);
      }
    };
    setRecaptchaBadgeStyle();
  }
);

await fetchLatestBlogs();
const { apiBaseUrl } = useUrls();
const tokenCookie = useCookie("token");
const cart = ref([]);
const loadCart = async () => {
  console.log("hello");
  const { data } = await $fetch(`${apiBaseUrl}/carts`, {
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
  });
  if (data) {
    if (data.length > 0) {
      data.forEach((element) => {
        cart.value.push(element.item);
      });

      const makeCardDataForApi = [];

      cart.value.forEach((singleCart) => {
        singleCart.check = true;
        // if (singleCart.item.id === slugInformation.value.id) {
        const singleItem = {
          item_id: singleCart.id,
          subscription_id: singleCart.subscription?.id,
          item_slug: singleCart.slug,
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
  }
  // const setData = () => {
  //   console.log(pending.value);
  //   if (!pending.value) {
  //     console.log(data);
  //     if (data.value) {
  //       if (data.value.data.length > 0) {
  //         data.value.data.forEach((element) => {
  //           cart.value.push(element.item);
  //         });

  //         const makeCardDataForApi = [];

  //         cart.value.forEach((singleCart) => {
  //           singleCart.check = true;
  //           // if (singleCart.item.id === slugInformation.value.id) {
  //           const singleItem = {
  //             item_id: singleCart.id,
  //             subscription_id: singleCart.subscription?.id,
  //             item_slug: singleCart.slug,
  //           };
  //           makeCardDataForApi.push(singleItem);
  //           setAllCartData(cart.value);
  //           // }
  //         });
  //         // getCourseDetails(makeCardDataForApi.item_slug);
  //         setCartDataForApi(makeCardDataForApi);
  //       } else {
  //         nuxtApp.$toast("clear");
  //         nuxtApp.$toast("error", {
  //           message: t("messages.no_item_in_cart"),
  //           className: "toasted-bg-success",
  //         });
  //       }
  //       isProcessing.value = false;
  //     } else if (error.value) {
  //       nuxtApp.$toast("clear");
  //       nuxtApp.$toast("error", {
  //         message: error.value?.data.message.code,
  //         className: "toasted-bg-success",
  //       });
  //       isProcessing.value = false;
  //     }
  //   } else {
  //     setTimeout(() => {
  //       setData();
  //     }, 300);
  //   }
  // };
  // setData();
};
onMounted(async () => {
  // disableF12();
  // disableSelectCopyRightClickAndPrint();
  // check for token
  if (cartDataCookie.value) {
    setAllCartData(cartDataCookie.value);
  } else {
    if (tokenCookie.value) {
      loadCart();
    }
  }
  const token = useCookie("token");
  if (token.value) {
    const data = await $fetch(ME, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (data && data.id) {
      joinToChannel(data.id);
      setAllNotifications();
    }
  }
});
</script>

<template>
  <div @click="closeMenu">
    <div class="bg-[#202430] w-full">
      <TopHeader />
    </div>

    <div class="sticky top-0 z-[9999]">
      <TheHeader class="bg-white" ref="headerRef" @click.stop="closeAllModal" />
    </div>
    <div>
      <slot />
    </div>
    <NuxtLink
      v-if="!route.path.includes('/dashboard')"
      to="https://api.whatsapp.com/send?phone=8801326506464"
      target="_blank"
      class="fixed bottom-10 right-4 z-50 p-3 rounded-full"
    >
      <img
        class="w-12 lg:w-16 aspect-square object-contain"
        src="/icons/whatsapp.svg"
        alt="Fiverr Outsourcing Institute Whatsapp"
      />
    </NuxtLink>
    <!-- <AdBlockDetector /> -->
    <LazyTheFooterCard v-if="!$route.path.includes('/dashboard')" />
    <TheFooter v-if="!$route.path.includes('/dashboard')" />
    <LazyTheVideos />
  </div>
</template>

<style>
.no-select {
  user-select: none;
  -webkit-user-select: none;
  /* Chrome and Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE10+/Edge */
}

.carousel__pagination {
  margin: 20px 0 0;
}

.carousel__pagination-button::after {
  @apply w-3 h-3 xl:w-5 xl:h-5 rounded-full bg-white;
  border: 1px solid #707070;
}

.carousel__pagination-button:hover::after {
  background-color: #ec1f27;
}

.carousel__pagination-button--active::after {
  background-color: #ec1f27;
}

/* Vue-Carousel Navigation */
.carousel__icon {
  font-size: 40px;
  fill: white;
}

.blog-navigation.carousel__prev {
  left: -30px;
}

.blog-navigation.carousel__next {
  right: -30px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  background-color: #ec1f27;
  border-radius: 100%;
  height: 60px;
  width: 60px;
}

.carousel__next--disabled,
.carousel__prev--disabled {
  background-color: #d9d9d9;
  opacity: 1;
}

.carousel__next--disabled .carousel__icon,
.carousel__prev--disabled .carousel__icon {
  fill: #ec1f27;
}

.menu-item {
  @apply text-white;
}

.bg-primary-red {
  background-color: #ec1f27 !important;
  opacity: 100%;
}

.dropdown-content {
  @apply text-lg bg-white z-[99999];
}

.dropdown-content a:hover {
  @apply bg-black text-white font-semibold rounded-[15px];
}

@media (max-width: 425px) {
  .carousel__prev,
  .carousel__next {
    height: 45px;
    width: 45px;
    margin: 0 5px;
  }
}
</style>
