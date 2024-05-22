import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", () => {
  // state
  const showCountryDropdown = ref(false)

  // actions
  const setCountryDropdown = (value: boolean) => {
    showCountryDropdown.value = value
  }
  return {
    showCountryDropdown,
    setCountryDropdown,
  }
})