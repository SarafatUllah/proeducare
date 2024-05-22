<script setup lang-="ts">
import { Form, Field, ErrorMessage } from "vee-validate";

definePageMeta({
  layout: "auth",
});

const { validatePassword } = useValidation();
const { apiBaseUrl } = useUrls();
const { $toast } = useNuxtApp();
const route = useRoute();
const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();
const token = computed(() => route.params.slug);
const newPassword = ref();
const confirmNewPassword = ref();
const showPassword = ref(false);
const showPasswordTwo = ref(false);
const loading = ref(false);

const handleResetPassword = async () => {
  loading.value = true;
  $toast("clear");
  if (newPassword.value === confirmNewPassword.value) {
    try {
      const data = await $fetch(`${apiBaseUrl}/auth/reset-password`, {
        method: "POST",
        body: {
          email: route.query?.email ? route.query?.email : "",
          token: token.value,
          password: newPassword.value,
          password_confirmation: confirmNewPassword.value,
        },
      });

      $toast("success", {
        message: `${data.message}`,
        className: "toasted-bg-success",
      });
      router.push(localePath("/auth/login"));
    } catch (error) {
      $toast("error", {
        message: `${
          error.data.message.password
            ? error.data.message.password
            : error.data.message
        }`,
        className: "toasted-bg-alert",
      });
    } finally {
      loading.value = false;
    }
  } else {
    $toast("error", {
      message: t("messages.password_not_match"),
      className: "toasted-bg-alert",
    });
  }
};
</script>

<template>
  <main class="flex flex-col">
    <div class="flex items-center flex-row justify-center md:justify-start">
      <NuxtLink :to="localePath('/')"
        ><IconsLogo class="w-[110px] sm:w-[180px] md:w-[194px]"
      /></NuxtLink>
    </div>

    <section
      class="flex flex-col md:flex-row justify-between items-start w-full md:space-x-10 lg:space-x-20 xl:md:space-x-24"
    >
      <div class="w-full md:w-1/2 flex flex-col pt-16">
        <div class="pt-4">
          <div class="pb-9">
            <h3 class="h_tag_primary pb-2 md:pb-4">
              {{ $t("set_a_password") }}
            </h3>
            <p class="p_tag_secondary">
              {{ $t("password_text") }}
            </p>
          </div>
          <Form
            @submit="handleResetPassword"
            @keypress.enter="handleResetPassword"
            v-slot="{ meta }"
          >
            <div class="text-gray-1100 flex flex-col pb-8">
              <fieldset class="input-wrapper flex items-center">
                <legend class="legend">
                  {{ $t("create_password") }}
                </legend>
                <Field
                  v-model="newPassword"
                  name="newPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('new_pass')"
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
              <ErrorMessage class="error-message" name="newPassword" />
            </div>
            <div class="text-gray-1100 flex flex-col pb-8">
              <fieldset class="input-wrapper flex items-center">
                <legend class="legend">
                  {{ $t("re_enter_password") }}
                </legend>
                <Field
                  v-model="confirmNewPassword"
                  name="confirmNewPassword"
                  :type="showPasswordTwo ? 'text' : 'password'"
                  :placeholder="$t('confirm_new_password')"
                  :rules="validatePassword"
                  class="input-field"
                />
                <div class="w-6 flex items-center">
                  <IconsEye
                    :hideEye="showPasswordTwo"
                    @click="showPasswordTwo = !showPasswordTwo"
                    class="text-gray-primary cursor-pointer w-6"
                  />
                </div>
              </fieldset>
              <ErrorMessage class="error-message" name="confirmNewPassword" />
            </div>
            <button
              type="submit"
              :disabled="!meta.valid || loading"
              class="auth-btn"
            >
              <span>{{ $t("set_password") }}</span>
            </button>
          </Form>
        </div>
      </div>
      <div class="w-full md:w-1/2 hidden md:block -mt-6">
        <img
          class="rounded-3xl object-fill w-full aspect-[616/816]"
          src="/images/auth/forgot_pass.webp"
          alt="Set a password"
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
