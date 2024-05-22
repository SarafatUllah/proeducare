<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { vMaska } from "maska";

definePageMeta({
  layout: "auth",
});

const { REGISTER } = useUrls();
const { isRequired, validateEmail, validatePassword, validatePhone } =
  useValidation();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

const firstName = ref("");
const lastName = ref("");
const userEmail = ref("");
const userPass = ref("");
const userConfPass = ref("");
const userPhone = ref("");
const isProcessing = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const termsAccepted = ref(false);
const deviceIdCookie = useCookie("deviceId", { maxAge: 60 * 60 * 24 * 30 });

const deviceId = ref("");

const generateDeviceFingerprint = async () => {
  const fpPromise = FingerprintJS.load();
  const fp = await fpPromise;
  const result = await fp.get();
  deviceId.value = result.visitorId;
};

const recaptchaRef = ref(null);
const handleRegister = async () => {
  isProcessing.value = true;
  $toast("clear");
  if (recaptchaRef.value) {
    const captchaToken = await recaptchaRef.value.execute(
      config.public.recaptchaKey,
      {
        action: "SIGNUP",
      }
    );

    if (captchaToken) {
      if (!termsAccepted.value) {
        $toast("error", {
          message: t("messages.accept_terms_privacy"),
          className: "toasted-bg-alert",
        });
        isProcessing.value = false;
        return;
      }
      if (userPass.value === userConfPass.value) {
        if (deviceId.value !== "") {
          try {
            const userTimeZone =
              Intl.DateTimeFormat().resolvedOptions().timeZone;
            const data = await $fetch(REGISTER, {
              method: "POST",
              body: {
                first_name: firstName.value,
                last_name: lastName.value,
                email: userEmail.value,
                password: userPass.value,
                phone: userPhone.value.replace(/\s/g, ""),
                captcha_token: captchaToken,
                device_id: deviceId.value,
                timezone: userTimeZone,
              },
            });
            if (data) {
              $toast("success", {
                message: data.message,
                className: "toasted-bg-success",
              });
              deviceIdCookie.value = deviceId.value;
              router.push(localePath("/auth/login"));
            }
          } catch (error) {
            $toast("error", {
              message: error?.response?._data?.message.email
                ? error?.response?._data?.message.email
                : error?.response?._data?.message.phone,
              className: "toasted-bg-alert",
            });
          } finally {
            isProcessing.value = false;
          }
        } else {
          isProcessing.value = false;
        }
      } else {
        $toast("error", {
          message: t("messages.password_not_match"),
          className: "toasted-bg-alert",
        });
        isProcessing.value = false;
      }
    } else {
      isProcessing.value = false;
    }
  }
};
onMounted(() => {
  generateDeviceFingerprint();

  // Watch for the recaptcha script to be loaded
  watchEffect(() => {
    if (window.grecaptcha && window.grecaptcha.enterprise) {
      recaptchaRef.value = window.grecaptcha.enterprise;
    }
  });
});
const authSlider = [
  {
    id: 1,
    title: "register",
    sub_title: "register",
    url: null,
    media_link: `${config.public.cdnURL}/images/auth/register.webp`,
    media_link_type: null,
    type: "image",
    cover_image: null,
  },
  {
    id: 2,
    title: "login",
    sub_title: "login",
    url: null,
    media_link: `${config.public.cdnURL}/images/auth/login.webp`,
    media_link_type: null,
    type: "image",
    cover_image: null,
  },
  {
    id: 3,
    title: "forgot_pass",
    sub_title: "forgot_pass",
    url: null,
    media_link: `${config.public.cdnURL}/images/auth/forgot_pass.webp`,
    media_link_type: null,
    type: "image",
    cover_image: null,
  },
];
</script>

