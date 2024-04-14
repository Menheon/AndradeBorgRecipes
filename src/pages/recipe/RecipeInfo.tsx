import { getRecipeDocumentById } from "@/data/recipesService";
import { Recipe } from "@/types/models";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StrikeableStep } from "../recipes/StrikeableStep";
import { mapUnitToStringFormat } from "@/util/util";
import { RemovableTag } from "../recipes/RemovableTag";

const RecipeInfo = () => {
  let { recipeId } = useParams();
  const [recipe, setRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Display the recipe data in the component
  // TODO: Add a button to navigate back to the recipes page
  // TODO: Add error handling for invalid recipeId
  // TODO: Add loading state while fetching recipe data
  // TODO: Add styling to the component
  // TODO: Add a button to edit the recipe data
  // TODO: Add a button to share the link to the recipe.

  const initializeRecipe = useCallback(async () => {
    // TODO check if recipe is already loaded from recipes collection, and then retrieve data from there to avoid unnecessary fetch and utilize View Transitions API to make fancy animation.
    if (!recipeId || recipe) return;
    setIsLoading(true);
    // Fetch recipe data from Firestore using the recipeId
    const recipeDocument = await getRecipeDocumentById(recipeId);
    if (recipeDocument) {
      setRecipe(recipeDocument);
    }
    setIsLoading(false);
  }, [recipeId, recipe]);

  useEffect(() => {
    initializeRecipe();
  }, [initializeRecipe]);

  return (
    <div className="p-8">
      {isLoading && <p>Loading...</p>}
      {recipe && !isLoading ? (
        <>
          <div className="border-brown-600 border-2 min-h-[750px] rounded-xl shadow-lg overflow-auto flex flex-col">
            <h1 className="text-5xl font-bold text-center p-4 text-darkGreen font-caveat tracking-wider">
              {recipe.name}
            </h1>
            <hr className="mb-4 mx-40 border-t-2 border-brown-600" />
            <div className="flex">
              <img
                className="w-1/2 h-full object-cover border-brown-600 border-y-2 border-r-2 rounded-r-xl"
                src={recipe.imageUrl}
              />
              <div className="px-12 py-8 col-span-5 flex-col flex">
                <p className="text-lg">{recipe.description}</p>
                <div className="flex gap-1 mb-0 mt-auto">
                  {recipe.tags.map((tag) => (
                    <RemovableTag key={tag.id} isRemovable={false}>
                      {tag.name}
                    </RemovableTag>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-whiteSmoke h-full mt-6 py-2 rounded-xl flex-1">
              {recipe.sections.map((section, i) => (
                <div className="grid grid-cols-2 gap-4" key={i}>
                  <div className="bg-pastelGreen rounded-lg px-5 py-2">
                    {recipe.sections.length > 1 && (
                      <h3 className="item">{section.title}</h3>
                    )}
                    <div>
                      <h4 className="text-md font-semibold uppercase text-darkGreen tracking-wider pb-2">
                        Ingredients
                      </h4>
                      <ul className="list-disc list-inside">
                        {section.ingredients.map((ingredientLine, i) => (
                          <li className="list-item pb-2 text-darkGreen" key={i}>
                            <span className="text-black">
                              {ingredientLine.unit &&
                                `${ingredientLine.amount} ${mapUnitToStringFormat(
                                  ingredientLine.unit,
                                )} ${ingredientLine.ingredient.name}`}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-pastelGreen rounded-lg px-5 py-2">
                    {recipe.sections.length > 1 && (
                      <h3 className="item">{section.title}</h3>
                    )}
                    <h4 className="text-md font-semibold uppercase text-darkGreen tracking-wider pb-2">
                      Steps
                    </h4>
                    <div>
                      {section.steps.map((step, i) => (
                        <StrikeableStep key={i} step={step} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Recipe not found</p>
      )}
    </div>
  );
};

export default RecipeInfo;
