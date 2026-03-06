import { translations } from "@/i18n";
import { BaseDialog } from "@/shared/BaseDialog";
import { PlatformSupportedLanguages, Recipe } from "@/types/models";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDeleteRecipe } from "@/hooks/useRecipes";

type Props = {
  isOpen: boolean;
  recipe: Recipe;
  onClose: () => void;
};

export const DeleteRecipeDialog = ({ isOpen, recipe, onClose }: Props) => {
  const deleteRecipeMutation = useDeleteRecipe();

  const handleDeleteRecipe = () => {
    deleteRecipeMutation.mutate(recipe);
    onClose();
  };

  const { t, i18n } = useTranslation();
  const deleteRecipeTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes
        .deleteRecipe,
    [i18n.language],
  );

  return (
    <BaseDialog
      isOpen={isOpen}
      title={t(deleteRecipeTranslations.deleteRecipeTitle)}
      primaryAction={handleDeleteRecipe}
      primaryActionLabel="delete"
      isPrimaryActionDisabled={false}
      onClose={onClose}
    >
      <div className="py-4">
        <p className="text-neutral-700">
          {t(deleteRecipeTranslations.deleteRecipeDescriptionOn)}{" "}
          <span className="font-semibold text-neutral-900">
            "{recipe.name}"
          </span>
          ?
        </p>
      </div>
    </BaseDialog>
  );
};
