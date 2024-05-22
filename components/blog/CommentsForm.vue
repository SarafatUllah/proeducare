<script setup>
const comment = ref({
  name: "",
  email: "",
  comment: "",
  saveMyData: false,
});

const submitComment = (e) => {
  console.log(comment.value);
};
</script>

<template>
  <div class="pt-[40px] mx-[30px]">
    <h6 class="text-[40px] text-[#E4801D] font-medium">Leave a Comment</h6>
    <p class="text-lg text-[#656565]">
      Your email address will not be published. Required fields are marked *
    </p>
    <form novalidate @submit.prevent="submitComment">
      <div class="pt-[34px] flex flex-col space-y-[30px]">
        <div class="flex flex-row space-x-[34px] items-center">
          <input
            class="w-1/2 h-[60px] border border-[#656565] outline-none pl-5 pr-2 rounded-md"
            type="text"
            placeholder="Write your name"
            name="CommentName"
            id="CommentName"
            v-model="comment.name"
          />
          <input
            class="w-1/2 h-[60px] border border-[#656565] outline-none pl-5 pr-2 rounded-md"
            type="text"
            placeholder="Write your email address"
            name="commentEmail"
            id="commentEmail"
            v-model="comment.email"
          />
        </div>
        <textarea
          class="w-full border border-[#656565] outline-none p-5 rounded-md resize-none"
          rows="10"
          placeholder="Write your name"
          name="comment"
          id="comment"
          v-model="comment.comment"
        />
        <div class="flex items-start space-x-4">
          <input
            class="h-5 w-5 mt-1"
            type="checkbox"
            name="saveMyData"
            id="saveMyData"
            v-model="comment.saveMyData"
          />
          <span class="text-xl text-[#656565]">
            Save my name, email, and website in this browser for the next time I
            comment.</span
          >
        </div>
        <button
          class="w-[180px] h-[50px] rounded-full border border-[#E4801D] text-[#E4801D] hover:text-white hover:bg-[#E4801D] transition duration-300 ease-in-out"
          type="submit"
        >
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
