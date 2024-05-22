<script setup>
import defaultCardImage from "~/assets/img/default/blog-card.webp";

defineProps({
  blog: {
    type: Object,
    required: true,
  },
  cardClass: {
    type: String,
    default: "col-span-2 md:col-span-1 p-4 md:p-[26px]",
  },
});

const localePath = useLocalePath();

const formatDateString = (dateString) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateString);
  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  return formattedDate;
};
</script>

<template>
  <div class="card_wrapper flex flex-col" :class="[cardClass]">
    <img
      class="w-full max-h-[339px] rounded-[20px] aspect-[524/340]"
      :src="blog?.image ? blog?.image : defaultCardImage"
      :alt="`${blog.title} image`"
    />
    <div class="flex space-x-3 items-center mt-[38px]">
      <NuxtLink
        :to="localePath(`/blog?category=${blog.blogCategorySlug}`)"
        class="bg-[#FF6E1F] bg-opacity-[0.09] rounded-lg py-[5px] px-[17px] text-[12px] text-[#FF6E1F] font-medium"
      >
        {{ blog.blogCategoryTitle }}
      </NuxtLink>
      <p class="text-base text-[#4E4B66] font-normal">
        {{ formatDateString(blog.created_at) }}
      </p>
    </div>
    <div class="mt-[27px]">
      <h3 class="h_tag_secondary line-clamp-2">{{ blog.title }}</h3>
      <p class="p_tag_third mt-[12px] line-clamp-2">
        {{ blog.short_description }}
      </p>
    </div>
    <NuxtLink
      :to="localePath(`/blog/${blog.slug}`)"
      class="flex items-center space-x-2 text-[#FF6E1F] text-base font-medium mt-9"
      ><span>Read More</span> <IconsLeftArrow class="w-3.5 h-3.5"
    /></NuxtLink>
  </div>
</template>

<style scoped>
.card_wrapper {
  border-radius: 20px;
  border: 1px solid #efefef;
  background: #fff;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.07);
}
</style>
