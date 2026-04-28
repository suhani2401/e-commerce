import { type PropsWithChildren, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AuthState } from "../../redux/types";
import { ROUTES } from "../../constant/routesPath";


export const UnAuthenticateRoute: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const isLoggedIn = useSelector((state: {auth: AuthState}) => state.auth.loggedInUser);

  if (!isLoggedIn) {
    return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
  }

  return <Navigate to={ROUTES.DASHBOARD.path} />;
};

export default UnAuthenticateRoute;
