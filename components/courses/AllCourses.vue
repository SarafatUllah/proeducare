<script setup>
defineProps({
  coursesData: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div
    v-if="coursesData && coursesData.length > 0"
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
  >
    <div v-for="(course, index) in coursesData" :key="index">
      <CourseCard :cardData="course" />
    </div>
  </div>
</template>
