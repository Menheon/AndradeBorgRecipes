import { translations } from "@/i18n";
import { CreateRecipeFormData } from "@/pages/all-recipes/components/CreateRecipeDialog";
import { NewRecipeSections } from "@/pages/all-recipes/components/NewRecipeSections";
import { RemovableTag } from "@/pages/all-recipes/components/RemovableTag";
import { BaseDialog } from "@/shared/BaseDialog";
import { FileInputField } from "@/shared/form-components/FileInputField";
import { TextAreaField } from "@/shared/form-components/TextAreaField";
import { TextInputField } from "@/shared/form-components/TextInputField";
import { PlatformSupportedLanguages, Recipe, Tag } from "@/types/models";
import { useMemo } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { recipesStorage } from "@/firebase";
import AutocompleteMultiSelectField from "@/shared/form-components/AutocompleteMultiSelectField";
import { useTags, useUpdateRecipe } from "@/hooks/useRecipes";

type Props = {
  isOpen: boolean;
  recipe: Recipe;
  onClose: () => void;
};

export const EditRecipeDialog = ({ isOpen, recipe, onClose }: Props) => {
  const methods = useForm<CreateRecipeFormData>({
    mode: "all",
    defaultValues: {
      name: recipe.name,
      description: recipe.description,
      imageUrl: recipe.imageUrl,
      uploadedImage: {
        file: undefined,
        value: "",
      },
      sections: recipe.sections,
      tags: recipe.tags,
    },
  });
  const { watch, control, handleSubmit, setValue } = methods;

  const updateRecipeMutation = useUpdateRecipe();

  const handleUpdateRecipe: SubmitHandler<CreateRecipeFormData> = async (
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
    const updatedRecipe: Recipe = {
      ...data,
      id: recipe.id,
      creationDate: recipe.creationDate,
    };
    // Pass old sections for cleanup
    updateRecipeMutation.mutate({
      updatedRecipe,
      oldSections: recipe.sections,
    });
    closeDialog(updatedRecipe);
  };

  const closeDialog = (formState?: Recipe) => {
    // Clear form state before closing.
    setValue("name", formState?.name ?? recipe.name);
    setValue("description", formState?.description ?? recipe.description);
    setValue("imageUrl", formState?.imageUrl ?? recipe.imageUrl);
    setValue("sections", formState?.sections ?? recipe.sections);
    setValue("tags", formState?.tags ?? recipe.tags);
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
      isOpen={isOpen}
      title={t(createRecipeTranslations.generalData.updateRecipeTitle)}
      primaryAction={handleSubmit(handleUpdateRecipe)}
      primaryActionLabel="update"
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
