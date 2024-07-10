import { Recipe } from "@/types/models";
import { RemovableTag } from "./RemovableTag";
import { useMediaQuery } from "@/util/useMediaQuery";
import { generatePath, useNavigate } from "react-router-dom";
import { RECIPE_ITEM_PATH } from "@/shared/AppRoutes";
import { flushSync } from "react-dom";

interface Props {
  recipe: Recipe;
}

export const RecipeItem = ({ recipe }: Props) => {
  const isMinLargeScreen = useMediaQuery("lg");
  const navigate = useNavigate();

  const onRecipeItemClicked = () => {
    if (!recipe.id) return;
    const path = generatePath(RECIPE_ITEM_PATH, { recipeId: recipe.id });
    document.startViewTransition(() => flushSync(() => navigate(path)));
  };

  return (
    <>
      {isMinLargeScreen ? (
        <div
          className="mx-12 mb-6 grid h-96 cursor-pointer grid-cols-8 overflow-auto  rounded-xl border-2 border-brown-600 shadow-lg transition hover:bg-brown-200"
          onClick={() => onRecipeItemClicked()}
          style={{
            viewTransitionName: `recipe-container-${recipe.id}`,
          }}
        >
          <img
            className="col-span-3 h-full min-h-[100px] w-full border-r-2 border-brown-600 object-cover"
            src={recipe.imageUrl}
            style={{
              viewTransitionName: `recipe-img-${recipe.id}`,
            }}
          />
          <div className="col-span-5 flex flex-col px-12 py-8">
            <h2
              className="text-darkGreen p-4 text-center font-caveat text-5xl font-bold tracking-wider"
              style={{
                viewTransitionName: `recipe-title-${recipe.id}`,
              }}
            >
              {recipe.name}
            </h2>
            <hr
              className="mb-4 border-t-2 border-brown-600"
              style={{
                viewTransitionName: `recipe-title-bar-${recipe.id}`,
              }}
            />

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
      ) : (
        <div
          className="mx-2 mb-6 grid cursor-pointer grid-cols-8 rounded-xl border-2 border-brown-600 shadow-lg transition hover:bg-brown-200 xs:mx-6 sm:mx-12"
          onClick={() => onRecipeItemClicked()}
        >
          <h2 className="text-darkGreen col-span-8 p-4 text-center font-caveat text-5xl font-bold tracking-wider">
            {recipe.name}
          </h2>
          <img
            className="col-span-8 h-full max-h-56 w-full border-y-2 border-brown-600 object-cover"
            src={recipe.imageUrl}
          />
          <div className="col-span-8 flex flex-col p-8">
            <p className="text-lg">{recipe.description}</p>
            <div className="mb-0 mt-auto flex gap-1 pt-2">
              {recipe.tags.map((tag) => (
                <RemovableTag key={tag.id} isRemovable={false}>
                  {tag.name}
                </RemovableTag>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
