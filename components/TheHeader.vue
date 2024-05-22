<script setup>
import { storeToRefs } from "pinia";
import { useDashboardStore } from "~/stores/dashboard";
import { useCartDataStore } from "~/stores/cartData";

const { setShowProfileOptions, setShowNotificationOptions } =
  useDashboardStore();
const {
  showProfileOptions,
  showNotificationOptions,
  allUnreadNotificationsNumber,
} = storeToRefs(useDashboardStore());
const { allCartData } = storeToRefs(useCartDataStore());
const { setAllCartData } = useCartDataStore();
const route = useRoute();
const localePath = useLocalePath();
const isSideMenuVisible = ref(false);
const tokenCookie = useCookie("token");
const { logout } = useAuth();
const cartDataCookie = useCookie("cartData");
const handleLogOut = async () => {
  await logout(tokenCookie.value);
  cartDataCookie.value = allCartData.value;
};
onMounted(() => {
  console.log(allCartData.value);
});
</script>

<template>
  <section class="border-b border-[#DBDBDB]">
    <!-- Desktop Menu -->
    <div
      class="hidden lg:flex custom-container py-[29px] items-center justify-between"
    >
      <div class="flex items-center gap-x-11 xl:gap-x-14">
        <NuxtLink :to="localePath('/')" class="flex space-x-4 items-center">
          <img
            width="120"
            height="60"
            src="~/assets/img/logo/ProEdu-Care.png"
            alt="ProEdu Care Institute logo"
          />
        </NuxtLink>
        <nav>
          <ul class="flex items-center gap-x-8 dx:gap-x-10">
            <li data-te-nav-item-ref>
              <NuxtLink
                :class="{
                  'active-menu': route.name.slice(0, -5) === 'index',
                }"
                aria-current="page"
                :to="localePath('/')"
                class="menu-item"
                data-te-nav-link-ref
                >{{ $t("menu.home") }}</NuxtLink
              >
            </li>
            <li data-te-nav-item-ref>
              <NuxtLink
                :class="{
                  'active-menu': route.name.slice(0, -5) === 'about-us',
                }"
                aria-current="page"
                :to="localePath('/about-us')"
                class="menu-item"
                data-te-nav-link-ref
                >{{ $t("menu.about") }}</NuxtLink
              >
            </li>
            <!-- <li data-te-nav-item-ref>
              <NuxtLink
                :class="{
                  'active-menu':
                    route.name.slice(0, -5) === 'admission-information',
                }"
                aria-current="page"
                :to="localePath('/admission-information')"
                class="menu-item"
                data-te-nav-link-ref
                >{{ $t("menu.getAdmissions") }}</NuxtLink
              >
            </li> -->
            <li data-te-nav-item-ref>
              <NuxtLink
                :class="{
                  'active-menu': route.name.slice(0, -5) === 'courses',
                }"
                aria-current="page"
                :to="localePath('/courses')"
                class="menu-item"
                data-te-nav-link-ref
                >{{ $t("menu.courses") }}</NuxtLink
              >
            </li>
            <!-- <li data-te-nav-item-ref>
              <NuxtLink
                :class="{
                  'active-menu': route.name.slice(0, -5) === 'blog',
                }"
                aria-current="page"
                :to="localePath('/blog')"
                class="menu-item"
                data-te-nav-link-ref
                >{{ $t("menu.blog") }}</NuxtLink
              >
            </li> -->
            <li data-te-nav-item-ref>
              <NuxtLink
                :class="{
                  'active-menu': route.name.slice(0, -5) === 'contact-us',
                }"
                aria-current="page"
                :to="localePath('/contact-us')"
                class="menu-item"
                data-te-nav-link-ref
                >{{ $t("menu.contact") }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
      <div
        v-if="!tokenCookie || tokenCookie === ''"
        class="flex items-center gap-x-6 dx:gap-x-9"
      >
        <!-- <NuxtLink to="/cart" class="relative">
          <IconsCart class="min-w-7 h-7"> </IconsCart>
          <div
            v-if="allCartData.length > 0"
            class="absolute w-5 h-5 bg-[#FF6E1F] text-white flex items-center justify-center p-[2px] top-[-8px] right-[-14px] rounded-full"
          >
            <p>{{ allCartData.length }}</p>
          </div>
        </NuxtLink> -->
        <NuxtLink
          aria-current="page"
          :to="localePath('/auth/login')"
          class="text-gray-primary text-base dx:text-lg font-medium"
          data-te-nav-link-ref
          >{{ $t("menu.signin") }}</NuxtLink
        >
        <NuxtLink
          aria-current="page"
          :to="localePath('/auth/register')"
          class="py-[13px] px-[25.5px] text-white bg-orange-primary text-base dx:text-lg font-medium rounded-[6px]"
          data-te-nav-link-ref
          >{{ $t("menu.register") }}</NuxtLink
        >
      </div>
      <!-- v-if="tokenCookie" -->
      <!-- <NuxtLink
        
        :to="localePath('/dashboard')"
        class="orange_button"
      >
        {{ $t("dashboard") }}
      </NuxtLink> -->

      <div v-if="tokenCookie" class="flex items-center space-x-[30px]">
        <!-- <NuxtLink to="/cart" class="relative">
          <IconsCart class="min-w-7 h-7"> </IconsCart>
          <div
            v-if="allCartData.length > 0"
            class="absolute w-5 h-5 bg-[#FF6E1F] text-white flex items-center justify-center p-[2px] top-[-8px] right-[-14px] rounded-full"
          >
            <p>{{ allCartData.length }}</p>
          </div>
        </NuxtLink> -->
        <div class="h-full relative">
          <IconsBell
            class="min-w-6 h-7 cursor-pointer"
            @click.stop="
              showNotificationOptions
                ? setShowNotificationOptions(false)
                : setShowNotificationOptions(true)
            "
          >
          </IconsBell>
          <div
            class="absolute w-5 h-5 bg-[#FF6E1F] text-white flex items-center justify-center p-[2px] top-[-8px] right-[-10px] rounded-full"
          >
            <p class="text-sm font-medium">
              {{ allUnreadNotificationsNumber }}
            </p>
          </div>
          <Transition name="notificationOptions">
            <Notification v-if="showNotificationOptions" />
          </Transition>
        </div>
        <div class="h-full relative">
          <IconsProfile
            class="min-w-7 h-7 cursor-pointer"
            @click.stop="
              showProfileOptions
                ? setShowProfileOptions(false)
                : setShowProfileOptions(true)
            "
          />
          <Transition name="profileOptions">
            <div
              v-if="showProfileOptions"
              class="profile_options absolute top-[82px] right-[-36px]"
            >
              <ul
                class="relative w-full h-full p-[30px] text-[#515B6F] text-lg flex flex-col space-y-[26px]"
              >
                <span class="box"></span>
                <div class="triangle-wrapper !mt-0">
                  <div class="triangle-linear-gradient-bg"></div>
                </div>
                <li class="!mt-0">
                  <NuxtLink
                    to="/dashboard/profile"
                    class="flex space-x-[31px] items-center"
                    ><IconsMyProfile class="w-[17px] h-5" />
                    <p>My Profile</p></NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/dashboard"
                    class="flex space-x-[31px] items-center"
                  >
                    <IconsDashboard class="w-5 h-4" />
                    <p>Dashboard</p></NuxtLink
                  >
                </li>
                <li>
                  <NuxtLink
                    to="/dashboard/my-courses"
                    class="flex space-x-[31px] items-center"
                    ><IconsCourses class="w-5 h-[17.7px]" />
                    <p>My Courses</p></NuxtLink
                  >
                </li>
                <li class="flex justify-between items-center">
                  <div class="flex space-x-[31px] items-center">
                    <IconsLanguage class="w-[22px] h-[19.44px]" />
                    <p>Language</p>
                  </div>
                  <div
                    class="flex space-x-[13px] items-center py-[3px] px-2 font-semibold text-sm text-[#313131] bg-[#FFF9F6]"
                  >
                    <p>ENG</p>
                    <img
                      class="w-[19px] h-[14px]"
                      src="~/assets/img/icon/usa.png"
                      alt="USA Flag"
                    />
                  </div>
                </li>
                <li>
                  <NuxtLink
                    to="/dashboard/edit-profile"
                    class="flex space-x-[31px] items-center"
                    ><IconsSettings class="w-5 h-5" />
                    <p>Account Settings</p></NuxtLink
                  >
                </li>
                <li
                  class="flex space-x-[31px] items-center cursor-pointer"
                  @click.stop="handleLogOut()"
                >
                  <IconsLogOut class="w-5 h-5" />
                  <p>Sign Out</p>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div class="block lg:hidden bg-white">
      <div class="custom-container py-[15px] flex items-center justify-between">
        <img
          @click="isSideMenuVisible = !isSideMenuVisible"
          src="/icons/icon-mobile-menu.svg"
          alt="mobile menu icon"
        />
        <NuxtLink :to="localePath('/')" class="flex gap-x-3 items-center">
          <img
            width="120"
            height="60"
            src="~/assets/img/logo/ProEdu-Care.png"
            alt="ProEdu Care Institute logo"
          />
        </NuxtLink>
        <div
          v-if="!tokenCookie || tokenCookie === ''"
          class="flex space-x-8 items-center"
        >
          <!-- <NuxtLink to="/cart" class="relative">
            <IconsCart class="min-w-7 h-7"> </IconsCart>
            <div
              v-if="allCartData.length > 0"
              class="absolute w-5 h-5 bg-[#FF6E1F] text-white flex items-center justify-center p-[2px] top-[-8px] right-[-14px] rounded-full"
            >
              <p>{{ allCartData.length }}</p>
            </div>
          </NuxtLink> -->
          <NuxtLink
            aria-current="page"
            :to="localePath('/auth/register')"
            class="py-[5px] px-[14px] text-white bg-orange-primary text-sm font-bold rounded"
            data-te-nav-link-ref
            >{{ $t("menu.signin") }}</NuxtLink
          >
        </div>
        <!-- <NuxtLink
          v-if="tokenCookie"
          data-te-nav-item-ref
          :to="localePath('/dashboard')"
          class="orange_button !py-3 !px-5"
        >
          {{ $t("dashboard") }}
        </NuxtLink> -->
        <div v-if="tokenCookie" class="flex items-center space-x-[30px]">
          <!-- <NuxtLink to="/cart" class="relative">
            <IconsCart class="min-w-7 h-7"> </IconsCart>
            <div
              class="absolute w-5 h-5 bg-[#FF6E1F] text-white flex items-center justify-center p-[2px] top-[-8px] right-[-14px] rounded-full"
            >
              <p>3</p>
            </div>
          </NuxtLink> -->
          <div class="relative">
            <IconsBell
              class="min-w-6 h-7 cursor-pointer"
              @click.stop="
                showNotificationOptions
                  ? setShowNotificationOptions(false)
                  : setShowNotificationOptions(true)
              "
            />
            <div
              class="absolute w-5 h-5 bg-[#FF6E1F] text-white flex items-center justify-center p-[2px] top-[-8px] right-[-10px] rounded-full"
            >
              <p class="text-sm font-medium">
                {{ allUnreadNotificationsNumber }}
              </p>
            </div>

            <Transition name="notificationOptions">
              <Notification v-if="showNotificationOptions" />
            </Transition>
          </div>
          <div class="h-full relative">
            <IconsProfile
              class="min-w-7 h-7 cursor-pointer"
              @click.stop="
                showProfileOptions
                  ? setShowProfileOptions(false)
                  : setShowProfileOptions(true)
              "
            />
            <Transition name="profileOptions">
              <div
                v-if="showProfileOptions"
                class="profile_options lg:absolute fixed lg:top-[82px] md:top-[122px] top-[112px] lg:right-[-36px] right-0"
              >
                <ul
                  class="relative w-full h-full p-[30px] text-[#515B6F] text-lg flex flex-col space-y-[26px]"
                >
                  <span class="box"></span>
                  <div class="triangle-wrapper !mt-0">
                    <div class="triangle-linear-gradient-bg"></div>
                  </div>
                  <li class="!mt-0">
                    <NuxtLink
                      to="/dashboard/profile"
                      class="flex space-x-[31px] items-center"
                      ><IconsMyProfile class="w-[17px] h-5" />
                      <p>My Profile</p></NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/dashboard"
                      class="flex space-x-[31px] items-center"
                    >
                      <IconsDashboard class="w-5 h-4" />
                      <p>Dashboard</p></NuxtLink
                    >
                  </li>
                  <li>
                    <NuxtLink
                      to="/dashboard/my-courses"
                      class="flex space-x-[31px] items-center"
                      ><IconsCourses class="w-5 h-[17.7px]" />
                      <p>My Courses</p></NuxtLink
                    >
                  </li>
                  <li class="flex justify-between items-center">
                    <div class="flex space-x-[31px] items-center">
                      <IconsLanguage class="w-[22px] h-[19.44px]" />
                      <p>Language</p>
                    </div>
                    <div
                      class="flex space-x-[13px] items-center py-[3px] px-2 font-semibold text-sm text-[#313131] bg-[#FFF9F6]"
                    >
                      <p>ENG</p>
                      <img
                        class="w-[19px] h-[14px]"
                        src="~/assets/img/icon/usa.png"
                        alt="USA Flag"
                      />
                    </div>
                  </li>
                  <li>
                    <NuxtLink
                      to="/dashboard/edit-profile"
                      class="flex space-x-[31px] items-center"
                      ><IconsSettings class="w-5 h-5" />
                      <p>Account Settings</p></NuxtLink
                    >
                  </li>
                  <li
                    class="flex space-x-[31px] items-center"
                    @click.stop="handleLogOut()"
                  >
                    <IconsLogOut class="w-5 h-5" />
                    <p>Sign Out</p>
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Sidebar -->
    <div
      v-if="isSideMenuVisible"
      class="block lg:hidden w-[90%] h-screen fixed top-0 left-0 bg-[#FFF9F6] rounded-r-[20px] overflow-hidden"
      style="box-shadow: 4px 0 10px 0 rgba(49, 49, 49, 0.25)"
    >
      <div class="p-5 flex justify-end">
        <img
          @click="isSideMenuVisible = false"
          src="/icons/icon-close.svg"
          alt="close icon"
        />
      </div>
      <nav class="text-center">
        <ul class="flex flex-col gap-y-[30px]">
          <li data-te-nav-item-ref>
            <NuxtLink
              @click="isSideMenuVisible = false"
              :class="{
                'text-orange-primary': route.name.slice(0, -5) === 'index',
              }"
              aria-current="page"
              :to="localePath('/')"
              class="text-gray-secondary font-medium font-[inter]"
              data-te-nav-link-ref
              >{{ $t("menu.home") }}</NuxtLink
            >
          </li>
          <li data-te-nav-item-ref>
            <NuxtLink
              @click="isSideMenuVisible = false"
              :class="{
                'text-orange-primary': route.name.slice(0, -5) === 'about-us',
              }"
              aria-current="page"
              :to="localePath('/about-us')"
              class="text-gray-secondary font-medium font-[inter]"
              data-te-nav-link-ref
              >{{ $t("menu.about") }}</NuxtLink
            >
          </li>
          <!-- <li data-te-nav-item-ref>
            <NuxtLink
              @click="isSideMenuVisible = false"
              :class="{
                'text-orange-primary':
                  route.name.slice(0, -5) === 'admission-information',
              }"
              aria-current="page"
              :to="localePath('/admission-information')"
              class="text-gray-secondary font-medium font-[inter]"
              data-te-nav-link-ref
              >{{ $t("menu.getAdmissions") }}</NuxtLink
            >
          </li> -->
          <li data-te-nav-item-ref>
            <NuxtLink
              @click="isSideMenuVisible = false"
              :class="{
                'text-orange-primary': route.name.slice(0, -5) === 'courses',
              }"
              aria-current="page"
              :to="localePath('/courses')"
              class="text-gray-secondary font-medium font-[inter]"
              data-te-nav-link-ref
              >{{ $t("menu.courses") }}</NuxtLink
            >
          </li>
          <!-- <li data-te-nav-item-ref>
            <NuxtLink
              :class="{
                'text-orange-primary': route.name.slice(0, -5) === 'blog',
              }"
              aria-current="page"
              :to="localePath('/blog')"
              class="text-gray-secondary font-medium font-[inter]"
              data-te-nav-link-ref
              >{{ $t("menu.blog") }}</NuxtLink
            >
          </li> -->
          <li data-te-nav-item-ref>
            <NuxtLink
              @click="isSideMenuVisible = false"
              :class="{
                'text-orange-primary': route.name.slice(0, -5) === 'contact-us',
              }"
              aria-current="page"
              :to="localePath('/contact-us')"
              class="text-gray-secondary font-medium font-[inter]"
              data-te-nav-link-ref
              >{{ $t("menu.contact") }}</NuxtLink
            >
          </li>
          <li
            v-if="!tokenCookie || tokenCookie === ''"
            data-te-nav-item-ref
            class="flex items-center justify-center gap-x-5"
          >
            <NuxtLink
              @click="isSideMenuVisible = false"
              aria-current="page"
              :to="localePath('/auth/register')"
              class="py-[7px] px-8 sm:px-10 text-orange-primary border border-orange-primary rounded font-semibold"
              data-te-nav-link-ref
              >{{ $t("menu.register") }}</NuxtLink
            >
            <NuxtLink
              @click="isSideMenuVisible = false"
              aria-current="page"
              :to="localePath('/auth/login')"
              class="py-[7px] px-9 sm:px-11 border text-white bg-orange-primary rounded font-semibold"
              data-te-nav-link-ref
              >{{ $t("menu.signin") }}</NuxtLink
            >
          </li>
          <li
            v-if="tokenCookie"
            @click="isSideMenuVisible = false"
            data-te-nav-item-ref
            class="mt-2"
          >
            <NuxtLink :to="localePath('/dashboard')" class="orange_button">
              {{ $t("dashboard") }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
      <div
        class="custom-container py-3 absolute bottom-0 w-full flex items-center justify-between bg-black"
      >
        <NuxtLink
          class="flex gap-x-[10px]"
          :to="`mailto:info@fiverroutsourcinginstitute.com`"
          aria-label="GoToMail"
        >
          <img
            src="/icons/icon-email.svg"
            class="w-5 self-end"
            alt="email icon"
          />
          <p
            class="text-xs text-white font-medium font-[inter] tracking-[0.36px]"
          >
            demo.google@gmail.com
          </p>
        </NuxtLink>
        <NuxtLink
          class="flex"
          :to="`tel:+8801752-202128`"
          aria-label="GoToPhone"
        >
          <p class="grid place-content-center size-5 bg-white rounded-full">
            <img
              src="/icons/icon-phone.svg"
              class="w-[10px] invert"
              alt="phone icon"
            />
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-item {
  @apply inline-block text-base dx:text-lg text-gray-secondary font-[inter] cursor-pointer hover:pb-[2px] hover:text-gray-primary hover:border-b-2 hover:border-gray-secondary transition-all duration-100;
}
.menu-item:hover {
  text-shadow: 0 0 0.65px #313131, 0 0 0.65px #313131;
}
.active-menu {
  @apply pb-[2px] text-gray-primary text-base dx:text-lg border-b-2 border-gray-secondary font-[inter];
  text-shadow: 0 0 0.65px #313131, 0 0 0.65px #313131;
}
.profile_options {
  height: 370px;
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(12, 8, 5, 0.02);
  @apply lg:w-[376px] md:w-[60%] w-[95%];
}
.triangle-wrapper {
  filter: drop-shadow(
    0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02)
  );
}

.triangle-linear-gradient-bg {
  width: 12px;
  height: 12px;
  margin: auto;
  background: #fff;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  position: absolute;
  top: -12px;
  border-color: transparent transparent #eff0f6 transparent;
  border-width: 0px 12px 12px 12px;
  border-style: solid;
  margin: auto;
  @apply md:right-[38px] right-[19px];
}
.triangle-linear-gradient-bg::after {
  position: absolute;
  top: 0px;
  right: -9px;
  content: "";
  width: 0;
  border-color: transparent transparent #fff transparent;
  border-width: 2px 9px 9px 9px;
  border-style: solid;
}
.box {
  height: 12px;
  right: 0;
  opacity: 0;
  position: absolute;
  top: -12px;
}
.profileOptions-enter-active,
.profileOptions-leave-active {
  transition: opacity 0.5s ease, top 0.5s ease;
}
.profileOptions-enter-from,
.profileOptions-leave-to {
  opacity: 0;
  top: 42px;
}
</style>
