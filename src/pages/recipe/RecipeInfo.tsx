import { useParams } from "react-router-dom";

const RecipeInfo = () => {
  let { recipeId } = useParams();

  // TODO: Fetch recipe data from Firestore using the recipeId
  // TODO: Display the recipe data in the component
  // TODO: Add a button to navigate back to the recipes page
  // TODO: Add error handling for invalid recipeId
  // TODO: Add loading state while fetching recipe data
  // TODO: Add styling to the component
  // TODO: Add a button to edit the recipe data
  // TODO: Add a button to share the link to the recipe.

  return (
    <div>
      <h1>{recipeId}</h1>
    </div>
  );
};

export default RecipeInfo;
