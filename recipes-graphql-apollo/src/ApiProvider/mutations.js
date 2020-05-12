import { gql } from 'apollo-boost';

export const CREATE_RECIPE = gql`
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
