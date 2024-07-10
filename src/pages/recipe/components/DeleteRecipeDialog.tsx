import { deleteRecipeDocument, RECIPES_QUERY_TAG } from "@/data/recipesService";
import { RECIPES_PATH } from "@/shared/AppRoutes";
import { BaseDialog } from "@/shared/BaseDialog";
import { Recipe } from "@/types/models";
import { useQueryClient, useMutation } from "@tanstack/react-query";
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
    navigate(RECIPES_PATH);
    onClose();
  };

  return (
    <BaseDialog
      isOpen={isOpen}
      title={texts.deleteRecipe}
      primaryAction={handleDeleteRecipe}
      primaryActionLabel="delete"
      isPrimaryActionDisabled={false}
      onClose={onClose}
    >
      <div className="py-2">
        <p>{texts.deleteRecipeDescription}</p>
      </div>
    </BaseDialog>
  );
};

const texts = {
  deleteRecipe: "Delete Recipe",
  deleteRecipeDescription: "Are you sure you want to delete this recipe?",
};
