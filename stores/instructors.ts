import { defineStore } from "pinia";

export const useInstructorStore = defineStore("instructors", () => {
  // state
  const instructorsInfoRef = ref<any>(null);
  const instructorsRef = ref<any>([
    {
      id: 1,
      name: "Dianne Russell",
      imageSrc: "/images/homepage/instructors-section/instructor-1.svg",
      role: "Marketing Coordinator",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 2,
      name: "Jane Cooper",
      imageSrc: "/images/homepage/instructors-section/instructor-2.svg",
      role: "Medical Assistant",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 3,
      name: "Wade Warren",
      imageSrc: "/images/homepage/instructors-section/instructor-3.svg",
      role: "Web Designer",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 4,
      name: "Esther Howard",
      imageSrc: "/images/homepage/instructors-section/instructor-4.svg",
      role: "President of Sales",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 5,
      name: "Dianne Russell",
      imageSrc: "/images/homepage/instructors-section/instructor-5.svg",
      role: "Nursing Assistant",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 6,
      name: "Jane Cooper",
      imageSrc: "/images/homepage/instructors-section/instructor-6.svg",
      role: "UI/UX Engineer",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 7,
      name: "Wade Warren",
      imageSrc: "/images/homepage/instructors-section/instructor-7.svg",
      role: "Web Designer",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 8,
      name: "Esther Howard",
      imageSrc: "/images/homepage/instructors-section/instructor-8.svg",
      role: "Marketing Coordinator",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 9,
      name: "Dianne Russell",
      imageSrc: "/images/homepage/instructors-section/instructor-1.svg",
      role: "Marketing Coordinator",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 10,
      name: "Jane Cooper",
      imageSrc: "/images/homepage/instructors-section/instructor-2.svg",
      role: "Medical Assistant",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 11,
      name: "Wade Warren",
      imageSrc: "/images/homepage/instructors-section/instructor-3.svg",
      role: "Web Designer",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
    {
      id: 12,
      name: "Esther Howard",
      imageSrc: "/images/homepage/instructors-section/instructor-4.svg",
      role: "President of Sales",
      socialLinks: {
        facebook: "",
        linkedIn: "",
        twitterX: "",
      },
    },
  ]);

  // computed
  const instructorsInfo = computed(() => instructorsInfoRef.value);
  const instructors = computed(() => instructorsRef.value);

  // actions
  const setInstructorsInfo = (payload: any) => {
    instructorsRef.value.forEach((element: any) => {
      if (element.id === payload.id) {
        instructorsInfoRef.value = element;
      }
    });
  };
  return {
    instructorsInfo,
    instructors,
    setInstructorsInfo,
  };
});
