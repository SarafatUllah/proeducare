import { defineStore, Store } from "pinia";

export const useMyCoursesStore = defineStore("myCourses", () => {
  // state
  const { apiBaseUrl } = useUrls();
  const route = useRoute();
  const nuxtApp = useNuxtApp();

  const currentCompRef = ref<string>("CoursesDashboardCourseCard");
  const isProcessingRef = ref(false);
  const courseDetailsRef = ref<any>({});
  const tokenCookie = useCookie("token");
  const courseOverviewVideoTabRef = ref<string>("CoursesVideoOverview");

  // computed
  const currentDashboardComp = computed(() => currentCompRef.value);
  const isProcessing = computed(() => isProcessingRef.value);
  const courseDetails = computed(() => courseDetailsRef.value);
  const courseOverviewVideoTab = computed(
    () => courseOverviewVideoTabRef.value
  );

  // actions
  const setDashboardCurrentComp = (payload: string) => {
    currentCompRef.value = payload;
  };
  const getCourseDetails = (payload: string) => {
    isProcessingRef.value = true;
    const { data, pending, error }: any = useFetch(
      `${apiBaseUrl}/courses/${payload}`,
      {
        headers: {
          Authorization: `Bearer ${tokenCookie.value ? tokenCookie.value : ""}`,
        },
      }
    );

    const setData = () => {
      if (!pending.value) {
        if (data.value) {
          courseDetailsRef.value = data.value.data;
          courseDetailsRef.value.units.forEach((unit, index) => {
            unit.height = 0;
            if (index === 0) {
              unit.select = false;
            } else {
              unit.select = false;
            }
            unit.videos.forEach((item, itemIndex) => {
              if (index === 0 && itemIndex === 0) {
                item.itemSelect = true;
              } else {
                item.itemSelect = false;
              }
            });
          });
          isProcessingRef.value = false;
        } else if (error.value) {
          nuxtApp.$toast("clear");
          nuxtApp.$toast("error", {
            message: error.value?.data.message,
            className: "toasted-bg-success",
          });
        }
        isProcessingRef.value = false;
      } else {
        setTimeout(() => {
          setData();
        }, 300);
      }
    };
    setData();
  };
  const setCourseOverviewVideoTab = (payload: string) => {
    courseOverviewVideoTabRef.value = payload;
  };
  return {
    currentDashboardComp,
    isProcessing,
    courseDetails,
    courseOverviewVideoTab,
    setCourseOverviewVideoTab,
    setDashboardCurrentComp,
    getCourseDetails,
  };
});
