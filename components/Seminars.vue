<script setup>
defineProps({
  seminars: {
    type: Array,
  },
});

const localePath = useLocalePath();

const getTime = (date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const hour = hours > 12 ? hours - 12 : hours;
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  return `${hour}:${minutes} ${ampm}`;
};

const getDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  return `${day}`;
};
const getMonthYear = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const year = d.getFullYear();
  return `${month}, ${year}`;
};
</script>
<template>
  <ul class="pt-4 flex flex-col gap-4">
    <li
      v-for="seminar in seminars"
      :key="seminar.id"
      class="card flex flex-row items-center bg-[#FFECE0] hover:bg-[#FF7E31] w-full rounded-2xl min-h-[100px]"
    >
      <div
        class="date flex justify-center items-center text-center px-4 min-w-[120px]"
      >
        <div class="flex flex-col">
          <span class="text-[28px] font-semibold">{{
            getDate(seminar.date)
          }}</span>
          <span class="text-xl">{{ getMonthYear(seminar.date) }}</span>
        </div>
      </div>
      <div
        class="min-h-[100px] w-full flex flex-col sm:flex-row items-start sm:items-center sm:justify-between border border-gray-400 rounded-2xl px-4 py-2 bg-white gap-2"
      >
        <div>
          <h3 class="text-xl font-semibold pb-2">{{ seminar.title }}</h3>
          <p class="text-sm">
            {{ $t("online_time") }}
            {{ getTime(seminar.date) }}
          </p>
        </div>
        <NuxtLink
          :to="localePath(`/free-seminar/${seminar.id}`)"
          class="px-4 py-1 rounded-lg font-bold bg-primary-red text-white"
        >
          {{ $t("join") }}
        </NuxtLink>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.card:hover .date {
  color: white;
}
</style>
