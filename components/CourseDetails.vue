<script setup>
defineProps({
  courses: {
    type: Array,
    required: true,
  },
});

const localePath = useLocalePath();
</script>
<template>
  <section class="pt-5 flex items-center justify-center">
    <div
      v-if="courses && courses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 xl:gap-x-20 gap-y-6 xl:gap-y-16"
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
    <NoPageFound v-else minHeight="220" />
  </section>
</template>
