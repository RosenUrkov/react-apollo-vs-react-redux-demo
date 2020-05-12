import { gql } from 'apollo-boost';

export const GET_RECIPES = gql`
  query {
    getRecipes {
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
