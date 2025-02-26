import AddIcon from "@/assets/add.svg?react";
import { RecipeItem } from "./components/RecipeItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RECIPES_QUERY_TAG, getAllRecipes } from "@/data/recipesService";
import { PlatformSupportedLanguages, Recipe } from "@/types/models";
import { CreateRecipeDialog } from "./components/CreateRecipeDialog";
import { RecipeSearchField } from "./components/RecipeSearchField";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/store/AuthProvider";
import { translations } from "@/i18n";
import { useTranslation } from "react-i18next";
import { RecipeItemSkeleton } from "./components/RecipeItemSkeleton";

export const AllRecipesPage = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
  const { storedUserData } = useAuth();

  const {
    data: recipes,
    isLoading: isLoadingRecipes,
    isSuccess: isRecipesQuerySuccess,
    isError: isRecipesQueryError,
  } = useQuery({
    queryKey: [RECIPES_QUERY_TAG],
    queryFn: getAllRecipes,
    refetchOnWindowFocus: false,
  });

  const initializeRecipes = useCallback(async () => {
    if (!isRecipesQuerySuccess) return;
    const sortedRecipes = recipes.sort(
      (a, b) => b.creationDate.getTime() - a.creationDate.getTime(),
    );
    setAllRecipes(sortedRecipes);
    setFilteredRecipes(sortedRecipes);
  }, [isRecipesQuerySuccess, recipes]);

  useEffect(() => {
    initializeRecipes();
  }, [initializeRecipes]);

  const onSearchInputValueChanged = (newValue: string) => {
    if (newValue === "") {
      return setFilteredRecipes(allRecipes);
    }
    const searchValue = newValue.toLowerCase();

    const newFilteredRecipes = allRecipes
      .filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchValue) ||
          recipe.description.toLowerCase().includes(searchValue) ||
          recipe.tags.some((tag) =>
            tag.name.toLowerCase().includes(searchValue),
          ),
      )
      .sort((a, b) => a.creationDate.getDate() - b.creationDate.getDate());

    setFilteredRecipes(newFilteredRecipes);
  };

  const { t, i18n } = useTranslation();
  const recipesTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes,
    [i18n.language],
  );
  document.title = t(recipesTranslations.documentTitle);

  return (
    <div className="mx-auto justify-center px-4">
      <div className="flex flex-col items-center">
        <img
          className="h-52 rounded-lg object-cover brightness-75 contrast-75 filter xs:w-[calc(100%-50px)] sm:w-[calc(100%-100px)]"
          src="https://static.vecteezy.com/system/resources/previews/024/396/481/large_2x/table-scene-with-a-selection-of-delicious-foods-top-view-over-a-dark-wood-banner-background-generate-ai-free-photo.jpg"
          alt="table-with-food"
        />
        <RecipeSearchField onChange={onSearchInputValueChanged} />
        <h1 className="my-4 font-caveat text-4xl font-bold tracking-wider">
          {t(recipesTranslations.allRecipes).toUpperCase()}
        </h1>
      </div>

      {(storedUserData?.isAdmin || location.hostname === "localhost") && (
        <>
          <button
            className="fixed bottom-10 right-10 z-20 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brown-600 transition-all transition-colors focus-visible:base-outline hover:scale-105 hover:bg-brown-500 active:scale-95"
            onClick={() => setIsCreatingRecipe(true)}
          >
            <AddIcon className="h-8 w-8 fill-grey-150" />
          </button>
          <CreateRecipeDialog
            isOpen={isCreatingRecipe}
            onClose={() => setIsCreatingRecipe(false)}
          />
        </>
      )}

      <div>
        {isRecipesQueryError && (
          <p className="text-center text-xl">
            {t(recipesTranslations.loadError)}
          </p>
        )}
        {isRecipesQuerySuccess && filteredRecipes.length === 0 && (
          <p className="text-center text-xl">
            {t(recipesTranslations.noMatchingRecipes)}
          </p>
        )}
        <div className="mx-1 flex flex-col gap-3 sm:grid sm:grid-cols-2 md:mx-12 lg:grid-cols-3 xl:grid-cols-4">
          {isLoadingRecipes && (
            <>
              <RecipeItemSkeleton />
              <RecipeItemSkeleton />
              <RecipeItemSkeleton />
              <RecipeItemSkeleton />
              <RecipeItemSkeleton />
              <RecipeItemSkeleton />
            </>
          )}
          {filteredRecipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.name} />
          ))}
        </div>
      </div>
    </div>
  );
};
