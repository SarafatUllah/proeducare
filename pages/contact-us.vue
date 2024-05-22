<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";

const { isRequired, validateEmail, validatePhone } = useValidation();
const { CONTACT_US, FAQS } = useUrls();
const { $toast } = useNuxtApp();
const localePath = useLocalePath();
const { t } = useI18n();

const { data: allFaqs } = await useFetch(`${FAQS}`);

const contactForm = reactive({
  name: "",
  email: "",
  question: "",
});

const submitForm = async () => {
  if (contactForm.name && contactForm.email && contactForm.question) {
    const { data, error } = await useFetch(CONTACT_US, {
      method: "POST",
      body: JSON.stringify({
        name: contactForm.name,
        email: contactForm.email,
        description: contactForm.question,
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
onMounted(() => {
  window.scrollTo(0, 0);
});
const selectedId = ref(null);
const toggle = (id) => {
  if (selectedId.value === null) {
    selectedId.value = id;
  } else if (selectedId.value !== id) {
    selectedId.value = id;
  } else if (selectedId.value === id) {
    selectedId.value = null;
  }
};
const getHeight = (id) => {
  const height = document.getElementById(id).clientHeight;
  return height;
};
</script>

<template>
  <div>
    <section id="contact-us" class="bg-[#FFF9F6] relative">
      <div
        class="custom-container xl:!pt-[97px] !pt-[107px] flex md:flex-row flex-col md:space-x-[53px] md:space-y-0 space-y-10 md:justify-center"
      >
        <div
          class="md:w-[44%] w-full flex flex-col space-y-11 md:items-start items-center"
        >
          <div class="md:text-left text-center">
            <p class="frame">{{ $t("contact_us") }}</p>
            <h1 class="h_tag_primary sm:!leading-[57px] mt-[10px]">
              {{ $t("contact_title") }}
            </h1>
            <p class="p_tag_secondary mt-[22px]">
              {{ $t("contact_sub") }}
            </p>
          </div>
          <ul class="flex flex-col space-y-[26px]">
            <li class="flex flex-row flex-nowrap space-x-[21px] items-center">
              <div
                class="flex justify-center items-center w-[54px] h-[54px] p-[11px] bg-[#FF6E1F] bg-opacity-[0.22] rounded-lg"
              >
                <img
                  class="social_icon"
                  src="~/assets/img/contact-us/orange-mail.svg"
                  alt="orange-circle-check-list icon"
                />
              </div>
              <p class="md:font-semibold font-normal text-[#313131]">
                info@proeducare.com
              </p>
            </li>
            <li class="flex flex-row flex-nowrap space-x-[21px] items-center">
              <div
                class="flex justify-center items-center w-[54px] h-[54px] p-[11px] bg-[#FF6E1F] bg-opacity-[0.22] rounded-lg"
              >
                <img
                  class="social_icon"
                  src="~/assets/img/contact-us/orange-phone.svg"
                  alt="orange-circle-check-list icon"
                />
              </div>
              <p class="md:font-semibold font-normal text-[#313131]">
                +880 1326 506464 (Call / WhatsApp)
              </p>
            </li>
            <li class="flex flex-row flex-nowrap space-x-[21px] items-center">
              <div
                class="flex justify-center items-center w-[54px] h-[54px] p-[11px] bg-[#FF6E1F] bg-opacity-[0.22] rounded-lg"
              >
                <img
                  class="social_icon"
                  src="~/assets/img/contact-us/orange-location.svg"
                  alt="orange-circle-check-list icon"
                />
              </div>
              <div class="flex flex-col">
                <p class="md:font-semibold font-normal text-[#313131]">
                  158/27, Boalia, Kazla,
                </p>
                <p class="md:font-semibold font-normal text-[#313131]">
                  Rajshahi-6204,
                </p>
                <p class="md:font-semibold font-normal text-[#313131]">
                  Bangladesh
                </p>
              </div>
            </li>
          </ul>
        </div>
        <Form
          class="md:w-[56%] w-full flex flex-col space-y-[21px] lg:p-[54px] p-6 form_box"
          novalidate
          @submit="submitForm"
          v-slot="{ meta }"
        >
          <div class="w-full space-y-1.5">
            <Field
              id="name"
              type="text"
              name="name"
              class="form_input"
              :placeholder="$t('name_placeholder')"
              v-model="contactForm.name"
              :rules="isRequired"
            />
            <ErrorMessage class="error-message" name="name" />
          </div>
          <div class="w-full space-y-1.5">
            <Field
              id="email"
              type="email"
              name="email"
              class="form_input"
              :placeholder="$t('email_placeholder')"
              v-model="contactForm.email"
              :rules="validateEmail"
            />
            <ErrorMessage class="error-message" name="email" />
          </div>
          <div class="flex flex-col w-full space-y-1.5">
            <Field
              as="textarea"
              id="question"
              name="question"
              class="form_input"
              :placeholder="$t('question_placeholder')"
              rows="10"
              v-model="contactForm.question"
              :rules="isRequired"
            ></Field>
            <ErrorMessage class="error-message" name="question" />
          </div>
          <div class="flex justify-start items-center !mt-[42px]">
            <button
              class="orange_button flex items-center justify-center space-x-3 mx-auto md:ml-0"
              :class="!meta.valid ? ' !opacity-50 cursor-not-allowed' : ''"
              :disabled="!meta.valid"
              type="submit"
            >
              <span>{{ $t("contact_us_btn") }}</span>
              <IconsLeftArrow class="w-6 h-6 text-white" color="#FFFFFF" />
            </button>
          </div>
        </Form>
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
    <!-- <section id="faq">
      <div class="custom-container xl:!pt-[97px] !pt-[107px]">
        <div class="w-full flex flex-col space-y-[75px] items-center">
          <div class="text-center">
            <p class="frame">FAQS</p>
            <h2 class="h_tag_primary sm:!leading-[57px] mt-[10px]">
              Frequently Asked Qustions
            </h2>
          </div>
          <ul
            v-if="allFaqs.data && allFaqs.data.length > 0"
            class="flex flex-col space-y-[26px] w-full"
          >
            <li
              v-for="(faq, index) in allFaqs.data"
              :key="index"
              class="flex flex-col md:p-[42px] p-[24px] bg-[#FFF9F6] rounded-[22px] border-[0.884px] border-[#F5F5F5]"
              :class="
                selectedId === faq.id
                  ? 'border-b border-[#ECEDF3] transition-all duration-500 ease-in-out'
                  : ''
              "
            >
              <div
                class="flex justify-between space-x-5 md:items-start items-center cursor-pointer pb-[6px]"
                :class="
                  selectedId === faq.id
                    ? 'border-b border-[#ECEDF3] transition-all duration-500 ease-in-out'
                    : ''
                "
                @click="toggle(faq.id)"
              >
                <h2
                  class="h_tag_forth transition-all duration-500 ease-in-out"
                  :class="selectedId === faq.id ? ' font-bold' : 'font-medium'"
                >
                  {{ faq.question }}
                </h2>
                <IconsLeftArrow
                  class="w-6 min-w-6 h-6 min-h-6 transition-all duration-500 ease-in-out"
                  :color="selectedId === faq.id ? '#515B6F' : '#313131'"
                  :class="
                    selectedId === faq.id
                      ? 'rotate-[450deg]'
                      : 'opacity-30 rotate-[270deg]'
                  "
                />
              </div>
              <div
                class="overflow-hidden transition-all duration-500 ease-in-out"
                :style="{
                  '--height':
                    selectedId === faq.id ? getHeight(faq.id) + 'px' : '',
                }"
                :class="
                  selectedId === faq.id
                    ? 'answer_height opacity-100 !mt-[24px]'
                    : 'h-0 opacity-0 !mt-0'
                "
              >
                <p :id="faq.id" class="p_tag_secondary" v-html="faq.answer"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section> -->
    <!-- <section id="office-location" class="bg-[#FFF9F6]">
      <div
        class="custom-container !pt-[75px] flex flex-col md:space-y-[51px] space-y-10 items-center"
      >
        <div class="text-center">
          <h2 class="h_tag_primary sm:!leading-[57px]">Our Office Location</h2>
        </div>
        <iframe
          class="w-full rounded-[35px] md:h-[600px] h-[360px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3634.430075979891!2d88.62038707561025!3d24.366337864851182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fbeff869996ac1%3A0x68682d5dd56ea0ce!2sDeveloper%20eXperience%20Hub!5e0!3m2!1sen!2sbd!4v1707310400666!5m2!1sen!2sbd"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
.form_box {
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02);
}
.form_input {
  width: 100%;
  border-radius: 14px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.07);
  @apply md:text-lg text-base text-[#515B6F] md:py-[30px] md:px-[23px] p-[20px] outline-none;
}
.social_icon {
  @apply w-[31px] h-[31px];
}
.answer_height {
  height: var(--height);
}
</style>
