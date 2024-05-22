<script setup>
const localePath = useLocalePath();
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <main class="pb-20 relative bg-[#fff9f6]">
    <img src="/images/bg-circle.svg" alt="bg-circle" />
    <div class="custom-container">
      <div class="frame !rounded-lg uppercase">
        {{ $t("withdraw.title") }}
      </div>
      <section class="text-base md:text-2xl space-y-4">
        <h1
        class="pt-4 h_tag_primary"
        >
          {{ $t("withdraw.title") }}
        </h1>
        <p class="pb-10 text-[#454545] text-lg">
          {{ $t("withdraw.lastUpdateText") }}
        </p>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("withdraw.mainContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("withdraw.subHeadingOne") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("withdraw.SubHeadingOneContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("withdraw.subHeadingTwo") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("withdraw.subHeadingTwoContent.partOne") }}
          </p>
          <br />
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("withdraw.subHeadingTwoContent.partTwo") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("withdraw.subHeadingTwoContent.partThree") }}
          </p>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("withdraw.subHeadingThree") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("withdraw.subHeadingThreeContent.partOne") }}
          </p>
          <br />
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("withdraw.subHeadingThreeContent.partTwo") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("withdraw.subHeadingThreeContent.partThree") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("withdraw.subHeadingThreeContent.partFour") }}
          </p>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("withdraw.subHeadingFour") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("withdraw.subHeadingFourContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("withdraw.subHeadingFive") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("withdraw.subHeadingFiveContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("withdraw.subHeadingSix") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("withdraw.subHeadingSixContent") }}
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
