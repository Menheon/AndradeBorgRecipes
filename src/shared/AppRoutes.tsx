import { Fragment, useEffect } from "react";
import {
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { Recipes } from "../pages/recipes/Recipes";

export const ROOT_PATH = "/";
export const RECIPES_PATH = "/recipes";
export const INSPIRATION_PATH = "/inspiration";
export const EMPTY_MY_FRIDGE_PATH = "/empty-my-fridge";

// eslint-disable-next-line react-refresh/only-export-components
export const routes: RouteObject[] = [
  {
    path: RECIPES_PATH,
    element: <Recipes />,
  },
  {
    path: INSPIRATION_PATH,
    element: <p>Inpsiration</p>,
  },
  {
    path: EMPTY_MY_FRIDGE_PATH,
    element: <p>Empty My Fridge</p>,
  },
];

export const AppRoutes = () => {
  const location = useLocation();
  const routeElement = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === ROOT_PATH) {
      navigate(RECIPES_PATH);
    }
  }, [location.pathname, navigate]);

  return <Fragment>{routeElement}</Fragment>;
};
