import { RECIPE_QUERY_TAG, getRecipeDocumentById } from "@/data/recipesService";
import { useParams } from "react-router-dom";
import { StrikeableStep } from "../recipes/StrikeableStep";
import { mapUnitToStringFormat } from "@/util/util";
import { RemovableTag } from "../recipes/RemovableTag";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useQuery } from "@tanstack/react-query";

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const isMinMediumScreen = useMediaQuery("md");

  const getRecipeDocument = async () => {
    const recipeDocument = await getRecipeDocumentById(recipeId ?? "");
    return recipeDocument;
  };

  const {
    data: recipe,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: [`${RECIPE_QUERY_TAG}-${recipeId}`],
    queryFn: getRecipeDocument,
  });

  // TODO: Display the recipe data in the component
  // TODO: Add a button to navigate back to the recipes page
  // TODO: Add error handling for invalid recipeId
  // TODO: Add loading state while fetching recipe data
  // TODO: Add styling to the component
  // TODO: Add a button to edit the recipe data
  // TODO: Add a button to share the link to the recipe.

  return (
    <div className="p-8 lg:px-32 xl:px-40 2xl:px-72">
      {isLoading && <p className="text-center text-xl">Loading...</p>}
      {isError && (
        <p className="text-center text-xl">Error fetching recipe data</p>
      )}
      {isSuccess && recipe && (
        <>
          <div className="border-brown-600 border-2 min-h-[750px] rounded-xl shadow-lg overflow-auto flex flex-col">
            <h1 className="text-5xl font-bold text-center p-4 text-darkGreen font-caveat tracking-wider">
              {recipe.name}
            </h1>
            <hr className="mb-4 mx-40 border-t-2 border-brown-600" />
            {!isMinMediumScreen && (
              <img
                className="w-full max-h-80 object-cover border-brown-600 border-y-2"
                src={recipe.imageUrl}
              />
            )}
            <div className="flex">
              {isMinMediumScreen && (
                <img
                  className="w-1/2 h-full object-cover border-brown-600 border-y-2 border-r-2 rounded-r-xl"
                  src={recipe.imageUrl}
                />
              )}
              <div className="px-8 pt-2 col-span-5 flex-col flex">
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
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2" key={i}>
                  <h3 className="col-span-2 px-5 text-center text-2xl font-caveat font-semibold">
                    {section.title}
                  </h3>
                  <div className="bg-pastelGreen rounded-lg px-5 pb-2 xs:col-span-1 col-span-2">
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
                  <div className="bg-pastelGreen rounded-lg px-5 pb-2 xs:col-span-1 col-span-2">
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
      )}
    </div>
  );
};

export default RecipeInfo;
