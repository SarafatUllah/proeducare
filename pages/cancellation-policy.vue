<script setup>
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <main class="custom-container pt-16 pb-20">
    <h1
      class="text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl text-primary-red font-bold"
    >
      {{ $t("cancellation.title") }}
    </h1>
    <p class="pb-10 pt-2">{{ $t("cancellation.effective_date") }} 27-12-2000</p>
    <section class="text-base md:text-2xl space-y-8">
      <p>
        <span class="font-semibold notranslate"> Fiverr Outsourcing Institute </span>
        {{ $t("cancellation.intro") }}
      </p>
      <div class="space-y-8">
        <div class="space-y-4">
          <p class="text-primary-red font-semibold">
            {{ $t("cancellation.section_title_1") }}
          </p>
          <p>
            <span class="font-semibold notranslate"> Fiverr Outsourcing Institute </span>,
            {{ $t("cancellation.section_text_1") }}
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-primary-red font-semibold">
            {{ $t("cancellation.section_title_2") }}
          </p>
          <p>{{ $t("cancellation.section_text_2_1") }}</p>
          <div class="space-y-4 pl-4">
            <p>
              {{ $t("cancellation.section_text_2_2") }}
              <NuxtLink
                :to="`mailto:example@gmail.com`"
                class="text-primary-red font-semibold notranslate"
              >
                example@gmail.com
              </NuxtLink>
              {{ $t("cancellation.section_text_2_3") }}
            </p>
            <p>
              {{ $t("cancellation.section_text_2_4") }}
            </p>
          </div>
        </div>
        <div class="space-y-4">
          <p class="text-primary-red font-semibold">
            {{ $t("cancellation.section_title_3") }}
          </p>
          <p>
            {{ $t("cancellation.section_text_3_1") }}
          </p>
          <div class="space-y-4 pl-4">
            <p>
              {{ $t("cancellation.section_text_3_2") }}
            </p>
            <p>
              {{ $t("cancellation.section_text_3_3") }}
            </p>
          </div>
          <p>{{ $t("cancellation.section_text_3_4") }}</p>
        </div>
        <div class="space-y-4">
          <p class="text-primary-red font-semibold">
            {{ $t("cancellation.section_title_4") }}
          </p>
          <div class="space-y-4">
            {{ $t("cancellation.section_text_4") }}
          </div>
        </div>
        <div class="space-y-4">
          <p class="text-primary-red font-semibold">
            {{ $t("cancellation.section_title_5") }}
          </p>
          <p>
            <span class="font-semibold notranslate"> Fiverr Outsourcing Institute </span>
            {{ $t("cancellation.section_text_5") }}
          </p>
        </div>
        <div class="space-y-4">
          <p class="text-primary-red font-semibold">
            {{ $t("cancellation.section_title_6") }}
          </p>
          <p>
            {{ $t("cancellation.section_text_6_1") }}
            <NuxtLink
              :to="`mailto:example@gmail.com`"
              class="text-primary-red font-semibold notranslate"
            >
              example@gmail.com
            </NuxtLink>
            {{ $t("cancellation.section_text_6_2") }}
          </p>
        </div>
        <div class="space-y-4">
          <p>
            <span class="font-semibold notranslate"> Fiverr Outsourcing Institute </span>
            {{ $t("cancellation.section_text_6_3") }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
