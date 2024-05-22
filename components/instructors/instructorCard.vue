<script setup>
import { useInstructorStore } from "~/stores/instructors";
defineProps({
  instructor: {
    type: Object,
    required: true,
  },
});
const localePath = useLocalePath();
const { setInstructorsInfo } = useInstructorStore();
</script>
<template>
  <ClientOnly>
    <!-- `/instructors/${instructor.name.toLowerCase().replace(/\s+/g, '-')}` -->
    <NuxtLink
      :to="localePath(`/instructors/${instructor.id}`)"
      @click.native="setInstructorsInfo(instructor)"
      class="min-w-[274px] w-[274px] h-[343px] overflow-visible instructor-box relative flex flex-col md:items-center md:justify-between rounded-[8px] overflow-hidden bg-white shadow-[0_10px_20px_0_rgba(183,188,201,0.25)]"
      :style="{ '--bg-Image': `url('${instructor.imageSrc}')`}"
    >
      <div
        class="py-2 w-[210px] h-[90px] opacity-0 z-10 transition-all duration-300 ease-in-out instructor-des absolute bottom-[-45px] left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-between rounded-lg bg-white shadow-[0_20px_40px_0_rgba(183,188,201,0.25)]"
      >
        <div>
          <h2 class="h_tag_third !text-[#1A2134] !font-semibold">
            {{ instructor.name }}
          </h2>
          <p class="mt-1 p_tag_third !font-medium">{{ instructor.role }}</p>
        </div>
        <!-- <div class="mt-[6px] flex items-center justify-center gap-x-4">
          <a
            :href="instructor.socialLinks.facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/homepage/instructors-section/fb.svg"
              alt="Facebook Link"
            />
          </a>
          <a
            :href="instructor.socialLinks.linkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/homepage/instructors-section/linkedin.svg"
              alt="Linkedin Link"
            />
          </a>
          <a
            :href="instructor.socialLinks.twitterX"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/homepage/instructors-section/twitter-x.svg"
              alt="Facebook Link"
            />
          </a>
        </div> -->
      </div>
    </NuxtLink>
  </ClientOnly>
</template>

<style scoped>
.instructor-box {
  background-image: var(--bg-Image);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.instructor-box:hover .instructor-des{
  opacity: 1;
}
</style>
