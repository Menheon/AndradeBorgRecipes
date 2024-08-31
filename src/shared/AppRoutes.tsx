import { Fragment, useEffect } from "react";
import {
  RouteObject,
  useLocation,
  useNavigate,
  useRoutes,
} from "react-router-dom";
import { AllRecipesPage } from "@/pages/all-recipes/AllRecipesPage";
import { RecipePage } from "@/pages/recipe/RecipePage";
import XrSizer from "@/pages/xr-sizer/XrSizer";
import { ProfilePage } from "@/pages/profile/ProfilePage";

export const ROOT_PATH = "/";
const OLD_ALL_RECIPES_PATH = "/recipes";
export const ALL_RECIPES_PATH = "/all-recipes";
export const RECIPE_ITEM_PATH = "/recipes/:recipeId";
export const INSPIRATION_PATH = "/inspiration";
export const EMPTY_MY_FRIDGE_PATH = "/empty-my-fridge";
export const PROFILE = "/profile";

// Other experimental routes.
export const XR_SIZER = "/xr-sizer";

// eslint-disable-next-line react-refresh/only-export-components
export const routes: RouteObject[] = [
  {
    path: ALL_RECIPES_PATH,
    element: <AllRecipesPage />,
  },
  {
    path: RECIPE_ITEM_PATH,
    element: <RecipePage />,
  },
  {
    path: INSPIRATION_PATH,
    element: <p>Inspiration</p>,
  },
  {
    path: EMPTY_MY_FRIDGE_PATH,
    element: <p>Empty My Fridge</p>,
  },
  {
    path: PROFILE,
    element: <ProfilePage />,
  },
  {
    path: XR_SIZER,
    element: <XrSizer />,
  },
];

export const AppRoutes = () => {
  const location = useLocation();
  const routeElement = useRoutes(routes);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.pathname === ROOT_PATH ||
      location.pathname === OLD_ALL_RECIPES_PATH
    ) {
      navigate(ALL_RECIPES_PATH);
    }
  }, [location.pathname, navigate]);

  return <Fragment>{routeElement}</Fragment>;
};
