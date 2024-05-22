<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate";
import { useDashboardStore } from "~/stores/dashboard";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useCartDataStore } from "~/stores/cartData";

definePageMeta({
  layout: "auth",
});

const { LOGIN } = useUrls();
const { validateEmail, validatePassword } = useValidation();
const { setAllNotifications } = useDashboardStore();
const { setAuthCookies, tokenCookie } = useAuth();
const { $toast } = useNuxtApp();
const config = useRuntimeConfig();
const router = useRouter();
const redirectUrl = useCookie("redirectUrl");
const deviceIdCookie = useCookie("deviceId");
const localePath = useLocalePath();
const { joinToChannel } = useNotification();
const { t } = useI18n();
const { setAllCartData } = useCartDataStore();
const { apiBaseUrl } = useUrls();

const rememberMeCookie: any = useCookie("rememberMe", {
  watch: true,
});
const userEmail = ref(
  rememberMeCookie.value ? rememberMeCookie.value.email : ""
);
const userPass = ref(
  rememberMeCookie.value ? rememberMeCookie.value.password : ""
);
const showPassword = ref(false);
const deviceId = ref("");

const generateDeviceFingerprint = async () => {
  const fpPromise = FingerprintJS.load();
  const fp = await fpPromise;
  const result = await fp.get();
  deviceId.value = result.visitorId;
};

const recaptchaRef = ref<any>(null);
const loading = ref(false);
if (process.client) {
  $toast("clear");
}
const handleLogin = async () => {
  loading.value = true;
  $toast("clear");
  if (recaptchaRef.value) {
    const captchaToken = await recaptchaRef.value.execute(
      config.public.recaptchaKey,
      {
        action: "LOGIN",
      }
    );

    if (captchaToken) {
      try {
        const { token, user, message }: any = await $fetch(LOGIN, {
          method: "POST",
          body: {
            email: userEmail.value,
            password: userPass.value,
            captcha_token: captchaToken,
            device_id: deviceIdCookie.value
              ? deviceIdCookie.value
              : deviceId.value,
          },
        });

        if (token) {
          await setAuthCookies(token);
          if (tokenCookie.value) {
            if (user && user.id) {
              const cartDataCookie: any = useCookie("cartData");

              // if (selectedSubscription.value !== "") {
              if (tokenCookie.value && cartDataCookie.value) {
                try {
                  const checkItemExist = ref(false);
                  const addCartFromCookie: any = [];

                  cartDataCookie.value.forEach((singleCart: any) => {
                    // if (singleCart.id === slugInformation.value.id) {
                    const singleItem = {
                      item_id: singleCart.id,
                      subscription_id: singleCart.subscription_id,
                    };
                    addCartFromCookie.push(singleItem);
                    // }
                  });
                  const { data }: any = await useFetch(
                    `${apiBaseUrl}/carts/add-all`,
                    {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${tokenCookie.value}`,
                      },
                      body: {
                        items: addCartFromCookie,
                      },
                    }
                  );
                  cartDataCookie.value = null;
                  console.log(data.value);
                  
                  setAllCartData(data.value.cart);
                } catch (err) {
                  console.log(err);
                }
              }
              setTimeout(() => {
                joinToChannel(user.id);
                setAllNotifications();
              }, 1000);
            }
            $toast("success", {
              message: t("messages.login_success"),
              className: "toasted-bg-success",
            });

            setTimeout(() => {
              if (
                redirectUrl.value &&
                redirectUrl.value !== null &&
                redirectUrl.value !== undefined
              ) {
                router.push(localePath(`${redirectUrl.value}`));
              } else {
                router.push(localePath("/"));
              }
            }, 1000);
          } else {
            $toast("error", {
              message: message,
              className: "toasted-bg-alert",
            });
          }
        } else {
          $toast("error", {
            message: message,
            className: "toasted-bg-alert",
          });
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
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 404
        ) {
          userEmail.value = "";
          userPass.value = "";
          setTimeout(() => {
            router.push(localePath("/auth/security"));
          }, 200);
        }
      } finally {
        loading.value = false;
      }
    }
  }
};
const setRememberMeCookie = (email: string, password: string) => {
  rememberMeCookie.value = { email, password };
};

const reloadCaptcha = () => {
  if ((window as any).grecaptcha && (window as any).grecaptcha.enterprise) {
    recaptchaRef.value = (window as any).grecaptcha.enterprise;
  }
};
onMounted(() => {
  if (tokenCookie.value) {
    router.push(localePath("/"));
  }
  generateDeviceFingerprint();

  // Watch for the script to be loaded
  watchEffect(() => {
    reloadCaptcha();
  });
  window.scrollTo(0, 0);
});
const authSlider = [
  {
    id: 1,
    title: "login",
    sub_title: "login",
    url: null,
    media_link: `${config.public.cdnURL}/images/auth/login.webp`,
    media_link_type: null,
    type: "image",
    cover_image: null,
  },
  {
    id: 2,
    title: "register",
    sub_title: "register",
    url: null,
    media_link: `${config.public.cdnURL}/images/auth/register.webp`,
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
    <div class="flex items-center flex-row justify-center md:justify-start">
      <NuxtLink :to="localePath('/')"
        ><IconsLogo class="w-[110px] sm:w-[180px] md:w-[194px]"
      /></NuxtLink>
    </div>
    <section
      class="flex flex-col md:flex-row justify-between items-start w-full md:space-x-10 lg:space-x-20 xl:md:space-x-24"
    >
      <div class="w-full md:w-1/2 pt-16">
        <div class="">
          <div class="pb-9">
            <h2 class="h_tag_primary pb-2 md:pb-4">
              {{ $t("login") }}
            </h2>
            <p class="p_tag_secondary">
              {{ $t("login_title") }}
            </p>
          </div>
          <Form
            @submit="handleLogin"
            @keypress.enter="handleLogin"
            v-slot="{ meta }"
          >
            <div class="text-gray-1100 flex flex-col space-y-6">
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
              <ErrorMessage class="error-message" name="email" />
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
              <ErrorMessage class="error-message" name="password" />
            </div>
            <div
              class="flex justify-between items-center pt-6 pb-10 text-sm font-medium"
            >
              <div
                class="flex justify-start items-center space-x-2 p_tag_fourth"
              >
                <input
                  type="checkbox"
                  class="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  @change="setRememberMeCookie(userEmail, userPass)"
                />
                <label for="rememberMe">{{ $t("remember_me") }}</label>
              </div>
              <NuxtLink
                :to="localePath('/auth/forgot-password')"
                class="text-[#FF8682] font-medium"
                >{{ $t("forgot_password") }}</NuxtLink
              >
            </div>
            <button
              type="submit"
              :disabled="!meta.valid || loading"
              class="auth-btn"
            >
              <span>{{ $t("login") }}</span>
            </button>
          </Form>
          <p class="text-center pt-4 p_tag_fourth">
            {{ $t("no_account") }}
            <NuxtLink
              :to="localePath('/auth/register')"
              class="text-[#FF8682]"
              >{{ $t("sign_up") }}</NuxtLink
            >
          </p>
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
      <div class="w-full md:w-1/2 -mt-6 hidden md:block">
        <BaseAuthCarousel :slider="authSlider" />
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
