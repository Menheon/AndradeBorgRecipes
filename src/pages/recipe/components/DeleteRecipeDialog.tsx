import { BaseDialog } from "@/shared/BaseDialog";
import { Recipe } from "@/types/models";

type Props = {
  isOpen: boolean;
  recipe: Recipe;
  onClose: () => void;
};

export const DeleteRecipeDialog = ({ isOpen, recipe, onClose }: Props) => {
  const handleDeleteRecipe = () => {
    console.log("delete recipe", recipe);

    // TODO: Delete ingredients lines in recipe section
    // TODO: Delete sections in recipe
    // TODO: Delete recipe
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
