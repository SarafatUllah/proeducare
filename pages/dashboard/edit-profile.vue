<script setup>
import { storeToRefs } from "pinia";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useCoursesStore } from "~/stores/courses.ts";
const props = defineProps({
  profile: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["updateProfile"]);

const { apiBaseUrl } = useUrls();
const { isRequired, validatePassword, isWithinCharactersLimit } =
  useValidation();
const { setCurrentComp } = useCoursesStore();
const { currentComp } = storeToRefs(useCoursesStore());
const tokenCookie = useCookie("token");
const nuxtApp = useNuxtApp();
const { t } = useI18n();

const currentTab = ref("Profile");
const setCurrentTab = (tab) => {
  currentTab.value = tab;
};

const profile = ref({
  firstName: props.profile?.first_name,
  lastName: props.profile?.last_name,
  username: props.profile?.username,
  email: props.profile?.email,
  phone: props.profile?.phone,
  occupation: props.profile?.occupations,
  language: props.profile?.language ? props.profile?.language : "English (US)",
  bio: props.profile?.bio,
});
const isUpdating = ref(false);
watch(
  profile.value,
  () => {
    isUpdating.value = true;
  },
  { deep: true }
);

const password = ref({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const profilePreview = ref(null);
const profileImage = ref(null);
const coverPreview = ref(null);
const coverImage = ref(null);

const onProfileUpload = async (event) => {
  isUpdating.value = true;
  let selectedFile = event.target.files[0];
  let reader;
  const files = event.target.files;
  if (files.length > 0) {
    reader = new FileReader();
    reader.onload = (event) => {
      profilePreview.value = event.target.result;
      profileImage.value = selectedFile;
    };
    reader.readAsDataURL(files[0]);
  }
};

const onCoverUpload = async (event) => {
  isUpdating.value = true;
  let selectedFile = event.target.files[0];
  let reader;
  const files = event.target.files;
  if (files.length > 0) {
    reader = new FileReader();
    reader.onload = (event) => {
      coverPreview.value = event.target.result;
      coverImage.value = selectedFile;
    };
    reader.readAsDataURL(files[0]);
  }
};

const submitProfileForm = async () => {
  if (
    profile.value.phone !== "" &&
    profile.value?.firstName.length < 21 &&
    profile.value?.lastName.length < 21 &&
    profile.value?.occupation.length < 31 &&
    profile.value?.username.length < 21
  ) {
    const {
      data: userData,
      pending,
      error,
    } = useFetch(`${apiBaseUrl}/auth/users/${props.profile?.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
      body: {
        first_name: profile.value?.firstName,
        last_name: profile.value?.lastName,
        username: profile.value?.username,
        email: profile.value?.email,
        phone: profile.value?.phone,
        bio: profile.value?.bio,
        occupations: profile.value?.occupation,
        location: profile.value?.location,
      },
    });

    if (profileImage.value) {
      const profileFormData = new FormData();
      profileFormData.append("image", profileImage.value);
      await useFetch(
        `${apiBaseUrl}/auth/users/${props.profile?.id}/profile-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
          body: profileFormData,
        }
      );
    }

    if (coverImage.value) {
      const coverFormData = new FormData();
      coverFormData.append("cover_image", coverImage.value);
      await useFetch(
        `${apiBaseUrl}/auth/users/${props.profile?.id}/cover-image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
          body: coverFormData,
        }
      );
    }

    const setData = () => {
      if (!pending.value) {
        if (userData.value) {
          if (userData.value.user) {
            isUpdating.value = false;
            nuxtApp.$toast("clear");
            nuxtApp.$toast("success", {
              message: t("messages.profile_updated"),
              className: "toasted-bg-success",
            });
            focusValue.value = "";
          }
          emit("updateProfile");
        } else if (error.value) {
          isUpdating.value = false;
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: error.value?.data.message.username
              ? error.value?.data.message.username
              : error.value?.data.message.phone
              ? error.value?.data.message.phone
              : t("messages.something_wrong"),
            className: "toasted-bg-alert",
          });
        }
      } else {
        setTimeout(() => {
          setData();
        }, 300);
      }
    };
    setData();
  } else {
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message:
        profile.value.phone === ""
          ? t("messages.phone_field_required")
          : t("messages.some_field_not_valid"),
      className: "toasted-bg-alert",
    });
    isUpdating.value = false;
  }
};

const submitPasswordForm = async () => {
  const { data, error } = await useFetch(
    `${apiBaseUrl}/auth/users/${props.profile?.id}/password`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
      body: {
        password: password.value?.newPassword,
        password_confirmation: password.value?.confirmPassword,
        current_password: password.value?.currentPassword,
      },
    }
  );
  if (data.value && data.value.user) {
    nuxtApp.$toast("clear");
    nuxtApp.$toast("success", {
      message: t("messages.password_updated"),
      className: "toasted-bg-success",
    });
    focusValue.value = "";
  } else {
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: `${
        error.value.data.message.password
          ? error.value.data.message.password
          : error.value.data.message.current_password
          ? error.value.data.message.current_password
          : error.value.data.message
      }`,
      className: "toasted-bg-alert",
    });
  }
};
const options = [
  { title: "Profile", componentName: "Profile" },
  { title: "Password", componentName: "Password" },
  { title: "Social Profile", componentName: "Social Profile" },
];
setCurrentComp("Profile");
const focusValue = ref("");
const setFocusValue = (value) => {
  focusValue.value = value;
};
const toggleCurrentPass = ref(false);
const toggleNewPass = ref(false);
const toggleRetypeNewPass = ref(false);
const formSchema = {
  fields: [
    {
      label: "Language",
      name: "language",
      as: "select",
      children: [
        {
          tag: "option",
          value: "English (US)",
          text: "English (US)",
        },
        {
          tag: "option",
          value: "বাংলা (BN)",
          text: "বাংলা (BN)",
        },
        // {
        //   tag: "option",
        //   value: "tea",
        //   text: "Tea",
        // },
        // {
        //   tag: "option",
        //   value: "coke",
        //   text: "Coke",
        // },
      ],
    },
  ],
};
const socialSchema = {
  fields: [
    {
      image: "/images/dashboard/website.svg",
      label: "Website",
      placeholder: 'https://example.com',
      name: "website",
      as: "input",
      rules: "required",
    },
    {
      image: "/images/dashboard/Facebook.svg",
      label: "Facebook",
      placeholder: 'https://facebook.com/username',
      name: "facebook",
      as: "input",
      rules: "required",
    },
    {
      image: "/images/dashboard/Instagram.svg",
      label: "Instagram",
      placeholder: 'https://www.instagram.com/username',
      name: "instagram",
      as: "input",
      rules: "required",
    },
    {
      image: "/images/dashboard/LinkedIn.svg",
      label: "LinkedIn",
      placeholder: 'https://www.linkedin.com/username',
      name: "linkedIn",
      as: "input",
      rules: "required",
    },
    {
      image: "/images/dashboard/Twitter.svg",
      label: "Twitter",
      placeholder: 'https://twitter.com/username',
      name: "twitter",
      as: "input",
      rules: "required",
    },
    {
      image: "/images/dashboard/github.svg",
      label: "Github",
      placeholder: 'https://github.com/username',
      name: "github",
      as: "input",
      rules: "required",
    },
  ],
};
</script>

<template>
  <div class="py-5 md:py-10 !pt-2">
    <Menu :menuItems="options" :subQuery="false" />
    <Transition name="fade" mode="out-in">
      <div v-if="currentComp === 'Profile'" class="">
        <div class="mt-8">
          <!-- :style="
              coverPreview
                ? { backgroundImage: `url('${coverPreview}')` }
                : { backgroundImage: `url('${props.profile?.cover_image}')` }
            " 
            class="relative bg-cover bg-top bg-[#363b64] h-[280px] lg:!h-[300px] xl:!h-[350px] w-full"
            -->
          <div
            class="relative bg-cover bg-top bg-white h-full w-full flex space-x-[41px]"
          >
            <label class="text-base font-semibold text-[#606568]">Avater</label>
            <div class="w-full relative">
              <div
                class="bg-[#D9D9D9] overflow-hidden h-28 w-28 md:!w-[150px] md:!h-[150px] border-white border-[3px] rounded-full flex justify-center items-center"
              >
                <img
                  v-if="!profilePreview && !props.profile?.image"
                  class="w-full h-full object-cover object-top"
                  src="/images/dashboard/default_avater.svg"
                  :alt="profile.name"
                />
                <img
                  v-else
                  class="w-full h-full object-cover object-top"
                  :src="profilePreview ? profilePreview : props.profile?.image"
                  :alt="profile.name"
                />

                <input
                  ref="profileInput"
                  style="display: none"
                  type="file"
                  accept="image/*"
                  @change="onProfileUpload"
                />
              </div>

              <ClientOnly>
                <div
                  class="flex justify-center items-center p-1.5 shadow-md bg-[#ECECEC] w-6 h-6 rounded-full absolute top-0 left-[100px]"
                >
                  <fa
                    class="text-[#515B6F] w-4 h-4 cursor-pointer"
                    :icon="['fas', 'pencil-alt']"
                    @click.stop="$refs.profileInput.click()"
                  />
                </div>
              </ClientOnly>
              <p>Allowed file types: png, jpg, jpeg, svg.</p>
            </div>

            <!-- <div>
              <div class="flex flex-col items-center pt-8 md:!hidden">
                <div
                  class="w-[60px] h-[60px] cursor-pointer"
                  @click.stop="$refs.coverInput.click()"
                >
                  <IconsImage class="min-w-full" />
                </div>
                <span class="text-base text-[#0000001e] font-bold"
                  >335x230</span
                >
              </div>
              <div
                class="hidden absolute bottom-5 right-5 bg-primary-red md:!flex items-center space-x-4 h-[50px] px-5 cursor-pointer"
                @click.stop="$refs.coverInput.click()"
              >
                <IconsImage class="w-6" />
                <span class="text-base text-white font-bold">{{
                  $t("upload_cover_photo")
                }}</span>
              </div>
              <input
                ref="coverInput"
                style="display: none"
                type="file"
                accept="image/*"
                @change="onCoverUpload"
              />
            </div> -->
          </div>
          <!-- <div class="md:flex justify-between items-center pt-3.5 hidden">
            <span></span>
            <div class="flex items-center text-sm space-x-2.5">
              <IconsWarning />
              <p class="pr-2.5">
                {{ $t("profile_photo_size") }} :
                <span class="font-semibold">200x200</span> {{ $t("pixels") }}
              </p>
              <p>
                {{ $t("cover_photo_size") }} :
                <span class="font-semibold">955x350</span> {{ $t("pixels") }}
              </p>
            </div>
          </div> -->
        </div>
        <Form
          @submit="submitProfileForm"
          @keypress.enter="submitProfileForm"
          v-slot="{ meta }"
          class="pt-6"
        >
          <div class="flex flex-col space-y-[26px]">
            <div
              class="flex flex-col md:!flex-row md:!space-x-5 space-y-5 md:!space-y-0 w-full"
            >
              <div class="flex flex-col space-y-4 w-full md:!w-1/2">
                <div
                  class="w-full relative"
                  @focusin="setFocusValue('firstName')"
                  @focusout="setFocusValue('')"
                >
                  <label
                    for="firstName"
                    tabindex="0"
                    class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                    :class="
                      !profile.firstName && focusValue !== 'firstName'
                        ? 'text-base top-1/2 -translate-y-1/2'
                        : 'text-sm top-[-8px] bg-white '
                    "
                    >{{ $t("first_name") }}*</label
                  >
                  <Field
                    v-model="profile.firstName"
                    id="firstName"
                    name="firstName"
                    class="border border-[#9C9C9C] rounded-md px-3 py-3 outline-none w-full"
                    type="text"
                    rules="required|maxLength:20"
                  />
                </div>
                <ErrorMessage class="error-message" name="firstName" />
              </div>
              <div class="flex flex-col space-y-4 w-full md:!w-1/2">
                <div
                  class="w-full relative"
                  @focusin="setFocusValue('lastName')"
                  @focusout="setFocusValue('')"
                >
                  <label
                    for="lastName"
                    tabindex="0"
                    class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                    :class="
                      !profile.lastName && focusValue !== 'lastName'
                        ? 'text-base top-1/2 -translate-y-1/2'
                        : 'text-sm top-[-8px] bg-white '
                    "
                    >{{ $t("last_name") }}*</label
                  >
                  <Field
                    v-model="profile.lastName"
                    id="lastName"
                    name="lastName"
                    class="border border-[#9C9C9C] rounded-md px-3 py-3 outline-none w-full"
                    type="text"
                    rules="required|maxLength:20"
                  />
                </div>
                <ErrorMessage class="error-message" name="lastName" />
              </div>
            </div>
            <div
              class="flex flex-col md:!flex-row md:!space-x-5 space-y-5 md:!space-y-0 w-full"
            >
              <div class="flex flex-col space-y-4 w-full md:!w-1/2">
                <div
                  class="w-fill relative"
                  @focusin="setFocusValue('username')"
                  @focusout="setFocusValue('')"
                >
                  <label
                    for="username"
                    tabindex="0"
                    class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                    :class="
                      !profile.username && focusValue !== 'username'
                        ? 'text-base top-1/2 -translate-y-1/2'
                        : 'text-sm top-[-8px] bg-white '
                    "
                    >{{ $t("user_name") }}*</label
                  >
                  <Field
                    v-model="profile.username"
                    id="username"
                    name="username"
                    class="border border-[#9C9C9C] rounded-md px-3 py-3 outline-none w-full"
                    type="text"
                    rules="required|maxLength:20"
                  />
                </div>
                <ErrorMessage class="error-message" name="username" />
              </div>
              <div class="flex flex-col space-y-4 w-full md:!w-1/2">
                <div
                  class="w-fill relative"
                  @focusin="setFocusValue('phone')"
                  @focusout="setFocusValue('')"
                >
                  <label
                    for="phone"
                    tabindex="0"
                    class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                    :class="
                      !profile.phone && focusValue !== 'phone'
                        ? 'text-base top-1/2 -translate-y-1/2'
                        : 'text-sm top-[-8px] bg-white '
                    "
                    >{{ $t("phone") }}*</label
                  >
                  <Field
                    v-model="profile.phone"
                    id="phone"
                    name="phone"
                    class="border border-[#9C9C9C] rounded-md px-3 py-3 outline-none w-full"
                    type="phone"
                    rules="required"
                  />
                </div>
                <ErrorMessage class="error-message" name="phone" />
              </div>
            </div>
            <div
              class="flex flex-col md:!flex-row md:!space-x-5 space-y-5 md:!space-y-0 w-full"
            >
              <div class="flex flex-col space-y-4 w-full md:!w-1/2">
                <div
                  class="w-full relative"
                  @focusin="setFocusValue('occupation')"
                  @focusout="setFocusValue('')"
                >
                  <label
                    for="occupation"
                    tabindex="0"
                    class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                    :class="
                      !profile.occupation && focusValue !== 'occupation'
                        ? 'text-base top-1/2 -translate-y-1/2'
                        : 'text-sm top-[-8px] bg-white '
                    "
                    >{{ $t("occupation") }}</label
                  >
                  <Field
                    v-model="profile.occupation"
                    id="occupation"
                    name="occupation"
                    class="border border-[#9C9C9C] rounded-md px-3 py-3 outline-none w-full"
                    type="text"
                    rules="maxLength:30"
                  />
                </div>
                <ErrorMessage class="error-message" name="occupation" />
              </div>
              <div class="flex flex-col space-y-4 w-full md:!w-1/2">
                <div
                  class="w-full relative"
                  v-for="{
                    as,
                    name,
                    label,
                    children,
                    ...attrs
                  } in formSchema.fields"
                  :key="name"
                >
                  <label
                    for="location"
                    class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out text-sm top-[-8px] bg-white"
                    >{{ $t("location") }}</label
                  >
                  <Field
                    :as="as"
                    :id="name"
                    :name="name"
                    v-bind="attrs"
                    v-model="profile.language"
                    class="border border-[#9C9C9C] rounded-md px-3 py-3 outline-none w-full"
                  >
                    <template v-if="children && children.length">
                      <component
                        v-for="({ tag, text, ...childAttrs }, idx) in children"
                        :key="idx"
                        :is="tag"
                        v-bind="childAttrs"
                      >
                        {{ text }}
                      </component>
                    </template>
                  </Field>
                </div>
              </div>
            </div>
            <div class="flex flex-col space-y-4 w-full">
              <div
                class="w-full relative"
                @focusin="setFocusValue('bio')"
                @focusout="setFocusValue('')"
              >
                <label
                  for="bio"
                  tabindex="0"
                  class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                  :class="
                    !profile.bio && focusValue !== 'bio'
                      ? 'text-base top-4'
                      : 'text-sm top-[-8px] bg-white '
                  "
                  >{{ $t("biography") }}</label
                >
                <Field
                  v-model="profile.bio"
                  as="textarea"
                  id="bio"
                  name="bio"
                  class="border border-[#9C9C9C] rounded-md px-3 py-3 outline-none w-full"
                  type="text"
                  rows="3"
                  rules="maxLength:140"
                ></Field>
              </div>
              <ErrorMessage class="error-message" name="bio" />
            </div>

            <button
              class="orange_button ml-auto !mt-[30px]"
              type="submit"
              :disabled="!meta.valid || !isUpdating"
            >
              {{ $t("update_profile") }}
            </button>
          </div>
        </Form>
      </div>
      <div v-else-if="currentComp === 'Password'" class="mt-[50px]">
        <Form
          @submit="submitPasswordForm"
          @keypress.enter="submitPasswordForm"
          v-slot="{ meta }"
        >
          <div class="flex flex-col space-y-5 w-full lg:!w-[80%] xl:!w-[60%]">
            <div
              class="flex flex-col w-full relative"
              @focusin="setFocusValue('currentPassword')"
              @focusout="setFocusValue('')"
            >
              <label
                for="currentPassword"
                tabindex="0"
                class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                :class="
                  !password.currentPassword && focusValue !== 'currentPassword'
                    ? 'text-base top-1/2 -translate-y-1/2'
                    : 'text-sm top-[-8px] bg-white '
                "
                >{{ $t("current_password") }}</label
              >
              <Field
                v-model="password.currentPassword"
                id="currentPassword"
                name="currentPassword"
                class="border border-[#9C9C9C] rounded-md px-4 py-3 outline-none"
                :type="toggleCurrentPass ? 'text' : 'password'"
                rules="required|minLength:8"
              />
              <ClientOnly>
                <fa
                  class="text-[#313131] cursor-pointer w-6 h-6 absolute transform top-1/2 -translate-y-1/2 right-4"
                  :icon="['fas', !toggleCurrentPass ? 'eye-slash' : 'eye']"
                  @click="toggleCurrentPass = !toggleCurrentPass"
                />
              </ClientOnly>
            </div>
            <ErrorMessage class="error-message" name="currentPassword" />
            <div
              class="flex flex-col w-full relative"
              @focusin="setFocusValue('newPassword')"
              @focusout="setFocusValue('')"
            >
              <label
                for="newPassword"
                tabindex="1"
                class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                :class="
                  !password.newPassword && focusValue !== 'newPassword'
                    ? 'text-base top-1/2 -translate-y-1/2'
                    : 'text-sm top-[-8px] bg-white'
                "
                >{{ $t("new_password") }}</label
              >
              <Field
                v-model="password.newPassword"
                id="newPassword"
                name="newPassword"
                class="border border-[#9C9C9C] rounded-md px-4 py-3 outline-none"
                :type="toggleNewPass ? 'text' : 'password'"
                rules="required|minLength:8"
              />
              <ClientOnly>
                <fa
                  class="text-[#313131] cursor-pointer w-6 h-6 absolute transform top-1/2 -translate-y-1/2 right-4"
                  :icon="['fas', !toggleNewPass ? 'eye-slash' : 'eye']"
                  @click="toggleNewPass = !toggleNewPass"
                />
              </ClientOnly>
            </div>
            <ErrorMessage class="error-message" name="newPassword" />
            <div
              class="flex flex-col w-full relative"
              @focusin="setFocusValue('confirmPassword')"
              @focusout="setFocusValue('')"
            >
              <label
                for="confirmPassword"
                tabindex="1"
                class="absolute cursor-text transform left-4 transition-all duration-300 ease-in-out"
                :class="
                  !password.confirmPassword && focusValue !== 'confirmPassword'
                    ? 'text-base top-1/2 -translate-y-1/2'
                    : 'text-sm top-[-8px] bg-white'
                "
                >{{ $t("confirm_new_password") }}</label
              >
              <Field
                v-model="password.confirmPassword"
                id="confirmPassword"
                name="confirmPassword"
                class="border border-[#9C9C9C] rounded-md px-4 py-3 outline-none"
                :type="toggleRetypeNewPass ? 'text' : 'password'"
                rules="required|confirmed:@newPassword"
              />
              <ClientOnly>
                <fa
                  class="text-[#313131] cursor-pointer w-6 h-6 absolute transform top-1/2 -translate-y-1/2 right-4"
                  :icon="['fas', !toggleRetypeNewPass ? 'eye-slash' : 'eye']"
                  @click="toggleRetypeNewPass = !toggleRetypeNewPass"
                />
              </ClientOnly>
            </div>
            <ErrorMessage class="error-message" name="confirmPassword" />
            <button
              class="orange_button mr-auto !mt-[30px] disabled:opacity-70"
              type="submit"
              :disabled="!meta.valid"
            >
              {{ $t("reset_password") }}
            </button>
          </div>
        </Form>
      </div>
      <div v-else-if="currentComp === 'Social Profile'" class="mt-10">
        <Form class="flex flex-col space-y-[32px]" v-slot="{ meta }">
          <divƒ
            v-for="{
              as,
              name,
              image,
              label,
              rules,
              ...attrs
            } in socialSchema.fields"
            :key="name"
          >
            <div class="flex space-x-[59px] items-center">
              <div class="flex items-center space-x-4 w-36">
                <div
                  class="w-10 h-10 rounded-full bg-[#515B6F] bg-opacity-10 flex justify-center items-center"
                >
                  <img :src="image" :alt="name" />
                </div>
                <label :for="name">{{ label }}</label>
              </div>
              <div class="flex flex-col flex-grow">
                <Field
                  :as="as"
                  :id="name"
                  :name="name"
                  :rules="rules"
                  class="border border-[#9C9C9C] rounded-md px-4 py-3 outline-none"
                  v-bind="attrs"
                ></Field>
                <ErrorMessage class="error-message" :name="name" />
              </div>
            </div>
          </divƒ>
          <button
            class="orange_button ml-auto !mt-[30px] disabled:opacity-70"
            type="submit"
            :disabled="!meta.valid"
          >
            Update Social
          </button>
        </Form>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.input-wrapper {
  @apply flex flex-col md:!flex-row items-start md:!items-center w-full space-y-3 md:!space-y-0;
}
</style>
