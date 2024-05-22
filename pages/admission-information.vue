<script setup></script>
<template>
  <div>
    <div class="py-20 h-60 bg-image flex justify-center items-center">
      <h3 class="text-center text-white font-semibold text-3xl lg:text-[40px]">
        {{ $t("get_admission") }}
      </h3>
    </div>
    <div class="custom-container py-20">
      <div>
        <h4 class="text-center text-2xl font-semibold">
          {{ $t("call_for_admission") }}
        </h4>
        <div
          class="flex flex-col items-center gap-5 pt-6 text-[#2A84DD] text-2xl md:text-4xl"
        >
          <div class="flex gap-2 items-center font-semibold">
            <p class="icon-wrapper">
              <IconsPhone class="text-[#00C442] h-6 w-6 min-w-[24px]" />
            </p>
            <p>{{ $t("mobile_1") }}</p>
          </div>
          <div class="hidden gap-2 items-center font-semibold">
            <p class="icon-wrapper">
              <SvgWhatsapp class="h-6 w-6 min-w-[24px]" />
            </p>
            <p>{{ $t("mobile_1") }}</p>
          </div>
          <div class="flex gap-2 items-center font-semibold">
            <p class="icon-wrapper">
              <IconsEmail class="text-[#00C442] h-6 w-6 min-w-[24px]" />
            </p>
            <NuxtLink :to="`mailto:info@fiverroutsourcinginstitute.com`">
              info@fiverroutsourcinginstitute.com
            </NuxtLink>
          </div>
        </div>
        <div
          class="flex flex-col sm:flex-row justify-center items-center gap-10 pt-8"
        >
          <div class="flex flex-col gap-4">
            <p>{{ $t("fb_message") }}</p>
            <NuxtLink
              to="/"
              class="flex items-center gap-4 justify-center bg-[#00C442] text-2xl font-semibold hover:bg-[#051241] text-white rounded-full px-4 py-2.5"
            >
              <IconsFacebookWhite class="h-8 w-8 min-w-[32px]" />
              <span class="font-semibold">{{ $t("message_us") }}</span>
            </NuxtLink>
          </div>
          <div class="flex flex-col gap-4 group">
            <p>{{ $t("join_fb") }}</p>
            <NuxtLink
              to="/"
              class="flex items-center gap-4 justify-center bg-[#00C442] text-2xl font-semibold hover:bg-[#051241] text-white rounded-full px-4 py-2.5"
            >
              <IconsGroupLink
                class="icon h-8 w-8 min-w-[32px] rounded-full bg-white text-[#00C442] p-0.5"
              />
              <span class="font-semibold">{{ $t("join_group") }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="w-full bg-[#051241] text-white py-10 text-center space-y-4">
        <p class="text-2xl md:text-5xl font-semibold">
          {{ $t("pay_from_bd") }}
        </p>
        <p class="text-xl md:text-2xl">{{ $t("read_carefully") }}</p>
      </div>
      <div class="custom-container py-20">
        <p class="text-center text-2xl md:px-10 hidden">
          অনলাইন ও অফলাইন কোর্স ফি যথাক্রমে ১০০০০ ও ১৭০০০ হাজার টাকা । অনলাইনের
          জন্য ভর্তির শুরুতে ৬০০০ ও পরবর্তী মাসে ৪০০০ টাকা এবং অফলাইনের জন্য
          ভর্তির শুরুতে ১২০০০ ও পরবর্তী মাসে ৫০০০ টাকা ।
        </p>
        <p class="text-center text-2xl font-semibold pt-16">
          {{ $t("pay_methods") }}
        </p>
        <div
          class="flex flex-row gap-x-16 gap-y-10 flex-wrap justify-center items-start"
        >
          <div class="space-y-3 pt-8">
            <img
              src="/images/billing-methods/bkash.png"
              alt=""
              srcset=""
              class="h-20"
            />
            <p>Send Money : 01737761776</p>
            <p>Payment : 01318116458</p>
          </div>
          <div class="space-y-3 pt-8">
            <img
              src="/images/billing-methods/nagad.png"
              alt=""
              srcset=""
              class="h-20"
            />
            <p>Send Money : 01737761776</p>
          </div>
          <div class="space-y-3 pt-8">
            <img
              src="/images/billing-methods/rocket.png"
              alt=""
              srcset=""
              class="h-20"
            />
            <p>Send Money : 013181164580</p>
          </div>
          <div class="space-y-3 pt-8">
            <img
              src="/images/billing-methods/dbbl.png"
              alt=""
              srcset=""
              class="h-20"
            />
            <p>DBBL Bank Payment</p>
            <p>Md Khairul Islam</p>
            <p>Acc No-13515165265</p>
            <p>Rajshahi Branch</p>
          </div>
        </div>
        <div
          class="flec flex flex-row gap-3 bg-[#FFD82E] rounded-md p-4 my-10 md:mx-16 font-semibold"
        >
          <IconsWarning class="text-black w-10 h-10 min-w-[40px]" />
          <p>
            {{ $t("caution") }}
          </p>
        </div>
        <div
          class="flex flex-col md:flex-row gap-20 justify-between items-start py-20"
        >
          <div class="flex flex-col w-full md:w-1/2">
            <p class="text-2xl">
              {{ $t("pay_proof") }}
            </p>
          </div>
          <img
            class="w-full md:w-1/2"
            src="/images/billing-methods/bkash-payment.jpg"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="flex flex-col">
      <div class="w-full bg-[#051241] text-white py-10 text-center space-y-4">
        <p class="text-2xl md:text-5xl font-semibold">
          {{ $t("pay_from_india") }}
        </p>
        <p class="text-xl md:text-2xl">{{ $t("read_carefully") }}</p>
      </div>
      <div class="custom-container py-20">
        <p class="text-center text-2xl md:px-10 hidden">
          অনলাইন ও অফলাইন কোর্স ফি যথাক্রমে ১০০০০ ও ১৭০০০ হাজার রুপি । অনলাইনের
          জন্য ভর্তির শুরুতে ৬০০০ ও পরবর্তী মাসে ৪০০০ রুপি এবং অফলাইনের জন্য
          ভর্তির শুরুতে ১২০০০ ও পরবর্তী মাসে ৫০০০ রুপি ।
        </p>
      </div>
      <div class="custom-container py-20 flex flex-col md:flex-row gap-10">
        <div class="flex flex-col gap-4 w-full md:w-1/2">
          <h4 class="text-center text-2xl font-semibold">
            {{ $t("indian_bank_info") }}
          </h4>
          <div class="p-4 text-xl text-white bg-[#2A84DC] rounded-md">
            <p>Indian Payment Method: Axis Bank</p>
            <p>Name: PRATIK PRAMANICK</p>
            <p>Ac-919010059958848</p>
            <p>IFSC-UTIB0003866</p>
            <p>Saving Account</p>
            <p>PhonePay Number--8768709169</p>
          </div>
          <div
            class="flec flex items-center flex-row gap-3 bg-[#FFD82E] rounded-md p-4 my-10 font-semibold"
          >
            <IconsWarning class="text-black w-10 h-10 min-w-[40px]" />
            <p>
              {{ $t("caution_2") }}
            </p>
          </div>
        </div>
        <div
          class="flex flex-col gap-20 justify-between items-start w-full md:w-1/2"
        >
          <div class="flex flex-col w-full">
            <p class="text-2xl">
              {{ $t("pay_proof") }}
            </p>
          </div>
          <img
            class="w-full"
            src="/images/billing-methods/bkash-payment.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div class="w-full bg-[#051241] text-white py-10 text-center space-y-4">
        <p class="text-2xl md:text-5xl font-semibold">
          {{ $t("admission_form") }}
        </p>
        <p class="text-xl md:text-2xl">{{ $t("fill_carefully") }}</p>
      </div>
      <div class="custom-container py-20">
        <iframe
          src="https://docs.google.com/forms/d/13CnbhFbEghLeKPqQqkcCHAKRQNWl0ohCGCeE2j0MY3w/viewform?edit_requested=true"
          height="1000"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          class="min-w-[340px] w-full sm:w-[600px] lg:w-[700px]"
          >{{ $t("loading") }}</iframe
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: url("~/assets/img/admission-information.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.icon-wrapper {
  @apply h-8 w-8 min-w-[32px]  rounded-[10px] flex justify-center items-center;
}
.group:hover .icon {
  @apply text-[#051241];
}
</style>
