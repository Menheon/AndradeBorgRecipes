import { BaseDialog } from "@/shared/BaseDialog";
import { TextInputField } from "@/shared/form-components/TextInputField";
import { TextAreaField } from "@/shared/form-components/TextAreaField";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { PlatformSupportedLanguages, Recipe, Tag } from "@/types/models";
import { NewRecipeSections } from "./NewRecipeSections";
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
import { translations } from "@/i18n";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import AutocompleteMultiSelectField from "@/shared/form-components/AutocompleteMultiSelectField";

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

  const { t, i18n } = useTranslation();
  const createRecipeTranslations = useMemo(
    () =>
      translations[i18n.language as PlatformSupportedLanguages].pages.recipes
        .createRecipe,
    [i18n.language],
  );

  return (
    <BaseDialog
      isPrimaryActionDisabled={isCreateFormStateInvalid()}
      primaryAction={handleSubmit(handleCreateNewRecipe)}
      primaryActionLabel="create"
      title={t(createRecipeTranslations.generalData.createRecipeTitle)}
      isOpen={isOpen}
      onClose={closeDialog}
    >
      <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2">
        <div className="col-start-1 sm:col-end-2">
          <h3 className="text-polyGreen text-md pb-0.5 pt-2 font-semibold">
            {t(createRecipeTranslations.generalData.title)}
          </h3>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInputField
                value={field.value}
                onChange={field.onChange}
                placeholder={t(
                  createRecipeTranslations.generalData.writeRecipeTitle,
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="uploadedImage"
            render={({ field }) => (
              <FileInputField
                label={t(createRecipeTranslations.generalData.recipeImage)}
                {...field}
                value={field.value ? field.value.value : ""}
                buttonTitle={t(
                  createRecipeTranslations.generalData.uploadFileImage,
                )}
                noFileChosenLabel={t(
                  createRecipeTranslations.generalData.noImageChosen,
                )}
              />
            )}
          />

          <h3 className="text-md pb-0.5 pt-2 font-semibold">
            {t(createRecipeTranslations.generalData.imageUrl)}
          </h3>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <TextInputField
                value={field.value}
                onChange={field.onChange}
                placeholder={t(
                  createRecipeTranslations.generalData.pasteImageUrl,
                )}
              />
            )}
          />

          <h3 className="text-md pb-0.5 pt-2 font-semibold">
            {t(createRecipeTranslations.tags.tagsTitle)}
          </h3>
          {isTagsLoading ? (
            <p>{t(createRecipeTranslations.tags.loadingTags)}</p>
          ) : (
            <Controller
              control={control}
              name="tags"
              render={({ field }) => (
                <>
                  <AutocompleteMultiSelectField
                    key={new Date().getTime()}
                    existingOptions={existingTags ?? []}
                    onOptionSelected={onNewTagAdded}
                    addedOptions={field.value}
                    getOptionId={(tag) => tag.id}
                    createNewOption={(name, id) => ({ id, name })}
                    getOptionValue={(tag) => tag.name}
                    keyPrefix="tag-option-"
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
            {t(createRecipeTranslations.generalData.description)}
          </h3>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <TextAreaField
                value={field.value}
                onChange={field.onChange}
                placeholder={t(
                  createRecipeTranslations.generalData.writeDescription,
                )}
                columns={40}
                rows={8}
              />
            )}
          />
        </div>

        <div className="col-start-1 col-end-3">
          <h3 className="text-md pb-0.5 pt-2 font-semibold">
            {t(createRecipeTranslations.sections.sectionsTitle)}
          </h3>
          <FormProvider {...methods}>
            <NewRecipeSections />
          </FormProvider>
        </div>
      </div>
    </BaseDialog>
  );
};
