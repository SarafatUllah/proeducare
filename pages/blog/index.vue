<script setup>
import { useBlogsStore } from "~/stores/blogs";
import { storeToRefs } from "pinia";

useHead({
  title: "Blog, LMS",
});

const { BLOGS, BLOG_CATEGORIES } = useUrls();
const route = useRoute();
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();
const { latestBlogs } = storeToRefs(useBlogsStore());

const blogs = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalBlogs = ref(1);
const perPageBlogs = ref(6);
const isLoading = ref(false);
const searchText = ref("");
const allBlogsRef = ref(null);
const query = computed(() => route.query);

const setSearchParams = () => {
  const searchInput = searchText.value.trim();
  if (searchInput.length > 0) {
    navigateTo(localePath(`/blog?search=${searchInput}`));
    window.scrollTo(0, allBlogsRef.value.offsetTop - 100);
  } else {
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: "Search Input can't be Empty",
      className: "toasted-bg-alert",
    });
    navigateTo(localePath(`/blog`));
  }
};
const fetchBlogs = async (query) => {
  try {
    isLoading.value = true;
    let res = {};
    if (query) {
      if (query?.page) {
        if (query?.category) {
          res = await $fetch(
            `${BLOGS}?per_page=${perPageBlogs.value}&slug=${query.category}&page=${query.page}`
          );
        } else if (query?.search) {
          searchText.value = query.search;
          res = await $fetch(
            `${BLOGS}?per_page=${perPageBlogs.value}&query=${query.search}&page=${query.page}`
          );
        } else {
          res = await $fetch(
            `${BLOGS}?per_page=${perPageBlogs.value}&page=${query.page}`
          );
        }
      } else if (query?.category) {
        res = await $fetch(
          `${BLOGS}?per_page=${perPageBlogs.value}&slug=${query.category}`
        );
      } else if (query?.search) {
        searchText.value = query.search;
        res = await $fetch(
          `${BLOGS}?per_page=${perPageBlogs.value}&query=${query.search}`
        );
      } else {
        blogs.value = {};
        currentPage.value = 0;
        totalPages.value = 0;
        perPageBlogs.value = 0;
        totalBlogs.value = 0;
        return;
      }
    } else {
      res = await $fetch(`${BLOGS}?per_page=${perPageBlogs.value}`);
      searchText.value = "";
    }
    blogs.value = res.data;
    currentPage.value = res.meta.current_page;
    totalPages.value = res.meta.last_page;
    perPageBlogs.value = res.meta.per_page;
    totalBlogs.value = res.meta.total;
    isLoading.value = false;
  } catch (error) {
    console.log(error);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};
const setPageRoute = (page) => {
  if (query.value?.category) {
    navigateTo(
      localePath(`/blog?category=${query.value.category}&page=${page}`)
    );
  } else if (query.value?.search) {
    navigateTo(localePath(`/blog?search=${query.value.search}&page=${page}`));
  } else {
    navigateTo(localePath(`/blog?page=${page}`));
  }
  window.scrollTo(0, allBlogsRef.value.offsetTop - 100);
};
const goToPrevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    setPageRoute(currentPage.value);
  }
};
const goToNextPage = async () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    setPageRoute(currentPage.value);
  }
};
const isPrevBtnDisabled = computed(() => {
  return currentPage.value <= 1;
});
const isNextBtnDisabled = computed(() => {
  return currentPage.value >= totalPages.value;
});
const { data: categoriesRes } = await useFetch(
  `${BLOG_CATEGORIES}?per_page=-1`
);
const categories = computed(() => categoriesRes.value?.data);
// Watchers
watch(
  () => route.query,
  async (query) => {
    if (Object.keys(query).length === 0) {
      await fetchBlogs(null);
    } else {
      await fetchBlogs(query);
    }
  }
);
onMounted(() => {
  window.scrollTo(0, 0);
});
// Created
await fetchBlogs(Object.keys(route.query).length === 0 ? null : route.query);

const blogsOverview = {
  frame: "BLOGS",
  title: "Browse Our Best Blogs And Articles",
  description:
    "Education is the process of acquiring knowledge, developing the power of judgement, and prepare to live a standard life.",
};
</script>

