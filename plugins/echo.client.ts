import Echo from "laravel-echo";
import Pusher from "pusher-js";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const token = useCookie("token");

  (window as any).Pusher = Pusher;

  const echo = new Echo({
    broadcaster: "pusher",
    key: config.public.pusherAppKey,
    wsHost: config.public.pusherHost,
    wsPort: config.public.pusherPort,
    wssPort: config.public.pusherPort,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ["ws", "wss"],
    cluster: "us",
    authEndpoint: "/server/bn/auth/broadcasting",
    authorizer: (channel: any, options: any) => {
      return {
        authorize: async (socketId: any, callback: Function) => {
          try {
            const response = await $fetch(options.authEndpoint, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token.value}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channel.name,
              }),
            });

            callback(false, response);
          } catch (error) {
            callback(true, error);
          }
        },
      };
    },
  });
  return {
    provide: {
      echo,
    },
  };
});
