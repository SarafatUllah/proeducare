import { defineStore, Store } from 'pinia'

export const useSubscriptionPackageStore = defineStore("subscriptionPackage", () => {
  // state
  const subscriptionPackageIdRef = ref<[]>([])
  const isActiveSubscriptionRef = ref<boolean>(false)

  // computed
  const subscriptionPackageId = computed(() => subscriptionPackageIdRef.value)
  const isActiveSubscription = computed(() => isActiveSubscriptionRef.value)

  // actions
  const setSubscriptionPackageId = (payload: []) => {
    subscriptionPackageIdRef.value = payload
  }
  const setIsActiveSubscription = (payload: boolean) => {
    isActiveSubscriptionRef.value = payload
  }
  return {
    subscriptionPackageId,
    setSubscriptionPackageId,

    isActiveSubscription,
    setIsActiveSubscription,
  }
})