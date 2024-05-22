<script setup>
import { useDashboardStore } from "~/stores/dashboard";

const { $toast } = useNuxtApp();
const { ME, SOCIAL } = useUrls();
const router = useRouter();
const { joinToChannel } = useNotification();
const { setAllNotifications } = useDashboardStore();
const { setAuthCookies, tokenCookie } = useAuth();
const localePath = useLocalePath();
const { t } = useI18n();
const socialProvider = useRoute().params.slug;
const socialCode = useRoute().query.code;

useHead({
  title: t("connecting"),
});

const socialLogin = async () => {
  if (socialCode && socialProvider) {
    try {
      const token = await $fetch(SOCIAL, {
        method: "POST",
        body: {
          code: socialCode,
          provider: socialProvider,
        },
      });
      if (token) {
        await setAuthCookies(token);
        try {
          const user = await $fetch(ME, {
            headers: {
              Authorization: `Bearer ${tokenCookie.value}`,
            },
          });
          if (user && user.id) {
            setTimeout(() => {
              joinToChannel(user.id);
              setAllNotifications();
            }, 1000);

            $toast("success", {
              message: t("messages.login_success"),
              className: "toasted-bg-success",
            });
            router.push(localePath("/"));
          }
        } catch (error) {
          await setAuthCookies("");
          $toast("error", {
            message: error?.response?._data?.message,
            className: "toasted-bg-error",
          });
          router.replace(localePath("/auth/login"));
        }
      } else {
        router.replace(localePath("/auth/login"));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

onMounted(() => {
  socialLogin();
});
</script>

<template>
  <div class="flex my-20 min-h-[50vh]">
    <div class="w-full md:w-1/2 mx-auto">
      <div
        class="flex flex-col gap-4 items-center justify-center font-semibold text-gray-600"
      >
        <p class="text-4xl">{{ $t("social_login") }}</p>
        <p class="text-2xl">{{ $t("connecting") }}</p>
      </div>
    </div>
  </div>
</template>
