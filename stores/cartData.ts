import { defineStore, Store } from "pinia";

export const useCartDataStore = defineStore("cartData", () => {
  // state
  const allCartDataRef = ref<[]>([]);
  const cartDataForApiRef = ref<[]>([]);
  const subscriptionDataForApiRef = ref<{}>({});
  const slugInformationRef = ref<{}>({});

  // computed
  const allCartData = computed(() => allCartDataRef.value);
  const cartDataForApi = computed(() => cartDataForApiRef.value);
  const subscriptionDataForApi = computed(
    () => subscriptionDataForApiRef.value
  );
  const slugInformation = computed(() => slugInformationRef.value);

  // actions
  const setSlugInformation = (payload: {}) => {
    slugInformationRef.value = payload;
  };
  const setAllCartData = (payload: []) => {
    allCartDataRef.value = payload;
  };
  const setCartDataForApi = (payload: []) => {
    cartDataForApiRef.value = payload;
  };
  const setSubscriptionDataForApi = (payload: {}) => {
    subscriptionDataForApiRef.value = payload;
  };
  return {
    allCartData,
    setAllCartData,

    cartDataForApi,
    setCartDataForApi,

    subscriptionDataForApi,
    setSubscriptionDataForApi,

    slugInformation,
    setSlugInformation,
  };
});
