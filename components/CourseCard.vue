<script setup>
import demoAvater from "~/assets/img/courses/demo-avater.png";
import defaultAvater from "~/assets/img/icon/user.png";
import { useCoursesStore } from "~/stores/courses";
import { useCartDataStore } from "~/stores/cartData";

defineProps({
  cardData: {
    type: Object,
    required: true,
  },
});
const localePath = useLocalePath();
const { setSlugInformation, setAllCartData } = useCartDataStore();
const { setCourseItem } = useCoursesStore();
// Dummy Data
const instructors = [
  {
    id: 1,
    name: "Brooklyn Simmons",
    avater: demoAvater,
    title: "Developer at Awesome Motive",
  },
  {
    id: 2,
    name: "Simmons Brooklyn",
    avater: demoAvater,
    title: "Developer at Awesome Motive",
  },
];
const { apiBaseUrl } = useUrls();
const selectedProduct = ref("");
const selectedItemId = ref(0);
const selectedSubscription = ref("");
const tokenCookie = useCookie("token");
const oldCardData = ref([]);
const nuxtApp = useNuxtApp();
const { t } = useI18n();

const addToCart = async (product, itemId) => {
  if (product.purchase_allowed) {
    // showSubscriptionModal.value = !showSubscriptionModal.value;

    selectedProduct.value = product;
    selectedItemId.value = itemId;
    const cartDataCookie = useCookie("cartData");

    // if (selectedSubscription.value !== "") {
    if (tokenCookie.value) {
      try {
        const checkItemExist = ref(false);
        const { data } = await useFetch(`${apiBaseUrl}/carts`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        });
        data.value.data.forEach((singleItem) => {
          if (singleItem.item.id === itemId) {
            checkItemExist.value = true;
            nuxtApp.$toast("clear");
            nuxtApp.$toast("error", {
              message: t("messages.already_added_to_cart"),
              className: "toasted-bg-alert",
            });
            // router.push(localePath("/cart"));
          }
        });

        // subscription_id: selectedSubscription.value,
        if (!checkItemExist.value) {
          const { data, error } = await useFetch(`${apiBaseUrl}/carts/add`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`,
            },
            body: {
              item_id: itemId,
            },
          });
          if (!error.value && data.value) {
            nuxtApp.$toast("clear");
            nuxtApp.$toast("success", {
              message: data.value.message,
              className: "toasted-bg-success",
            });
            // router.push(localePath("/cart"));
          }
          getAllCardDta();
          return data.value.cart;
        }
        getAllCardDta();
      } catch (err) {
        console.log(err);
      }
    } else {
      const addNewProduct = {
        id: product.id,
        item_category_id: product.item_category_id,
        title: product.title,
        banner_url: product.banner_url,
        price: product.price,
        special_price: product.special_price,
        subscription_id: selectedSubscription.value,
        monthly_service_charge: product.monthly_service_charge,
      };
      if (cartDataCookie.value?.length > 0) {
        const isExist = cartDataCookie.value.find(
          (singleCartData) =>
            singleCartData.id === addNewProduct.id ||
            (singleCartData.item && singleCartData.item.id === addNewProduct.id)
        );
        if (isExist) {
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: t("messages.already_added_to_cart"),
            className: "toasted-bg-success",
          });
          setAllCartData(cartDataCookie.value);
          // router.push(localePath("/cart"));
        } else {
          cartDataCookie.value = JSON.stringify(cartDataCookie.value);

          oldCardData.value = JSON.parse(cartDataCookie.value);
          cartDataCookie.value = JSON.stringify([]);
          oldCardData.value.push(addNewProduct);
          cartDataCookie.value = JSON.stringify(oldCardData.value);
          nuxtApp.$toast("clear");
          nuxtApp.$toast("success", {
            message: t("messages.added_to_cart"),
            className: "toasted-bg-success",
          });

          setAllCartData(JSON.parse(cartDataCookie.value));
          // router.push(localePath("/cart"));
        }
      } else {
        oldCardData.value.push(addNewProduct);
        cartDataCookie.value = JSON.stringify(oldCardData.value);
        nuxtApp.$toast("clear");
        nuxtApp.$toast("success", {
          message: t("messages.added_to_cart"),
          className: "toasted-bg-success",
        });
        setAllCartData(JSON.parse(cartDataCookie.value));
        // router.push(localePath("/cart"));
      }
    }
  }
  // } else {
  //   nuxtApp.$toast("clear");
  //   nuxtApp.$toast("error", {
  //     message: t("messages.course_already_purchased"),
  //     className: "toasted-bg-alert",
  //   });
  // }
};

const getAllCardDta = async () => {
  const { data } = await useFetch(`${apiBaseUrl}/carts`, {
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
  });
  setAllCartData(data.value.data);
};
</script>
<template>
  <section class="bg-white min-h-[410px] h-full">
    <div class="h-full rounded-[8px] shadow-xl min-h-[410px] flex flex-col">
      <NuxtLink :to="localePath(`/courses/${cardData.slug}`)">
        <div>
          <img
            v-if="cardData.banner_url"
            class="w-full aspect-video rounded-t-[8px]"
            :src="cardData.banner_url"
            :alt="cardData.title"
          />
          <img
            v-else
            class="w-full aspect-video rounded-t-[8px]"
            src="~/assets/img/default/video-thumbnail2.webp"
          />
        </div>

        <h2
          class="h_tag_third !text-[#1A2134] px-[25px] pt-[16px] line-clamp-2"
        >
          {{ cardData.title }}
        </h2>
        <div
          class="flex justify-between px-[25px] pt-[20px] pb-4 text-[#515B6F] flex-grow"
        >
          <div class="flex items-center">
            <div class="p-[8px] w-[34px] rounded-2xl border-black-700 border">
              <IconsHat class="w-16px" />
            </div>
            <p class="ml-[8px] text-[12px]">Lessons</p>
          </div>
          <div class="flex items-center">
            <div class="p-[8px] w-[34px] rounded-2xl border-black-700 border">
              <IconsUsers class="w-16px" />
            </div>
            <p class="ml-[8px] text-[12px]">Students</p>
          </div>
          <div class="flex items-center">
            <div class="p-[8px] w-[34px] rounded-2xl border-black-700 border">
              <IconsGoldenStar class="w-16px" />
            </div>
            <!-- <p>{{ cardData.rating }}</p> -->
            <p class="ml-[8px] text-[12px]">5.0</p>
          </div>
        </div>
        <div class="px-[25px] text-[#515B6F]">
          <p class="text-xs font-medium">Instructor</p>
          <div class="relative mt-3 mb-4">
            <ul
              class="flex flex-row items-center flex-nowrap space-x-6 overflow-x-hidden right"
            >
              <li
                v-for="(instructor, index) in instructors"
                :key="instructor.id"
                class="flex items-center space-x-3 pr-5 border-gray-200 min-w-max"
                :class="index < instructors.length - 1 ? 'border-r' : ''"
              >
                <img
                  class="rounded-full h-11 aspect-square border"
                  :src="instructor.avater ? instructor.avater : defaultAvater"
                  :alt="instructor.name"
                />
                <div class="flex flex-col space-y-0.5 whitespace-nowrap">
                  <p class="text-sm font-bold text-orange-primary">
                    {{ instructor.name }}
                  </p>
                  <p class="text-xs font-normal">{{ instructor.title }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="border-top border"></div>
      </NuxtLink>
      <div class="flex justify-between px-[25px] py-4">
        <NuxtLink :to="localePath(`/courses/${cardData.slug}`)">
          <div
            class="flex items-center space-x-2 text-[18px] text-[#313131] font-semibold"
          >
            <p
              v-if="cardData.special_price && cardData.special_price > 0"
              class=""
            >
              ৳{{ cardData.special_price }}
            </p>
            <p
              :class="
                cardData.special_price && cardData.special_price > 0
                  ? 'text-[14px] text-[#515B6F] line-through font-normal'
                  : ''
              "
            >
              ৳{{ cardData.price }}
            </p>
          </div>
        </NuxtLink>
        <div>
          <div
            class="flex items-center cursor-pointer"
            @click.stop="addToCart(cardData, cardData.id)"
          >
            <IconsCartButton />
            <p class="text-[#FF6E1F] pl-2 text-sm">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.right:after {
  content: "";
  position: absolute;
  width: 60px;
  height: 100%;
  right: 0px;
  top: 0;
  background: linear-gradient(to left, #ffffff, #ffffff00 100%);
}
</style>
