<script setup>
// Dummy data
const tags = [
  {
    id: 1,
    name: "Gadgets",
    slug: "gadgets",
  },
  {
    id: 2,
    name: "eCommerce",
    slug: "ecommerce",
  },
  {
    id: 3,
    name: "Healthy",
    slug: "healthy",
  },
  {
    id: 4,
    name: "Podcasts",
    slug: "podcasts",
  },
  {
    id: 5,
    name: "Reviews",
    slug: "reviews",
  },
  {
    id: 6,
    name: "Education",
    slug: "education",
  },
  {
    id: 7,
    name: "Newse",
    slug: "newse",
  },
  {
    id: 8,
    name: "Learn",
    slug: "learn",
  },
  {
    id: 9,
    name: "Tips",
    slug: "tips",
  },
  {
    id: 10,
    name: "Tricks",
    slug: "tricks",
  },
];
</script>
<template>
  <div
    class="w-full px-[30px] pt-5 pb-8 xl:pb-12 bg-[#F8F8F8] rounded-md shadow-[2px_2px_6px_#65656527]"
  >
    <h3 class="text-xl xl:text-[28px] text-[#505050] font-bold">Tags</h3>
    <div
      class="pt-5 xl:pt-[30px] flex flex-wrap gap-4 xl:gap-5 text-lg text-[#656565]"
    >
      <span
        v-for="(tag, index) in tags"
        :key="tag.id"
        class="px-2.5 py-1 bg-[#F1F2F6] rounded-md hover:text-[#E4801D]"
      >
        {{ tag.name }}
      </span>
    </div>
  </div>
</template>

<style scoped></style>
