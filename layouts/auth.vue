<script setup></script>
<template>
  <div class="custom-container py-20 min-h-screen">
    <slot />
  </div>
</template>

<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 20px white inset !important;
}
.checkbox {
  @apply w-5 h-5 md:w-6 md:h-6;
}
input[type="checkbox"] {
  accent-color: #e74c3c;
}

.auth-carousel {
  position: relative;
}

.auth-carousel .carousel__pagination {
  @apply absolute left-0 bottom-5 right-0 mx-auto;
}

.carousel__pagination {
  margin: 20px 0 0;
}

.carousel__pagination-button::after {
  @apply w-3 h-3 xl:w-5 xl:h-5 rounded-full bg-white;
  border: 1px solid #707070;
}

.carousel__pagination-button:hover::after {
  background-color: #ff6e1f;
}

.carousel__pagination-button--active::after {
  background-color: #ff6e1f;
}

.carousel__icon {
  font-size: 40px;
  fill: white;
}
</style>
