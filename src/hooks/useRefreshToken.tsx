import AxiosBase from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await AxiosBase.get("/refresh", {
      withCredentials: true, //allows cookies to be sent along
    });
    setAuth((prev: any) => {
      console.log(prev);
      console.log(response?.data?.accessToken);
      return {
        ...prev,
        username: response?.data?.username,
        roles: response?.data?.roles,
        accessToken: response?.data?.accessToken,
      };
    });
    return response?.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
