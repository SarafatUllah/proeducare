<script setup>
const { GROUP_LINKS } = useUrls();
const tokenCookie = useCookie("token");

const selectedGroup = ref({});
const toggleGroup = (group) => {
  if (selectedGroup.value?.id === group.id) {
    selectedGroup.value = {};
  } else {
    selectedGroup.value = group;
  }
};
const isGroupSelected = (id) => {
  return selectedGroup.value?.id === id;
};

const { data: groupLinksRes, error } = useFetch(GROUP_LINKS, {
  headers: {
    Authorization: `Bearer ${tokenCookie.value}`,
  },
});
const groupLinks = computed(() => groupLinksRes.value?.data);
</script>

<template>
  <div class="pt-16 md:pt-24">
    <template v-if="groupLinks">
      <div
        v-if="groupLinks.length > 0"
        class="w-full lg:w-[70%] h-auto border border-[#434343] rounded-md textl font-semibold"
      >
        <div
          v-for="(item, index) in groupLinks"
          :key="item.id"
          class="w-full rounded-md"
          :class="
            isGroupSelected(item.id) || index === groupLinks.length - 1
              ? 'pb-0'
              : 'pb-2.5'
          "
        >
          <div
            @click="toggleGroup(item)"
            class="w-full h-11 rounded-md flex items-center justify-between px-5 bg-[#434343] text-white cursor-pointer"
          >
            <span>{{ item.title }}</span>
            <IconsChevronDown
              class="w-5 h-5 transition-all duration-300 ease-in-out"
              :class="isGroupSelected(item.id) ? 'rotate-180' : 'rotate-0'"
            />
          </div>

          <div v-if="isGroupSelected(item.id)" class="p-5 space-y-2.5">
            <template v-if="item.groupLinks.length > 0">
              <NuxtLink
                v-for="(link, index) in item.groupLinks"
                :key="link.id"
                :to="link.link"
                target="_blank"
                class="w-full h-11 rounded-md flex items-center justify-center px-5 bg-primary-red text-white"
              >
                <p>
                  {{ $t("join_our_private") }}
                  <span v-if="link?.type">{{ link.type }}</span> {{ $t("group") }}
                </p>
              </NuxtLink>
            </template>
            <p v-else>{{ $t("no_group_found") }}</p>
          </div>
        </div>
      </div>
      <NoPageFound v-else minHeight="420" />
    </template>
    <div v-else-if="!groupLinks && !error" class="py-16">
      <IconsIsLoading />
    </div>
    <div v-else class="py-16 text-center">
      {{ error.data.message }}
    </div>
  </div>
</template>

<style scoped></style>
