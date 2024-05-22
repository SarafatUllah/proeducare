<script setup lang="ts">
defineProps({
  buttonText: {
    type: String,
  },
});
const { fetchOauthUrl } = useAuth();
const login = async () => {
  const loginUrl = await fetchOauthUrl("facebook");
  if (loginUrl) {
    window.location.href = loginUrl?.url;
  }
};
</script>

<template>
  <button
    type="button"
    class="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-2.5 border border-gray-300"
    @click.stop="login"
  >
    <div class="flex items-center justify-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_1334_718)" />
        <path
          d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
          fill="white"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1334_718"
            x1="16"
            y1="2"
            x2="16"
            y2="29.917"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#18ACFE" />
            <stop offset="1" stop-color="#0163E0" />
          </linearGradient>
        </defs>
      </svg>

      <span class="ml-4">
        {{ buttonText }}
      </span>
    </div>
  </button>
</template>
