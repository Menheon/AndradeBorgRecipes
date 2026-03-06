/* eslint-disable @typescript-eslint/no-explicit-any */
import { recipesDB } from "@/firebase";
import {
  DocumentReference,
  CollectionReference,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  DocumentData,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  Ingredient,
  IngredientLine,
  Recipe,
  Section,
  Tag,
} from "@/types/models";

// ============ QUERY KEYS ============
export const RECIPES_QUERY_TAG = "recipes";
export const TAGS_QUERY_TAG = "tags";
export const RECIPE_QUERY_TAG = "recipe";
export const INGREDIENTS_QUERY_TAG = "ingredients";

export const NEW_TAG_ID = "-1";

// ============ COLLECTION NAMES ============
const IngredientLineCollectionName = "IngredientLines";
const IngredientsCollectionName = "Ingredients";
const RecipeSectionsCollectionName = "RecipeSections";
const RecipeTagsCollectionName = "RecipeTags";
const RecipesCollectionName = "Recipes";

// ============ COLLECTION REFERENCES ============
const getCollectionRefs = () => ({
  recipes: collection(recipesDB, RecipesCollectionName),
  tags: collection(recipesDB, RecipeTagsCollectionName),
  sections: collection(recipesDB, RecipeSectionsCollectionName),
  ingredientLines: collection(recipesDB, IngredientLineCollectionName),
  ingredients: collection(recipesDB, IngredientsCollectionName),
});

// ============ SHARED HELPERS ============

/**
 * Processes tags: creates new ones if needed, returns all document references.
 * Uses direct doc() reference when ID exists instead of querying.
 */
const processTagRefs = async (
  tags: Tag[],
  tagCollectionRef: CollectionReference<DocumentData>,
): Promise<DocumentReference<DocumentData>[]> => {
  const tagPromises = tags.map(async (tag) => {
    if (tag.id === NEW_TAG_ID) {
      return addDoc(tagCollectionRef, { name: tag.name });
    }
    // Use doc() directly instead of querying - much faster
    return doc(recipesDB, RecipeTagsCollectionName, tag.id);
  });
  return Promise.all(tagPromises);
};

/**
 * Gets or creates an ingredient reference by name.
 * Creates the ingredient if it doesn't exist.
 */
const getOrCreateIngredientRef = async (
  ingredientName: string,
  ingredientsCollectionRef: CollectionReference<DocumentData>,
): Promise<DocumentReference<DocumentData>> => {
  const ingredientSnapshot = await getDocs(
    query(
      collection(recipesDB, IngredientsCollectionName),
      where("name", "==", ingredientName),
    ),
  );

  if (!ingredientSnapshot.empty) {
    return ingredientSnapshot.docs[0].ref;
  }

  return addDoc(ingredientsCollectionRef, { name: ingredientName });
};

/**
 * Processes ingredient lines for a section in parallel.
 */
const processIngredientLines = async (
  ingredients: IngredientLine[],
  ingredientLinesCollectionRef: CollectionReference<DocumentData>,
  ingredientsCollectionRef: CollectionReference<DocumentData>,
): Promise<DocumentReference<DocumentData>[]> => {
  const ingredientLinePromises = ingredients.map(async (ingredientLine) => {
    const ingredientRef = await getOrCreateIngredientRef(
      ingredientLine.ingredient.name,
      ingredientsCollectionRef,
    );

    return addDoc(ingredientLinesCollectionRef, {
      amount: ingredientLine.amount,
      ingredient: ingredientRef,
      unit: ingredientLine.unit,
    });
  });

  return Promise.all(ingredientLinePromises);
};

/**
 * Processes sections with their ingredients in parallel.
 */
const processSectionRefs = async (
  sections: Section[],
  sectionCollectionRef: CollectionReference<DocumentData>,
  ingredientLinesCollectionRef: CollectionReference<DocumentData>,
  ingredientsCollectionRef: CollectionReference<DocumentData>,
): Promise<DocumentReference<DocumentData>[]> => {
  const sectionPromises = sections.map(async (section) => {
    const ingredientLineRefs = await processIngredientLines(
      section.ingredients,
      ingredientLinesCollectionRef,
      ingredientsCollectionRef,
    );

    return addDoc(sectionCollectionRef, {
      title: section.title,
      steps: section.steps,
      ingredients: ingredientLineRefs,
    });
  });

  return Promise.all(sectionPromises);
};

