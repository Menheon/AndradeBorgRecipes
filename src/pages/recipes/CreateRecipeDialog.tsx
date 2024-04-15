import { BaseDialog } from "@/shared/BaseDialog";
import { TextInputField } from "@/shared/form-components/TextInputField";
import { TextAreaField } from "@/shared/form-components/TextAreaField";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Recipe, Tag } from "@/types/models";
import { NewRecipeSections } from "./NewRecipeSections";
import TagInputField from "@/shared/form-components/TagInputField";
import {
  createNewRecipeDocument,
  getAllRecipeTags,
} from "@/data/recipesService";
import { useCallback, useEffect, useState } from "react";
import { RemovableTag } from "./RemovableTag";

// TODO Implement the functionality to add existing ingredients or add a new one in the recipe.

export interface CreateRecipeFormData extends Recipe {}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onRecipeCreated: () => void;
}

export const CreateRecipeDialog = ({
  isOpen,
  onClose,
  onRecipeCreated,
}: Props) => {
  const methods = useForm<CreateRecipeFormData>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      sections: [],
      tags: [],
    },
  });
  const { watch, control, handleSubmit, setValue } = methods;

  const handleCreateNewRecipe: SubmitHandler<CreateRecipeFormData> = (data) => {
    createNewRecipeDocument(data);
    onRecipeCreated();
    closeDialog();
  };

  const closeDialog = () => {
    // Clear form state before closing.
    setValue("name", "");
    setValue("description", "");
    setValue("imageUrl", "");
    setValue("sections", []);
    setValue("tags", []);
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

  const [existingTags, setExistingTags] = useState<Tag[]>([]);

  const getAllTags = useCallback(async () => {
    // TODO use tanstack query
    const tags = await getAllRecipeTags();
    setExistingTags(tags);
  }, []);

  useEffect(() => {
    getAllTags();
  }, [getAllTags]);

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
      primaryAction={handleSubmit(handleCreateNewRecipe)}
      primaryActionLabel="create"
      title="Create a new recipe"
      isOpen={isOpen}
      onClose={closeDialog}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 p-2 gap-4">
        <div className="col-start-1 sm:col-end-2">
          <h3 className="text-polyGreen text-md font-semibold pt-2 pb-0.5">
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

          <h3 className="text-md font-semibold pt-2 pb-0.5">Image URL</h3>
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

          <h3 className="text-md font-semibold pt-2 pb-0.5">Tags</h3>
          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <>
                <TagInputField
                  // Apply date time key, to ensure clearing input state.
                  key={new Date().getTime()}
                  existingTags={existingTags}
                  onTagAdd={onNewTagAdded}
                  addedTags={field.value}
                />
                <ul className="flex gap-1 p-1 min-h-10 flex-wrap">
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
        </div>

        <div className="col-start-1 sm:col-start-2 sm:col-end-3">
          <h3 className="text-polyGreen text-md font-semibold pt-2 pb-0.5">
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
          <h3 className="text-md font-semibold pt-2 pb-0.5">Sections</h3>
          <FormProvider {...methods}>
            <NewRecipeSections />
          </FormProvider>
        </div>
      </div>
    </BaseDialog>
  );
};
