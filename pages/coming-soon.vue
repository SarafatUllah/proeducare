<script setup>
definePageMeta({
  layout: "comingsoon",
});
</script>
<template>
  <div
    class="container_section h-screen w-full flex flex-col xl:px-10 md:px-5 px-4 relative py-10"
  >
    <div class="nc-background bg-white"></div>
    <header class="absolute top-6 xl:left-10 md:left-5 left-4 fadeIn">
      <img
        width="200"
        height="200"
        class="transform -translate-y-[30px]"
        src="~/assets/img/logo/proedu_care.png"
        alt="proedu_care logo"
      />
    </header>
    <div
      class="flex-grow flex flex-col items-center justify-center mt-14 fadeInUp"
    >
      <h1 class="font-extrabold text-xl text-[#0f73ee] mb-5">COMING SOON</h1>
      <h2
        class="font-light lg:text-[80px] md:text-[60px] text-[36px] lg:leading-[96px] md:leading-[86px] leading-[70px] text-[#2d3345] text-center"
      >
        ProEdu Care
      </h2>
    </div>
    <footer class="flex justify-end h-20 pr-[100px] fadeIn">
      <ClientOnly>
        <a
          href="https://www.facebook.com/profile.php?id=61556164828334"
          target="_blank"
        >
          <fa
            class="w-5 h-5 cursor-pointer text-[#2d3345]"
            :icon="['fab', 'facebook-f']"
          />
        </a>
      </ClientOnly>
    </footer>
  </div>
</template>

<style scoped>
.container_section {
  background-image: url(~/assets/img/default/bg-1.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  font-family: "Roboto", sans-serif;
}
.nc-background {
  z-index: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  --tw-bg-opacity: 0.5;
}
.fadeInUp {
  animation-name: fadeInUp;
  animation-duration: 1s;
  animation-delay: 0.1s;
  transform: translateY(20px);
  animation-fill-mode: forwards;
}
@keyframes fadeInUp {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
.fadeIn {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-delay: 0.1s;
  transform: translateY(20px);
  animation-fill-mode: forwards;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
