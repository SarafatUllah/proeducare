import { configure } from "vee-validate";

export default defineNuxtPlugin(() => {
  configure({
    bails: false,
    validateOnInput: true,
    validateOnBlur: true,
    validateOnChange: true,
  });
});
