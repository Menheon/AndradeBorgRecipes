import { RECIPE_QUERY_TAG, getRecipeDocumentById } from "@/data/recipesService";
import { useParams } from "react-router-dom";
import { StrikeableStep } from "../recipes/StrikeableStep";
import { mapUnitToStringFormat } from "@/util/util";
import { RemovableTag } from "../recipes/RemovableTag";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DeleteButton } from "./components/DeleteButton";
import { DeleteRecipeDialog } from "./components/DeleteRecipeDialog";

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const isMinMediumScreen = useMediaQuery("md");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

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
  // TODO: Scroll to top of page when navigating to a recipe.
  /* TODO: Instead of fetching the recipe data on page load, send a long the data available from previous page.
     For example the title, image description, and tags could be shown and the transition could still play,
     but the sections could be fetched in the background with loading state only there.
  */
  return (
    <div className="p-8 lg:px-32 xl:px-40 2xl:px-72">
      {isLoading && <p className="text-center text-xl">Loading...</p>}
      {isError && (
        <p className="text-center text-xl">Error fetching recipe data</p>
      )}
      {isSuccess && recipe && (
        <>
          <div
            className="relative flex min-h-[750px] flex-col overflow-auto rounded-xl border-2 border-brown-600 shadow-lg"
            style={{
              viewTransitionName: `recipe-container-${recipe.id}`,
            }}
          >
            <h1
              className="text-darkGreen p-4 text-center font-caveat text-5xl font-bold tracking-wider"
              style={{
                viewTransitionName: `recipe-title-${recipe.id}`,
              }}
            >
              {recipe.name}
            </h1>
            <div className="absolute right-1 top-1">
              <DeleteButton onClick={() => setIsDeleteDialogOpen(true)} />
              <DeleteRecipeDialog
                isOpen={isDeleteDialogOpen}
                recipe={recipe}
                onClose={() => setIsDeleteDialogOpen(false)}
              />
            </div>
            <hr
              className="mx-40 mb-4 border-t-2 border-brown-600"
              style={{
                viewTransitionName: `recipe-title-bar-${recipe.id}`,
              }}
            />
            {!isMinMediumScreen && (
              <img
                className="max-h-80 w-full border-y-2 border-brown-600 object-cover"
                src={recipe.imageUrl}
                style={{
                  viewTransitionName: `recipe-img-${recipe.id}`,
                }}
              />
            )}
            <div className="flex">
              {isMinMediumScreen && (
                <img
                  className="h-full w-1/2 rounded-r-xl border-y-2 border-r-2 border-brown-600 object-cover"
                  src={recipe.imageUrl}
                  style={{
                    viewTransitionName: `recipe-img-${recipe.id}`,
                  }}
                />
              )}
              <div className="col-span-5 flex flex-col px-8 pt-2">
                <p
                  className="text-lg"
                  style={{
                    viewTransitionName: `recipe-description-${recipe.id}`,
                  }}
                >
                  {recipe.description}
                </p>
                <div
                  className="mb-0 mt-auto flex gap-1"
                  style={{
                    viewTransitionName: `recipe-tags-${recipe.id}`,
                  }}
                >
                  {recipe.tags.map((tag) => (
                    <RemovableTag key={tag.id} isRemovable={false}>
                      {tag.name}
                    </RemovableTag>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 h-full flex-1 rounded-xl bg-whiteSmoke py-2">
              {recipe.sections.map((section, i) => (
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-2" key={i}>
                  <h3 className="col-span-2 px-5 text-center font-caveat text-2xl font-semibold">
                    {section.title}
                  </h3>
                  <div className="bg-pastelGreen col-span-2 rounded-lg px-5 pb-2 xs:col-span-1">
                    <h4 className="text-md text-darkGreen pb-2 font-semibold uppercase tracking-wider">
                      Ingredients
                    </h4>
                    <ul className="list-inside list-disc">
                      {section.ingredients.map((ingredientLine, i) => (
                        <li className="text-darkGreen list-item pb-2" key={i}>
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
                  <div className="bg-pastelGreen col-span-2 rounded-lg px-5 pb-2 xs:col-span-1">
                    <h4 className="text-md text-darkGreen pb-2 font-semibold uppercase tracking-wider">
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
