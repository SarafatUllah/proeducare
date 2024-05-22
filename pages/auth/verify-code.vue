<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";

definePageMeta({
  layout: "auth",
});

const { isRequired } = useValidation();
const { apiBaseUrl } = useUrls();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
const { VERIFY_RESET_PASS_CODE } = useUrls();
const recaptchaRef = ref(null);
const loading = ref(false);
const verificationCode = ref("");
const showCode = ref(false);

const submitCode = async () => {
  loading.value = true;
  $toast("clear");

  if (recaptchaRef.value) {
    const captchaToken = await recaptchaRef.value.execute(
      config.public.recaptchaKey,
      {
        action: "VERIFY_EMAIL",
      }
    );

    if (captchaToken) {
      try {
        const data = await $fetch(VERIFY_RESET_PASS_CODE, {
          method: "POST",
          body: {
            code: verificationCode.value,
            email: route.query?.email ? route.query?.email : "",
            captcha_token: captchaToken,
          },
        });
        if (data.token && data.message) {
          $toast("success", {
            message: `${data.message}`,
            className: "toasted-bg-success",
          });
          router.push(
            localePath(
              `/auth/reset-password/${data?.token}?email=${route.query?.email}`
            )
          );
        } else if (data.message) {
          $toast("error", {
            message: data.message,
            className: "toasted-bg-alert",
          });
        }
      } catch (e) {
        $toast("error", {
          message: `${e.message}`,
          className: "toasted-bg-alert",
        });
      } finally {
        loading.value = false;
      }
    }
  }
};

const resendCode = async () => {
  loading.value = true;
  $toast("clear");

  if (recaptchaRef.value) {
    const captchaToken = await recaptchaRef.value.execute(
      config.public.recaptchaKey,
      {
        action: "PASSWORD_RESET",
      }
    );

    if (captchaToken) {
      try {
        const data = await $fetch(`${apiBaseUrl}/auth/forgot-password`, {
          method: "POST",
          body: {
            email: route.query?.email ? route.query?.email : "",
            captcha_token: captchaToken,
          },
        });
        $toast("success", {
          message: `${data.message}`,
          className: "toasted-bg-success",
        });
      } catch (e) {
        if (e.data?.message?.email) {
          $toast("error", {
            message: `${e.data.message.email}`,
            className: "toasted-bg-alert",
          });
        } else {
          $toast("error", {
            message: `${e.data.message}`,
            className: "toasted-bg-alert",
          });
        }
      } finally {
        loading.value = false;
      }
    }
  }
};

onMounted(() => {
  // Watch for the recaptcha script to be loaded
  watchEffect(() => {
    if (window.grecaptcha && window.grecaptcha.enterprise) {
      recaptchaRef.value = window.grecaptcha.enterprise;
    }
  });
});
</script>

<template>
  <main class="flex flex-col">
    <div class="flex items-center flex-row justify-between md:justify-start">
      <NuxtLink
        :to="localePath('/auth/login')"
        class="flex md:hidden items-center justify-start p_tag_third !text-gray-primary !font-medium space-x-1"
      >
        <IconsChevronDown class="w-5 rotate-90" />
        <p>{{ $t("back_to_login") }}</p>
      </NuxtLink>
      <NuxtLink :to="localePath('/')"
        ><IconsLogo class="w-[110px] sm:w-[180px] md:w-[194px]"
      /></NuxtLink>
    </div>

    <section
      class="flex flex-col md:flex-row justify-between items-start w-full md:space-x-10 lg:space-x-20 xl:md:space-x-24"
    >
      <div class="w-full md:w-1/2 flex flex-col pt-16">
        <div class="hidden md:flex items-center justify-start mb-4">
          <NuxtLink
            :to="localePath('/auth/login')"
            class="flex items-center justify-start p_tag_third !text-gray-primary !font-medium space-x-1"
          >
            <IconsChevronDown class="w-5 rotate-90" />
            <p>{{ $t("back_to_login") }}</p>
          </NuxtLink>
        </div>
        <div class="">
          <div class="pb-9">
            <h3 class="h_tag_primary pb-2 md:pb-4">
              {{ $t("verify_code") }}
            </h3>
            <p class="p_tag_secondary">
              {{ $t("verify_code_title") }}
            </p>
          </div>
          <Form
            @submit="submitCode"
            @keypress.enter="submitCode"
            v-slot="{ meta }"
          >
            <div class="text-gray-1100 flex flex-col pb-8">
              <fieldset class="input-wrapper flex items-center">
                <legend class="legend">{{ $t("enter_code") }}</legend>
                <Field
                  v-model="verificationCode"
                  name="verificationCode"
                  :type="showCode ? 'text' : 'password'"
                  :placeholder="$t('enter_code')"
                  :rules="isRequired"
                  class="input-field"
                />
                <div class="w-6 flex items-center">
                  <IconsEye
                    :hideEye="showCode"
                    @click="showCode = !showCode"
                    class="text-gray-primary cursor-pointer w-6"
                  />
                </div>
              </fieldset>
              <ErrorMessage class="error-message" name="verificationCode" />
              <div class="flex items-center space-x-1 pt-4 p_tag_fourth">
                <p class="">
                  {{ $t("otp_not_got") }}
                </p>
                <button
                  @click="resendCode"
                  type="button"
                  :disabled="loading"
                  class="outline-none text-[#FF8682]"
                >
                  {{ $t("resend_btn") }}
                </button>
              </div>
            </div>
            <button
              type="submit"
              :disabled="!meta.valid || loading"
              class="auth-btn"
            >
              <span>{{ $t("verify") }}</span>
            </button>
          </Form>
        </div>
      </div>
      <div class="w-full md:w-1/2 hidden md:block -mt-4">
        <img
          class="rounded-3xl object-fill w-full aspect-[616/816]"
          src="/images/auth/verify_code.webp"
          alt="Verify code"
        />
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
