import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import AuthenticateRoute from "./RouteGuard/AuthenticateRoute";
import UnAuthenticateRoute from "./RouteGuard/UnAuthenticateRoute";
import { ROUTES } from "../constant/routesPath";
import RoleBasedRoute from "./RouteGuard/RoleBasedRoutes";

export const RoutesArray = [
  ...Object.keys(ROUTES).map((key) => {
    const route = ROUTES[key as keyof typeof ROUTES];

    const routeObj = {
      path: route.path,
      element: <route.element />,
    };

    if (route.isPrivate) {
      routeObj["element"] = (
        <AuthenticateRoute>
          {<route.element />}
        </AuthenticateRoute>
      );
    }
    else if (!route.isPrivate) {
      routeObj["element"] = (
        <UnAuthenticateRoute>{<route.element />}</UnAuthenticateRoute>
      );
    }

    if (route.roles) {
      <RoleBasedRoute roles={route.roles}>
        {<route.element />}
      </RoleBasedRoute>
    }
    return routeObj;
  }),
];

const AllRoute = createBrowserRouter(RoutesArray);

const Route = () => <RouterProvider router={AllRoute} />;

export default Route;
