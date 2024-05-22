<script setup>
import { useScroll } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useCoursesStore } from "~/stores/courses";
import { useMyCoursesStore } from "~/stores/myCourses";

const { setCurrentComp } = useCoursesStore();
const { setDashboardCurrentComp, setCourseOverviewVideoTab } =
  useMyCoursesStore();
const { currentComp } = storeToRefs(useCoursesStore());
const { currentDashboardComp, courseOverviewVideoTab } = storeToRefs(
  useMyCoursesStore()
);

const props = defineProps({
  defaultMenu: {
    type: String,
    default: "",
  },
  showScroll: {
    type: Boolean,
    default: false,
  },
  subQuery: {
    type: Boolean,
    default: true,
  },
  menuItems: {
    type: Array,
    default: [],
  },
});

const localePath = useLocalePath();
const route = useRoute();
const menuElement = ref(null);
const { arrivedState } = useScroll(menuElement);
</script>

<template>
  <div
    class="relative mt-8"
    :style="{ '--showScroll': showScroll ? 'block' : 'none' }"
  >
    <ul
      ref="menuElement"
      class="flex space-x-[54px] items-center text-xl border-b border-[#e3e3e3] whitespace-nowrap overflow-x-auto scroll"
      :class="[
        arrivedState.left && !arrivedState.right ? 'right' : '',
        arrivedState.right && !arrivedState.left ? 'left' : '',
        !arrivedState.right && !arrivedState.left ? 'left right' : '',
      ]"
    >
      <li
        v-if="defaultMenu"
        class="menu-item"
        :class="[!route.query?.category ? 'active-menu' : 'inactive-menu']"
      >
        <NuxtLink v-if="subQuery" :to="localePath(`/blog`)"
          >{{ defaultMenu }}as</NuxtLink
        >
      </li>
      <li
        v-for="(item, index) in menuItems"
        :key="item.id"
        class="menu-item"
        :class="[
          (route.query?.category === item.slug && subQuery) ||
          (currentComp === item?.componentName && !subQuery) ||
          (currentDashboardComp === item?.componentName && !subQuery) ||
          (courseOverviewVideoTab === item?.componentName && !subQuery)
            ? 'active-menu'
            : 'inactive-menu',
        ]"
      >
        <NuxtLink
          v-if="subQuery"
          :to="localePath(`/blog?category=${item.slug}`)"
          >{{ item.title }}</NuxtLink
        >
        <button
          v-else
          @click="
            setCurrentComp(item.componentName),
              route.path === 'dashboard/my-courses'
                ? setDashboardCurrentComp(item.componentName)
                : setCourseOverviewVideoTab(item.componentName)
          "
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  display: var(--showScroll);
}
.menu-item {
  @apply pb-2.5 border-b-[4px] transition-all duration-150 ease-in-out px-0;
}
.inactive-menu:hover,
.inactive-menu button:hover {
  @apply text-gray-primary;
  text-shadow: 0.65px 0px 1px currentColor;
}
.active-menu,
.active-menu button {
  @apply border-orange-primary text-orange-primary font-bold;
  /* text-shadow: 1px 0px 1px currentColor; */
}
.inactive-menu {
  @apply border-white text-gray-secondary;
}
.left:before {
  content: "";
  position: absolute;
  width: 40px;
  height: 100%;
  left: 0px;
  top: 0;
  background: linear-gradient(to right, #ffffff, #ffffff00 100%);
}
.right:after {
  content: "";
  position: absolute;
  width: 40px;
  height: 100%;
  right: 0px;
  top: 0;
  background: linear-gradient(to left, #ffffff, #ffffff00 100%);
}
.menu_bar ul {
  @apply !px-0;
}
.menu_bar ul li {
  @apply !px-4;
}
</style>
