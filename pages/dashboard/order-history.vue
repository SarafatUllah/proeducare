<script setup lang="ts">
const tokenCookie = useCookie("token");
const { apiBaseUrl } = useUrls();
const isProcessing = ref(false);
const currentPage = ref(0);
const totalPage = ref(0);
const nuxtApp = useNuxtApp();
const { t } = useI18n();

const props = defineProps({
  profile: {
    type: Object,
    required: false,
  },
});

const startDate = ref(props?.profile?.created_at);
const endDate = ref("");
const range = ref({
  start: props?.profile?.created_at,
  end: new Date(),
});
const showCalender = ref(false);

const orderHistory: any = ref([]);

const loadOrderHistory = () => {
  isProcessing.value = true;
  if (tokenCookie.value) {
    isProcessing.value = true;
    if (startDate.value === undefined) {
      startDate.value = "";
    }
    try {
      const { data, pending }: any = useFetch(
        `${apiBaseUrl}/order/history?page=${currentPage.value + 1}&start_date=${
          startDate.value
        }&end_date=${endDate.value}`,
        {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
          },
        }
      );

      const setData = () => {
        if (!pending.value) {
          orderHistory.value = data.value;

          totalPage.value = data.value.meta.last_page;

          if (data.value.data.length > 0) {
            isProcessing.value = false;
            orderHistory.value.data.forEach((singleTransaction: any) => {
              singleTransaction.isShowDetails = false;
            });
          } else {
            isProcessing.value = false;
          }
        } else {
          setTimeout(() => {
            setData();
          }, 300);
        }
      };

      setData();
    } catch (error: any) {
      console.log(error);
      nuxtApp.$toast("clear");
      nuxtApp.$toast("error", {
        message: error?.response?._data?.message,
        className: "toasted-bg-alert",
      });
      isProcessing.value = false;
    }
  }
};

loadOrderHistory();

const handleShowProductDetails = (id: number) => {
  orderHistory.value.data.forEach((singleTransaction: any) => {
    if (singleTransaction.id === id) {
      if (singleTransaction.isShowDetails) {
        singleTransaction.isShowDetails = false;
      } else {
        singleTransaction.isShowDetails = true;
      }
    } else {
      singleTransaction.isShowDetails = false;
    }
  });
};

const orderHistoryTable = ref<HTMLDivElement | null>(null);
const divTopPosition = ref(0);
const getDivPosition = () => {
  if (orderHistoryTable.value) {
    const rect = orderHistoryTable.value.getBoundingClientRect();
    divTopPosition.value = rect.top + window.scrollY;
  }
};

onMounted(() => {
  getDivPosition();
  range.value.start = props?.profile?.created_at;
  range.value.end = new Date();
});

const currentHistory = ref("All");
const setCurrentHistory = (history: string) => {
  currentHistory.value = history;
};

// Pagination
const isLeftDisabled = ref(true);
const isRightDisabled = ref(false);

const changePage = (page: number) => {
  if (page > 1) {
    if (isLeftDisabled.value) {
      isLeftDisabled.value = false;
    }
  }
  currentPage.value = page - 1;
  loadOrderHistory();
};
const nextPage = () => {
  if (isLeftDisabled.value) {
    isLeftDisabled.value = false;
  }
  if (currentPage.value >= totalPage.value - 1) {
    isRightDisabled.value = true;
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: t("messages.no_more_transaction_history"),
      className: "alert_error",
    });
    window.scrollTo(0, 0);
    return;
  } else {
    currentPage.value = currentPage.value + 1;
    loadOrderHistory();
    isRightDisabled.value = false;
  }
};
const prevPage = () => {
  if (isRightDisabled.value) {
    isRightDisabled.value = false;
  }
  if (currentPage.value < 1) {
    isLeftDisabled.value = true;
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: t("messages.no_more_transaction_history"),
      className: "alert_error",
    });
    // window.scrollTo(0, 0);
    return;
  } else {
    currentPage.value = currentPage.value - 1;
    loadOrderHistory();
    isLeftDisabled.value = false;
  }
};

