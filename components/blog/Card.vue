<script setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
});
const localePath = useLocalePath();
</script>
<template>
  <div class="bg-[#F8F8F8] rounded-md shadow-[2px_2px_6px_#65656527]">
    <NuxtLink :to="localePath(`/blog/${post.slug}`)">
      <img
        class="rounded-t-md w-full h-[220px] 2dx:h-[240px] object-cover"
        :src="post.image"
        :alt="post.title"
      />
    </NuxtLink>
    <div class="pb-6 p-4 flex flex-col gap-2.5">
      <div class="flex items-center gap-3 text-[#656565] text-base">
        <div class="pr-3 border-r border-[#808080]">
          <NuxtLink
            :to="localePath(`/blog?category=${post.blogCategorySlug}`)"
            class="hover:text-[#ec1f27]"
            >{{ post.blogCategoryTitle }}</NuxtLink
          >
        </div>
        <p class="flex items-start text-[#808080] space-x-2">
          <IconsCalender class="text-[#EC1F27] w-5 h-5" />
          <span class="">{{ $dateFormat(post.created_at) }}</span>
        </p>
      </div>
      <NuxtLink
        :to="localePath(`/blog/${post.slug}`)"
        class="text-2xl text-[#505050] font-medium hover:text-[#ec1f27] line-clamp-2"
      >
        {{ post.title }}
      </NuxtLink>
      <p class="text-lg text-[#808080] line-clamp-3">
        {{ post.short_description ? post.short_description : "" }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
