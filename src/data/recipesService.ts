/* eslint-disable @typescript-eslint/no-explicit-any */
import { recipesDB } from "@/firebase";
import {
  DocumentReference,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { Ingredient, IngredientLine, Recipe, Section, Tag } from "@/types/models";

export const getAllRecipes = async () => {
  const recipesRef = collection(recipesDB, "Recipes");
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