/**
 * Deletes orphaned sections and their ingredient lines.
 */
const deleteOrphanedSections = async (sections: Section[]): Promise<void> => {
  await Promise.all(
    sections.map(async (section) => {
      if (!section.id) return;

      // Delete ingredient lines in parallel
      await Promise.all(
        section.ingredients.map(async (ingredientLine) => {
          if (!ingredientLine.id) return;
          const ingredientLineRef = doc(
            recipesDB,
            IngredientLineCollectionName,
            ingredientLine.id,
          );
          await deleteDoc(ingredientLineRef);
        }),
      );

      // Delete section
      const sectionRef = doc(
        recipesDB,
        RecipeSectionsCollectionName,
        section.id,
      );
      await deleteDoc(sectionRef);
    }),
  );
};

/**
 * Parses a Firestore recipe document into a Recipe object.
 * Fetches all related tags, sections, and ingredients in parallel.
 */
const parseRecipeDocument = async (
  recipeSnapshot: any,
  recipeData: DocumentData,
): Promise<Recipe> => {
  const [tags, sections] = await Promise.all([
    // Fetch all tags in parallel
    Promise.all(
      (recipeData.tags as DocumentReference[]).map(async (tagRef) => {
        const tagDoc = await getDoc(tagRef);
        const tagData = tagDoc.data() as any;
        return {
          name: tagData.name,
          id: tagDoc.id,
        } as Tag;
      }),
    ),
    // Fetch all sections in parallel
    Promise.all(
      (recipeData.sections as DocumentReference[]).map(async (sectionRef) => {
        const sectionDoc = await getDoc(sectionRef);
        const sectionData = sectionDoc.data() as any;

        // Fetch all ingredient lines in parallel
        const ingredients = await Promise.all(
          (sectionData.ingredients as DocumentReference[]).map(
            async (ingredientLineRef) => {
              const ingredientLineDoc = await getDoc(ingredientLineRef);
              const ingredientLineData = ingredientLineDoc.data() as any;

              const ingredientDoc = await getDoc(ingredientLineData.ingredient);
              const ingredientData = ingredientDoc.data() as Ingredient;

              return {
                id: ingredientLineDoc.id,
                ingredient: {
                  id: ingredientDoc.id,
                  name: ingredientData.name,
                },
                amount: ingredientLineData.amount,
                unit: ingredientLineData.unit,
              } as IngredientLine;
            },
          ),
        );

        return {
          id: sectionDoc.id,
          title: sectionData.title,
          steps: sectionData.steps,
          ingredients,
        } as Section;
      }),
    ),
  ]);

  let creationDate = new Date();
  if ("_document" in recipeSnapshot) {
    creationDate = new Date(
      (recipeSnapshot as any)._document.createTime.timestamp.seconds * 1000,
    );
  }

  return {
    id: recipeSnapshot.id,
    name: recipeData.name,
    description: recipeData.description,
    imageUrl: recipeData.imageUrl ?? "",
    creationDate,
    tags,
    sections,
  };
};

// ============ CRUD OPERATIONS ============

/**
 * Updates an existing recipe document in the database.
 * Cleans up orphaned sections and ingredient lines before creating new ones.
 * @param updatedRecipe - The recipe data to update
 * @param oldSections - The old sections to delete (optional, for cleanup)
 */
