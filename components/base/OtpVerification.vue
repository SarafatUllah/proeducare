<script setup lang="ts">
// types
export interface OtpVerification {
  inputBorderStyle?: string;
  inputTextStyle?: string;
  resendButtonColor?: string;
  showVerify?: string;
  userEmail?: string;
}
// props
withDefaults(defineProps<OtpVerification>(), {
  inputBorderStyle: "border-b-2 border-white",
  inputTextStyle: "text-3xl text-white text-center",
  resendButtonColor: "text-white",
  showVerify: "showEmailVerify",
  userEmail: "",
});
// data or state
const emit = defineEmits(["verified", "submit"]);
const otp = ref<string[]>(["", "", "", "", "", ""]);
const verificationCodeTimeout = ref<any>(null);
// mounted hook
onMounted(() => {
  const codeInput: HTMLInputElement[] = Array.from(
    document.querySelectorAll("input.code-input")
  );
  const inputElements = [...codeInput];

  inputElements.forEach((ele, index) => {
    ele.addEventListener("keydown", (e: any) => {
      if (e.keyCode === 8 && e.target.value === "")
        inputElements[Math.max(0, index - 1)].focus();
    });
    ele.addEventListener("input", (e: any) => {
      // Break if Shift, Tab, CMD, Option, Control.
      if (
        e.keyCode === 16 ||
        e.keyCode === 9 ||
        e.keyCode === 224 ||
        e.keyCode === 18 ||
        e.keyCode === 17 ||
        e.target.value.length > 1
      ) {
        return;
      }
      const regex = /^[0-9]*$/;
      if (!regex.test(e.target.value)) {
        e.target.value = "";
        return;
      }
      const [first, ...rest] = e.target.value;
      e.target.value = first ?? ""; // the `??` '' is for the backspace usecase
      const lastInputBox = index === inputElements.length - 1;
      const insertedContent = first !== undefined;
      if (insertedContent && !lastInputBox) {
        if (!inputElements[index + 1].value) {
          inputElements[index + 1].focus();
          inputElements[index + 1].value = rest.join("");
          inputElements[index + 1].dispatchEvent(new Event("input"));
        }
      }
    });
  });
});
// Methods
const getValue = (num: number) => {
  const setValue = otp.value[num].toString();
  if (!setValue) return;
  if (setValue.length > 1 && setValue.length !== 6 && setValue.length < 3) {
    otp.value[num] = setValue[setValue.length];
    return;
  } else if (setValue.length !== 1) {
    otp.value[num] = "";
  }

  // // Here need to clear the toast

  if (!setValue) return; // Shouldn't happen, just in case.
  if (setValue.length === 1) return; // Here is a normal behavior, not a paste action.
  for (let i = 0; i < setValue.length; i++) {
    otp.value[i] = setValue[i];
  }
  if (setValue.length > 6) {
    const otp6 = document.getElementById(`otp6`) as HTMLInputElement | null;
    otp6?.focus();
  } else {
    const dynamicOtp = document.getElementById(
      `otp${setValue.length}`
    ) as HTMLInputElement | null;
    dynamicOtp?.focus();
  }
  if (num !== 5) {
    if (otp.value[5]) finalVerify();
  }
};
const finalVerify = () => {
  const code = otp.value.join("");
  emit("verified", code);
};
</script>

<template>
  <div class="card-body">
    <form name="one-time-code" class="otp" method="post">
      <fieldset class="number-code">
        <slot name="title"> </slot>

        <div class="flex flex-row space-x-5 input-space">
          <input
            id="otp1"
            v-model="otp[0]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(0), finalVerify()"
          />
          <input
            id="otp2"
            v-model="otp[1]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(1), finalVerify()"
          />
          <input
            id="otp3"
            v-model="otp[2]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(2), finalVerify()"
          />
          <input
            id="otp4"
            v-model="otp[3]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(3), finalVerify()"
          />
          <input
            id="otp5"
            v-model="otp[4]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(4),finalVerify()"
          />
          <input
            id="otp6"
            v-model="otp[5]"
            type="number"
            class="code-input focus:outline-none w-10 h-10 bg-transparent"
            :class="inputBorderStyle + ' ' + inputTextStyle"
            required
            @input="getValue(5), finalVerify()"
          />
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>
.card-body {
  max-height: 644px;
  @apply w-full flex-grow flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden;
}
.card-body .row {
  @apply flex;
}
.card-body .row .col {
  @apply w-full p-2;
}
.otp {
  @apply relative flex justify-center;
}
.otp fieldset {
  @apply border-0 p-0 m-0 flex items-center text-black;
}
.otp fieldset legend {
  @apply md:mb-4 mb-2 text-center w-full;
}
.otp fieldset input::-webkit-outer-spin-button,
.otp fieldset input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

@media (max-width: 395px) {
  .input-space {
    @apply space-x-3;
  }
}
</style>