<template>
  <main>
    <section id="blog-hero" class="bg-[#FFF9F6] relative">
      <div class="custom-container xl:!pt-[97px] !pt-[107px]">
        <div class="w-full flex flex-col items-center space-y-[30px]">
          <div class="text-center mx-auto max-w-[640px]">
            <div class="max-w-[420px] mx-auto">
              <p class="frame font-semibold">{{ blogsOverview.frame }}</p>
              <h2 class="h_tag_primary mt-[10px]">{{ blogsOverview.title }}</h2>
            </div>
            <p class="p_tag_secondary mt-[18px]">
              {{ blogsOverview.description }}
            </p>
          </div>
          <div
            class="flex justify-center items-center w-full max-w-[820px] bg-white space-x-4 p-2 md:p-2.5 rounded-lg search-input"
          >
            <IconsSearch
              class="text-gray-primary w-6 min-w-6 aspect-square ml-3 md:ml-5"
            />
            <input
              v-model="searchText"
              type="text"
              name="search"
              id="search"
              placeholder="Search for articles..."
              class="w-full px-2 py-1 outline-none"
              @keypress.enter="setSearchParams"
              @input="
                searchText.length === 0 ? navigateTo(localePath(`/blog`)) : ''
              "
            />
            <button @click="setSearchParams" class="search-btn">Search</button>
          </div>
        </div>
        <div
          v-if="latestBlogs && latestBlogs.length > 0"
          class="grid grid-cols-2 sm:gap-8 gap-3 lg:justify-items-start justify-items-center pt-[88px]"
        >
          <BlogLatestCard
            v-for="(blog, index) in latestBlogs"
            :key="index"
            :blog="blog"
          />
        </div>
      </div>
      <img
        class="absolute top-0 left-0 md:w-auto w-[100px]"
        src="~/assets/img/about-us/upper-Intersect.svg"
        alt="upper-Intersect image"
      />
      <img
        class="absolute bottom-0 right-0 md:w-auto w-[100px]"
        src="~/assets/img/about-us/lower-Intersect.svg"
        alt="lower-Intersect image"
      />
    </section>

    <section ref="allBlogsRef" id="all-blogs" class="custom-container !pb-0">
      <div>
        <h2 class="h_tag_primary sm:!text-4xl mt-2">Best Blogs</h2>
        <Menu
          :menuItems="categories"
          defaultMenu="All Categories"
          :subQuery="true"
        />
      </div>

      <div class="pt-[68px] min-h-screen">
        <Transition name="fade" mode="out-in">
          <div
            v-if="isLoading"
            class="w-full h-full flex justify-center items-center pt-20"
          >
            <span class="text-xl md:text-3xl xl:text-5xl">Loading...</span>
          </div>
          <div
            v-else-if="!isLoading && blogs.length > 0"
            class="pt-4 lg:pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full h-full"
          >
            <BlogLatestCard
              v-for="blog in blogs"
              :key="blog.id"
              :blog="blog"
              cardClass="col-span-1 p-4 md:p-[18px]"
            />
          </div>
          <div
            v-else
            class="w-full h-full flex justify-center items-center pt-20"
          >
            <span class="text-xl md:text-3xl xl:text-5xl">{{
              $t("no_data_found")
            }}</span>
          </div>
        </Transition>
      </div>

      <div
        v-if="totalBlogs > perPageBlogs && blogs.length > 0"
        class="flex items-center justify-center space-x-4 pt-[58px]"
      >
        <button
          @click="goToPrevPage"
          :disabled="isPrevBtnDisabled"
          class="pagination-btn"
          :class="{ 'opacity-60': isPrevBtnDisabled }"
        >
          Previous
        </button>
        <button
          @click="goToNextPage"
          :disabled="isNextBtnDisabled"
          class="pagination-btn"
          :class="{ 'opacity-60': isNextBtnDisabled }"
        >
          Next
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.search-btn {
  @apply px-[22px] py-2 md:py-2.5 text-base leading-[26px] bg-orange-primary rounded-lg text-white;
}
.pagination-btn {
  @apply px-[22px] py-2 md:py-2.5 text-base leading-[26px] font-medium rounded-lg border border-orange-primary text-orange-primary bg-white hover:text-white hover:bg-orange-primary;
}
.search-input {
  box-shadow: 0px 2.714px 4.397px 0px rgba(192, 192, 192, 0.03),
    0px 6.863px 11.119px 0px rgba(192, 192, 192, 0.04),
    0px 13.999px 22.683px 0px rgba(192, 192, 192, 0.05),
    0px 28.836px 46.722px 0px rgba(192, 192, 192, 0.06),
    0px 79px 128px 0px rgba(192, 192, 192, 0.09);
}
</style>
