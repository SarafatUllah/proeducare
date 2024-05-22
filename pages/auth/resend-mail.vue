<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";

const { RESEND_EMAIL } = useUrls();
const { validateEmail } = useValidation();
const { $toast } = useNuxtApp();
const router = useRouter();
const localePath = useLocalePath();

const rememberMeCookie: any = useCookie("rememberMe", {
  watch: true,
});
const userEmail = ref(
  rememberMeCookie.value ? rememberMeCookie.value.email : ""
);

const isResendBtnDisabled = ref(false);
const resendEmail = async () => {
  $toast("clear");
  try {
    isResendBtnDisabled.value = true;
    const data: any = await $fetch(`${RESEND_EMAIL}/${userEmail.value}`);
    if (data?.message) {
      $toast("success", {
        message: data.message,
        className: "toasted-bg-success",
      });
      router.push(localePath("/auth/login"));
    }
  } catch (error: any) {
    isResendBtnDisabled.value = false;

    if (error?.response?.status === 404) {
      router.push(localePath("/auth/register"));
    }

    $toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
  }
};
</script>

<template>
  <main class="custom-container">
    <section class="mt-20 mb-32 flex items-center justify-center">
      <div
        class="card-shadow w-[660px] px-2.5 xs:px-4 pt-8 pb-10 md:pt-20 md:pb-28 md:px-10 font-semibold text-lg"
      >
        <h1 class="text-2xl font-semibold mb-10">
          {{ $t("resend_mail_title") }}
        </h1>
        <Form
          @submit="resendEmail"
          @keypress.enter="resendEmail"
          v-slot="{ meta }"
        >
          <div class="space-y-5">
            <Field
              v-model="userEmail"
              name="email"
              type="email"
              class="w-full px-6 p-2 border border-black outline-none rounded-[10px] text-lg font-semibold"
              :placeholder="$t('email_address')"
              :rules="validateEmail"
            />
            <ErrorMessage class="error-message" name="email" />
          </div>
          <button
            class="px-4 h-[50px] text-primary-red border border-primary-red text-lg font-semibold rounded hover:bg-primary-red hover:text-white disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-primary-red mt-10"
            type="submit"
            :disabled="!meta.valid || isResendBtnDisabled"
          >
            {{ $t("resend_mail") }}
          </button>
        </Form>
      </div>
    </section>
  </main>
</template>

<style scoped>
.verifyInput {
  display: block;
  outline: none;
  border: none;
  height: 2em;
  font-size: 16px;
  margin-bottom: 1px;
  border-bottom: 1px solid #333;
}

.verifyInput:focus {
  border-bottom: 1px solid #0572ce;
  box-shadow: 0 1px 0 0 #0572ce;
}
</style>
