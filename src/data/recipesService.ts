/* eslint-disable @typescript-eslint/no-explicit-any */
import { recipesDB } from "@/firebase";
import {
  DocumentReference,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  DocumentData,
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
            steps: sectionData.steps,
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

export const createNewRecipeDocument = async (newRecipeData: Recipe) => {
  // Initialize all collection references.
  const recipesCollectionRef = collection(recipesDB, RecipesCollectionName);
  const tagCollectionRef = collection(recipesDB, RecipeTagsCollectionName);
  const sectionCollectionRef = collection(
    recipesDB,
    RecipeSectionsCollectionName,
  );
  const ingredientsLineCollectionRef = collection(
    recipesDB,
    IngredientLineCollectionName,
  );
  const ingredientsCollectionRef = collection(
    recipesDB,
    IngredientsCollectionName,
  );

  const tagRefs: DocumentReference<DocumentData, DocumentData>[] = [];
  // Process each tag in the new recipe data
  for (const tag of newRecipeData.tags) {
    // If the tag ID is -1, it's a new tag and should be added to the database
    if (tag.id === NEW_TAG_ID) {
      // Add the new tag to the database
      const tagRef = await addDoc(tagCollectionRef, { name: tag.name });
      tagRefs.push(tagRef);
    } else {
      // get the tag reference from the database
      const tagSnapshot = await getDocs(
        query(
          collection(recipesDB, RecipeTagsCollectionName),
          where("name", "==", tag.name),
        ),
      );
      const tagRef = tagSnapshot.docs[0].ref;
      if (tagRef) {
        tagRefs.push(tagSnapshot.docs[0]?.ref);
      }
    }
  }

  const sectionRefs: DocumentReference<DocumentData, DocumentData>[] = [];
  // Process each section in the new recipe data
  for (const section of newRecipeData.sections) {
    const ingredientLineRefs: DocumentReference<DocumentData, DocumentData>[] =
      [];
    // Process each ingredient line in the section
    for (const ingredientLine of section.ingredients) {
      // Query the database for an ingredient with the same name
      const ingredientSnapshot = await getDocs(
        query(
          collection(recipesDB, IngredientsCollectionName),
          where("name", "==", ingredientLine.ingredient.name),
        ),
      );
      let ingredientRef = ingredientSnapshot.docs[0]?.ref;

      // If the ingredient doesn't already exist in the database, add it
      if (ingredientSnapshot.empty) {
        const newIngredientRef = await addDoc(ingredientsCollectionRef, {
          name: ingredientLine.ingredient.name,
        });
        ingredientRef = newIngredientRef;
      }

      // Create a reference to the ingredient in the Firestore database
      const ingredientLineRef = await addDoc(ingredientsLineCollectionRef, {
        amount: ingredientLine.amount,
        ingredient: ingredientRef,
        unit: ingredientLine.unit,
      });
      ingredientLineRefs.push(ingredientLineRef);
    }

    // Add the section to the database
    const sectionRef = await addDoc(sectionCollectionRef, {
      title: section.title,
      steps: section.steps,
      ingredients: ingredientLineRefs,
    });
    sectionRefs.push(sectionRef);
  }

  // Create a reference to the new recipe in the Firestore database
  await addDoc(recipesCollectionRef, {
    name: newRecipeData.name,
    description: newRecipeData.description,
    imageUrl: newRecipeData.imageUrl,
    tags: tagRefs,
    sections: sectionRefs,
  });
};
