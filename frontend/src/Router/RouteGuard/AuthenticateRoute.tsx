import { type PropsWithChildren, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AuthState } from "../../redux/types";
import { ROUTES } from "../../constant/routesPath";

const AuthenticateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useSelector((state: {auth: AuthState}) => state.auth.loggedInUser);
  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN.path} />;
  }

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default AuthenticateRoute;
