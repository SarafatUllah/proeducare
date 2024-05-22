import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", () => {
  // state
  const token = useCookie("token");
  const {
    apiBaseUrl,
    ALL_NOTIFICATIONS,
    ALL_UNREAD_NOTIFICATIONS,
    MARK_AS_ALL_READ,
    MARK_AS_SINGLE_READ,
    MARK_AS_SINGLE_UNREAD,
  } = useUrls();
  const { $toast } = useNuxtApp();
  const { t } = useI18n();
  const isShowCourseVideoRef = ref<boolean>(true);
  const searchTextRef = ref<string>("");
  const showNotificationRef = ref<boolean>(false);
  const notifications = ref<any[]>([]);
  const allUnreadNotificationsNumber = ref<number>(0);
  const nextCursor = ref<any>(null);
  const nextPageUrl = ref<any>(null);
  const isLoading = ref<boolean>(false);
  const showProfileOptionsRef = ref<boolean>(false);
  const showNotificationOptionsRef = ref<boolean>(false);
  const showUpdateAllNotificationOptionsRef = ref<boolean>(false);
  const showUpdateSingleNotificationOptionsRefs = ref<boolean[]>([]);

  // computed
  const isShowCourseVideo = computed(() => isShowCourseVideoRef.value);
  const searchText = computed(() => searchTextRef.value);
  const showNotification = computed(() => showNotificationRef.value);
  const allNotifications = computed(() => notifications.value);
  const showProfileOptions = computed(() => showProfileOptionsRef.value);
  const showNotificationOptions = computed(
    () => showNotificationOptionsRef.value
  );
  const showUpdateAllNotificationOptions = computed(
    () => showUpdateAllNotificationOptionsRef.value
  );

  // Add a method to initialize the refs for multiple instances
  const initializeUpdateSingleNotificationOptionsRefs = (count: number) => {
    showUpdateSingleNotificationOptionsRefs.value = Array(count).fill(false);
  };

  // Add a method to get a specific ref by index
  const getUpdateSingleNotificationOptionsRef = (index: number) => {
    return showUpdateSingleNotificationOptionsRefs.value[index];
  };

  // actions
  const setIsShowCourseVideo = (payload: boolean) => {
    isShowCourseVideoRef.value = payload;
  };

  const setSearchText = (payload: string) => {
    searchTextRef.value = payload;
  };

  const setShowNotification = (payload: boolean) => {
    showNotificationRef.value = payload;
  };

  const nextPage = () => {
    if (nextPageUrl.value && !isLoading.value) {
      setAllNotifications();
    }
  };

  const setAllNotifications = async () => {
    isLoading.value = true;
    const url = nextPageUrl.value ? nextPageUrl.value : ALL_NOTIFICATIONS;
    const { data, error } = await useFetch<any>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!error.value && data.value?.items) {
      isLoading.value = false;
      for (const item of data.value?.items) {
        let found = notifications.value.find((x) => x?.id === item.id);
        if (!found) {
          notifications.value.push(item);
        }
      }
      nextCursor.value = data.value.next_cursor;
      nextPageUrl.value = data.value.next_page_url;
      setAllUnreadNotificationsNumber();
    } else if (error.value) {
      isLoading.value = false;
      $toast("clear");
      $toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-error",
      });
    }
  };

  const setAllUnreadNotificationsNumber = async () => {
    const { data, error } = await useFetch<any>(ALL_UNREAD_NOTIFICATIONS, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!error.value && data.value?.items) {
      allUnreadNotificationsNumber.value = data.value?.items?.length;
    } else if (error.value) {
      $toast("clear");
      $toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-error",
      });
    }
  };

  const addRealtimeNotification = (payload: any) => {
    notifications.value?.unshift(payload);
    setAllUnreadNotificationsNumber();
  };

  const readAllNotifications = async () => {
    const { data, error } = await useFetch<any>(MARK_AS_ALL_READ, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    if (!error.value && data.value) {
      setAllUnreadNotificationsNumber();
      notifications.value.forEach((obj) => {
        obj.read_at = new Date();
      });
      $toast("clear");
      $toast("success", {
        message: data.value?.message,
        className: "toasted-bg-success",
      });
    } else if (error.value) {
      $toast("clear");
      $toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-error",
      });
    }
  };

  const readSingleNotification = async (id: any) => {
    const { data, error } = await useFetch<any>(
      `${MARK_AS_SINGLE_READ}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    if (!error.value && data.value) {
      setAllUnreadNotificationsNumber();
      notifications.value.forEach((obj) => {
        if (obj.id === id) {
          obj.read_at = new Date();
        }
      });
      $toast("clear");
      $toast("success", {
        message: data.value?.message,
        className: "toasted-bg-success",
      });
    } else if (error.value) {
      $toast("clear");
      $toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-error",
      });
    }
  };

  const unreadSingleNotification = async (id: any) => {
    const { data, error } = await useFetch<any>(
      `${MARK_AS_SINGLE_UNREAD}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    if (!error.value && data.value) {
      setAllUnreadNotificationsNumber();
      notifications.value.forEach((obj) => {
        if (obj.id === id) {
          obj.read_at = null;
        }
      });
    } else if (error.value) {
      $toast("clear");
      $toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-error",
      });
    }
  };

  const deleteAllNotifications = async () => {
    const { data, error } = await useFetch<any>(
      `${apiBaseUrl}/notifications/delete-all`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    if (!error.value && data.value) {
      setAllUnreadNotificationsNumber();
      notifications.value = [];
      $toast("clear");
      $toast("success", {
        message: data.value?.message,
        className: "toasted-bg-success",
      });
    } else if (error.value) {
      $toast("clear");
      $toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-error",
      });
    }
  };

  const deleteSingleNotification = async (id: any) => {
    const { data, error } = await useFetch<any>(
      `${apiBaseUrl}/notifications/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );
    if (!error.value && data.value) {
      setAllUnreadNotificationsNumber();
      notifications.value = notifications.value.filter((obj) => obj.id !== id);
      $toast("clear");
      $toast("success", {
        message: data.value?.message,
        className: "toasted-bg-success",
      });
    } else if (error.value) {
      $toast("clear");
      $toast("error", {
        message: error.value?.data.message,
        className: "toasted-bg-error",
      });
    }
  };

  const setShowProfileOptions = (payload: boolean) => {
    showProfileOptionsRef.value = payload;
  };

  const setShowNotificationOptions = (payload: boolean) => {
    showNotificationOptionsRef.value = payload;
  };

  const setUpdateAllShowNotificationOptions = (payload: boolean) => {
    showUpdateAllNotificationOptionsRef.value = payload;
  };

  const setUpdateSingleShowNotificationOptions = (
    index: number,
    value: boolean
  ) => {
    showUpdateSingleNotificationOptionsRefs.value[index] = value;
  };

  return {
    isShowCourseVideo,
    setIsShowCourseVideo,
    showNotification,
    setShowNotification,
    searchText,
    setSearchText,
    setAllNotifications,
    allNotifications,
    addRealtimeNotification,
    allUnreadNotificationsNumber,
    setAllUnreadNotificationsNumber,
    nextPage,
    nextCursor,
    readAllNotifications,
    readSingleNotification,
    unreadSingleNotification,
    deleteAllNotifications,
    deleteSingleNotification,
    isLoading,
    showProfileOptions,
    showNotificationOptions,
    showUpdateAllNotificationOptions,
    setShowProfileOptions,
    setShowNotificationOptions,
    setUpdateAllShowNotificationOptions,
    initializeUpdateSingleNotificationOptionsRefs,
    getUpdateSingleNotificationOptionsRef,
    setUpdateSingleShowNotificationOptions,
  };
});
