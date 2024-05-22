<script setup>
const $config = useRuntimeConfig();

const cdnURL = $config.public.cdnURL;

// Dummy data
const comments = [
  {
    id: 1,
    name: "Eliza Murphy",
    date: "FEB 09, 2023 AT 12: 26 AM",
    comment:
      "Aenean sed nibh a magna posuere tempor. Nunc faucibus pellentesque nunc in aliquet. Donec congue, nunc vel tempor congue, enim sapien lobortis ipsum, in volutpat sem ex in ligula. Nunc purus est, consequat condimentum faucibus sed, iaculis sit amet massa. Fusce ac condimentum turpis.",
    profilePic: cdnURL + "/images/blog/profile.png",
  },
  {
    id: 2,
    name: "Emma McCoy",
    date: "FEB 09, 2023 AT 12: 26 AM",
    comment:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy",
    profilePic: cdnURL + "/images/blog/profile.png",
  },
  {
    id: 3,
    name: "Ronnie Matthews",
    date: "FEB 09, 2023 AT 12: 26 AM",
    comment:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy",
    profilePic: cdnURL + "/images/blog/profile.png",
  },
];
</script>
<template>
  <div class="mx-[30px]">
    <div
      v-for="(comment, index) in comments"
      :key="comment.id"
      class="flex flex-row space-x-5 py-[30px] border-b border-[#8E8E8E]"
    >
      <img
        class="w-[60px] h-[60px] rounded-full"
        :src="comment.profilePic"
        alt=""
      />
      <div class="flex flex-col space-y-4 items-start">
        <div class="flex flex-col items-start space-y-1">
          <h5 class="text-lg text-[#222831]">{{ comment.name }}</h5>
          <p class="text-base text-[#656565]">{{ comment.date }}</p>
        </div>
        <p class="text-lg text-[#505050]">{{ comment.comment }}</p>
      </div>
    </div>
    <p class="pt-[30px] text-lg font-bold text-[#E4801D]">Show more</p>
  </div>
</template>

<style scoped></style>
