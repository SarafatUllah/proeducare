<script setup>
defineProps({
  courseDetails: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div>
    <h2 class="md:text-[32px] text-[24px] font-semibold text-[#313131]">
      Course Details
    </h2>
    <p
      v-if="courseDetails.short_description"
      class="p_tag_secondary mt-[20px]"
      v-html="courseDetails.short_description"
    ></p>
    <ul
      v-if="
        courseDetails.allDescriptions &&
        courseDetails.allDescriptions.length > 0
      "
    >
      <li
        v-for="(allDescription, index) in courseDetails.allDescriptions"
        :key="index"
        class="p_tag_secondary mt-[20px]"
      >
        <!-- <h3 v-if="allDescription.title" class="inline">
          {{ allDescription.title }}
        </h3> -->
        <p
          v-if="allDescription.description"
          class="mt-4 inline"
          v-html="allDescription.description"
        ></p>
        <img
          v-if="allDescription.image"
          class="mt-4 w-full h-full max-h-[356px] rounded-[17px]"
          :src="allDescription.image"
          :alt="allDescription.title"
        />
      </li>
    </ul>
    <img
      v-if="courseDetails.banner_url"
      class="mt-[44px] w-full h-full max-h-[356px] rounded-[17px]"
      :src="courseDetails.banner_url"
      :alt="courseDetails.title"
    />
    <div
      v-if="
        courseDetails.whatYouLearns && courseDetails.whatYouLearns.length > 0
      "
      class="mt-[49px]"
    >
      <h2 class="h_tag_third">What are you going to learn?</h2>
      <ul class="list-disc list-inside pl-4">
        <li
          v-for="(whatYouLearn, index) in courseDetails.whatYouLearns"
          :key="index"
          class="p_tag_secondary mt-[20px]"
        >
          <h3 v-if="whatYouLearn.title" class="inline">
            {{ whatYouLearn.title }}
          </h3>
          <p v-if="whatYouLearn.description" class="mt-4">
            {{ whatYouLearn.description }}
          </p>
          <img
            v-if="whatYouLearn.image"
            class="mt-4 w-full h-full max-h-[356px] rounded-[17px]"
            :src="whatYouLearn.image"
            :alt="whatYouLearn.title"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
