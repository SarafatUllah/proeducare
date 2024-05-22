<script setup>
import { storeToRefs } from "pinia";
import { useDashboardStore } from "~/stores/dashboard";
import defaultCourseImage from "~/assets/img/default/hero-thumb.webp";

const {
  isLoading,
  allNotifications,
  allUnreadNotificationsNumber,
  showUpdateAllNotificationOptions,
} = storeToRefs(useDashboardStore());

const {
  readAllNotifications,
  readSingleNotification,
  deleteAllNotifications,
  deleteSingleNotification,
  setUpdateAllShowNotificationOptions,
  getUpdateSingleNotificationOptionsRef,
  setUpdateSingleShowNotificationOptions,
  initializeUpdateSingleNotificationOptionsRefs,
} = useDashboardStore();

const showUpdateSingleNotificationOptions = ref(
  new Array(allNotifications.length).fill(false)
);

const toggleSingleNotificationOptions = (index) => {
  showUpdateSingleNotificationOptions.value[index] =
    !showUpdateSingleNotificationOptions.value[index];
};
</script>

<template>
  <div
    class="notification_options lg:absolute fixed lg:top-[82px] md:top-[122px] top-[112px] lg:right-[-36px] right-0"
  >
    <div class="relative w-full h-full">
      <span class="box"></span>
      <div class="notification-triangle-wrapper !mt-0">
        <div class="notification-triangle-linear-gradient-bg"></div>
      </div>
      <div
        class="flex items-center justify-between !mt-0 pt-6 pb-5 px-5 relative"
      >
        <p class="text-2xl text-gray-primary font-bold">Notification</p>
        <button
          type="button"
          @click.stop="
            showUpdateAllNotificationOptions
              ? setUpdateAllShowNotificationOptions(false)
              : setUpdateAllShowNotificationOptions(true)
          "
          class="flex flex-col items-center"
        >
          <SvgMenuDot />
          <SvgMenuDot />
          <SvgMenuDot />
        </button>
        <div
          v-if="showUpdateAllNotificationOptions"
          class="p-6 w-[274px] bg-white border border-[#eff0f6] lg:absolute fixed lg:top-[80px] md:top-[202px] top-[192px] right-2 rounded-xl z-20"
          style="
            box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
              0px 1px 104px 0px rgba(255, 110, 31, 0.04),
              0px 54px 54px 0px rgba(12, 8, 5, 0.02);
          "
        >
          <div class="relative w-full h-full">
            <div class="notification-triangle-wrapper !mt-0">
              <div class="option-all-triangle-linear-gradient-bg"></div>
            </div>
            <div>
              <button type="button" class="flex items-center gap-x-4 group">
                <img src="/icons/icon-edit.svg" alt="edit" />
                <p
                  class="text-base sm:text-lg text-gray-secondary group-hover:text-orange-primary transition duration-300"
                >
                  Mark all as read
                </p>
              </button>
              <button
                type="button"
                class="mt-4 flex items-center gap-x-4 group"
                @click.stop="deleteAllNotifications"
              >
                <img src="/icons/icon-delete.svg" alt="delete" />
                <span
                  class="text-base sm:text-lg text-gray-secondary group-hover:text-orange-primary transition duration-300"
                >
                  Remove all notifications
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="h-[600px] overflow-y-auto border-t border-[#E3E3E3]">
        <div
          v-for="(item, index) in allNotifications"
          :key="item.id"
          class="flex items-center justify-between bg-[#FFF9F6] px-5 py-[14px] border-b border-[#E3E3E3] relative"
        >
          <div class="flex items-start gap-x-[10px]">
            <div
              class="w-2 min-w-2 h-2 bg-[#FF6E1F] rounded-full self-center"
              :class="unreadSingleNotification"
            ></div>
            <img
              :src="defaultCourseImage"
              alt="image"
              class="w-[70px] h-[52px] rounded-[3px]"
            />
            <div>
              <p
                class="text-sm sm:text-base text-black font-medium font-[roboto]"
              >
                Successfully purchased the iPhone Software and Hardware course
              </p>
              <p class="text-xs text-gray-secondary font-[poppins]">
                5 days ago
              </p>
            </div>
          </div>
          <button
            type="button"
            class="flex items-center ml-4 sm:ml-5"
            @click.stop="toggleSingleNotificationOptions(index)"
          >
            <SvgMenuDot />
            <SvgMenuDot />
            <SvgMenuDot />
          </button>
          <div
            v-if="showUpdateSingleNotificationOptions[index]"
            class="p-6 w-[274px] bg-white border border-[#eff0f6] absolute top-[64px] right-3 rounded-xl z-10"
            style="
              box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
                0px 1px 104px 0px rgba(255, 110, 31, 0.04),
                0px 54px 54px 0px rgba(12, 8, 5, 0.02);
            "
          >
            <div class="relative w-full h-full">
              <div class="notification-triangle-wrapper !mt-0">
                <div class="option-all-triangle-linear-gradient-bg"></div>
              </div>
              <div>
                <button
                  type="button"
                  class="flex items-center gap-x-4 group"
                  @click.stop="readSingleNotification(item.id)"
                >
                  <img src="/icons/icon-edit.svg" alt="edit" />
                  <p
                    class="text-base sm:text-lg text-gray-secondary group-hover:text-orange-primary transition duration-300"
                  >
                    Mark as read
                  </p>
                </button>
                <button
                  type="button"
                  class="mt-4 flex items-center gap-x-4 group"
                  @click.stop="deleteSingleNotification(item.id)"
                >
                  <img src="/icons/icon-delete.svg" alt="delete" />
                  <span
                    class="text-base sm:text-lg text-gray-secondary group-hover:text-orange-primary transition duration-300"
                  >
                    Remove notification
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="allNotifications.length === 0" class="px-5 py-[14px]">
          <p class="text-base text-gray-600 font-medium">
            No notification available
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification_options {
  height: max-content;
  border-radius: 19px;
  border: 1px solid #eff0f6;
  background-color: #fff;
  box-shadow: 0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(12, 8, 5, 0.02);
  @apply w-[95%] md:w-[60%] lg:w-[495px];
}
.notification-triangle-wrapper {
  filter: drop-shadow(
    0px 98px 66px 0px rgba(255, 110, 31, 0.02),
    0px 1px 104px 0px rgba(255, 110, 31, 0.04),
    0px 54px 54px 0px rgba(255, 110, 31, 0.02)
  );
}
.notification-triangle-linear-gradient-bg {
  width: 12px;
  height: 12px;
  margin: auto;
  background: #fff;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  position: absolute;
  top: -12px;
  border-color: transparent transparent #eff0f6 transparent;
  border-width: 0px 12px 12px 12px;
  border-style: solid;
  margin: auto;
  @apply right-[76px] md:right-[38px];
}
.notification-triangle-linear-gradient-bg::after,
.option-all-triangle-linear-gradient-bg::after {
  position: absolute;
  top: 0;
  right: -9px;
  content: "";
  width: 0;
  border-color: transparent transparent #fff transparent;
  border-width: 2px 9px 9px 9px;
  border-style: solid;
}
.option-all-triangle-linear-gradient-bg {
  width: 12px;
  height: 12px;
  margin: auto;
  background: #fff;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  position: absolute;
  top: -36px;
  border-color: transparent transparent #eff0f6 transparent;
  border-width: 0px 12px 12px 12px;
  border-style: solid;
  margin: auto;
  @apply -right-4;
}
.notificationOptions-enter-active,
.notificationOptions-leave-active {
  transition: opacity 0.5s ease, top 0.5s ease;
}
.notificationOptions-enter-from,
.notificationOptions-leave-to {
  opacity: 0;
  top: 42px;
}
</style>
