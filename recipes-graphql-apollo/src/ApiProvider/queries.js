import { gql } from "apollo-boost";

export const GET_RECIPES = gql`
  query {
    getRecipes {
      id
      name
      isNew @client
      ingredients {
        id
        name
        quantity
      }
    }
  }
`;

export const GET_NEW_RECIPES = gql`
  query {
    newRecipes @client
  }
`;
