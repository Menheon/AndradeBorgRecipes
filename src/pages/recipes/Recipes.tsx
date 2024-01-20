// import AddIcon from "assets/add.svg?react";
import { RecipeItem } from "./RecipeItem";
import { useCallback, useEffect, useState } from "react";
import { getAllRecipes } from "data/recipesService";
import { Recipe } from "types/models";
// import { CreateRecipeDialog } from "./CreateRecipeDialog";
import { RecipeSearchField } from "./RecipeSearchField";

export const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  // const [isCreatingRecipe, setIsCreatingRecipe] = useState(false);

  const initializeRecipes = useCallback(async () => {
    const recipes = await getAllRecipes();
    setAllRecipes(recipes);
    setFilteredRecipes(recipes);
  }, []);

  useEffect(() => {
    initializeRecipes();
  }, [initializeRecipes]);

  const onSearchInputValueChanged = (newValue: string) => {
    if (newValue === "") {
      return setFilteredRecipes(allRecipes);
    }
    const searchValue = newValue.toLowerCase();

    const newFilteredRecipes = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchValue),
    );
    setFilteredRecipes(newFilteredRecipes);
  };

  return (
    <div className="container mx-auto px-4 justify-center">
      <div className="flex items-center flex-col">
        <img
          className="w-[calc(100%-100px)] h-52 object-cover filter brightness-75 contrast-75"
          src="https://static.vecteezy.com/system/resources/previews/024/396/481/large_2x/table-scene-with-a-selection-of-delicious-foods-top-view-over-a-dark-wood-banner-background-generate-ai-free-photo.jpg"
        />
        <RecipeSearchField onChange={onSearchInputValueChanged} />
      </div>
      {/* <div className="flex gap-4">
        <div className="rounded-md bg-pastelGreen p-4 flex gap-1 flex-col w-36 h-28 justify-start">
          <label className="font-semibold text-center">Create Recipe</label>
          <button
            className="self-center hover:bg-darkGreen hover:bg-opacity-30 w-10 h-10 flex justify-center items-center rounded-md"
            onClick={() => setIsCreatingRecipe(true)}
          >
            <AddIcon className="fill-polyGreen" />
          </button>
          <CreateRecipeDialog
            isOpen={isCreatingRecipe}
            onClose={() => setIsCreatingRecipe(false)}
          />
        </div>
      </div> */}

      <div>
        {filteredRecipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.name} />
        ))}
      </div>
    </div>
  );
};
