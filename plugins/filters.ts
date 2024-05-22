export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  const localePath = useLocalePath();
  nuxtApp.provide("redirectToParentPath", () => {
    const currentPath = route.path;
    const parentPath = currentPath.slice(0, currentPath.lastIndexOf("/"));

    navigateTo(localePath(parentPath));
  });

  nuxtApp.provide("redirectToExactPath", (routeValue: string) => {
    const currentPath = route.path;
    const exactPath = currentPath.split(routeValue)[0] + routeValue;

    navigateTo(localePath(exactPath));
  });

  nuxtApp.provide("bdNumberFormat", (number: number) => {
    const options: Intl.NumberFormatOptions = {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    return number.toLocaleString("en-IN", options);
  });

  nuxtApp.provide("dateFormat", (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  });

  nuxtApp.provide("timeFormat", (time: string) => {
    const dateObj = new Date(time);

    // Extract time components
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();

    // Determine whether it's AM or PM
    const amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    const hours12 = hours % 12 || 12; // Convert 0 to 12
    return `${hours12}:${minutes}:${seconds} ${amOrPm}`;
  });
});
