<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";

definePageMeta({
  layout: "auth",
});

const { validateEmail } = useValidation();
const { apiBaseUrl } = useUrls();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const localePath = useLocalePath();

const email = ref();
const recaptchaRef = ref(null);
const loading = ref(false);

const handleForgetPassword = async () => {
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
            email: email.value,
            captcha_token: captchaToken,
          },
        });
        $toast("success", {
          message: `${data.message}`,
          className: "toasted-bg-success",
        });
        router.push(localePath(`/auth/verify-code?email=${email.value}`));
      } catch (e) {
        $toast("error", {
          message: `${e.data.message}`,
          className: "toasted-bg-alert",
        });
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
              {{ $t("forgot_ur_password") }}
            </h3>
            <p class="p_tag_secondary">
              {{ $t("forgot_pass_title") }}
            </p>
          </div>
          <Form
            @submit="handleForgetPassword"
            @keypress.enter="handleForgetPassword"
            v-slot="{ meta }"
          >
            <div class="text-gray-1100 flex flex-col pb-8">
              <fieldset class="input-wrapper">
                <legend class="legend">{{ $t("email") }}</legend>
                <Field
                  v-model="email"
                  name="email"
                  type="email"
                  :placeholder="$t('email_address')"
                  :rules="validateEmail"
                  class="input-field"
                />
              </fieldset>
              <ErrorMessage class="error-message block" name="email" />
            </div>
            <button
              type="submit"
              :disabled="!meta.valid || loading"
              class="auth-btn"
            >
              <span>{{ $t("submit") }}</span>
            </button>
          </Form>
          <div class="flex items-center my-10 text-sm">
            <hr class="w-full" />
            <span class="mx-3 whitespace-nowrap p_tag_fourth opacity-50">{{
              $t("or_login")
            }}</span>
            <hr class="w-full" />
          </div>
          <SocialLogin />
        </div>
      </div>
      <div class="w-full md:w-1/2 hidden md:block -mt-6">
        <img
          class="rounded-3xl object-fill w-full aspect-[616/816]"
          src="/images/auth/forgot_pass.webp"
          alt="Forgot your password?"
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
