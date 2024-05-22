import { defineStore, Store } from "pinia";

export const useCoursesStore = defineStore("courses", () => {
  // state
  const currentCompRef = ref<string>("CoursesAboutTheCourse");
  const courseInfoRef = ref<any>(null);

  // computed
  const currentComp = computed(() => currentCompRef.value);
  const courseInfo = computed(() => courseInfoRef.value);

  // actions
  const setCurrentComp = (payload: string) => {
    currentCompRef.value = payload;
  };
  const setCourseItem = (payload: any) => {
    courseInfoRef.value = payload;
  };
  return {
    currentComp,
    courseInfo,
    setCurrentComp,
    setCourseItem,
  };
});
