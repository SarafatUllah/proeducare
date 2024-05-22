<script setup lang="ts">
const { ONLINE_PROVIDERS, apiBaseUrl, PAGE_OVERVIEW_SECTION } = useUrls();
const nuxtApp = useNuxtApp();

// API call
const { data: pageOverViewRes } = useFetch<any>(
  `${PAGE_OVERVIEW_SECTION}/online-services`
);
const pageOverView = computed(() => pageOverViewRes.value?.data);

const { data } = useFetch<any>(`${apiBaseUrl}/courses`);
const courseSlider = computed(() => data.value?.data);

const selectedInstructor = ref<any>({});

const setSelectedInstructor = (instructor: any) => {
  selectedInstructor.value = instructor;
};

const onlineProviders = ref([]);
const isLoading = ref(false);
const getAllOnlineProviders = () => {
  isLoading.value = true;
  const { data, pending, error } = useFetch<any>(ONLINE_PROVIDERS);

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        isLoading.value = false;
        onlineProviders.value = data.value.data;

        setTimeout(() => {
          setSelectedInstructor(
            onlineProviders?.value ? onlineProviders.value[0] : {}
          );
        });
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value?.data.message.code,
          className: "toasted-bg-success",
        });
        isLoading.value = false;
      }
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};
getAllOnlineProviders();

const activeInstructor = (instructor: any) => {
  return selectedInstructor?.value.id === instructor.id;
};

const { isSmaller } = useBreakpoints();

const isMobile = computed(() => isSmaller(768));
const isMenuOpen = ref(true);
const toggleDropdown = () => {
  if (isMobile.value) {
    isMenuOpen.value = !isMenuOpen.value;
  }
  return;
};
const closeMenu = () => {
  if (isMobile.value) {
    isMenuOpen.value = false;
  } else {
    isMenuOpen.value = true;
  }
  return;
};
watch(isMobile, (val) => {
  if (val) {
    isMenuOpen.value = false;
  } else {
    isMenuOpen.value = true;
  }
});

closeMenu();

onMounted(() => {
  window.scrollTo(0, 0);
})
</script>

