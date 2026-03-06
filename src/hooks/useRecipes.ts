import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  RECIPES_QUERY_TAG,
  RECIPE_QUERY_TAG,
  TAGS_QUERY_TAG,
  INGREDIENTS_QUERY_TAG,
  getAllRecipes,
  getRecipeDocumentById,
  createNewRecipeDocument,
  updateRecipeDocument,
  deleteRecipeDocument,
  getAllRecipeTags,
  getAllIngredients,
} from "@/data/recipesService";
import { Recipe, Section } from "@/types/models";
import { ROOT_PATH } from "@/shared/AppRoutes";

// ============ CACHE CONFIGURATION ============
const FIVE_MINUTES = 5 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;

// ============ RECIPES HOOKS ============

/**
 * Hook to fetch all recipes with caching.
 * Recipes are cached for 5 minutes to reduce unnecessary refetches.
 */
export const useRecipes = () => {
  return useQuery({
    queryKey: [RECIPES_QUERY_TAG],
    queryFn: getAllRecipes,
    staleTime: FIVE_MINUTES,
    gcTime: THIRTY_MINUTES,
    refetchOnWindowFocus: false,
  });
};

/**
 * Hook to fetch a single recipe by ID.
 * Uses list data as initial data for instant display when navigating from list.
 * @param recipeId - The ID of the recipe to fetch
 */
export const useRecipe = (recipeId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [RECIPE_QUERY_TAG, recipeId],
    queryFn: () => getRecipeDocumentById(recipeId),
    staleTime: FIVE_MINUTES,
    gcTime: THIRTY_MINUTES,
    refetchOnWindowFocus: false,
    // Use recipe from list cache as initial data for instant display
    initialData: () => {
      const recipes = queryClient.getQueryData<Recipe[]>([RECIPES_QUERY_TAG]);
      return recipes?.find((r) => r.id === recipeId);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState([RECIPES_QUERY_TAG])?.dataUpdatedAt,
  });
};

/**
 * Hook to create a new recipe.
 * Invalidates the recipes list cache on success.
 */
export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewRecipeDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECIPES_QUERY_TAG] });
      queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_TAG] });
      queryClient.invalidateQueries({ queryKey: [INGREDIENTS_QUERY_TAG] });
    },
  });
};

interface UpdateRecipeParams {
  updatedRecipe: Recipe;
  oldSections?: Section[];
}

/**
 * Hook to update an existing recipe.
 * Invalidates both the list and individual recipe caches on success.
 */
export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ updatedRecipe, oldSections }: UpdateRecipeParams) =>
      updateRecipeDocument(updatedRecipe, oldSections),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [RECIPES_QUERY_TAG] });
      queryClient.invalidateQueries({
        queryKey: [RECIPE_QUERY_TAG, variables.updatedRecipe.id],
      });
      queryClient.invalidateQueries({ queryKey: [TAGS_QUERY_TAG] });
      queryClient.invalidateQueries({ queryKey: [INGREDIENTS_QUERY_TAG] });
    },
  });
};

/**
 * Hook to delete a recipe.
 * Invalidates the recipes list cache and navigates to the list page on success.
 */
export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteRecipeDocument,
    onSuccess: (_data, recipe) => {
      queryClient.invalidateQueries({ queryKey: [RECIPES_QUERY_TAG] });
      // Remove the individual recipe from cache
      queryClient.removeQueries({
        queryKey: [RECIPE_QUERY_TAG, recipe.id],
      });
      navigate(ROOT_PATH);
    },
  });
};

// ============ TAGS HOOKS ============

/**
 * Hook to fetch all recipe tags with caching.
 * Tags change infrequently so they're cached longer.
 */
export const useTags = () => {
  return useQuery({
    queryKey: [TAGS_QUERY_TAG],
    queryFn: getAllRecipeTags,
    staleTime: FIVE_MINUTES,
    gcTime: THIRTY_MINUTES,
    refetchOnWindowFocus: false,
  });
};

// ============ INGREDIENTS HOOKS ============

/**
 * Hook to fetch all ingredients with caching.
 * Ingredients change infrequently so they're cached longer.
 */
export const useIngredients = () => {
  return useQuery({
    queryKey: [INGREDIENTS_QUERY_TAG],
    queryFn: getAllIngredients,
    staleTime: FIVE_MINUTES,
    gcTime: THIRTY_MINUTES,
    refetchOnWindowFocus: false,
  });
};
