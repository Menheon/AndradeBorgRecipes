import AddIcon from "@/assets/add.svg?react";
import { RecipeItem } from "./RecipeItem";
import { useCallback, useEffect, useState } from "react";
import { getAllRecipes } from "@/data/recipesService";
import { Recipe } from "@/types/models";
import { CreateRecipeDialog } from "./CreateRecipeDialog";
import { RecipeSearchField } from "./RecipeSearchField";

export const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);

  const initializeRecipes = useCallback(async () => {
    const recipes = await getAllRecipes();
    setAllRecipes(recipes);
    setFilteredRecipes(recipes);
  }, []);

  useEffect(() => {
    // TODO uncomment when needing recipes.
    // TODO Use Tanstack's React Query to fetch recipes.
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
    <div className="mx-auto px-4 justify-center">
      <div className="flex items-center flex-col">
        <img
          className="xs:w-[calc(100%-50px)] sm:w-[calc(100%-100px)] h-52 object-cover filter brightness-75 contrast-75"
          src="https://static.vecteezy.com/system/resources/previews/024/396/481/large_2x/table-scene-with-a-selection-of-delicious-foods-top-view-over-a-dark-wood-banner-background-generate-ai-free-photo.jpg"
        />
        <RecipeSearchField onChange={onSearchInputValueChanged} />
        <h1 className="text-2xl font-bold my-4 font-[system-ui]">
          ALL RECIPES
        </h1>
      </div>

      <button
        className="cursor-pointer transition-colors fixed bottom-10 right-10 bg-brown-600 hover:bg-brown-500 w-12 h-12 flex justify-center items-center rounded-full focus-visible:outline focus-visible:outline-brown-600 focus-visible:outline-[3px] focus-visible:outline-offset-[2.5px] focus-visible:outline-solid"
        onClick={() => setIsCreatingRecipe(true)}
      >
        <AddIcon className="fill-whiteSmoke w-8 h-8" />
      </button>
      <CreateRecipeDialog
        isOpen={isCreatingRecipe}
        onClose={() => setIsCreatingRecipe(false)}
      />

      <div>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeItem recipe={recipe} key={recipe.name} />
          ))
        ) : (
          <p className="text-center">
            Whoops! No recipes matching your search...
          </p>
        )}
      </div>
    </div>
  );
};