const formatDate = (inputDateString: string) => {
  // Parse the input date string
  const inputDate = new Date(inputDateString);

  // Extract year, month, and day components
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month since it's zero-based
  const day = String(inputDate.getDate()).padStart(2, "0");

  // Format as YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

const dateBefore = (inputDate: string, units: "month" | "year") => {
  // Parse the input date string into a Date object
  const date = new Date(inputDate);

  // Get the year, month, and day of the input date
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate() + 1; // Add 1 day to prevent issues with edge cases

  // Calculate the new date based on the specified units
  let newDate: Date;
  if (units === "month") {
    newDate = new Date(year, month - 1, day);
  } else if (units === "year") {
    newDate = new Date(year - 1, month, day);
  } else {
    throw new Error('Invalid units parameter. Use "month" or "year".');
  }

  // Format the result as "YYYY-MM-DD"
  const formattedDate = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${newDate.getDate().toString().padStart(2, "0")}`;

  return formattedDate;
};

const createIncompletePayment = async (id: number) => {
  try {
    const { data }: any = await useLazyFetch(
      `${apiBaseUrl}/payment/aamarpay/make/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenCookie.value}`,
        },
      }
    );

    if (data.value.message) {
      nuxtApp.$toast("clear");
      nuxtApp.$toast("success", {
        message: data.value.message,
        className: "toasted-bg-success",
      });
      window.open(data.value.url, "_self");
    }
  } catch (error: any) {
    console.log(error);
    nuxtApp.$toast("clear");
    nuxtApp.$toast("error", {
      message: error?.response?._data?.message,
      className: "toasted-bg-alert",
    });
  }
};

watch(
  () => range.value,
  async () => {
    startDate.value = formatDate(range.value.start);
    endDate.value = formatDate(range.value.end);

    loadOrderHistory();
  }
);
watch(
  () => currentHistory.value,
  async () => {
    if (currentHistory.value === "All") {
      startDate.value = formatDate(props?.profile?.created_at);
      endDate.value = formatDate(new Date());
    } else if (currentHistory.value === "Today") {
      startDate.value = formatDate(new Date());
      endDate.value = formatDate(new Date());
    } else if (currentHistory.value === "Monthly") {
      startDate.value = formatDate(dateBefore(new Date(), "month"));
      endDate.value = formatDate(new Date());
    } else if (currentHistory.value === "Yearly") {
      startDate.value = formatDate(dateBefore(new Date(), "year"));
      endDate.value = formatDate(new Date());
    }
    range.value.start = startDate.value;
    range.value.end = endDate.value;

    loadOrderHistory();
  }
);
</script>

<template>
  <div class="p-5 md:pt-20">
    <div class="flex flex-col relative">
      <div class="flex justify-between items-start w-full space-x-3 absolute">
        <div class="flex space-x-3 xl:space-x-5 text-lg font-semibold">
          <button
            @click="setCurrentHistory('All')"
            class="flex justify-center items-center w-20 lg:!w-[88px] h-[50px] outline-none rounded-[10px]"
            :class="
              currentHistory === 'All'
                ? 'bg-primary-red text-white'
                : 'bg-[#D9D9D9] text-black'
            "
          >
            <span>{{ $t("all") }}</span>
          </button>
          <button
            @click="setCurrentHistory('Today')"
            class="flex justify-center items-center w-20 lg:!w-[88px] h-[50px] outline-none rounded-[10px]"
            :class="
              currentHistory === 'Today'
                ? 'bg-primary-red text-white'
                : 'bg-[#D9D9D9] text-black'
            "
          >
            <span>{{ $t("today") }}</span>
          </button>
          <button
            @click="setCurrentHistory('Monthly')"
            class="flex justify-center items-center w-20 lg:!w-[88px] h-[50px] outline-none rounded-[10px]"
            :class="
              currentHistory === 'Monthly'
                ? 'bg-primary-red text-white'
                : 'bg-[#D9D9D9] text-black'
            "
          >
            <span>{{ $t("monthly") }}</span>
          </button>
          <button
            @click="setCurrentHistory('Yearly')"
            class="flex justify-center items-center w-20 lg:!w-[88px] h-[50px] outline-none rounded-[10px]"
            :class="
              currentHistory === 'Yearly'
                ? 'bg-primary-red text-white'
                : 'bg-[#D9D9D9] text-black'
            "
          >
            <span>{{ $t("yearly") }}</span>
          </button>
        </div>
        <div class="relative" @mouseleave="showCalender = false">
          <IconsCalender class="sm:hidden" />
          <div
            class="hidden px-4 sm:!flex items-center w-full h-[50px] border border-black rounded-[10px] space-x-4"
            @click="showCalender = !showCalender"
          >
            <button
              class="text-lg font-semibold w-full h-full outline-none rounded-l-[10px]"
            >
              {{ $dateFormat(range.start) }} - {{ $dateFormat(range.end) }}
            </button>
            <IconsCalender />
          </div>

          <div v-if="showCalender" class="absolute right-0">
            <VDatePicker
              v-model.range="range"
              @mouseleave="showCalender = false"
              mode="date"
            />
          </div>
        </div>
      </div>

      <div class="order-table-wrapper mt-10">
        <div
          v-if="isProcessing"
          class="isLoadingIcon flex flex-col justify-center items-center h-[200px]"
        >
          <IconsIsLoading />
        </div>

        <div v-else-if="orderHistory?.data?.length > 0">
          <div ref="orderHistoryTable" class="overflow-x-auto mt-4 lg:mt-10">
            <table
              class="w-full table-auto border-collapse border border-black whitespace-nowrap text-black"
            >
              <thead class="font-semibold">
                <tr class="bg-gray-300">
                  <th>{{ $t("payment_method") }}</th>
                  <th>{{ $t("transaction_id") }}</th>
                  <th>{{ $t("purchase_date_time") }}</th>
                  <th>{{ $t("payment_status") }}</th>
                  <th>{{ $t("coupon_code") }}</th>
                  <th>{{ $t("total") }}</th>
                  <th>{{ $t("sub_total") }}</th>
                  <th>{{ $t("discount_amount") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>

              <tbody>
                <template
                  v-for="product in orderHistory.data"
                  :key="product.id"
                  :class="product.id % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'"
                >
                  <tr>
                    <td>{{ product.payment_method }}</td>
                    <td>{{ product.transaction_id }}</td>
                    <td>
                      {{ $dateFormat(product.created_at) }} |
                      {{ $timeFormat(product.created_at) }}
                    </td>
                    <td>
                      {{ product.payment_status }}
                    </td>
                    <td>{{ product.coupon_code }}</td>
                    <td>{{ product.total }}</td>
                    <td>{{ product.sub_total }}</td>
                    <td>{{ product.discount_amount }}</td>
                    <td class="cursor-pinter">
                      <div class="flex space-x-1 justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 mx-auto"
                          @click="handleShowProductDetails(product.id)"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>

                        <p
                          v-if="product.payment_status !== 'Completed'"
                          class="bg-green-600 text-white p-1 rounded-full cursor-pointer"
                          @click="createIncompletePayment(product.id)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M8.25 7.5l.415-.207a.75.75 0 011.085.67V10.5m0 0h6m-6 0h-1.5m1.5 0v5.438c0 .354.161.697.473.865a3.751 3.751 0 005.452-2.553c.083-.409-.263-.75-.68-.75h-.745M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </p>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="product.isShowDetails" class="childTable">
                    <td colspan="9">
                      <table
                        class="w-full table-auto border-collapse border border-black whitespace-nowrap text-black"
                      >
                        <thead class="font-semibold">
                          <tr
                            v-if="product.order_type === 'file'"
                            class="bg-gray-300"
                          >
                            <th>File Name</th>
                            <th>File Type</th>
                            <th>File Size</th>
                          </tr>

                          <tr v-else class="bg-gray-300">
                            <th>Course</th>
                            <th>Subscription</th>
                            <th>Subscription Status</th>
                            <th>File Type</th>
                            <th>Total File</th>
                          </tr>
                        </thead>

                        <tbody>
                          <template
                            v-for="singleCourse in product.details"
                            :key="singleCourse.id"
                            :class="
                              singleCourse.id % 2 === 0
                                ? 'bg-[#ccc8c8]'
                                : 'bg-white'
                            "
                          >
                            <tr v-if="product.order_type === 'file'">
                              <td>{{ singleCourse.item_title }}</td>
                              <td>
                                {{
                                  singleCourse.is_featured
                                    ? "Featured"
                                    : "Non-Featured"
                                }}
                              </td>
                              <td>{{ singleCourse.item_size }}</td>
                            </tr>

                            <tr v-else>
                              <td>{{ singleCourse.item_title }}</td>
                              <td>{{ singleCourse.subscription.name }}</td>
                              <td>{{ singleCourse.subscription.status }}</td>
                              <td>{{ singleCourse.subscription.type }}</td>
                              <td>
                                {{ singleCourse.subscription.total_file }}
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>

          <div
            v-if="orderHistory.meta.last_page > 1"
            class="flex justify-center items-center gap-5 pt-20 pb-4"
          >
            <button
              class="button bg-white text-[#374151]"
              :class="isLeftDisabled ? 'opacity-50' : 'opacity-100'"
              @click="prevPage"
            >
              <ClientOnly>
                <fa class="" :icon="['fa-solid', 'angles-left']"
              /></ClientOnly>
            </button>

            <div v-for="(page, index) in totalPage" :key="index">
              <button
                @click="changePage(page)"
                class="button"
                :class="
                  currentPage === page - 1
                    ? 'activeButton pointer-events-none'
                    : 'inactiveButton'
                "
              >
                {{ page }}
              </button>
            </div>

            <button
              class="button bg-white text-[#374151]"
              :class="isRightDisabled ? 'opacity-50' : 'opacity-100'"
              @click="nextPage"
            >
              <ClientOnly>
                <fa class="" :icon="['fa-solid', 'angles-right']"
              /></ClientOnly>
            </button>
          </div>
        </div>

        <div
          v-else
          class="w-full h-full flex flex-col justify-center items-center pt-[100px]"
        >
          <IconsNoData class="" />
          <p class="text-lg pt-5">{{ $t("no_data_text") }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
th,
td {
  @apply min-w-[80px] text-base lg:text-lg border border-black py-2 lg:py-3 px-5 text-center;
}

/* th:last-child,
td:last-child {
  @apply border-l-0 px-0 py-0;
}
th:nth-child(6),
td:nth-child(6) {
  @apply border-r-0;
} */

.childTable th:last-child,
.childTable td:last-child {
  @apply border-r-[1px] py-2 lg:py-3 px-5;
}

.button {
  @apply h-10 w-10 text-base rounded-md hover:bg-primary-red p-2 hover:text-white;
}
.activeButton {
  @apply bg-primary-red text-white;
}
.inactiveButton {
  @apply bg-white text-[#374151];
}
</style>
