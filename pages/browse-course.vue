<script setup lang="ts">
const { PAGE_OVERVIEW_SECTION } = useUrls();
const localePath = useLocalePath();

const { data: pageOverViewRes } = useFetch<any>(
  `${PAGE_OVERVIEW_SECTION}/browse-course`
);
const pageOverView = computed(() => pageOverViewRes.value?.data);

const { apiBaseUrl } = useUrls();
const { data } = useFetch<any>(`${apiBaseUrl}/courses`);

const courses = computed(() => data.value?.data);

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<template>
  <main class="custom-container">
    <section class="pt-10 pb-20">
      <div
        v-if="pageOverView"
        class="flex flex-col-reverse md:flex-row items-center gap-10 xl:gap-20"
      >
        <div class="w-full md:w-1/2 h-full">
          <p
            v-if="pageOverView.sub_title"
            class="text-sm md:text-base lg:text-lg pb-4"
          >
            {{ pageOverView.sub_title }}
          </p>
          <h1
            v-if="pageOverView.title"
            class="text-primary-red font-bold text-[32px] md:text-[40px] xl:text-[60px] pb-4 mt-0 break-words"
          >
            {{ pageOverView.title }}
          </h1>
          <div
            class="text-base md:text-2xl text-justify"
            v-html="pageOverView.content"
          ></div>
        </div>

        <div v-if="pageOverView.media_link" class="w-full md:w-1/2 h-full">
          <iframe
            v-if="pageOverView.type === 'video'"
            class="w-full aspect-video"
            :src="pageOverView.media_link"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <img
            v-else
            :src="pageOverView.media_link"
            class="object-cover w-full aspect-video"
            :alt="pageOverView.title"
          />
        </div>
      </div>
      <NoPageFound v-else minHeight="420" />
    </section>

    <section class="pt-5 pb-20 hidden">
      <div class="flex items-center justify-center">
        <NuxtLink :to="localePath('/demo-class')">
          <div class="relative w-[370px] md:w-[490] xl:w-[590px] h-auto">
            <IconsDemoFolder class="w-full h-full" />
            <h1
              class="absolute inset-x-0 inset-y-[15%] flex items-center justify-center -top-[50px] text-white w-full text-xl md:text-2xl xl:text-6xl"
            >
              {{ $t("demo_class") }}
            </h1>
          </div>
        </NuxtLink>
      </div>
    </section>

    <section class="pt-5 pb-20 flex items-center justify-center">
      <div
        v-if="courses && courses.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6"
      >
        <div
          v-if="courses"
          class="w-full max-w-[410px]"
          v-for="course in courses"
          :key="course.id"
        >
          <img
            v-if="course.banner_url && course.banner_url !== 'null'"
            class="w-full h-[286px]"
            :src="course.banner_url"
            alt="course.title"
          />
          <img
            v-else
            class="w-full h-[286px]"
            src="/images/course-details/courseIcon.png"
            alt="course.title"
          />
          <div class="w-full text-center space-y-3">
            <h1 class="text-2xl font-semibold text-center my-4">
              {{ course.title }}
            </h1>
            <NuxtLink
              class="px-4 py-1.5 border border-black text-[#EC1F27] rounded-full"
              :to="localePath(`/courses/${course.slug}`)"
            >
              {{ $t("view_course") }}
            </NuxtLink>
          </div>
        </div>
        <NoPageFound v-else minHeight="220" />
      </div>
    </section>

    <section class="pt-5 pb-20 flex items-center justify-center">
      <div class="flex flex-col items-center space-y-3 w-[700px]">
        <h1
          class="text-[32px] md:text-[40px] xl:text-6xl font-bold text-center text-[#EC1F27]"
        >
          {{ $t("comments") }}
        </h1>
        <p class="text-sm md:text-xl xl:text-2xl font-normal text-center">
          {{ $t("comment_text") }}
        </p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0px -4px 4px 0px #00000040;
}

.provider-card-top-shadow {
  box-shadow: 0px -4px 4px 0px #00000040, 0px 4px 4px 0px #00000040;
}
</style>