<template>
  <main class="flex flex-col">
    <div class="flex items-center flex-row justify-center md:justify-end">
      <NuxtLink :to="localePath('/')"
        ><IconsLogo class="w-[110px] sm:w-[180px] md:w-[194px]"
      /></NuxtLink>
    </div>
    <section
      class="flex flex-col md:flex-row justify-between items-start w-full md:space-x-10 lg:space-x-20 xl:md:space-x-24"
    >
      <div class="w-full md:w-[40%] -mt-6 hidden md:block">
        <BaseAuthCarousel
          :slider="authSlider"
          imageClass="object-fill w-full aspect-[487/816]"
        />
      </div>
      <div class="w-full md:w-[60%] pt-16">
        <div class="">
          <div class="pb-9">
            <h3 class="h_tag_primary pb-2 md:pb-4">
              {{ $t("sign_up") }}
            </h3>
            <p class="p_tag_secondary">
              {{ $t("signup_title") }}
            </p>
          </div>
          <Form @submit="handleRegister" v-slot="{ meta }">
            <div class="text-gray-1100 flex flex-col space-y-6">
              <div
                class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5"
              >
                <div class="w-full">
                  <fieldset class="input-wrapper">
                    <legend class="legend">{{ $t("first_name") }}</legend>
                    <Field
                      v-model="firstName"
                      name="firstName"
                      type="text"
                      :placeholder="$t('enter_first_name')"
                      :rules="isRequired"
                      class="input-field"
                    />
                  </fieldset>
                  <ErrorMessage class="error-message block" name="firstName" />
                </div>
                <div class="w-full">
                  <fieldset class="input-wrapper">
                    <legend class="legend">{{ $t("last_name") }}</legend>
                    <Field
                      v-model="lastName"
                      name="lastName"
                      type="text"
                      :placeholder="$t('enter_last_name')"
                      :rules="isRequired"
                      class="input-field"
                    />
                  </fieldset>
                  <ErrorMessage class="error-message block" name="lastName" />
                </div>
              </div>
              <div
                class="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-5"
              >
                <div class="w-full">
                  <fieldset class="input-wrapper">
                    <legend class="legend">{{ $t("email") }}</legend>
                    <Field
                      v-model="userEmail"
                      name="email"
                      type="email"
                      :placeholder="$t('email_address')"
                      :rules="validateEmail"
                      class="input-field"
                    />
                  </fieldset>
                  <ErrorMessage class="error-message block" name="email" />
                </div>
                <div class="w-full">
                  <fieldset class="input-wrapper">
                    <legend class="legend">
                      {{ $t("phone_number") }}
                    </legend>
                    <Field
                      v-model="userPhone"
                      name="phone"
                      type="text"
                      :placeholder="$t('phone_number')"
                      :rules="isRequired"
                      v-maska
                      data-maska="+### #### #### ####"
                      class="input-field"
                    />
                  </fieldset>
                  <ErrorMessage class="error-message block" name="phone" />
                </div>
              </div>
              <div class="w-full">
                <fieldset class="input-wrapper flex items-center">
                  <legend class="legend">{{ $t("password") }}</legend>
                  <Field
                    v-model="userPass"
                    name="password"
                    :type="showPassword ? 'text' : 'password'"
                    :placeholder="$t('password')"
                    :rules="validatePassword"
                    class="input-field"
                  />
                  <div class="w-6 flex items-center">
                    <IconsEye
                      :hideEye="showPassword"
                      @click="showPassword = !showPassword"
                      class="text-gray-primary cursor-pointer w-6"
                    />
                  </div>
                </fieldset>
                <ErrorMessage class="error-message block" name="password" />
              </div>
              <div class="w-full">
                <fieldset class="input-wrapper flex items-center">
                  <legend class="legend">
                    {{ $t("confirm_password") }}
                  </legend>
                  <Field
                    v-model="userConfPass"
                    name="confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    :placeholder="$t('confirm_password')"
                    class="input-field"
                  />
                  <div class="w-6 flex items-center">
                    <IconsEye
                      :hideEye="showConfirmPassword"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="text-gray-primary cursor-pointer w-6"
                    />
                  </div>
                </fieldset>
                <span
                  v-if="userPass != userConfPass && userConfPass"
                  class="error-message block"
                  >{{ $t("messages.password_not_match") }}</span
                >
              </div>
            </div>
            <div class="flex justify-between items-center pt-6 pb-10">
              <div class="flex justify-start items-center space-x-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  id="termsAccepted"
                  v-model="termsAccepted"
                  class="checkbox"
                />
                <p class="p_tag_fourth">
                  {{ $t("i_agree") }}
                  <NuxtLink
                    :to="localePath('/terms-of-use')"
                    class="text-[#FF8682]"
                    >{{ $t("term") }}</NuxtLink
                  >
                  {{ $t("and") }}
                  <NuxtLink
                    :to="localePath('/privacy-policy')"
                    class="text-[#FF8682]"
                    >{{ $t("privacy_policy") }}</NuxtLink
                  >
                </p>
              </div>
              <div></div>
            </div>
            <button
              type="submit"
              :disabled="!meta.valid || isProcessing"
              class="auth-btn"
            >
              <span>{{ $t("create_account") }}</span>
            </button>
          </Form>
          <p class="text-center pt-4 p_tag_fourth">
            {{ $t("already_have_account") }}
            <NuxtLink :to="localePath('/auth/login')" class="text-[#FF8682]">{{
              $t("login")
            }}</NuxtLink>
          </p>
          <div class="flex items-center my-10 text-sm">
            <hr class="w-full" />
            <span class="mx-3 whitespace-nowrap p_tag_fourth opacity-50">{{
              $t("or_sign_up")
            }}</span>
            <hr class="w-full" />
          </div>
          <SocialLogin />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.input-wrapper {
  @apply w-full border border-gray-1000 rounded pb-2 px-4;
}
.legend {
  @apply text-sm px-1;
}
.input-field {
  @apply w-full outline-none rounded-md h-8 md:h-10 px-1 text-base;
}
.auth-btn {
  @apply w-full bg-orange-primary h-10 md:h-12 flex justify-center items-center outline-none rounded text-white font-medium text-base;
}
</style>
