<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";

const { isRequired, validateEmail, validatePhone } = useValidation();
const { SEMINAR_ATTENDEES, COURSES } = useUrls();
const { $toast } = useNuxtApp();
const localePath = useLocalePath();
const { t } = useI18n();
const route = useRoute();

const { data } = useFetch(COURSES);
const courses = computed(() => data.value?.data);

const contactForm = reactive({
  name: "",
  email: "",
  phone: "",
  address: "",
  color: "#767474",
  opacity: 50,
});

const selectedCourse = ref(null);
const setSelectedCourse = (item) => {
  selectedCourse.value = item;
};

const showCourseDropdown = ref(false);
const toggleCourseDropdown = () => {
  showCourseDropdown.value = !showCourseDropdown.value;
};
const isMouseOverOnCourse = ref(false);

const mouseOverOnCourse = () => {
  isMouseOverOnCourse.value = true;
};
const mouseLeaveFromCourse = () => {
  isMouseOverOnCourse.value = false;
  setTimeout(() => {
    showCourseDropdown.value = false;
  }, 200);
};

const submitForm = async (values, actions) => {
  if (
    contactForm.name &&
    contactForm.email &&
    contactForm.phone &&
    contactForm.address &&
    selectedCourse.value
  ) {
    const { data, error } = await useFetch(SEMINAR_ATTENDEES, {
      method: "POST",
      body: JSON.stringify({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        address: contactForm.address,
        seminar_id: route.params.slug,
        course_id: selectedCourse.value?.id,
      }),
    });
    if (!error.value && data.value) {
      $toast("clear");
      $toast("success", {
        message: data.value.message,
        className: "toasted-bg-success",
      });
      selectedCourse.value = null;
      actions.resetForm();
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
</script>

<template>
  <section class="custom-container h-full py-24">
    <h1 class="text-center font-semibold text-primary-red text-3xl lg:text-5xl">
      {{ $t("join_free_seminar") }}
    </h1>

    <div class="w-full h-full pt-16">
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
            <label for="subject">{{ $t("select_course") }} </label>
            <div
              @mouseover="mouseOverOnCourse"
              @mouseleave="mouseLeaveFromCourse"
              class="w-full bg-white outline-none py-3 h-[58px] rounded-lg shadow-3xl border border-black relative flex justify-start items-center"
            >
              <p
                @click="toggleCourseDropdown"
                class="flex items-center justify-between gap-2 cursor-pointer w-full h-[56px] px-3"
              >
                <span :class="!selectedCourse ? 'opacity-50' : 'opacity-100'">{{
                  selectedCourse ? selectedCourse.title : $t("select_course")
                }}</span>
                <IconsChevronDown
                  class="w-4 transition-all duration-300 ease-in-out"
                  :class="showCourseDropdown ? 'rotate-180' : 'rotate-0'"
                />
              </p>
              <ul
                v-if="showCourseDropdown"
                class="w-full absolute left-0 top-14 shadow-xl border bg-white max-h-[500px] overflow-y-auto"
              >
                <li
                  class="text-black px-4 h-10 flex items-center w-full justify-start opacity-50 hover:bg-gray-200"
                >
                  {{ $t("select_course") }}
                </li>
                <li
                  v-for="item in courses"
                  :key="item.id"
                  @click="setSelectedCourse(item)"
                  class="text-black px-4 h-10 flex items-center w-full justify-start cursor-pointer hover:bg-gray-200"
                >
                  <div>{{ item.title }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full space-y-1.5">
          <label class="text-black"
            >{{ $t("your_address") }}
            <span class="text-[#ff0000]">*</span></label
          >
          <Field
            as="textarea"
            id="address"
            name="address"
            class="p-4 w-full outline-none rounded-lg shadow-3xl border border-black resize-none"
            :placeholder="$t('your_address')"
            rows="10"
            v-model="contactForm.address"
            :rules="isRequired"
          ></Field>
          <ErrorMessage class="error-message" name="address" />
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
            {{ $t("submit") }}
          </button>
        </div>
      </Form>
    </div>
  </section>
</template>

<style scoped>
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
