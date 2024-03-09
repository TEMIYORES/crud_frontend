import { useEffect } from "react";
import { AxiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = AxiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = AxiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status == 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return AxiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      AxiosPrivate.interceptors.request.eject(requestIntercept);
      AxiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return AxiosPrivate;
};
export default useAxiosPrivate;
