<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
const $config = useRuntimeConfig();
const { PAGE_OVERVIEW_SECTION, COMMUNICATIONS, GET_ALL_DISTRICTS } = useUrls();

const showDistricts = ref(false);
const selectedDistrict = ref({});
const searchInput = ref(null);
const searchInputText = ref("");
const singleDistrictData = ref(null);
const isProcessing = ref(false);
const nuxtApp = useNuxtApp();

const { data: pageOverViewRes } = useFetch(
  `${PAGE_OVERVIEW_SECTION}/communication`
);
const pageOverView = computed(() => pageOverViewRes.value?.data);

const districts = ref("");

const fetchSingleDistrict = (districtId) => {
  isProcessing.value = true;
  const { data, pending, error } = useFetch(
    `${COMMUNICATIONS}/${districtId !== undefined ? districtId : "null"}`
  );

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        singleDistrictData.value = data?.value?.data;
        isProcessing.value = false;
      } else if (error.value.statusCode === 404) {
        singleDistrictData.value = null;
        isProcessing.value = false;
      } else {
        singleDistrictData.value = null;
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error?.value?.message,
          className: "toasted-bg-success",
        });
        isProcessing.value = false;
      }
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};

const setSelectedDistrict = (district) => {
  selectedDistrict.value = district;
  fetchSingleDistrict(district.id);
};
setSelectedDistrict({});
const getAllDistricts = () => {
  isProcessing.value = true;
  const { data, pending, error } = useFetch(GET_ALL_DISTRICTS);

  const setData = () => {
    if (!pending.value) {
      if (data.value) {
        data.value?.data.shift();
        districts.value = data.value?.data;

        fetchSingleDistrict();
      } else if (error.value) {
        nuxtApp.$toast("clear");
        nuxtApp.$toast("error", {
          message: error.value,
          className: "toasted-bg-success",
        });
        isProcessing.value = false;
      }
    } else {
      setTimeout(() => {
        setData();
      }, 300);
    }
  };
  setData();
};

getAllDistricts();

const filteredDistricts = computed(() => {
  if (districts.value) {
    return districts.value.filter((district) =>
      district.name.toLowerCase().includes(searchInputText.value.toLowerCase())
    );
  }
});
const toggleDistricts = () => {
  showDistricts.value = !showDistricts.value;
  if (showDistricts.value) {
    setTimeout(() => {
      searchInput.value.focus();
    }, 100);
  } else {
    searchInputText.value = "";
  }
};

const { data: howFromIndiaRes } = useFetch(`${COMMUNICATIONS}/65`);
const howFromIndia = computed(() => howFromIndiaRes.value?.data);

onMounted(() => {
  window.scrollTo(0, 0);
});

// Contact us
const { isRequired, validateEmail, validatePhone } = useValidation();
const { CONTACT_US } = useUrls();
const { $toast } = useNuxtApp();
const localePath = useLocalePath();
const { t } = useI18n();

const contactForm = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "Select subject",
  question: "",
  color: "#767474",
  opacity: 50,
});
const subjects = ref([
  { id: 1, value: "Select", label: "Select subject", disabled: true },
  { id: 2, value: "General", label: "General", disabled: false },
  { id: 3, value: "Support", label: "Support", disabled: false },
  { id: 4, value: "Payment", label: "Payment", disabled: false },
]);

const submitForm = async () => {
  if (
    contactForm.name &&
    contactForm.email &&
    contactForm.question &&
    contactForm.phone &&
    contactForm.subject !== "Select subject"
  ) {
    const { data, error } = await useFetch(CONTACT_US, {
      method: "POST",
      body: JSON.stringify({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        description: contactForm.question,
        subject: contactForm.subject,
      }),
    });
    if (!error.value && data.value) {
      $toast("clear");
      $toast("success", {
        message: data.value.message,
        className: "toasted-bg-success",
      });
    } else if (error.value) {
      $toast("clear");
      $toast("error", {
        message: error.value?.data?.message,
        className: "toasted-bg-alert",
      });
    }
  } else {
    $toast("clear");
    $toast("error", {
      message: t("messages.fill_all_fields"),
      className: "toasted-bg-alert",
    });
  }
};
</script>

