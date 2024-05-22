import { useDashboardStore } from "~/stores/dashboard";

export const useNotification = () => {
  const { $echo } = useNuxtApp();
  const { logout } = useAuth();
  const token = useCookie("token");
  const deviceId = useCookie("deviceId");
  const { addRealtimeNotification } = useDashboardStore();
  const { $toast } = useNuxtApp();
  const { t } = useI18n();

  const joinToChannel = (userId: number) => {
    $echo.private(`App.Models.User.${userId}`).notification(async (e: any) => {
      if (e.type === "App\\Notifications\\NotifyLogin") {
        if (
          deviceId.value !== e.data.device_id &&
          e.data.platform?.toLowerCase() === "web"
        ) {
          await logout(token.value || "");
        }
      } else {
        addRealtimeNotification(e);
        $toast("clear");
        $toast("success", {
          message: t('new_notification'),
          className: "toasted-bg-error",
        });
      }
    });
  };

  return {
    joinToChannel,
  };
};
