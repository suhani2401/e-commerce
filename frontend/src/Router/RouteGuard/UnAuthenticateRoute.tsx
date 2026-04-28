import { type PropsWithChildren, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constant/routesPath";
import type { AuthState } from "../../types";


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
