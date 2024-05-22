<script setup lang="ts">
import { Field } from "vee-validate";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const { CHANGE_DEVICE, VERIFY_CHANGE_DEVICE } = useUrls();
const { validateEmail, validatePassword } = useValidation();
const config = useRuntimeConfig();
const { $toast } = useNuxtApp();
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

const rememberMeCookie: any = useCookie("rememberMe", {
  watch: true,
});
const userEmail = ref(
  rememberMeCookie.value ? rememberMeCookie.value.email : ""
);
const userPass = ref(
  rememberMeCookie.value ? rememberMeCookie.value.password : ""
);
const process: any = ref(false);
const showPassword = ref(false);
const showRequestNewDeviceModal = ref(false);
const showVerificationOtp = ref(false);
const verifyOtpValue = ref("");
const deviceIdCookie = useCookie("deviceId", { maxAge: 60 * 60 * 24 * 30 });

const deviceId = ref("");

const generateDeviceFingerprint = async () => {
  const fpPromise = FingerprintJS.load();
  const fp = await fpPromise;
  const result = await fp.get();
  deviceId.value = result.visitorId;
};

const recaptchaRef = ref<any>(null);
const handleSendMail = async () => {
  process.value = true;
  $toast("clear");
  if (recaptchaRef.value) {
    const captchaToken = await recaptchaRef.value.execute(
      config.public.recaptchaKey,
      {
        action: "CHANGE_DEVICE",
      }
    );

    if (captchaToken) {
      try {
        const data: any = await $fetch(CHANGE_DEVICE, {
          method: "POST",
          body: {
            email: userEmail.value,
            password: userPass.value,
            captcha_token: captchaToken,
            device_id: deviceId.value,
          },
        });
        if (data.message) {
          $toast("success", {
            message: data.message,
            className: "toasted-bg-success",
          });

          showVerificationOtp.value = true;
          process.value = false;
        }
      } catch (error: any) {
        $toast("error", {
          message: error?.response?._data?.message.password
            ? error?.response?._data?.message.password
            : error?.response?._data?.message.email
            ? error?.response?._data?.message.email
            : error?.response?._data?.message,
          className: "toasted-bg-alert",
        });
        process.value = false;
      }
    } else {
      process.value = false;
      $toast("alert", {
        message: t("messages.something_went_wrong"),
        className: "toasted-bg-alert",
      });
    }
  }
};
const handleVerifyOtp = async () => {
  if (verifyOtpValue.value !== "") {
    process.value = true;
    $toast("clear");
    try {
      const data: any = await $fetch(VERIFY_CHANGE_DEVICE, {
        method: "POST",
        body: {
          email: userEmail.value,
          verification_code: verifyOtpValue.value,
        },
      });

      if (data.message) {
        $toast("success", {
          message: data.message,
          className: "toasted-bg-success",
        });

        showVerificationOtp.value = false;
        showRequestNewDeviceModal.value = false;
        process.value = false;
        verifyOtpValue.value = "";
        deviceIdCookie.value = deviceId.value;
        router.push(localePath("/auth/login"));
      }
    } catch (error: any) {
      $toast("error", {
        message: error?.response?._data?.message.password
          ? error?.response?._data?.message.password
          : error?.response?._data?.message.email
          ? error?.response?._data?.message.email
          : error?.response?._data?.message,
        className: "toasted-bg-alert",
      });
      process.value = false;
    }
  }
};

onMounted(() => {
  generateDeviceFingerprint();

  // Watch for the recaptcha script to be loaded
  watchEffect(() => {
    if ((window as any).grecaptcha && (window as any).grecaptcha.enterprise) {
      recaptchaRef.value = (window as any).grecaptcha.enterprise;
    }
  });
});
</script>

<template>
  <main class="custom-container">
    <section class="mt-20 mb-32 flex items-center justify-center">
      <div
        class="card-shadow max-w-[660px] w-full lg:w-[660px] px-2.5 xs:px-4 pt-8 pb-10 md:pt-20 md:pb-28 md:px-10 font-semibold text-lg"
      >
        <div class="bg-white py-6 flex flex-col">
          <div v-if="!showVerificationOtp && !process" class="flex flex-col">
            <div class="text-xl text-center">
              {{ $t("browser_verify_title") }}
              <br />
              {{ $t("browser_verify_text") }}
            </div>

            <div class="py-5 px-5 w-full flex flex-col justify-start">
              <label for="email">{{ $t("email") }}: </label>
              <Field
                v-model="userEmail"
                id="email"
                name="email"
                type="email"
                class="px-6 p-2 border border-black flex-grow outline-none rounded-[10px] text-lg opacity-50"
                :placeholder="$t('email_address')"
                :rules="validateEmail"
              />
            </div>

            <div class="py-5 px-5 w-full flex flex-col justify-start">
              <label for="password">{{ $t("password") }}: </label>
              <Field
                v-model="userPass"
                id="password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="px-6 p-2 border border-black flex-grow outline-none rounded-[10px] text-lg opacity-50"
                :placeholder="$t('password')"
                :rules="validatePassword"
              />
            </div>

            <button
              class="self-end rounded-100px w-40 bg-primary-red opacity-100 px-6 pb-2 pt-2.5 text-sm font-bold leading-normal text-white transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              :class="process ? 'bg-red-300' : 'bg-primary-red'"
              @click="handleSendMail"
              :disabled="process"
            >
              {{ $t("send_mail") }}
            </button>
          </div>

          <div v-else-if="showVerificationOtp && !process">
            <div class="text-xl text-center py-5">
              {{ $t("fill_otp") }}
            </div>

            <div class="pt-10">
              <input
                v-model="verifyOtpValue"
                class="verifyInput mx-auto text-center"
                :placeholder="$t('given_otp')"
              />

              <div class="flex flex-col space-y-5 pt-5">
                <div>
                  <button
                    class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    :class="process ? 'bg-blue-500' : 'bg-blue-700'"
                    @click="handleVerifyOtp"
                  >
                    {{ $t("verify_account") }}
                  </button>
                </div>

                <div
                  class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500"
                >
                  <p>{{ $t("otp_not_got") }}</p>
                  <button
                    @click="handleSendMail"
                    :disabled="process"
                    class="flex flex-row items-center text-blue-600"
                  >
                    {{ $t("resend_btn") }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else
            class="isLoadingIcon flex flex-col justify-center items-center w-full h-full flex-grow"
          >
            <IconsIsLoading />
            <p class="pt-28 text-xl font-bold">Please wait...</p>
          </div>
        </div>
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
