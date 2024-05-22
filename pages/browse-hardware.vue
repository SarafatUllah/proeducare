<script setup>
const { $config } = useNuxtApp();
const { SUCCESS_RATES, SLIDER, COURSES, PAGE_OVERVIEW_SECTION } = useUrls();

const cdnURL = $config.public.cdnURL;

// API call
const { data: pageOverViewRes } = useFetch(
  `${PAGE_OVERVIEW_SECTION}/browse-hardware`
);
const pageOverView = computed(() => pageOverViewRes.value?.data);

const { data: successRatesRes } = await useFetch(SUCCESS_RATES);
const successRates = computed(() => successRatesRes.value?.data);

const { data: successReportsSliderRes } = await useFetch(
  `${SLIDER}/success-reports`
);
const successReportsSlider = computed(
  () => successReportsSliderRes.value?.data
);

const { data: coursesRes } = await useFetch(COURSES);
const courses = computed(() => coursesRes.value?.data);

// Dummy Data
const hardwareSection = ref([
  {
    id: "1",

    src: cdnURL + "/images/browse-hardware/men.png",
    heading: "Advance Hardware",
    content:
      "Student's relationship with Fiverr Outsourcing Institute is not only during the course but also at the end of the course with the intention of delivering them to the specific destination under close supervision so our students are trained in one month, two months and three months course, the students become current industry useful.",
  },
  {
    id: "2",
    src: cdnURL + "/images/browse-hardware/men.png",
    heading: "Course Instructor",
    content:
      "Student's relationship with Fiverr Outsourcing Institute is not only during the course but also at the end of the course with the intention of delivering them to the specific destination under close supervision so our students are trained in one month, two months and three months course, the students become current industry useful.",
  },
]);