export const updateRecipeDocument = async (
  updatedRecipe: Recipe,
  oldSections?: Section[],
): Promise<void> => {
  const recipeRef = doc(
    recipesDB,
    RecipesCollectionName,
    updatedRecipe.id ?? "",
  );

  const refs = getCollectionRefs();

  // Clean up old sections if provided
  if (oldSections) {
    await deleteOrphanedSections(oldSections);
  }

  // Process tags and sections in parallel
  const [tagRefs, sectionRefs] = await Promise.all([
    processTagRefs(updatedRecipe.tags, refs.tags),
    processSectionRefs(
      updatedRecipe.sections,
      refs.sections,
      refs.ingredientLines,
      refs.ingredients,
    ),
  ]);

  // Update the recipe document
  await updateDoc(recipeRef, {
    name: updatedRecipe.name,
    description: updatedRecipe.description,
    imageUrl: updatedRecipe.imageUrl,
    tags: tagRefs,
    sections: sectionRefs,
  });
};

/**
 * Deletes a recipe and all its associated sections and ingredient lines.
 * @param recipe - The recipe to delete
 */
export const deleteRecipeDocument = async (recipe: Recipe): Promise<void> => {
  const recipeRef = doc(recipesDB, RecipesCollectionName, recipe.id ?? "");

  // Delete recipe and sections in parallel
  await Promise.all([
    deleteDoc(recipeRef),
    deleteOrphanedSections(recipe.sections),
  ]);
};

/**
 * Retrieves a single recipe by its ID.
 * @param recipeId - The ID of the recipe to retrieve
 * @returns The recipe or undefined if not found
 */
export const getRecipeDocumentById = async (
  recipeId: string,
): Promise<Recipe | undefined> => {
  const recipeRef = doc(recipesDB, RecipesCollectionName, recipeId);
  const recipeSnapshot = await getDoc(recipeRef);
  const recipeData = recipeSnapshot.data();

  if (!recipeData) return undefined;

  return parseRecipeDocument(recipeSnapshot, recipeData);
};

/**
 * Retrieves all recipes from the database.
 * Uses parallel fetching for optimal performance.
 * @returns Array of all recipes
 */
export const getAllRecipes = async (): Promise<Recipe[]> => {
  const recipesRef = collection(recipesDB, RecipesCollectionName);
  const { docs: recipeDocs } = await getDocs(recipesRef);

  const recipes = await Promise.all(
    recipeDocs.map((recipeSnapshot) => {
      const recipeData = recipeSnapshot.data();
      return parseRecipeDocument(recipeSnapshot, recipeData);
    }),
  );

  return recipes;
};

/**
 * Retrieves all recipe tags from the database.
 * @returns Array of all tags
 */
export const getAllRecipeTags = async (): Promise<Tag[]> => {
  const tagsRef = collection(recipesDB, RecipeTagsCollectionName);
  const { docs: tagDocs } = await getDocs(tagsRef);

  return tagDocs.map((tagSnapshot) => {
    const tagData = tagSnapshot.data();
    return {
      name: tagData.name,
      id: tagSnapshot.id,
    } as Tag;
  });
};

/**
 * Creates a new recipe document in the database.
 * @param newRecipeData - The recipe data to create
 */
export const createNewRecipeDocument = async (
  newRecipeData: Recipe,
): Promise<void> => {
  const refs = getCollectionRefs();

  // Process tags and sections in parallel
  const [tagRefs, sectionRefs] = await Promise.all([
    processTagRefs(newRecipeData.tags, refs.tags),
    processSectionRefs(
      newRecipeData.sections,
      refs.sections,
      refs.ingredientLines,
      refs.ingredients,
    ),
  ]);

  // Create the recipe document
  await addDoc(refs.recipes, {
    name: newRecipeData.name,
    description: newRecipeData.description,
    imageUrl: newRecipeData.imageUrl,
    tags: tagRefs,
    sections: sectionRefs,
  });
};

/**
 * Retrieves all ingredients from the database.
 * @returns Array of all ingredients
 */
export const getAllIngredients = async (): Promise<Ingredient[]> => {
  const ingredientsRef = collection(recipesDB, IngredientsCollectionName);
  const { docs: ingredientDocs } = await getDocs(ingredientsRef);

  return ingredientDocs.map((ingredientSnapshot) => {
    const ingredientData = ingredientSnapshot.data();
    return {
      name: ingredientData.name,
      id: ingredientSnapshot.id,
    } as Ingredient;
  });
};
