import {
  getAllRecipeTags,
  RECIPE_QUERY_TAG,
  RECIPES_QUERY_TAG,
  TAGS_QUERY_TAG,
  updateRecipeDocument,
} from "@/data/recipesService";
import { translations } from "@/i18n";
import { NewRecipeSections } from "@/pages/all-recipes/components/NewRecipeSections";
import { RemovableTag } from "@/pages/all-recipes/components/RemovableTag";
import { BaseDialog } from "@/shared/BaseDialog";
import TagInputField from "@/shared/form-components/TagInputField";
import { TextAreaField } from "@/shared/form-components/TextAreaField";
import { TextInputField } from "@/shared/form-components/TextInputField";
import { PlatformSupportedLanguages, Recipe, Tag } from "@/types/models";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

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
