import { Fragment } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import { AllRecipesPage } from "@/pages/all-recipes/AllRecipesPage";
import { RecipePage } from "@/pages/recipe/RecipePage";
import { ProfilePage } from "@/pages/profile/ProfilePage";

export const ROOT_PATH = "/";
export const RECIPE_ITEM_PATH = "/recipes/:recipeId";
export const INSPIRATION_PATH = "/inspiration";
export const EMPTY_MY_FRIDGE_PATH = "/empty-my-fridge";
export const PROFILE = "/profile";

// eslint-disable-next-line react-refresh/only-export-components
export const routes: RouteObject[] = [
  {
    path: ROOT_PATH,
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
];

export const AppRoutes = () => {
  const routeElement = useRoutes(routes);

  return <Fragment>{routeElement}</Fragment>;
};
