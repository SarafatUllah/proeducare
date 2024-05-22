<script setup>
import { useScroll } from "@vueuse/core";

const props = defineProps({
  defaultMenu: {
    type: String,
    default: "",
  },
  showScroll: {
    type: Boolean,
    default: false,
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
    class="relative"
    :style="{ '--showScroll': showScroll ? 'block' : 'none' }"
  >
    <ul
      ref="menuElement"
      class="mt-8 flex items-center text-lg border-b border-[#CACACA] whitespace-nowrap overflow-x-auto scroll pb-[1px]"
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
        <NuxtLink :to="localePath(`/blog`)">{{ defaultMenu }}</NuxtLink>
      </li>
      <li
        v-for="(item, index) in menuItems"
        :key="item.id"
        class="menu-item"
        :class="[
          route.query?.category === item.slug ? 'active-menu' : 'inactive-menu',
        ]"
      >
        <NuxtLink :to="localePath(`/blog?category=${item.slug}`)">{{
          item.title
        }}</NuxtLink>
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
  @apply pb-2.5 border-b-[5px] transition-all duration-150 ease-in-out px-4;
}
.menu-item:hover {
  text-shadow: 0 0 0.65px #313131, 0 0 0.65px #313131;
  @apply text-gray-primary;
}
.inactive-menu {
  @apply border-white text-gray-secondary;
}
.active-menu {
  @apply border-orange-primary text-gray-primary;
  text-shadow: 0 0 0.65px #313131, 0 0 0.65px #313131;
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
</style>
