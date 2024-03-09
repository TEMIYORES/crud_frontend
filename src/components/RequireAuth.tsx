import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";

const RequireAuth = ({ allowedRoles }: any) => {
  const { auth } = useAuth();
  const decoded:
    | { userInfo: { roles: string[]; username: string } }
    | undefined = auth?.accessToken ? jwtDecode(auth?.accessToken) : undefined;

  const roles = decoded?.userInfo?.roles;
  console.log({ decoded });
  const location = useLocation();
  return roles?.find((role: unknown) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
