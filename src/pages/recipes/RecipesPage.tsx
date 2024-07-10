import AddIcon from "@/assets/add.svg?react";
import { RecipeItem } from "./components/RecipeItem";
import { useCallback, useEffect, useState } from "react";
import { RECIPES_QUERY_TAG, getAllRecipes } from "@/data/recipesService";
import { Recipe } from "@/types/models";
import { CreateRecipeDialog } from "./components/CreateRecipeDialog";
import { RecipeSearchField } from "./components/RecipeSearchField";
import { useQuery } from "@tanstack/react-query";

export const RecipesPage = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);

  const {
    data: recipes,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [RECIPES_QUERY_TAG],
    queryFn: getAllRecipes,
  });

  const initializeRecipes = useCallback(async () => {
    if (isSuccess) {
      setAllRecipes(recipes);
      setFilteredRecipes(recipes);
    }
  }, [recipes]);

  useEffect(() => {
    initializeRecipes();
  }, [initializeRecipes]);

  const onSearchInputValueChanged = (newValue: string) => {
    if (newValue === "") {
      return setFilteredRecipes(allRecipes);
    }
    const searchValue = newValue.toLowerCase();

    const newFilteredRecipes = allRecipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchValue) ||
        recipe.description.toLowerCase().includes(searchValue) ||
        recipe.tags.some((tag) => tag.name.toLowerCase().includes(searchValue)),
    );
    setFilteredRecipes(newFilteredRecipes);
  };

  return (
    <div className="mx-auto justify-center px-4">
      <div className="flex flex-col items-center">
        <img
          className="h-52 object-cover brightness-75 contrast-75 filter xs:w-[calc(100%-50px)] sm:w-[calc(100%-100px)]"
          src="https://static.vecteezy.com/system/resources/previews/024/396/481/large_2x/table-scene-with-a-selection-of-delicious-foods-top-view-over-a-dark-wood-banner-background-generate-ai-free-photo.jpg"
        />
        <RecipeSearchField onChange={onSearchInputValueChanged} />
        <h1 className="my-4 font-[system-ui] text-2xl font-bold">
          ALL RECIPES
        </h1>
      </div>

      <button
        className="focus-visible:outline-solid fixed bottom-10 right-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-brown-600 transition-colors hover:bg-brown-500 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[2.5px] focus-visible:outline-brown-600"
        onClick={() => setIsCreatingRecipe(true)}
      >
        <AddIcon className="h-8 w-8 fill-whiteSmoke" />
      </button>
      <CreateRecipeDialog
        isOpen={isCreatingRecipe}
        onClose={() => setIsCreatingRecipe(false)}
      />

      <div>
        {isLoading && <p className="text-center text-xl">Loading...</p>}
        {isError && (
          <p className="text-center text-xl">Failed to load recipes</p>
        )}
        {isSuccess && filteredRecipes.length === 0 && (
          <p className="text-center text-xl">
            Whoops! No recipes matching your search...
          </p>
        )}
        {filteredRecipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.name} />
        ))}
      </div>
    </div>
  );
};
