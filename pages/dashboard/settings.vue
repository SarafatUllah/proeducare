<script setup>
const currentTab = ref("Tab one");
const setCurrentTab = (tab) => {
  currentTab.value = tab;
};

</script>

<template>
  <div class="py-5 md:py-20">
    <div
      class="flex flex-row items-start text-base sm:!text-2xl font-semibold text-center pb-2 whitespace-nowrap w-full lg:!w-[80%] xl:!w-[60%]"
    >
      <p
        class="border-b-[3px] pb-4 w-1/3"
        :class="
          currentTab === 'Tab one' ? 'border-primary-red' : 'border-[#9C9C9C]'
        "
      >
        <span
          class="cursor-pointer px-2 py-2 hover:text-primary-red"
          @click="setCurrentTab('Tab one')"
          >Tab One</span
        >
      </p>
      <p
        class="border-b-[3px] pb-4 w-1/3"
        :class="
          currentTab === 'Tab two' ? 'border-primary-red' : 'border-[#9C9C9C]'
        "
      >
        <span
          class="cursor-pointer px-2 py-2 hover:text-primary-red"
          @click="setCurrentTab('Tab two')"
          >Tab Two</span
        >
      </p>
      <p
        class="border-b-[3px] pb-4 w-1/3"
        :class="
          currentTab === 'Tab three'
            ? 'border-primary-red'
            : 'border-[#9C9C9C]'
        "
      >
        <span
          class="cursor-pointer px-2 py-2 hover:text-primary-red"
          @click="setCurrentTab('Tab three')"
          >Tab Three</span
        >
      </p>
    </div>
    <Transition name="fade" mode="out-in">
      <div v-if="currentTab === 'Tab one'" class="pt-3 md:pt-5">
        <p>Content here</p>
      </div>
      <div v-else-if="currentTab === 'Tab two'" class="pt-3 md:pt-5">
        <p>Content here</p>
      </div>
      <div v-else-if="currentTab === 'Tab three'" class="pt-3 md:pt-5">
        <p>Content here</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.input-wrapper {
  @apply flex flex-col md:!flex-row items-start md:!items-center w-full space-y-3 md:!space-y-0;
}
</style>
