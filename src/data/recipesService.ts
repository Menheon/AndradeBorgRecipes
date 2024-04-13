/* eslint-disable @typescript-eslint/no-explicit-any */
import { recipesDB } from "@/firebase";
import {
  DocumentReference,
  collection,
  getDoc,
  getDocs,
  doc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  Ingredient,
  IngredientLine,
  Recipe,
  Section,
  Tag,
} from "@/types/models";

export const NEW_TAG_ID = "-1";

const IngredientLineCollectionName = "IngredientLines";
const IngredientsCollectionName = "Ingredients";
const RecipeSectionsCollectionName = "RecipeSections";
const RecipeTagsCollectionName = "RecipeTags";
const RecipesCollectionName = "Recipes";

export const getAllRecipes = async () => {
  const recipesRef = collection(recipesDB, RecipesCollectionName);
  const { docs: recipeDocs } = await getDocs(recipesRef);

  const recipes: Recipe[] = await Promise.all(
    recipeDocs.map(async (recipeSnapshot) => {
      // Retrieve recipe data from reference list.
      const recipeData = recipeSnapshot.data();

      // Retrieve tags data from reference list.
      const tags = await Promise.all(
        (recipeData.tags as DocumentReference[]).map(async (tagRef) => {
          const tagDoc = await getDoc(tagRef);
          const tagData = tagDoc.data() as any;

          const tag: Tag = {
            name: tagData.name,
            id: tagDoc.id,
          };
          return tag;
        }),
      );

      // Retrieve sections data from reference list.
      const sections = await Promise.all(
        (recipeData.sections as DocumentReference[]).map(async (sectionRef) => {
          const sectionDoc = await getDoc(sectionRef);
          const sectionData = sectionDoc.data() as any;

          const ingredients = await Promise.all(
            (sectionData.ingredients as DocumentReference[]).map(
              async (ingredientLineRef) => {
                const ingredientLineDoc = await getDoc(ingredientLineRef);
                const ingredientLineData = ingredientLineDoc.data() as any;

                const ingredientDoc = await getDoc(
                  ingredientLineData.ingredient,
                );
                const ingredientData = ingredientDoc.data() as Ingredient;

                const ingredientLine: IngredientLine = {
                  ingredient: {
                    name: ingredientData.name,
                  },
                  amount: ingredientLineData.amount,
                  unit: ingredientLineData.unit,
                };
                return ingredientLine;
              },
            ),
          );

          const section: Section = {
            title: sectionData.title,
            steps: sectionData.steps.split(", "),
            ingredients,
          };
          return section;
        }),
      );

      const recipe: Recipe = {
        name: recipeData.name,
        description: recipeData.description,
        imageUrl: recipeData.imageUrl,
        tags,
        sections,
      };
      return recipe;
    }),
  );

  return recipes;
};

export const getAllRecipeTags = async () => {
  const tagsRef = collection(recipesDB, RecipeTagsCollectionName);
  const { docs: tagDocs } = await getDocs(tagsRef);

  const tags: Tag[] = await Promise.all(
    tagDocs.map(async (tagSnapshot) => {
      const tagData = tagSnapshot.data();
      const tag: Tag = {
        name: tagData.name,
        id: tagSnapshot.id,
      };
      return tag;
    }),
  );
  return tags;
};

export const createNewRecipe = async (newRecipeData: Recipe) => {
  // Process each tag in the new recipe data
  for (const tag of newRecipeData.tags) {
    // If the tag ID is -1, it's a new tag and should be added to the database
    if (tag.id === NEW_TAG_ID) {
      // Create a reference to the tag in the Firestore database
      const tagRef = doc(recipesDB, RecipeTagsCollectionName, tag.id);
      // Add the new tag to the database
      await setDoc(tagRef, tag);
    }

    // Process each section in the new recipe data
    for (const section of newRecipeData.sections) {
      // Create a reference to the section in the Firestore database
      const sectionRef = doc(recipesDB, RecipeSectionsCollectionName);

      // Add the section to the database
      await setDoc(sectionRef, { title: section.title, steps: section.steps });

      // Process each ingredient line in the section
      for (const ingredientLine of section.ingredients) {
        // Create a reference to the ingredient in the Firestore database
        const ingredientRef = doc(
          recipesDB,
          IngredientsCollectionName,
          ingredientLine.ingredient.name,
        );

        // Query the database for an ingredient with the same name
        const ingredientSnapshot = await getDocs(
          query(
            collection(recipesDB, IngredientsCollectionName),
            where("name", "==", ingredientLine.ingredient.name),
          ),
        );

        // If the ingredient doesn't already exist in the database, add it
        if (ingredientSnapshot.empty) {
          await setDoc(ingredientRef, {
            ingredient: ingredientLine.ingredient,
            amount: ingredientLine.amount,
            unit: ingredientLine.unit,
          });
        }
      }
    }

    // Create a reference to the new recipe in the Firestore database
    const recipeRef = doc(recipesDB, RecipesCollectionName);

    // Add the new recipe to the database
    await setDoc(recipeRef, newRecipeData);
  }
};
