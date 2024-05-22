import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

/* import specific icons */
import {
  faComments,
  faAnglesLeft,
  faAnglesRight,
  faArrowRight,
  faMagnifyingGlass,
  faPlus,
  faMinus,
  faAngleDown,
  faHandPointDown,
  faAngleRight,
  faCalendarDays,
  faChevronRight,
  faUserSecret,
  faLongArrowRight,
  faSpinner,
  faTimes,
  faLock,
  faBriefcase,
  faDna,
  faUser,
  faPhone,
  faEnvelope,
  faClock,
  faEye,
  faEyeSlash,
  faPencil,
  faPencilAlt,
  faCheck,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  // faFacebook,
  faXTwitter,
  faPinterest,
  faFacebook,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(
  faComments,
  faAnglesLeft,
  faAnglesRight,
  faArrowRight,
  faMagnifyingGlass,
  faPlus,
  faMinus,
  faAngleDown,
  faHandPointDown,
  faUserSecret,
  faAngleRight,
  faCalendarDays,
  faChevronRight,
  faLongArrowRight,
  faSpinner,
  faTimes,
  faLock,
  faBriefcase,
  faDna,
  faUser,
  faPhone,
  faEnvelope,
  faClock,
  faInstagram,
  faXTwitter,
  faPinterest,
  faEye,
  faEyeSlash,
  faPencil,
  faPencilAlt,
  faCheck,
  faPause,
  faFacebook,
  faFacebookF
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fa", FontAwesomeIcon);
});
