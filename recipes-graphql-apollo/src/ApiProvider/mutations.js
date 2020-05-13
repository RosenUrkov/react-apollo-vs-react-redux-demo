import gql from 'graphql-tag';

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
