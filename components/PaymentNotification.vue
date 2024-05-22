<script setup>
defineProps({
  payment: {
    type: Object,
  },
});

const localePath = useLocalePath();
</script>

<template>
  <NuxtLink :to="localePath(payment.data?.link)">
    <p class="line-clamp-1 text-xs font-medium">
      {{
        payment?.data?.order?.payment_status === 0
          ? "Order Completed"
          : payment?.data?.order?.payment_status === 1
          ? "Payment Completed"
          : payment?.data?.order?.payment_status === 2
          ? "Payment Faild"
          : payment?.data?.order?.payment_status === 3
          ? "Payment Cancelled"
          : "Payment Faild"
      }}
      For
      {{ payment?.data?.order?.order_type }}
      Course
    </p>

    <p class="line-clamp-2 text-[10px] opacity-60 pt-1 break-all">
      Payment Method:
      {{ payment?.data?.order?.payment_method }}. Total Payment:
      {{ payment.data?.order.total }}TK. Transaction ID:
      {{ payment?.data?.order?.transaction_id }}.

      {{
        payment?.data?.order?.payment_status === 0
          ? "Please complete payment..."
          : payment?.data?.order?.payment_status === 1
          ? "Go Dashboard for details..."
          : "Please Go Dashboard to complete payment..."
      }}
    </p>
    <p class="text-[10px] pt-2">
      {{ $dateFormat(payment?.created_at) }}
    </p>
  </NuxtLink>
</template>

<style scoped></style>
