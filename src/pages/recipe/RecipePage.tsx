import { useNavigate, useParams } from "react-router-dom";
import { StrikeableStep } from "../all-recipes/components/StrikeableStep";
import { mapUnitToStringFormat } from "@/util/util";
import { RemovableTag } from "../all-recipes/components/RemovableTag";
import { useMediaQuery } from "@/util/useMediaQuery";
import { useEffect, useMemo, useState } from "react";
import { DeleteRecipeDialog } from "./components/DeleteRecipe/DeleteRecipeDialog";
import { useAuth } from "@/store/AuthProvider";
import { IconButton } from "@/shared/form-components/IconButton";
import { EditRecipeDialog } from "./components/EditRecipe/EditRecipeDialog";
import { ALL_RECIPES_PATH } from "@/shared/AppRoutes";
import { translations } from "@/i18n";
import { PlatformSupportedLanguages } from "@/types/models";
import { useTranslation } from "react-i18next";
import { useRecipe } from "@/hooks/useRecipes";

export const RecipePage = () => {
  const { recipeId = "" } = useParams();
  const isMinMediumScreen = useMediaQuery("minMd");
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

  // TODO - implement pretty skeleton loader for loading and fetching.
  const { data: recipe, isSuccess, isError, isFetching } = useRecipe(recipeId);

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
    <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-32 xl:px-40 2xl:px-72">
      {isFetching && (
        <div className="absolute inset-0 flex h-dvh items-center justify-center">
          <p className="font-caveat text-center text-5xl font-bold tracking-wide text-neutral-600">
            {t(recipeTranslations.loadingRecipe)}
          </p>
        </div>
      )}

      {isError && !isFetching && (
        <p className="py-12 text-center text-xl text-neutral-600">
          {t(recipeTranslations.errorLoadingRecipe)}
        </p>
      )}

      {isSuccess && recipe && (
        <div className="shadow-card relative flex min-h-187.5 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {/* Header */}
          <div className="relative border-b border-neutral-100 bg-neutral-50 px-6 py-6">
            <div className="absolute top-1/2 left-2 -translate-y-1/2">
              <IconButton
                icon="chevron-left"
                onClick={() => navigate(ALL_RECIPES_PATH)}
                size="lg"
              />
            </div>
            <h1 className="font-caveat text-center text-4xl font-bold tracking-wide text-neutral-800 sm:text-5xl">
              {recipe.name}
            </h1>
            {(storedUserData?.isAdmin || location.hostname === "localhost") && (
              <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
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
          </div>

          {/* Mobile Image */}
          {!isMinMediumScreen && (
            <img
              className="max-h-80 w-full object-cover"
              src={recipe.imageUrl}
              alt={recipe.name}
            />
          )}

          {/* Content with Side Image */}
          <div className="flex flex-1">
            {isMinMediumScreen && (
              <img
                className="h-auto w-1/2 object-cover"
                src={recipe.imageUrl}
                alt={recipe.name}
              />
            )}
            <div className="flex flex-1 flex-col p-6">
              <p className="text-lg leading-relaxed text-neutral-700">
                {recipe.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {recipe.tags.map((tag) => (
                  <RemovableTag key={tag.id} isRemovable={false}>
                    {tag.name}
                  </RemovableTag>
                ))}
              </div>
            </div>
          </div>

          {/* Sections */}
          <div className="mt-auto border-t border-neutral-200 bg-neutral-50 p-6">
            {recipe.sections.map((section) => (
              <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                key={section.title}
              >
                <h3 className="font-caveat col-span-full text-center text-2xl font-bold text-neutral-800">
                  {section.title}
                </h3>

                {/* Ingredients */}
                <div className="shadow-card rounded-xl bg-white p-5">
                  <h4 className="text-primary-600 mb-3 text-xs font-semibold tracking-wider uppercase">
                    {t(recipeTranslations.ingredients)}
                  </h4>
                  <ul className="space-y-2">
                    {section.ingredients.map((ingredientLine, i) => (
                      <li
                        className="flex items-center gap-2 text-neutral-700"
                        key={ingredientLine.id ?? i}
                      >
                        <span className="bg-primary-400 h-1.5 w-1.5 shrink-0 rounded-full" />
                        <span>
                          {ingredientLine.unit &&
                            `${ingredientLine.amount} ${mapUnitToStringFormat(
                              ingredientLine.unit,
                            )} ${ingredientLine.ingredient.name}`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="shadow-card rounded-xl bg-white p-5">
                  <h4 className="text-primary-600 mb-3 text-xs font-semibold tracking-wider uppercase">
                    {t(recipeTranslations.steps)}
                  </h4>
                  <div className="space-y-1">
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
