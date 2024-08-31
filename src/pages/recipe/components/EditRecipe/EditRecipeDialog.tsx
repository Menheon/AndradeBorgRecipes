import {
  getAllRecipeTags,
  RECIPE_QUERY_TAG,
  RECIPES_QUERY_TAG,
  TAGS_QUERY_TAG,
  updateRecipeDocument,
} from "@/data/recipesService";
import { NewRecipeSections } from "@/pages/all-recipes/components/NewRecipeSections";
import { RemovableTag } from "@/pages/all-recipes/components/RemovableTag";
import { BaseDialog } from "@/shared/BaseDialog";
import TagInputField from "@/shared/form-components/TagInputField";
import { TextAreaField } from "@/shared/form-components/TextAreaField";
import { TextInputField } from "@/shared/form-components/TextInputField";
import { Recipe, Tag } from "@/types/models";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type Props = {
  isOpen: boolean;
  recipe: Recipe;
  onClose: () => void;
};

export const EditRecipeDialog = ({ isOpen, recipe, onClose }: Props) => {
  const methods = useForm<Recipe>({
    mode: "all",
    defaultValues: {
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      sections: recipe.sections,
      tags: recipe.tags,
    },
  });
  const { watch, control, handleSubmit, setValue } = methods;

  const queryClient = useQueryClient();

  const postUpdateRecipeMutation = useMutation({
    mutationFn: updateRecipeDocument,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [RECIPES_QUERY_TAG] });
      queryClient.invalidateQueries({
        queryKey: [`${RECIPE_QUERY_TAG}-${recipe.id}`],
      });
    },
  });

  const handleUpdateRecipe: SubmitHandler<Recipe> = (data) => {
    const updatedRecipe: Recipe = {
      ...data,
      id: recipe.id,
      creationDate: recipe.creationDate,
    };
    postUpdateRecipeMutation.mutate(updatedRecipe);
    closeDialog(updatedRecipe);
  };

  const closeDialog = (formState?: Recipe) => {
    // Clear form state before closing.
    setValue("name", formState?.name ?? recipe.name);
    setValue("description", formState?.description ?? recipe.description);
    setValue("imageUrl", formState?.imageUrl ?? recipe.imageUrl);
    setValue("sections", formState?.sections ?? recipe.sections);
    setValue("tags", formState?.tags ?? recipe.tags);
    onClose();
  };

  const isCreateFormStateInvalid = () => {
    return (
      watch("name") === "" ||
      watch("description") === "" ||
      watch("sections").length === 0 ||
      watch("sections")[0]?.ingredients.length === 0 ||
      watch("sections")[0]?.title === "" ||
      watch("sections")[0]?.steps.length === 0 ||
      watch("tags").length === 0
    );
  };

  const { data: existingTags, isLoading: isTagsLoading } = useQuery({
    queryKey: [TAGS_QUERY_TAG],
    queryFn: getAllRecipeTags,
  });

  const onNewTagAdded = (newTag: Tag) => {
    const currentTags = watch("tags");
    if (currentTags.some((tag) => tag.name === newTag.name)) return;
    currentTags.push(newTag);
    setValue("tags", currentTags);
  };

  const handleTagRemoved = (tagToRemove: Tag) => {
    const currentTags = watch("tags");
    const filteredTags = currentTags.filter(
      (tag) => tag.name !== tagToRemove.name,
    );
    setValue("tags", filteredTags);
  };

  return (
    <BaseDialog
      isPrimaryActionDisabled={isCreateFormStateInvalid()}
      isOpen={isOpen}
      title={texts.updateRecipe}
      primaryAction={handleSubmit(handleUpdateRecipe)}
      primaryActionLabel="update"
      onClose={closeDialog}
    >
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2">
        <div className="col-start-1 sm:col-end-2">
          <h3 className="text-polyGreen text-md pb-0.5 pt-2 font-semibold">
            Title
          </h3>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInputField
                value={field.value}
                onChange={field.onChange}
                placeholder="Write the name for the recipe"
              />
            )}
          />

          <h3 className="text-md pb-0.5 pt-2 font-semibold">Image URL</h3>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <TextInputField
                value={field.value}
                onChange={field.onChange}
                placeholder="Paste the URL for the image of the dish"
              />
            )}
          />

          <h3 className="text-md pb-0.5 pt-2 font-semibold">Tags</h3>
          {isTagsLoading ? (
            <p>Loading tags...</p>
          ) : (
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <>
                  <TagInputField
                    // Apply date time key, to ensure clearing input state.
                    key={new Date().getTime()}
                    existingTags={existingTags ?? []}
                    onTagAdd={onNewTagAdded}
                    addedTags={field.value}
                  />
                  <ul className="flex min-h-10 flex-wrap gap-1 p-1">
                    {field.value.map((tag, tagIndex) => (
                      <li key={`${tag.name}-${tagIndex}`}>
                        <RemovableTag
                          isRemovable
                          onRemoved={() => handleTagRemoved(tag)}
                        >
                          {tag.name}
                        </RemovableTag>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            />
          )}
        </div>

        <div className="col-start-1 sm:col-start-2 sm:col-end-3">
          <h3 className="text-polyGreen text-md pb-0.5 pt-2 font-semibold">
            Description
          </h3>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextAreaField
                value={field.value}
                onChange={field.onChange}
                placeholder="Write the description of the recipe"
                columns={40}
                rows={8}
              />
            )}
          />
        </div>

        <div className="col-start-1 col-end-3">
          <h3 className="text-md pb-0.5 pt-2 font-semibold">Sections</h3>
          <FormProvider {...methods}>
            <NewRecipeSections />
          </FormProvider>
        </div>
      </div>
    </BaseDialog>
  );
};

const texts = {
  updateRecipe: "Update Recipe",
};
