<script setup>
import { storeToRefs } from "pinia";
import InstructorCard from "~/components/instructors/instructorCard.vue";
import { useInstructorStore } from "~/stores/instructors";
import Pagination from "~/components/Pagination.vue";

const { instructors } = storeToRefs(useInstructorStore());

const fetchInstructors = (page) => {
  console.log(page, "Page");
};
</script>
<template>
  <section id="all-instructors" class="bg-[#FFF9F6] lg:pt-5">
    <div class="custom-container text-center lg:mx-auto w-full !pb-[60px]">
      <h2 class="h_tag_primary mt-[3px]">Meet Our Instructors</h2>
      <p class="pt-[18px] pb-[73px] p_tag_secondary lg:px-[130px]">
        Dive into real-world projects, simulations, and case studies that cement
        your learning.
      </p>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:grid-rows-2 place-items-center gap-8 mb-[60px]"
      >
        <InstructorCard
          v-for="(instructor, index) in instructors"
          :key="index"
          :instructor="instructor"
        />
      </div>
      <div class="w-full flex items-center justify-center">
        <Pagination :total-pages="20" @go-to-page="fetchInstructors" />
      </div>
    </div>
  </section>
</template>
