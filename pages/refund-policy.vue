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
        {{ $t("refundPolicy.title") }}
      </div>

      <section class="text-base md:text-2xl space-y-4">
        <h1 class="pt-4 h_tag_primary">
          {{ $t("refundPolicy.title") }}
        </h1>
        <p class="pb-10 text-[#454545] text-lg">
          {{ $t("refundPolicy.lastUpdateText") }}
        </p>
        <p class="text-justify p_tag_secondary !text-base">
          <span class="font-bold">Learning Management System (LMS)</span>
          {{ $t("refundPolicy.mainContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2 class="uppercase pt-4 h_tag_secondary">
          {{ $t("refundPolicy.subHeadingOne") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          <span class="font-bold">Learning Management System (LMS) -</span>
          {{ $t("refundPolicy.subHeadingOneContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2 class="uppercase pt-4 h_tag_secondary">
          {{ $t("refundPolicy.subHeadingTwo") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("refundPolicy.date") }}
          <span class="font-bold">Learning Management System (LMS)</span>
          {{ $t("refundPolicy.subHeadingTwoContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2 class="uppercase pt-4 h_tag_secondary">
          {{ $t("refundPolicy.subHeadingThree") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("refundPolicy.subHeadingThreeContent.date") }}
            <span class="font-bold">Learning Management System (LMS)</span>
            {{ $t("refundPolicy.subHeadingThreeContent.partOne") }}
          </p>
          <div class="pl-4">
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("refundPolicy.subHeadingThreeContent.partTwo") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("refundPolicy.subHeadingThreeContent.partThree") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("refundPolicy.subHeadingThreeContent.partFour") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("refundPolicy.subHeadingThreeContent.partFive") }}
            </p>
          </div>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2 class="uppercase pt-4 h_tag_secondary">
          {{ $t("refundPolicy.subHeadingFour") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("refundPolicy.subHeadingFourContent.partOne") }}
          </p>
          <div class="pl-4">
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("refundPolicy.subHeadingFourContent.partTwo") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("refundPolicy.subHeadingFourContent.partThree") }}
            </p>
            <p class="text-justify p_tag_secondary !text-base">
              {{ $t("refundPolicy.subHeadingFourContent.partFour") }}
            </p>
          </div>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2 class="uppercase pt-4 h_tag_secondary">
          {{ $t("refundPolicy.subHeadingFive") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("refundPolicy.subHeadingFiveContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2 class="uppercase pt-4 h_tag_secondary">
          {{ $t("refundPolicy.subHeadingSix") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            <span class="font-bold">Learning Management System (LMS),</span>
            {{ $t("refundPolicy.subHeadingSixContent.partOne") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("refundPolicy.subHeadingFourContent.partTwo") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            <span class="font-bold">Learning Management System (LMS)</span>
            {{ $t("refundPolicy.thankYouText") }}
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