<template>
  <main class="custom-container">
    <section class="pt-10 pb-20">
      <div
        v-if="pageOverView"
        class="flex flex-col-reverse md:flex-row items-center gap-10 xl:gap-20"
      >
        <div class="w-full md:w-1/2 h-full">
          <p class="text-sm md:text-base lg:text-lg">
            {{ pageOverView.sub_title }}
          </p>
          <h1
            class="text-primary-red font-bold text-[32px] md:text-[40px] xl:text-[60px] py-4 mt-0 break-words"
          >
            {{ pageOverView.title }}
          </h1>
          <div
            class="text-base md:text-2xl text-justify"
            v-html="pageOverView.content"
          ></div>
        </div>

        <div v-if="pageOverView.media_link" class="w-full md:w-1/2 h-full">
          <iframe
            v-if="pageOverView.type === 'video'"
            class="w-full aspect-video"
            :src="pageOverView.media_link"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <img
            v-else
            :src="pageOverView.media_link"
            class="object-cover h-[225px] w-full sm:h-[350px] md:h-[420px]"
            width="100%"
            :alt="pageOverView.title"
          />
        </div>
      </div>
      <NoPageFound v-else minHeight="420" />
    </section>

    <section class="pt-5 pb-10 lg:pb-20">
      <h1 class="text-3xl font-bold text-center text-[#EC1F27]">
        {{ $t("instructor_title") }}
      </h1>
      <div
        class="flex flex-col md:flex-row gap-2.5 md:gap-10 xl:gap-20 pt-4 md:pt-10 h-auto min-h-[600px]"
      >
        <div
          class="relative flex flex-col w-[200px] min-w-[200px] md:min-w-[240px] lg:min-w-[360px] xl:min-w-[420px] text-base md:text-lg lg:text-[30px] rounded-[10px] md:overflow-hidden provider-card-top-shadow"
        >
          <div
            v-if="isMenuOpen"
            @click="toggleDropdown"
            class="fixed top-0 right-0 left-0 bottom-0 z-[1] md:hidden"
          ></div>
          <h3
            @click="toggleDropdown"
            class="justify-between md:justify-center min-h-[40px] lg:min-h-[70px] px-2.5 md:px-4 flex items-center w-full bg-[#EC1F27] text-white font-semibold"
            :class="isMenuOpen ? 'rounded-t-[10px]' : ' rounded-[10px]'"
          >
            <span>{{ $t("instructor_list") }}</span>
            <IconsChevronDown
              class="transition-all duration-500 ease-in-out w-5 text-white md:hidden"
              :class="isMenuOpen ? 'rotate-180' : 'rotate-0 '"
            />
          </h3>
          <ul
            v-if="isMenuOpen && Object.keys(onlineProviders).length > 0"
            class="mobile-menu provider-list flex flex-col overflow-auto min-h-full max-h-[calc(100vh-240px)]"
          >
            <li
              v-for="(item, index) in onlineProviders"
              :key="item.id"
              @click="setSelectedInstructor(item)"
              :class="activeInstructor(item) ? 'bg-[#D9D9D9]' : ''"
            >
              <span class="line-clamp-1">{{ item.name }}</span>
            </li>
          </ul>
          <NoPageFound
            v-else-if="isMenuOpen && Object.keys(onlineProviders).length === 0"
            minHeight="420"
          />
        </div>
        <div
          class="provider-card-top-shadow relative flex-grow rounded-[10px] p-10 pr-4 xl:pr-6 xl:p-20 flex"
        >
          <div
            v-if="isLoading"
            class="isLoadingIcon flex flex-col w-full justify-center items-center"
          >
            <IconsIsLoading />
            <p class="pt-28 text-xl font-bold">{{ $t("please_wait") }}</p>
          </div>
          <div
            class="justify-start items-start"
            v-else-if="selectedInstructor?.description"
            v-html="selectedInstructor?.description"
          ></div>
          <div
            v-else
            class="w-full h-full flex flex-col justify-center items-center"
          >
            <IconsNoData class="" />
            <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
          </div>
          <div
            v-if="selectedInstructor?.social_link"
            class="w-full flex items-center justify-end space-x-4 px-4 sm:px-10 absolute bottom-6 right-0"
          >
            <NuxtLink
              v-for="(media, index) in selectedInstructor?.social_link"
              :key="index"
              :to="media.link"
              target="_blank"
            >
              <SvgFacebook
                v-if="media.name?.toLowerCase() === 'facebook'"
                class="w-10 h-10"
              />
              <SvgWhatsapp
                v-else-if="media.name?.toLowerCase() === 'whatsapp'"
                class="w-10 h-10"
              />
              <SvgTwitter
                v-else-if="media.name?.toLowerCase() === 'twitter'"
                class="w-10 h-10"
              />
              <SvgLinkedin
                v-else-if="media.name?.toLowerCase() === 'linkedin'"
                class="w-10 h-10"
              />
              <SvgGmail
                v-else-if="media.name?.toLowerCase() === 'gmail'"
                class="w-10 h-10"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section v-if="courseSlider" class="pt-5 pb-20 space-y-20">
      <div
        class="flex flex-col items-center space-y-3 w-full md:w-[700px] mx-auto"
      >
        <h1 class="text-3xl font-bold text-center text-[#EC1F27]">
          {{ $t("admission_going_title") }}
        </h1>
        <h2 class="text-2xl font-normal text-center">
          {{ $t("admission_going_subtitle") }}
        </h2>
        <p class="text-[18px] font-normal text-center">
          {{ $t("admission_going_text_2") }}
        </p>
      </div>
      <CourseDetails :courses="courseSlider" />
    </section>
  </main>
</template>

<style scoped>
.provider-card-top-shadow {
  box-shadow: 0px -4px 4px 0px #00000040, 0px 4px 4px 0px #00000040;
}
ul.provider-list li {
  @apply min-h-[32px] md:min-h-[40px] lg:min-h-[70px] flex justify-center items-center w-full hover:bg-[#D9D9D9] text-black cursor-pointer px-2.5 md:px-4;
}
@media (max-width: 767px) {
  .mobile-menu {
    @apply absolute top-[40px] right-0 z-50 bg-white w-full shadow-xl rounded-b-[10px] overflow-y-auto;
  }
}
</style>
