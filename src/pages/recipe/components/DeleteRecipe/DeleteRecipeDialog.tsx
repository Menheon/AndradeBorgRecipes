import { deleteRecipeDocument, RECIPES_QUERY_TAG } from "@/data/recipesService";
import { translations } from "@/i18n";
import { ALL_RECIPES_PATH } from "@/shared/AppRoutes";
import { BaseDialog } from "@/shared/BaseDialog";
import { PlatformSupportedLanguages, Recipe } from "@/types/models";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Props = {
  isOpen: boolean;
  recipe: Recipe;
  onClose: () => void;
};

export const DeleteRecipeDialog = ({ isOpen, recipe, onClose }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postDeleteRecipeMutation = useMutation({
    mutationFn: deleteRecipeDocument,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [RECIPES_QUERY_TAG] });
    },
  });

  const handleDeleteRecipe = () => {
    postDeleteRecipeMutation.mutate(recipe);
    navigate(ALL_RECIPES_PATH);
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
      <div className="py-2">
        <p>
          {t(deleteRecipeTranslations.deleteRecipeDescriptionOn)}{" "}
          <i>"{recipe.name}"</i>?
        </p>
      </div>
    </BaseDialog>
  );
};