const featureSection = ref([
  {
    id: "1",

    title: "How the course is laid out",

    content: [
      {
        id: 1,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 2,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 3,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 4,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 5,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 6,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
    ],
  },
]);

const featureSection2 = ref([
  {
    id: "2",

    title: " What you will learn by doing the course",

    content: [
      {
        id: 1,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 2,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 3,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 4,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 5,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 6,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
    ],
  },
]);

const featureSection3 = ref([
  {
    id: "2",

    title:
      "After taking this course you will need to open the tools for practical work",

    content: [
      {
        id: 1,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 2,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 3,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 4,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 5,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 6,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
    ],
  },
]);

const featureSection4 = ref([
  {
    id: "2",

    title: "Get free with this course –",

    content: [
      {
        id: 1,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
      {
        id: 2,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },

      {
        id: 3,
        title: "Feature Item 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisi cing elit, sed do eiusmod tempor incididunt ut abore et dolore magna",
      },
    ],
  },
]);
</script>

<template>
  <main class="custom-container">
    <section class="pt-10 pb-[70px] xl:pb-20">
      <div
        v-if="pageOverView"
        class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-16 xl:gap-[108px] items-center"
      >
        <div
          class="text-black text-base xl:!text-2xl md:!text-xl font-normal"
          v-html="pageOverView.content"
        ></div>

        <div class="h-[220px] xs:h-[320px] lg:h-[420px]">
          <iframe
            v-if="pageOverView.type === 'video'"
            class="w-full h-full object-cover"
            :src="pageOverView.media_link"
          >
          </iframe>
          <img
            v-else
            class="w-full h-full object-cover"
            :src="pageOverView.media_link"
            alt=""
          />
        </div>

        <div
          class="md:-mt-16 xl:mt-[-240px] flex items-center justify-between gap-6 lg:text-base text-sm text-white"
        >
          <div
            class="h-[40px] md:!w-[217px] w-[195px] rounded-md bg-red-600 flex justify-center items-center"
            aria-current="page"
            href="#"
          >
            <p class="text-center font-bold leading-6">
              Course Duration (Months)
            </p>
          </div>

          <div
            class="md:!w-[158px] h-[40px] w-[144px] rounded-md bg-red-600 flex justify-center items-center"
            aria-current="page"
            href="#"
          >
            <p class="text-center font-bold leading-6">Unlimited Lecture</p>
          </div>
        </div>
      </div>
      <NoPageFound v-else minHeight="420" />
    </section>

    <section class="xl:pb-[10px]">
      <div
        v-for="(item, i) in hardwareSection"
        class="flex md:!flex-row !flex-col-reverse gap-[20px] xl:gap-[108px] md:gap-16 items-center mb-[70px]"
        :class="{ 'md:!flex-row-reverse': i === 1 }"
        :key="i"
      >
        <div class="flex-1">
          <img
            class="w-full md:!w-[630px] md:!min-h-[318px]"
            :src="item.src"
            alt=""
          />
        </div>
        <div class="flex-1 text-center md:!text-left xl:mt-[-55px]">
          <p
            class="text-2xl md:!text-3xl text-primary-red font-bold md:!mb-[15px]"
          >
            {{ item.heading }}
          </p>
          <p
            class="text-black text-sm leading-snug xl:!text-2xl md:!text-xl md:!leading-8 font-normal"
          >
            {{ item.content }}
          </p>
        </div>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div
        class="grid grid-cols-1 md:!grid-cols-2 gap-[24px] md:gap-16 xl:gap-[108px]"
      >
        <div v-for="(item, i) in featureSection" :key="i" class="md:!pt-6">
          <ul class="list-style-none pl-0" data-te-navbar-nav-ref>
            <li class="leading-7 text-primary-red" data-te-nav-item-ref>
              <p
                class="md:!text-3xl text-2xl font-bold md:!leading-9"
                aria-current="page"
                href="#"
                data-te-nav-link-ref
              >
                {{ item.title }}
              </p>
            </li>
            <li
              v-for="description in item.content"
              :key="description.id"
              class="font-normal text-[#222222]"
              data-te-nav-item-ref
            >
              <div class="flex md:!mt-4 mt-[10px] mb-[6px] md:!mb-4">
                <img
                  class="w-[18px] h-[18px] xl:!w-6 xl:!h-6 md:!w-5 md:!h-5"
                  src="/images/browse-hardware/browser.png"
                  alt=""
                />
                <p
                  class="xl:!text-2xl md:!text-xl text-lg font-bold leading-8 ml-[12px] mt-[-3px]"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  {{ description.title }}
                </p>
              </div>
              <div
                class="text-sm md:!text-base xl:!text-lg xl:!leading-8 leading-6"
              >
                {{ description.description }}
              </div>
            </li>
          </ul>
        </div>

        <div v-for="(item, i) in featureSection2" :key="i" class="md:!pt-6">
          <ul class="list-style-none pl-0" data-te-navbar-nav-ref>
            <li class="leading-7 text-primary-red" data-te-nav-item-ref>
              <p
                class="md:!text-3xl text-2xl font-bold"
                aria-current="page"
                href="#"
                data-te-nav-link-ref
              >
                {{ item.title }}
              </p>
            </li>
            <li
              v-for="description in item.content"
              :key="description.id"
              class="font-normal text-[#222222]"
              data-te-nav-item-ref
            >
              <div class="flex md:!mt-4 mt-[10px] mb-[6px] md:!mb-4">
                <img
                  class="w-[18px] h-[18px] xl:!w-6 xl:!h-6 md:!w-5 md:!h-5"
                  src="/images/browse-hardware/browser.png"
                  alt=""
                />
                <p
                  class="xl:!text-2xl md:!text-xl text-lg font-bold leading-8 ml-[12px] mt-[-3px]"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  {{ description.title }}
                </p>
              </div>
              <div
                class="text-sm md:!text-base xl:!text-lg xl:!leading-8 leading-6"
              >
                {{ description.description }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div class="flex flex-col items-center text-center px-4 md:!px-0">
        <h3 class="sub-heading mt-0 text-xl md:!text-3xl">
          Details about the course This course is for whom
        </h3>
        <p
          class="text-sm lg:!text-2xl md:!text-xl mt-[6px] font-normal leading-6 text-center md:!w-2/3 lg:w-1/2 xl:w-2/5"
        >
          Student's relationship with Fiverr Outsourcing Institute is not only during the
          course but also at the end of the course with the intention of
          delivering them to the specific destination under close supervision so
          our students are trained in one month, two months and three months
          course, the students become current industry useful
        </p>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div class="flex flex-col items-center text-center">
        <h3 class="sub-heading mt-0 text-2xl md:!text-3xl lg:text-4xl">
          Course exclusive features
        </h3>
        <p
          class="text-sm lg:!text-2xl md:!text-xl mt-[6px] font-normal leading-6 text-center md:!w-2/3 lg:w-1/2 xl:w-2/5"
        >
          Student's relationship with Fiverr Outsourcing Institute is not only during the
          course but also at the end of the course with the intention of
          delivering them to the specific destination under close supervision so
          our students are trained in one month, two months and three months
          course, the students become current industry useful
        </p>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div
        class="grid grid-cols-1 md:!grid-cols-2 gap-[24px] md:gap-16 xl:gap-[108px]"
      >
        <div v-for="(item, i) in featureSection3" :key="i" class="md:!pt-6">
          <ul class="list-style-none pl-0" data-te-navbar-nav-ref>
            <li class="leading-7 text-primary-red" data-te-nav-item-ref>
              <p
                class="md:!text-3xl text-2xl font-bold md:!leading-9"
                aria-current="page"
                href="#"
                data-te-nav-link-ref
              >
                {{ item.title }}
              </p>
            </li>
            <li
              v-for="description in item.content"
              :key="description.id"
              class="font-normal text-[#222222]"
              data-te-nav-item-ref
            >
              <div class="flex md:!mt-4 mt-[10px] mb-[6px] md:!mb-4">
                <img
                  class="w-[18px] h-[18px] xl:!w-6 xl:!h-6 md:!w-5 md:!h-5"
                  src="/images/browse-hardware/browser.png"
                  alt=""
                />
                <p
                  class="xl:!text-2xl md:!text-xl text-lg font-bold leading-8 ml-[12px] mt-[-3px]"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  {{ description.title }}
                </p>
              </div>
              <div
                class="text-sm md:!text-base xl:!text-lg xl:!leading-8 leading-6"
              >
                {{ description.description }}
              </div>
            </li>
          </ul>
        </div>

        <div v-for="(item, i) in featureSection4" :key="i" class="md:!pt-6">
          <ul class="list-style-none pl-0" data-te-navbar-nav-ref>
            <li class="leading-7 text-primary-red" data-te-nav-item-ref>
              <p
                class="md:!text-3xl text-2xl font-bold md:!leading-9"
                aria-current="page"
                href="#"
                data-te-nav-link-ref
              >
                {{ item.title }}
              </p>
            </li>
            <li
              v-for="description in item.content"
              :key="description.id"
              class="font-normal text-[#222222]"
            >
              <div class="flex md:!mt-4 mt-[10px] mb-[6px] md:!mb-4">
                <img
                  class="w-[18px] h-[18px] xl:!w-6 xl:!h-6 md:!w-5 md:!h-5"
                  src="/images/browse-hardware/browser.png"
                  alt=""
                />
                <p
                  class="md:!text-2xl text-lg font-bold leading-8 ml-[12px] mt-[-3px]"
                >
                  {{ description.title }}
                </p>
              </div>
              <div
                class="text-sm md:!text-base xl:!text-lg xl:!leading-8 leading-6"
              >
                {{ description.description }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div
        class="grid grid-cols-1 md:!grid-cols-2 gap-4 md:gap-16 xl:gap-[108px]"
      >
        <div class="md:!pt-6">
          <div class="flex flex-col pl-0" data-te-navbar-nav-ref>
            <div class="leading-7 text-primary-red" data-te-nav-item-ref>
              <p
                class="text-2xl md:!text-3xl font-bold md:!leading-9 max-w-[90%]"
                aria-current="page"
                href="#"
                data-te-nav-link-ref
              >
                How to pay
              </p>
            </div>
            <div class="flex mt-4">
              <div
                class="text-sm md:!text-lg font-normal leading-6 flex justify-center items-center"
                aria-current="page"
              >
                For details on how to pay
              </div>
              <div
                class="ml-4 md:!w-[174px] flex justify-center items-center xl:!h-[50px] h-[40px] w-[127px] rounded-md bg-red-600"
                aria-current="page"
                href="#"
              >
                <p
                  class="text-center md:!mt-0 text-white text-sm md:!text-base font-bold leading-6 md:!leading-8"
                >
                  Watch this video
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="md:!pt-6 pt-[14px]">
          <div class="flex flex-col pl-0" data-te-navbar-nav-ref>
            <div class="leading-7 text-primary-red" data-te-nav-item-ref>
              <p
                class="text-2xl md:!text-3xl font-bold md:!leading-9 md:!max-w-90"
                aria-current="page"
                href="#"
                data-te-nav-link-ref
              >
                Class will be required
              </p>
            </div>
            <div class="mt-4">
              <ul class="list-disc ml-4 text-base md:!text-lg font-normal">
                <li>Internet connection (WiFi or Mobile Internet)</li>
                <li>Smartphone or PC</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div class="grid">
        <div class="md:!pt-6">
          <div class="flex flex-col pl-0" data-te-navbar-nav-ref>
            <div class="leading-7 text-primary-red" data-te-nav-item-ref>
              <p
                class="text-2xl md:!text-3xl font-bold md:!leading-9 md:!max-w-[90%]"
                aria-current="page"
                href="#"
                data-te-nav-link-ref
              >
                Frequently Asked Questions
              </p>
            </div>
            <div>
              <div class="flex my-2.5 md:!my-[15px]">
                <p
                  class="md:!text-2xl text-base font-semibold"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  How to buy the course
                </p>
              </div>
              <div class="md:!text-base text-sm font-normal leading-6">
                <div class="md:!mb-[15px] mb-[6px]">
                  –Click on <span class="font-medium">'Buy Course'</span> button
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – Click on
                  <span class="font-medium">'Get Started'</span> button
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – Log in with your
                  <span class="font-medium">phone number or email</span>
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – Once logged in click on
                  <span class="font-medium">'Proceed'</span> button
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – Choose your preferred payment method and
                  <span class="font-medium">'Pay Click on'</span> button
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – Pay using Bkash you can save the
                  <span class="font-medium">Bkash number</span> for future
                  payments
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – After completing the payment click on
                  <span class="font-medium">'Start Course'</span> button to
                  start the course directly
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – View your purchased course in
                  <span class="font-medium">'My Courses'</span> section of your
                  profile will get
                </div>
              </div>
            </div>
            <div>
              <div class="flex md:!mt-[15px] mt-[64px] md:!mb-[15px] mb-[6px]">
                <p
                  class="text-2xl font-semibold"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  <span class="text-primary-red">How to pay through</span> Bkash
                </p>
              </div>
              <div class="md:!text-base text-sm font-normal leading-6">
                <div class="md:!mb-[15px] mb-[6px]">
                  – Click on
                  <span class="font-medium">'Purchase Course' </span> button
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – Click on
                  <span class="font-medium">'Get Started' </span> button
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – Choose <span class="font-medium">Bkash </span> from the
                  payment method. You can save the
                  <span class="font-medium">Bkash number </span> for future use
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – click on the
                  <span class="font-medium"> 'Make Payment' </span> button. You
                  will be taken to Bkash payment gateway
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – confirm with your
                  <span class="font-medium"> Bkash number </span> and
                  <span class="font-medium"> Pin number </span>, your payment is
                  completely secure
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – once the payment is done you will be taken directly to the
                  course page. By clicking on the
                  <span class="font-medium"> 'Start Course' </span> button you
                  can directly start the course
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  – To know more about development payments watch the
                  video:<span class="text-primary-red">
                    <NuxtLink to="#" target="_blank">
                      https://youtu.be/5wfn60rmWX4</NuxtLink
                    ></span
                  >
                </div>
              </div>
            </div>
            <div>
              <div class="flex md:!mt-[15px] mt-[64px] md:!mb-[15px] mb-[6px]">
                <p
                  class="text-2xl font-semibold text-primary-red"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  Is it possible to cancel course admission?
                </p>
              </div>
              <div class="md:!text-base text-sm font-normal leading-6">
                <div class="mb-[15px]">
                  Sorry! Once a course has been purchased, you cannot cancel
                  your enrollment in that course.
                </div>
              </div>
            </div>

            <div>
              <div class="flex md:!mt-[15px] mt-[64px] md:!mb-[15px] mb-[6px]">
                <p
                  class="text-2xl font-semibold text-primary-red"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  How do I report a technical issue?
                </p>
              </div>
              <div class="md:!text-base text-sm font-normal leading-6">
                <div class="md:!mb-[15px] mb-[6px]">
                  In case of any problem,
                </div>
                <div class="md:!mb-[15px] mb-[6px]">call: 16910,</div>
                <div class="md:!mb-[15px] mb-[6px]">
                  Email: support@fiverroutsourcinginstitute.com
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  or fill this form:
                  <span class="text-primary-red">
                    <NuxtLink to="#" target="_blank">
                      https://forms.gle/buwAfFXP8V6c7gbY7</NuxtLink
                    ></span
                  >
                </div>
              </div>
            </div>
            <div>
              <div class="flex md:!mt-[15px] mt-[64px] md:!mb-[15px] mb-[6px]">
                <p
                  class="text-2xl font-semibold text-primary-red"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  How to start the course after purchase
                </p>
              </div>
              <div class="md:!text-base text-sm font-normal leading-6">
                <div class="md:!mb-[15px] mb-[6px]">
                  -After payment click on 'Start Course' button and you will be
                  taken directly to the course
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  -Next click on 'My Courses' option from your profile section
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  -You will find all your enrolled courses here, you must be
                  logged in
                </div>
                <div class="md:!mb-[15px] mb-[6px]">
                  -More Watch the video to know:
                  <span class="text-primary-red">
                    <NuxtLink to="#" target="_blank">
                      https://youtu.be/eDrXWrl-SOU</NuxtLink
                    ></span
                  >
                </div>
              </div>
            </div>

            <div
              class="w-[142px] h-[50px] mt-3.5 rounded-md bg-red-600"
              aria-current="page"
              href="#"
            >
              <p
                class="text-center mt-[10px] text-white text-xl font-bold leading-8"
              >
                View Course
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div class="flex flex-col items-center text-center">
        <h3 class="sub-heading mt-0 text-2xl md:!text-3xl max-w-[95%]">
          Special service of Fiverr Outsourcing Institute
        </h3>
        <p
          class="md:!text-small text-sm font-normal leading-6 w-11/12 md:!w-7/12 md:!pt-4 mt-[6px] md:!pb-10 pb-[10px]"
        >
          Not only classes, Fiverr Outsourcing Institute is always ready to support students
          in any need. So after online training you can directly come to our lab
          for offline practical, this facility is provided only to you.
        </p>
      </div>
      <div v-if="successRates" class="grid grid-cols-1 md:!grid-cols-3 gap-5">
        <div v-for="success in successRates" :key="success.id">
          <div
            class="text-center shadow-[0_0px_15px_-6px_rgba(0,0,0,0.5)] md:!px-[6px] px-6 xl:!px-10 lg:!px-3 py-4 xl:!h-[335px] md:!h-[390px]"
          >
            <span class="sub-heading font-extrabold text-4xl"
              >{{ success.percentage }}%</span
            >
            <h3 class="sub-heading text-xl md:!text-2xl">
              {{ success.title }}
            </h3>
            <p class="xl:pt-4 pt-4 md:!pt-[6px]">{{ success.content }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div class="flex flex-col items-center text-center xl:mb-10">
        <h3
          class="md:!sub-heading text-2xl text-primary-red font-semibold mt-0"
        >
          Some more courses for you
        </h3>
      </div>
      <div v-if="courses" class="gap-4 pt-10">
        <CourseDetails :courses="courses" />
      </div>
    </section>

    <section class="xl:!pb-14">
      <div class="flex flex-col items-center text-center">
        <div class="text-center mx-auto">
          <p class="lg:!text-3xl text-2xl text-primary-red font-bold">
            Success reports of some of my students' work
          </p>
        </div>
        <div
          class="text-center w-full md:max-w-[630px] mx-auto mb-[150px] mt-10"
        >
          <BaseSecondaryCarousel
            v-if="successReportsSlider"
            :slider="successReportsSlider"
            carouselItemsClass="h-[230px] xs:h-[300px] sm:h-[360px] md:h-[420px] 3xl:h-[440px]"
            headingClass="text-xl sm:text-2xl md:text-3xl"
            subHeadingClass="text-base sm:text-xl lg:text-2xl"
          />
        </div>
      </div>
    </section>

    <section class="pb-[70px] xl:!pb-20">
      <div class="flex flex-col items-center text-center">
        <h3
          class="text-red-600 font-bold text-3xl xl:text-6xl md:mb-[15px] mt-0"
        >
          Comment
        </h3>
        <p
          class="md:!text-2xl font-normal text-center text-sm leading-6 md:!w-1/2"
        >
          I believe every student of mine is a member of the Fiverr Outsourcing Institute
          family. So any constructive suggestions from the students or
          correcting our mistakes would encourage us to move forward.
        </p>
      </div>
    </section>
  </main>
</template>
