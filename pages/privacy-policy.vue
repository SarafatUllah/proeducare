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
        {{ $t("privacy.title") }}
      </div>
       
      <section class="text-base md:text-2xl space-y-4">
        <h1
          class="pt-4 h_tag_primary"
        >
          {{ $t("privacy.title") }}
        </h1>
        <p class="pb-10 text-[#454545] text-lg">{{ $t("privacy.lastUpdateText") }}</p>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("privacy.mainContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingOne") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("privacy.SubHeadingOneContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingTwo") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingTwoContent.partOne") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingTwoContent.partTwo") }}
          </p>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingThree") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("privacy.subHeadingThreeContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingFour") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFourContent.partOne") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFourContent.partTwo") }}
          </p>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingFive") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partOne") }}
          </p>
          <div>
            <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partTwo") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partThree") }}
          </p>
          <br />
          <div class="flex flex-col gap-y-3.5">
            <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partFour") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partFive") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partSix") }}
          </p>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partSeven") }}
          </p>
          </div>
          </div>
          
          <br/>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingFiveContent.partEight") }}
          </p>
        </div>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingSix") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("privacy.subHeadingSixContent") }}
        </p>
      </section>

      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingSeven") }}
        </h2>
        <p class="text-justify p_tag_secondary !text-base">
          {{ $t("privacy.subHeadingSevenContent") }}
        </p>
      </section>


      <section class="mt-10 text-base md:text-2xl space-y-4">
        <h2
          class="uppercase pt-4 h_tag_secondary"
        >
          {{ $t("privacy.subHeadingEight") }}
        </h2>
        <div>
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingEightContent.partOne") }}
          </p>
          
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingEightContent.partTwo") }}
          </p>
          
          <p class="text-justify p_tag_secondary !text-base">
            {{ $t("privacy.subHeadingEightContent.partThree") }}
          </p>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped></style>
