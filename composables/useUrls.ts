export const useUrls = () => {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const localeLang = computed(() => locale.value);

  const apiBaseUrl = config.public.apiUrl + "/" + localeLang.value;
  const siteUlr = config.public.siteUrl;
  const HOME_HERO = `/server/${localeLang.value}/page-overview-sections/home-hero`;
  const SUCCESS_RATES = `/server/${localeLang.value}/success-rates`;
  const SUCCESS_STORY_STUDENTS = `/server/${localeLang.value}/success-story-students`;
  const SUCCESS_STUDENT_VIDEOS = `/server/${localeLang.value}/success-student-videos`;
  const BLOGS = `/server/${localeLang.value}/blogs`;
  const BLOG_CATEGORIES = `/server/${localeLang.value}/blog-categories`;
  const SECTIONS = `/server/${localeLang.value}/sections`;
  const SLIDER = `/server/${localeLang.value}/sliders`;
  const PAGE_OVERVIEW_SECTION = `/server/${localeLang.value}/page-overview-sections`;
  const ONLINE_PROVIDERS = `/server/${localeLang.value}/online-providers`;
  const CONTACT_US_STORE = `/server/${localeLang.value}/contact-us-store`;
  const COMMUNICATIONS = `/server/${localeLang.value}/communications`;
  const LOGIN = `/server/${localeLang.value}/auth/login`;
  const OAUTH = `/server/${localeLang.value}/auth/oauth`;
  const SOCIAL = `/server/${localeLang.value}/auth/social`;
  const REGISTER = `/server/${localeLang.value}/auth/register`;
  const FORGOT_PASSWORD = `/server/${localeLang.value}/auth/forgot-password`;
  const VERIFY_RESET_PASS_CODE = `/server/${localeLang.value}/auth/verify-code`;
  const LOGOUT = `/server/${localeLang.value}/auth/logout`;
  const ME = `/server/${localeLang.value}/auth/users`;
  const CHANGE_DEVICE = `/server/${localeLang.value}/auth/change-device`;
  const VERIFY_CHANGE_DEVICE = `/server/${localeLang.value}/auth/verify-change-device`;
  const GET_ALL_DISTRICTS = `/server/${localeLang.value}/get-all-districts`;
  const FIRMWARE_FILES = `/server/${localeLang.value}/files`;
  const COURSES = `/server/${localeLang.value}/courses`;
  const USER_SUBSCRIPTIONS = `/server/${localeLang.value}/user/enrollments/subscription-conditions`;
  const DOWNLOAD_FILES = `/server/${localeLang.value}/user/enrollments/file-courses`;
  const FOOTER_COURSE = `/server/${localeLang.value}/footer-courses`;
  const RECENT_FILES = `/server/${localeLang.value}/recent-files`;
  const TOP_FILES = `/server/${localeLang.value}/top-files`;
  const FILE_SEARCH = `/server/${localeLang.value}/files/search`;
  const SEE_INSTITUTES = `/server/${localeLang.value}/get-360-degree-image`;
  const RESEND_EMAIL = `/server/${localeLang.value}/auth/email/resend`;
  const FOLDERS_AND_FILES = `/server/${localeLang.value}/firmware-files`;
  const GROUP_LINKS = `/server/${localeLang.value}/user/enrollments/group-links`;
  const CONTACT_US = `/server/${localeLang.value}/contact-us-store`;
  const RANDOM_FILES = `/server/${localeLang.value}/random-files`;
  const ALL_NOTIFICATIONS = `/server/${localeLang.value}/notifications`;
  const ALL_UNREAD_NOTIFICATIONS = `/server/${localeLang.value}/notifications/unread`;
  const MARK_AS_ALL_READ = `/server/${localeLang.value}/notifications/mark-as-read-all`;
  const MARK_AS_SINGLE_READ = `/server/${localeLang.value}/notifications/mark-as-read`;
  const MARK_AS_SINGLE_UNREAD = `/server/${localeLang.value}/notifications/mark-as-unread`;
  const DELETE_ALL_NOTIFICATIONS = `/server/${localeLang.value}/notifications/delete-all`;
  const DELETE_SINGLE_NOTIFICATION = `/server/${localeLang.value}/notifications/delete`;
  const CHECH_USER_EXISTS = `/server/v1/${localeLang.value}/auth/check-user-exists`;
  const VERIFY_CODE = `/server/v1/${localeLang.value}/auth/verify-code`;
  const REGISTER_USER = `/server/v1/${localeLang.value}/auth/register`;
  const LOGIN_USER = `/server/v1/${localeLang.value}/auth/login`;
  const SEMINARS = `/server/${localeLang.value}/seminars`;
  const SEMINAR_ATTENDEES = `/server/${localeLang.value}/seminar/attendees`;
  const FAQS = `/server/${localeLang.value}/faqs`;

  return {
    apiBaseUrl,
    siteUlr,
    HOME_HERO,
    SUCCESS_RATES,
    SUCCESS_STORY_STUDENTS,
    SUCCESS_STUDENT_VIDEOS,
    BLOGS,
    BLOG_CATEGORIES,
    SECTIONS,
    SLIDER,
    PAGE_OVERVIEW_SECTION,
    ONLINE_PROVIDERS,
    CONTACT_US_STORE,
    COMMUNICATIONS,
    LOGIN,
    OAUTH,
    SOCIAL,
    REGISTER,
    LOGOUT,
    ME,
    CHANGE_DEVICE,
    VERIFY_CHANGE_DEVICE,
    GET_ALL_DISTRICTS,
    FIRMWARE_FILES,
    COURSES,
    USER_SUBSCRIPTIONS,
    DOWNLOAD_FILES,
    FOOTER_COURSE,
    RECENT_FILES,
    TOP_FILES,
    FILE_SEARCH,
    SEE_INSTITUTES,
    RESEND_EMAIL,
    FOLDERS_AND_FILES,
    GROUP_LINKS,
    CONTACT_US,
    RANDOM_FILES,
    ALL_NOTIFICATIONS,
    ALL_UNREAD_NOTIFICATIONS,
    MARK_AS_ALL_READ,
    MARK_AS_SINGLE_READ,
    MARK_AS_SINGLE_UNREAD,
    DELETE_ALL_NOTIFICATIONS,
    DELETE_SINGLE_NOTIFICATION,
    CHECH_USER_EXISTS,
    VERIFY_CODE,
    REGISTER_USER,
    LOGIN_USER,
    SEMINARS,
    SEMINAR_ATTENDEES,
    FAQS,
    FORGOT_PASSWORD,
    VERIFY_RESET_PASS_CODE,
  };
};
