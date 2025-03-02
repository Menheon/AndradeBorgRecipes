import { RECIPE_QUERY_TAG, getRecipeDocumentById } from "@/data/recipesService";
import { useNavigate, useParams } from "react-router-dom";
import { StrikeableStep } from "../all-recipes/components/StrikeableStep";
import { mapUnitToStringFormat } from "@/util/util";
import { RemovableTag } from "../all-recipes/components/RemovableTag";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { DeleteRecipeDialog } from "./components/DeleteRecipe/DeleteRecipeDialog";
import { useAuth } from "@/store/AuthProvider";
import { IconButton } from "@/shared/form-components/IconButton";
import { EditRecipeDialog } from "./components/EditRecipe/EditRecipeDialog";
import { ALL_RECIPES_PATH } from "@/shared/AppRoutes";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useTranslation } from "react-i18next";

export const RecipePage = () => {
  const { recipeId } = useParams();
  const isMinMediumScreen = useMediaQuery("md");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { storedUserData } = useAuth();
  const navigate = useNavigate();

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

  // TODO - implement pretty skeleton loader for loading and fetching.
  const {
    data: recipe,
    isSuccess,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [`${RECIPE_QUERY_TAG}-${recipeId}`],
    queryFn: getRecipeDocument,
    refetchOnWindowFocus: false,
  });

  const { t, i18n } = useTranslation();
  const recipeTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipe,
    [i18n.language],
  );

  useEffect(() => {
    if (recipe?.name) {
      document.title = `${t(recipeTranslations.documentTitle)} - ${recipe.name}`;
    } else {
      document.title = t(recipeTranslations.documentTitle);
    }
  }, [recipe?.name, recipeTranslations.documentTitle, t]);

  return (
    <div className="py-8 md:px-8 lg:px-32 xl:px-40 2xl:px-72">
      {isFetching && (
        <div className="absolute inset-0 flex h-dvh items-center justify-center">
          <p className="text-center font-caveat text-6xl font-bold tracking-wider">
            {t(recipeTranslations.loadingRecipe)}
          </p>
        </div>
      )}

      {isError && !isFetching && (
        <p className="text-center text-xl">
          {t(recipeTranslations.errorLoadingRecipe)}
        </p>
      )}

      {isSuccess && recipe && (
        <div
          className="relative flex min-h-[750px] flex-col overflow-auto rounded-xl border-2 border-brown-600 bg-cream-200 shadow-lg"
          style={{
            viewTransitionName: `recipe-container-${recipe.id}`,
          }}
        >
          <h1
            className="text-darkGreen mt-2 p-4 text-center font-caveat text-5xl font-bold tracking-wider"
            style={{
              viewTransitionName: `recipe-title-${recipe.id}`,
            }}
          >
            <div className="absolute left-0 top-0">
              <IconButton
                icon="chevron-left"
                onClick={() => navigate(ALL_RECIPES_PATH)}
                size="lg"
              />
            </div>
            {recipe.name}
          </h1>
          {(storedUserData?.isAdmin || location.hostname === "localhost") && (
            <div className="absolute right-1 top-1 flex">
              <IconButton
                icon="edit"
                onClick={() => setIsEditDialogOpen(true)}
              />
              <EditRecipeDialog
                key={new Date().getTime()}
                isOpen={isEditDialogOpen}
                recipe={recipe}
                onClose={() => setIsEditDialogOpen(false)}
              />
              <IconButton
                icon="delete"
                onClick={() => setIsDeleteDialogOpen(true)}
              />
              <DeleteRecipeDialog
                isOpen={isDeleteDialogOpen}
                recipe={recipe}
                onClose={() => setIsDeleteDialogOpen(false)}
              />
            </div>
          )}
          <hr
            className="mb-4 w-3/4 self-center border-t-2 border-brown-600"
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
              alt={recipe.name}
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
                alt={recipe.name}
              />
            )}
            <div className="col-span-5 flex flex-col px-8 pt-2">
              <p
                className="text-justify text-lg"
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

          <div className="mt-6 h-full flex-1 rounded-xl border border-t-2 border-brown-600 bg-cream-100 py-2">
            {recipe.sections.map((section) => (
              <div
                className="grid grid-cols-1 gap-2 xs:grid-cols-2"
                key={section.title}
              >
                <h3 className="col-span-2 px-5 text-center font-caveat text-2xl font-semibold">
                  {section.title}
                </h3>
                <div className="col-span-2 rounded-lg px-5 pb-2 xs:col-span-1">
                  <h4 className="text-md text-darkGreen pb-2 font-semibold uppercase tracking-wider">
                    {t(recipeTranslations.ingredients)}
                  </h4>
                  <ul className="list-inside list-disc">
                    {section.ingredients.map((ingredientLine, i) => (
                      <li
                        className="text-darkGreen list-item pb-2"
                        key={ingredientLine.id ?? i}
                      >
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
                <div className="col-span-2 rounded-lg px-5 pb-2 xs:col-span-1">
                  <h4 className="text-md text-darkGreen pb-2 font-semibold uppercase tracking-wider">
                    {t(recipeTranslations.steps)}
                  </h4>
                  <div>
                    {section.steps.map((step, i) => (
                      <StrikeableStep key={`step-${i}`} step={step} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipePage;