<template>
  <main class="custom-container pt-10">
    <div
      v-if="pageOverView"
      class="flex flex-col-reverse md:flex-row items-center gap-10 xl:gap-20"
    >
      <div class="w-full md:w-1/2 h-full">
        <p
          v-if="pageOverView.sub_title"
          class="text-sm md:text-base lg:text-lg pb-4"
        >
          {{ pageOverView.sub_title }}
        </p>
        <h1
          v-if="pageOverView.title"
          class="text-primary-red font-bold text-[32px] md:text-[40px] xl:text-[60px] pb-4 mt-0 break-words"
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
          class="w-full object-cover h-[225px] sm:h-[350px] md:h-[420px]"
          :alt="pageOverView.title"
        />
      </div>
    </div>
    <NoPageFound v-else minHeight="420" />

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.9941865808214!2d88.16752707613328!3d24.727079850580207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbad05447dfcab%3A0xa3e2a1c730c2be54!2sSK%20INFO%20BD!5e0!3m2!1sen!2sbd!4v1697220026666!5m2!1sen!2sbd"
      class="mt-20 w-full h-[480px] md:h-[400px] xl:h-[515px]"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <section class="pt-20 hidden">
      <h1 class="text-3xl text-[#EC1F27] font-bold">
        {{ $t("districts_title") }}
      </h1>

      <IconsIsLoading v-if="isProcessing" class="h-24" />
      <p v-if="isProcessing" class="text-lg tex-center flex justify-center">
        {{ $t("loading") }}
      </p>

      <div v-if="!isProcessing">
        <div
          class="pt-10 w-full flex flex-col md:flex-row items-start justify-between gap-10 md:gap-6 lg:gap-10 xl:gap-28"
        >
          <div class="w-full" :class="singleDistrictData ? 'md:w-1/2' : ''">
            <div class="relative w-48">
              <div
                @click="toggleDistricts"
                class="z-[2] relative flex items-center justify-between px-4 w-full h-[50px] outline-none bg-primary-red text-white rounded-t-2xl cursor-pointer"
                :class="showDistricts ? 'rounded-b-0' : 'rounded-b-2xl'"
              >
                <span class="font-semibold">{{
                  selectedDistrict?.name ? selectedDistrict.name : "Random Data"
                }}</span>
                <IconsChevronDown
                  class="transition-all duration-500 ease-in-out w-5 text-white"
                  :class="showDistricts ? 'rotate-180' : 'rotate-0 '"
                />
              </div>
              <div
                v-if="showDistricts"
                @click="toggleDistricts"
                class="fixed top-0 right-0 left-0 bottom-0 z-[1]"
              ></div>
              <div
                v-if="showDistricts"
                class="w-full h-auto absolute top-12 left-0 z-[2] bg-white rounded-b-2xl shadow-md"
              >
                <input
                  ref="searchInput"
                  class="w-full h-[50px] outline-none border border-[#0000007e] px-4"
                  type="text"
                  :placeholder="$t('search')"
                  v-model="searchInputText"
                />
                <div class="pb-8 bg-[#F1F1F1] rounded-b-2xl">
                  <div class="h-auto max-h-[300px] px-4 overflow-y-auto">
                    <div
                      v-for="(district, index) in filteredDistricts"
                      :key="district.id"
                      class="pt-3.5"
                    >
                      <span
                        class="cursor-pointer pr-4"
                        @click="setSelectedDistrict(district)"
                        >{{ district.name }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="singleDistrictData"
              class="text-lg pt-11"
              v-html="singleDistrictData?.description"
            ></div>
            <NoPageFound v-else minHeight="420" />
          </div>
          <div
            v-if="singleDistrictData"
            class="w-full md:w-1/2 h-[320px] xl:h-[400px] 3xl:h-[480]"
          >
            <img
              v-if="singleDistrictData?.media_type === 'image'"
              class="w-full h-full object-cover"
              :src="singleDistrictData?.media_link"
              :alt="singleDistrictData?.title"
            />
            <iframe
              v-else-if="singleDistrictData?.media_type === 'video'"
              class="w-full aspect-video"
              :src="singleDistrictData?.media_link"
            >
            </iframe>
          </div>
        </div>
      </div>
    </section>
    <section class="pt-5 pb-10 md:py-20 lg:py-28 xl:py-[150px] hidden">
      <div
        v-if="howFromIndia"
        class="w-full flex flex-col-reverse md:flex-row items-start justify-between gap-10 md:gap-6 lg:gap-10 xl:gap-28"
      >
        <div class="w-full md:w-1/2">
          <img
            v-if="howFromIndia?.media_type === 'image'"
            class="w-full object-cover aspect-video"
            :src="howFromIndia?.media_link"
            :alt="howFromIndia?.title"
          />
          <iframe
            v-else
            class="w-full aspect-video"
            :src="howFromIndia?.media_link"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div class="w-full md:w-1/2">
          <h1 class="text-3xl text-[#EC1F27] font-bold">
            {{ howFromIndia?.title }}
          </h1>
          <div v-html="howFromIndia?.description" class="text-lg pt-11"></div>
        </div>
      </div>
      <NoPageFound v-else minHeight="420" />
    </section>
    <section class="pb-24 pt-5">
      <h3
        class="pt-10 lg:pt-24 text-center lg:text-left text-black text-[32px] font-semibold"
      >
        {{ $t("contact_sub") }}
      </h3>

      <div
        class="w-full h-full flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 pt-8"
      >
        <Form
          class="w-full flex flex-col space-y-8"
          novalidate
          @submit="submitForm"
          v-slot="{ meta }"
        >
          <div
            class="w-full flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0"
          >
            <div class="w-full md:w-1/2 space-y-1.5">
              <label class="text-black"
                >{{ $t("full_name") }}
                <span class="text-[#ff0000]">*</span></label
              >
              <Field
                id="name"
                type="text"
                name="name"
                class="p-4 w-full rounded-lg shadow-3xl border border-black outline-none"
                :placeholder="$t('name_placeholder')"
                v-model="contactForm.name"
                :rules="isRequired"
              />
              <ErrorMessage class="error-message" name="name" />
            </div>
            <div class="w-full md:w-1/2 space-y-1.5">
              <label class="text-black"
                >{{ $t("email_address") }}
                <span class="text-[#ff0000]">*</span></label
              >
              <Field
                id="email"
                type="email"
                name="email"
                class="p-4 w-full rounded-lg shadow-3xl border border-black outline-none"
                :placeholder="$t('email_placeholder')"
                v-model="contactForm.email"
                :rules="validateEmail"
              />
              <ErrorMessage class="error-message" name="email" />
            </div>
          </div>
          <div
            class="w-full flex flex-col space-y-8 md:flex-row md:space-x-8 md:space-y-0"
          >
            <div class="w-full md:w-1/2 space-y-1.5">
              <label class="text-black"
                >{{ $t("phone_number") }}
                <span class="text-[#ff0000]">*</span></label
              >
              <Field
                id="phone"
                type="text"
                name="phone"
                class="p-4 w-full rounded-lg shadow-3xl border border-black outline-none"
                :placeholder="$t('phone_placeholder')"
                v-model="contactForm.phone"
                :rules="validatePhone"
              />
              <ErrorMessage class="error-message" name="phone" />
            </div>
            <div class="flex flex-col w-full md:w-1/2 space-y-1.5">
              <label for="subject">{{ $t("select_subject") }} </label>
              <div class="w-full rounded-lg select-wrapper cursor-pointer">
                <select
                  class="w-full bg-white outline-none p-3 h-[58px] rounded-lg shadow-3xl border border-black relative"
                  name="subject"
                  id="subject"
                  v-model="contactForm.subject"
                  :style="{
                    '--text-color':
                      contactForm.subject === 'Select subject'
                        ? `#767474`
                        : `#000`,
                    '--text-opacity':
                      contactForm.subject === 'Select subject' ? `0.5` : `1`,
                  }"
                >
                  <option
                    v-for="(option, index) in subjects"
                    :key="index"
                    :value="option.label"
                    :disabled="option.disabled"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <span class="select-toggle absolute">
                  <IconsChevronDown class="w-5 text-black" />
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-col w-full space-y-1.5">
            <label class="text-black"
              >{{ $t("question") }} <span class="text-[#ff0000]">*</span></label
            >
            <Field
              as="textarea"
              id="question"
              name="question"
              class="p-4 w-full outline-none rounded-lg shadow-3xl border border-black resize-none"
              :placeholder="$t('question_placeholder')"
              rows="10"
              v-model="contactForm.question"
              :rules="isRequired"
            ></Field>
            <ErrorMessage class="error-message" name="question" />
          </div>
          <div class="flex justify-start items-center">
            <button
              class="h-14 px-6 md:px-15 text-white rounded-md font-bold text-xl"
              :class="
                !meta.valid ? 'bg-red-300 cursor-not-allowed' : 'bg-primary-red'
              "
              :disabled="!meta.valid"
              type="submit"
            >
              {{ $t("contact_us_btn") }}
            </button>
          </div>
        </Form>

        <div
          class="flex flex-col self-center lg:self-start py-10 appointment-address p-8 xl:p-10 shadow-[0_0px_15px_-6px_rgba(0,0,0,0.5)] rounded-2xl space-y-9 mb-10 lg:mb-0 justify-between"
        >
          <div class="flex flex-col space-y-9">
            <div class="flex space-x-5 md:space-x-6 items-center">
              <img
                class="h-[52px] w-[52px] xl:h-[60px] xl:w-[60px]"
                src="/icons/addresss.png"
                alt=""
              />
              <div class="details flex flex-col space-y-1.5">
                <h4 class="text-xl xl:text-2xl font-medium">
                  {{ $t("mailing_address") }}
                </h4>
                <p class="text-base md:text-lg text-light-white break-words">
                  {{ $t("address_1") }}<br />
                  {{ $t("address_2") }}
                </p>
              </div>
            </div>
            <div class="flex space-x-5 md:space-x-6 items-center">
              <img
                class="h-[52px] w-[52px] xl:h-[60px] xl:w-[60px]"
                src="/icons/email.svg"
                alt=""
              />
              <div class="details flex flex-col">
                <h4 class="text-xl xl:text-2xl font-medium mb-1.5">
                  {{ $t("email") }}
                </h4>
                <NuxtLink
                  class="text-base md:text-lg text-light-white"
                  :to="`mailto:example@gmail.com`"
                  aria-label="GoToMail"
                >
                  example@gmail.com
                </NuxtLink>
              </div>
            </div>
            <div class="flex space-x-5 md:space-x-6 item">
              <img
                class="h-[52px] w-[52px] xl:h-[60px] xl:w-[60px]"
                src="/icons/call.svg"
                alt=""
              />
              <div class="details flex flex-col">
                <h4 class="text-xl xl:text-2xl font-medium mb-1.5">
                  {{ $t("call") }}
                </h4>
                <NuxtLink
                  class="text-base md:text-lg text-light-white"
                  :to="`tel:+8801752-202128`"
                  aria-label="GoToPhone"
                >
                  +8801752-202128
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="flex space-x-5 md:space-x-6 justify-center">
            <NuxtLink
              target="_blank"
              aria-label="Fiverr Outsourcing Institute Telegram"
              :to="localePath('/')"
            >
              <img
                class="social-icon"
                src="/images/homepage/telegram.svg"
                alt="Fiverr Outsourcing Institute Telegram"
              />
            </NuxtLink>
            <NuxtLink
              to="https://api.whatsapp.com/message/73TPMPASRNJ5C1"
              target="_blank"
              aria-label="whatsapp"
            >
              <SvgWhatsapp class="social-icon" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card-shadow {
  box-shadow: 0px -4px 4px 0px #00000040;
}
.provider-card-top-shadow {
  box-shadow: 0px -4px 4px 0px #00000040, 0px 4px 4px 0px #00000040;
}
.contact-wrapper {
  @apply justify-center lg:justify-between;
}
.appointment-address {
  height: auto;
  width: 610px;
  min-height: 634px;
}
.details {
  max-width: 230px;
}
.social-icon {
  @apply w-[52px] h-[52px];
}
@media (min-width: 2048px) and (max-width: 2560px) {
  .contact-area {
    padding-left: 14%;
    padding-right: 14%;
  }
}
@media (min-width: 1024px) and (max-width: 1230px) {
  .contact-area {
    padding-left: 7%;
    padding-right: 7%;
  }
  .appointment-address {
    width: 602px;
    min-height: 634px;
  }
  .details {
    max-width: 230px;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .appointment-address {
    width: 100%;
    min-height: 550px;
  }
}
@media (min-width: 300px) and (max-width: 767px) {
  .appointment-address {
    width: 100%;
    min-height: 550px;
  }
  .details {
    max-width: 230px;
  }
}

select {
  -webkit-appearance: none;
  appearance: none;
  color: var(--text-color);
  opacity: var(--text-opacity);
}
option:not(:first-of-type) {
  color: #000;
}

.select-wrapper {
  position: relative;
}

.select-toggle {
  color: #000;
  height: 24px;
  @apply absolute top-4 right-3 pointer-events-none;
  padding-left: 3px !important;
}
</style>
