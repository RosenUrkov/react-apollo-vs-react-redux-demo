import gql from 'graphql-tag';

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

export const NEW_RECIPES = gql`
  query {
    newRecipes @client
  }
`;
