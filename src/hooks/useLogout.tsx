import AxiosBase from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const Logout = async () => {
    setAuth({});
    try {
      const response = await AxiosBase.get("/logout", {
        withCredentials: true,
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return Logout;
};

export default useLogout;
