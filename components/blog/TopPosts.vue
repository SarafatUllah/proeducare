<script setup>
const $config = useRuntimeConfig();

const cdnURL = $config.public.cdnURL;

// Dummy data
const topPosts = [
  {
    id: 1,
    title:
      "Best laptops in Bangladesh evaluated based on budget, good at low price",
    slug: "best-laptops-in-bangladesh-evaluated-based-on-budget-good-at-low-price",
    tags: ["GADGETS", "REVIEWS"],
    date: "JULY 08, 2022",
    image: cdnURL + "/images/blog/1.png",
  },
  {
    id: 2,
    title:
      "Best phones in Bangladesh evaluated based on budget, good at low price",
    slug: "best-phones-in-bangladesh-evaluated-based-on-budget-good-at-low-price",
    tags: ["GADGETS", "REVIEWS"],
    date: "JULY 08, 2022",
    image: cdnURL + "/images/blog/2.png",
  },
  {
    id: 3,
    title:
      "Best Product in Bangladesh evaluated based on budget, good at low price",
    slug: "best-product-in-bangladesh-evaluated-based-on-budget-good-at-low-price",
    tags: ["GADGETS", "REVIEWS"],
    date: "JULY 08, 2022",
    image: cdnURL + "/images/blog/3.png",
  },
  {
    id: 4,
    title: "Pellentesque habitant morbi tristique senectus et netus",
    slug: "pellentesque-habitant-morbi-tristique-senectus-et-netus",
    tags: ["GADGETS", "REVIEWS"],
    date: "JULY 08, 2022",
    image: cdnURL + "/images/blog/4.png",
  },
  {
    id: 5,
    title: "Mauris neque nisi, faucibus non elementum in, convallis",
    slug: "mauris-neque-nisi-faucibus-non-elementum-in-convallis",
    tags: ["GADGETS", "REVIEWS"],
    date: "JULY 08, 2022",
    image: cdnURL + "/images/blog/5.png",
  },
];
</script>
<template>
  <div
    class="w-full px-[30px] pt-5 pb-8 xl:pb-12 bg-[#F8F8F8] rounded-md shadow-[2px_2px_6px_#65656527]"
  >
    <h3 class="text-xl xl:text-[28px] text-[#505050] font-bold">Top Posts</h3>
    <div class="pt-5 xl:pt-[30px] text-base xl:text-xl space-y-3 xl:space-y-5">
      <div
        v-for="post in topPosts"
        :key="post.id"
        class="flex flex-row items-start space-x-4 border-b border-[#656565] pb-3 last:border-0 last:pb-0"
      >
        <NuxtLink :to="`/blog/${post.slug}`" class="min-w-fit pt-1.5">
          <img class="w-full h-[60px] object-cover" :src="post.image" alt="" />
        </NuxtLink>
        <div class="flex flex-col space-y-1.5">
          <NuxtLink
            :to="`/blog/${post.slug}`"
            class="text-base font-medium text-[#505050] hover:text-[#EC1F27] line-clamp-2"
          >
            {{ post.title }}
          </NuxtLink>
          <div
            class="flex items-center leading-4 text-[10px] text-[#656565] gap-1.5"
          >
            <span class=""> {{ post.tags[0] }} </span>
            <span class="">|</span>
            <p class="flex items-center text-[#808080] gap-1">
              <IconsCalender class="text-[#EC1F27] w-3 h-3 pb-0.5" />
              <span>{{ post.date }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
