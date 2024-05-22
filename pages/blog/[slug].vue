<script setup>
import userIcon from "~/assets/img/icon/user.png";

// Composable
const config = useRuntimeConfig();
const { BLOGS } = useUrls();
const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();
// State
const { data: singleBlogRes } = await useFetch(`${BLOGS}/${route.params.slug}`);
const singleBlog = computed(() => singleBlogRes.value?.data);
const singleBlogData = computed(() => singleBlogRes.value);

useSeoMeta({
  title: () =>
    singleBlogData.value
      ? singleBlogData.value?.data?.title + " | " + t("site_name")
      : t("page_not_found"),
  ogTitle: () =>
    singleBlogData.value
      ? singleBlogData.value?.data?.title + " | " + t("site_name")
      : t("page_not_found"),
  description: () =>
    singleBlogData.value ? singleBlogData.value?.data?.short_description : "",
  ogDescription: () =>
    singleBlogData.value ? singleBlogData.value?.data?.short_description : "",
  ogImage: () =>
    singleBlogData.value ? singleBlogData.value?.data?.image : "",
  twitterCard: "summary_large_image",
});

const { data: relatedPostsRes } = await useFetch(
  `${BLOGS}/${route.params.slug}/related-blogs`
);
const relatedPosts = computed(() => relatedPostsRes.value?.data);

const postUrl = computed(() => {
  return `${config.public.siteUrl}/blog/${singleBlog.value.slug}`;
});
</script>

<template>
  <main>
    <section id="blog-details" class="bg-[#FFF9F6] relative min-h-screen">
      <div class="custom-container !pt-20 md:!pt-[110px] xl:!pt-[90px]">
        <NuxtLink
          :to="localePath(`/blog?category=${singleBlog?.blogCategory?.slug}`)"
          class="frame !font-semibold"
          >{{ singleBlog?.blogCategory?.title }}</NuxtLink
        >
        <h2 class="h_tag_primary mt-[26px]">
          5 tips to be prepared for Job trends
        </h2>
        <div class="flex items-center space-x-4 pt-5">
          <img
            :src="
              singleBlog?.created_by?.avatar
                ? singleBlog?.created_by?.avatar
                : userIcon
            "
            :alt="singleBlog?.title"
            class="w-10 md:w-[50px] lg:w-[57px] aspect-square rounded-full border"
          />
          <p class="text-base md:text-lg text-[#454545] font-bold">
            {{ singleBlog?.created_by?.name }}
          </p>
          <span class="text-base md:text-lg text-[#454545] font-bold md:px-4"
            >|</span
          >
          <p class="text-sm md:text-base text-[#4E4B66] font-medium">
            {{ $dateFormat(singleBlog?.created_at) }}
          </p>
        </div>
        <img
          class="w-full aspect-[1192/580] object-cover my-11 rounded-[30px]"
          :src="singleBlog?.image"
          :alt="singleBlog?.title"
        />
        <div
          class="pt-2.5 text-gray-secondary"
          v-html="singleBlog?.content"
        ></div>
        <div class="flex flex-col items-center pt-[88px]">
          <p class="text-[22px] font-semibold text-gray-primary">SHARE NOW</p>
          <div class="flex items-center pt-[30px] space-x-6">
            <NuxtLink
              :to="`https://www.facebook.com/share.php?u=${postUrl}`"
              target="_blank"
            >
              <IconsFacebook />
            </NuxtLink>
            <NuxtLink
              :to="`http://twitter.com/share?&url=${postUrl}`"
              target="_blank"
            >
              <IconsTwitter />
            </NuxtLink>
            <NuxtLink
              :to="`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`"
              target="_blank"
            >
              <IconsLinkedIn />
            </NuxtLink>
          </div>
        </div>
      </div>
      <img
        class="absolute top-0 left-0 md:w-auto w-[100px]"
        src="~/assets/img/about-us/upper-Intersect.svg"
        alt="upper-Intersect image"
      />
    </section>

    <section
      v-if="relatedPosts"
      id="relatedBlogs"
      class="custom-container flex flex-col items-center !pt-[68px] !pb-0"
    >
      <div class="w-full flex items-center justify-between">
        <h2 class="h_tag_primary">Read More</h2>
        <NuxtLink to="/blog" class="orange_button !py-2.5 sm:!py-4"
          >Browse All Posts</NuxtLink
        >
      </div>
      <div
        class="pt-10 lg:pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full"
      >
        <BlogLatestCard
          v-for="blog in relatedPosts"
          :key="blog.id"
          :blog="blog"
          cardClass="col-span-1 p-4 md:p-[18px]"
        />
      </div>
    </section>
  </main>
</template>
