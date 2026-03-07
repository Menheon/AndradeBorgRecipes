import AddIcon from "@/assets/add.svg?react";
import { RecipeItem } from "./components/RecipeItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlatformSupportedLanguages, Recipe } from "@/types/models";
import { CreateRecipeDialog } from "./components/CreateRecipeDialog";
import { RecipeSearchField } from "./components/RecipeSearchField";
import { useAuth } from "@/store/AuthProvider";
import { translations } from "@/i18n";
import { useTranslation } from "react-i18next";
import { RecipeItemSkeleton } from "./components/RecipeItemSkeleton";
import { useRecipes } from "@/hooks/useRecipes";

export const AllRecipesPage = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);
  const { storedUserData } = useAuth();
  const [isUsingSearch, setIsUsingSearch] = useState(false);

  const {
    data: recipes,
    isLoading: isLoadingRecipes,
    isSuccess: isRecipesQuerySuccess,
    isError: isRecipesQueryError,
  } = useRecipes();

  const initializeRecipes = useCallback(() => {
    if (!isRecipesQuerySuccess || !recipes) return;
    const sortedRecipes = [...recipes].sort(
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
      setIsUsingSearch(false);
      return setFilteredRecipes(allRecipes);
    }
    setIsUsingSearch(true);
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
    <div>
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="relative h-64 overflow-hidden sm:h-72 md:h-80">
          <img
            className="h-full w-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/024/396/481/large_2x/table-scene-with-a-selection-of-delicious-foods-top-view-over-a-dark-wood-banner-background-generate-ai-free-photo.jpg"
            alt="table-with-food"
          />
          <div className="absolute inset-0 bg-linear-to-b from-neutral-900/60 via-neutral-900/40 to-neutral-50 dark:to-neutral-900" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <h1 className="font-caveat mb-4 text-5xl font-bold tracking-wider text-white drop-shadow-lg sm:text-6xl">
            {t(recipesTranslations.allRecipes)}
          </h1>
          <RecipeSearchField onChange={onSearchInputValueChanged} />
        </div>
      </div>

      {/* FAB Button */}
      {(storedUserData?.isAdmin || location.hostname === "localhost") && (
        <>
          <button
            className="bg-primary-500 shadow-fab focus-visible:base-outline hover:bg-primary-600 fixed right-8 bottom-8 z-20 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            onClick={() => setIsCreatingRecipe(true)}
          >
            <AddIcon className="h-8 w-8 fill-white" />
          </button>
          <CreateRecipeDialog
            isOpen={isCreatingRecipe}
            onClose={() => setIsCreatingRecipe(false)}
          />
        </>
      )}

      {/* Recipe Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {isRecipesQueryError && (
          <p className="py-12 text-center text-xl text-neutral-600 dark:text-neutral-400">
            {t(recipesTranslations.loadError)}
          </p>
        )}
        {isRecipesQuerySuccess &&
          isUsingSearch &&
          filteredRecipes.length === 0 && (
            <p className="py-12 text-center text-xl text-neutral-600 dark:text-neutral-400">
              {t(recipesTranslations.noMatchingRecipes)}
            </p>
          )}
        {isRecipesQuerySuccess &&
          !isUsingSearch &&
          filteredRecipes.length === 0 && (
            <p className="py-12 text-center text-xl text-neutral-600 dark:text-neutral-400">
              {t(recipesTranslations.noRecipes)}
            </p>
          )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
