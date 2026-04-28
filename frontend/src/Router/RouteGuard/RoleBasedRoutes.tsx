import { type ReactNode, Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { AuthState } from "../../redux/types";
import { ROUTES } from "../../constant/routesPath";

const RoleBasedRoute: React.FC<{children: ReactNode, roles: string[]}> = ({ children, roles}) => {
  const isLoggedIn = useSelector((state: AuthState) => state.loggedInUser);

  if (!roles.includes(isLoggedIn?.role as string)) {
    return <Navigate to={ROUTES.LOGIN.path} />;
  }

  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
};

export default RoleBasedRoute;
