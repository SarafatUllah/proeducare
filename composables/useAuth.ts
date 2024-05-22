export const useAuth = () => {
  interface OauthResponse {
    url: string;
  }
  const router = useRouter();
  const localePath = useLocalePath();
  const { LOGOUT, OAUTH } = useUrls();

  const tokenCookie: any = useCookie("token", {
    watch: true,
    maxAge: 2592000,
  });

  const redirectUrl: any = useCookie("redirectUrl", {
    watch: true,
    maxAge: 2592000,
  });

  const deviceId = useCookie("deviceId", {
    maxAge: 2592000,
  });

  const setAuthCookies = async (token: string) => {
    tokenCookie.value = token ? token : "";
  };

  const setRedirectUrl = (currentUrl: string) => {
    redirectUrl.value = currentUrl;
  };

  const setDeviceId = (id: string) => {
    deviceId.value = id;
  };

  const logout = async (token: string) => {
    try {
      await $fetch(LOGOUT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (error) {
      return false;
    } finally {
      await setAuthCookies("");
      setRedirectUrl("/");
      setTimeout(() => {
        router.replace(localePath("/auth/login"));
      }, 500);
    }
  };

  const fetchOauthUrl = async (provider: string) => {
    const data = $fetch<OauthResponse>(`${OAUTH}/${provider}`);
    if (data) {
      return data;
    }
    return null;
  };

  return {
    tokenCookie,
    setAuthCookies,
    logout,
    redirectUrl,
    setRedirectUrl,
    deviceId,
    setDeviceId,
    fetchOauthUrl,
  };
};
