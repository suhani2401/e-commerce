import { type PropsWithChildren, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constant/routesPath";
import type { AuthState } from "../../types";

const AuthenticateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector((state: {auth: AuthState}) => state.auth.loggedInUser);
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN.path} />;
  }

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default AuthenticateRoute;
