import AddIcon from "assets/add.svg?react";
import { RecipeItem } from "./RecipeItem";
import { useEffect, useState } from "react";
import { InputField } from "shared/InputField";
import { getAllRecipes } from "data/recipesService";
import { Recipe } from "types/models";

export const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    getAllRecipes().then(setAllRecipes);
  }, []);

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

  const createNewRecipe = () => {};

  return (
    <div className="container mx-auto bg-white p-4 justify-center">
      <div className="flex gap-4">
        <div className="rounded-md bg-pastelGreen p-4 flex gap-1 flex-col w-36 h-28 justify-start">
          <label className="text-darkGreen font-semibold text-center">
            Create Recipe
          </label>
          <button
            className="self-center hover:bg-darkGreen hover:bg-opacity-30 w-10 h-10 flex justify-center items-center rounded-md"
            onClick={createNewRecipe}
          >
            <AddIcon className="fill-polyGreen" />
          </button>
        </div>

        <div className="rounded-md bg-pastelGreen p-4 flex gap-1 flex-col h-28">
          <label htmlFor="search" className="text-darkGreen font-semibold">
            Search
          </label>
          <InputField
            id="search"
            onChange={onSearchInputValueChanged}
            size="large"
          />
          <p>
            {filteredRecipes.length} recipe
            {filteredRecipes.length === 1 ? "" : "s"} found
          </p>
        </div>
      </div>

      <div>
        {filteredRecipes.map((recipe) => (
          <RecipeItem recipe={recipe} key={recipe.name} />
        ))}
      </div>
    </div>
  );
};
