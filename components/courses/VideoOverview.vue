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
    <h1 class="text-[#1A2134] lg:text-2xl text-xl font-bold">#1 - Introduction</h1>
    <div class="lg:text-lg text-sm mt-5 flex space-x-2">
      <h2 class="text-[#1A2134]">Courses Name:</h2>
      <span class="text-[#515B6F]"> {{ courseDetails.title }}</span>
    </div>
    <div class="flex flex-col space-y-3.5 lg:text-lg text-md mt-12">
      <h2 class="text-[#313131]">Course Details</h2>
      <p class="text-[#515B6F] lg:text-lg text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo amet
        habitasse orci convallis sodales augue.
        <br />
        <br />
        Ac, pellentesque proin tincidunt lobortis sit velit velit dui eget.
        Massa, lectus orci auctor morbi. A nisl vitae, sagittis elementum
        placerat nullam id integer leo. Diam venenatis amet diam odio ultrices
        auctor.
      </p>
    </div>
  </div>
</template>
