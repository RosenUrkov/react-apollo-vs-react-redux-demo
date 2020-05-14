import { gql } from "apollo-boost";

export const ADD_RECIPE = gql`
  mutation($recipe: RecipeInput) {
    addRecipe(recipe: $recipe) {
      id
      name
      ingredients {
        id
        name
        quantity
      }
    }
  }
`;

export const ADD_NEW_RECIPE = gql`
  mutation($recipe: Recipe) {
    addNewRecipe(recipe: $recipe) @client
  }
`;
