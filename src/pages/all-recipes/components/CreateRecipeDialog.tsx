import { BaseDialog } from "@/shared/BaseDialog";
import { TextInputField } from "@/shared/form-components/TextInputField";
import { TextAreaField } from "@/shared/form-components/TextAreaField";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  PlatformSupportedLanguages,
  Recipe,
  Tag,
  UploadedImage,
} from "@/types/models";
import { NewRecipeSections } from "./NewRecipeSections";
import { RemovableTag } from "./RemovableTag";
import { recipesStorage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FileInputField } from "@/shared/form-components/FileInputField";
import { translations } from "@/i18n";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import AutocompleteMultiSelectField from "@/shared/form-components/AutocompleteMultiSelectField";
import { useCreateRecipe, useTags } from "@/hooks/useRecipes";

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

  const createRecipeMutation = useCreateRecipe();

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
        data.imageUrl = downloadUrl;
      } catch (error) {
        console.log("error", error);
      }
    }
    createRecipeMutation.mutate(data);
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

  const { data: existingTags, isLoading: isTagsLoading } = useTags();

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Left Column - Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              {t(createRecipeTranslations.generalData.title)}
            </label>
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
          </div>

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

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              {t(createRecipeTranslations.generalData.imageUrl)}
            </label>
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
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-700">
              {t(createRecipeTranslations.tags.tagsTitle)}
            </label>
            {isTagsLoading ? (
              <p className="text-sm text-neutral-500">
                {t(createRecipeTranslations.tags.loadingTags)}
              </p>
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
                      createNewOptionLabel={
                        createRecipeTranslations.tags.createNewTag
                      }
                      inputOptionLabel={
                        createRecipeTranslations.tags.writeRecipeTags
                      }
                    />
                    <ul className="mt-2 flex min-h-8 flex-wrap gap-2">
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
        </div>

        {/* Right Column - Description */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-neutral-700">
            {t(createRecipeTranslations.generalData.description)}
          </label>
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
                rows={10}
              />
            )}
          />
        </div>

        {/* Full Width - Sections */}
        <div className="col-span-1 sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            {t(createRecipeTranslations.sections.sectionsTitle)}
          </label>
          <FormProvider {...methods}>
            <NewRecipeSections />
          </FormProvider>
        </div>
      </div>
    </BaseDialog>
  );
};
