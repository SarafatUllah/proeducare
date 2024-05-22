<script setup>
const route = useRoute();
const router = useRouter();
const { $toast } = useNuxtApp();
const localePath = useLocalePath();
const { t } = useI18n();

const verifyCredential = ref([]);
const isProcessing = ref(true);

const verifyEmail = async () => {
  isProcessing.value = true;
  const res = await $fetch(`${verifyCredential.value}`);

  if (res.message) {
    $toast("clear");
    $toast("success", {
      message: t("messages.email_verified"),
      className: "toasted-bg-success",
    });
    router.push(localePath("/auth/login"));
    isProcessing.value = false;
  }
};

onMounted(() => {
  verifyCredential.value = route.query.queryURL;
  setTimeout(() => {
    verifyEmail();
  }, 500);
});
</script>

<template>
  <div class="h-[80vh] flex flex-col justify-center items-center space-y-3">
    <div
      v-if="isProcessing"
      class="isLoadingIcon flex flex-col justify-center items-center"
    >
      <IconsIsLoading />
      <p class="pt-28 text-xl font-bold">
        {{ $t("wait_for_verify") }}
      </p>
    </div>
  </div>
</template>
