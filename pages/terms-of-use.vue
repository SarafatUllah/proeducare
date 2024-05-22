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
        {{ $t("terms.title") }}
      </div>

      <section class="text-base md:text-2xl space-y-4">
        <h1
        class="pt-4 h_tag_primary"
        >
          {{ $t("terms.title") }}
        </h1>
        <p class="pb-10 text-[#454545] text-lg">
          {{ $t("terms.lastUpdateText") }}
        </p>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("terms.mainContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("terms.subHeadingOne") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("terms.SubHeadingOneContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("terms.subHeadingTwo") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("terms.subHeadingTwoContent.partOne") }}
          </p>
          <br />
          <div class="flex flex-col gap-y-3.5">
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("terms.subHeadingTwoContent.partTwo") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("terms.subHeadingTwoContent.partThree") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("terms.subHeadingTwoContent.partFour") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("terms.subHeadingTwoContent.partFive") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("terms.subHeadingTwoContent.partSix") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("terms.subHeadingTwoContent.partSeven") }}
            </p>
          </div>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("terms.subHeadingThree") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("terms.subHeadingThreeContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("terms.subHeadingFour") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("terms.subHeadingFourContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("terms.subHeadingFive") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("terms.subHeadingFiveContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("terms.subHeadingSix") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("terms.subHeadingSixContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("terms.subHeadingSeven") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("terms.subHeadingSevenContent") }}
        </p>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
