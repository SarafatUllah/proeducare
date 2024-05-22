<script setup>
defineProps({
  profile: {
    type: Object,
    required: false,
  },
});
const localePath = useLocalePath();
</script>

<template>
  <div v-if="profile" class="mt-14 overflow-hidden">
    <div class="flex md:flex-row flex-col md:space-x-[22px] md:space-y-0 space-y-2 items-center">
      <div class="w-[150px] h-[150px] rounded-full overflow-hidden">
        <img
          v-if="profile.image"
          class="w-full h-full object-cover object-top"
          :src="profile.image"
          :alt="profile.name"
        />
        <div v-else>
          <img
            class="w-full h-full object-cover object-top"
            src="/images/dashboard/default_avater.svg"
            alt="default avater"
          />
        </div>
      </div>
      <div class="flex flex-col space-x-1.5">
        <h3 class="text-xl text-[#383E42] font-bold">{{ profile.name }}</h3>
        <p v-if="profile.occupations" class="text-[#515B6F]">
          {{ profile.occupations }}
        </p>
      </div>
    </div>
    <div
      class="flex flex-col w-full text-lg mt-20 space-y-6 md:!space-y-[30px]"
    >
      <div class="flex flex-col space-y-8">
        <div class="flex md:flex-row flex-col md:space-x-4 md:space-y-0 items-center space-y-2 w-full text-xl">
          <h4 class="text-[#515B6F] md:w-[272px]">Full Name</h4>
          <p class="text-[#313131] font-medium">{{ profile.name }}</p>
        </div>
        <div class="flex md:flex-row flex-col md:space-x-4 md:space-y-0 items-center space-y-2 w-full text-xl">
          <h4 class="text-[#515B6F] md:w-[272px]">{{ $t("occupation") }}</h4>
          <p class="text-[#313131] font-medium">{{ profile.occupations }}</p>
        </div>
        <div class="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 items-center w-full text-xl">
          <h4 class="text-[#515B6F] md:w-[272px]">{{ $t("username") }}</h4>
          <p class="text-[#313131] font-medium">{{ profile.username }}</p>
        </div>
        <div class="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 items-center w-full text-xl">
          <h4 class="text-[#515B6F] md:w-[272px]">{{ $t("email") }}</h4>
          <p class="text-[#313131] font-medium">{{ profile.email }}</p>
        </div>
        <div class="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 items-center w-full text-xl">
          <h4 class="text-[#515B6F] md:w-[272px]">{{ $t("phone") }}</h4>
          <p class="text-[#313131] font-medium">{{ profile.phone }}</p>
        </div>
        <div class="flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-2 items-center w-full text-xl">
          <h4 class="text-[#515B6F] md:w-[272px]">{{ $t("biography") }}</h4>
          <p class="text-[#313131] font-medium">{{ profile.bio }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cover {
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #363b64;
}
.icon-wrapper {
  @apply h-10 w-10 min-w-[40px] bg-[#FE9874] rounded-[10px] flex justify-center items-center;
}
.field-wrapper {
  @apply flex items-start font-semibold space-x-3;
}
</style>
