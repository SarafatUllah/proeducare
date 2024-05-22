<script setup>
const { fetchOauthUrl } = useAuth();
const login = async (provider) => {
  const loginUrl = await fetchOauthUrl(provider);
  if (loginUrl) {
    window.location.href = loginUrl?.url;
  }
};
</script>

<template>
  <div class="w-full flex items-center justify-between gap-4">
    <button @click.stop="login('facebook')" class="social-btn">
      <SvgFacebook class="w-6 h-6" />
    </button>
    <button @click.stop="login('google')" class="social-btn">
      <SvgGoogle class="w-6 h-6" />
    </button>
    <button @click.stop="login('apple')" class="social-btn">
      <SvgApple class="w-6 h-6" />
    </button>
  </div>
</template>
<style scoped>
.social-btn {
  @apply h-[50px] md:h-[56px] w-1/3 border border-orange-primary rounded flex items-center justify-center;
}
</style>

