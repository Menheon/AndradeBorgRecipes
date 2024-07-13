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
  RECIPES_QUERY_TAG,
  TAGS_QUERY_TAG,
  createNewRecipeDocument,
  getAllRecipeTags,
} from "@/data/recipesService";
import { RemovableTag } from "./RemovableTag";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { recipesStorage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { UploadedImage } from "@/pages/xr-sizer/types";
import { FileInputField } from "@/shared/form-components/FileInputField";

export interface CreateRecipeFormData extends Recipe {
  uploadedImage?: UploadedImage;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateRecipeDialog = ({ isOpen, onClose }: Props) => {
  const methods = useForm<CreateRecipeFormData>({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      sections: [],
      tags: [],
      uploadedImage: {
        file: undefined,
        value: "",
      },
    },
  });
  const { watch, control, handleSubmit, setValue } = methods;

  const queryClient = useQueryClient();

  const postNewRecipeMutation = useMutation({
    mutationFn: createNewRecipeDocument,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [RECIPES_QUERY_TAG] });
      queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_TAG] });
    },
  });

  const handleCreateNewRecipe: SubmitHandler<CreateRecipeFormData> = async (
    data,
  ) => {
    // TODO improve this logic by validating if the image is a URL or a file.
    if (data.uploadedImage?.file) {
      try {
        const storageRef = ref(
          recipesStorage,
          `images/${data.uploadedImage.file.name}`,
        );
        await uploadBytes(storageRef, data.uploadedImage.file);
        const downloadUrl = await getDownloadURL(storageRef);
        console.log(downloadUrl);
        data.imageUrl = downloadUrl;
      } catch (error) {
        console.log("error", error);
      }
    }
    postNewRecipeMutation.mutate(data);
    closeDialog();
  };

  const closeDialog = () => {
    // Clear form state before closing.
    setValue("name", "");
    setValue("description", "");
    setValue("imageUrl", "");
    setValue("sections", []);
    setValue("tags", []);
    setValue("uploadedImage", {
      file: undefined,
      value: "",
    });
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
      primaryAction={handleSubmit(handleCreateNewRecipe)}
      primaryActionLabel="create"
      title="Create a new recipe"
      isOpen={isOpen}
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

          <Controller
            control={control}
            name="uploadedImage"
            render={({ field }) => (
              <FileInputField
                label="Recipe Image"
                {...field}
                value={field.value ? field.value.value : ""}
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
