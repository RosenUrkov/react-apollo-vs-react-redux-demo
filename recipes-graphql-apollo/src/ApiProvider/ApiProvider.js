import React from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { GET_NEW_RECIPES, GET_RECIPES } from "./queries";

const cache = new InMemoryCache();
cache.writeQuery({ query: GET_NEW_RECIPES, data: { newRecipes: [] } });

const resolvers = {
  Recipe: {
    isNew: ({ id }, _, { cache }) => {
      const query = cache.readQuery({ query: GET_NEW_RECIPES });
      return query.newRecipes.includes(id);
    },
  },
  Mutation: {
    addNewRecipe: (_, { recipe }, { cache }) => {
      const query = cache.readQuery({ query: GET_RECIPES });
      const updatedRecipes = [...query.getRecipes, recipe];
      cache.writeQuery({
        query: GET_RECIPES,
        data: { getRecipes: updatedRecipes },
      });

      const newRecipesQuery = cache.readQuery({ query: GET_NEW_RECIPES });
      const updatedNewRecipes = [...newRecipesQuery.newRecipes, recipe.id];
      cache.writeQuery({
        query: GET_NEW_RECIPES,
        data: { newRecipes: updatedNewRecipes },
      });
    },
  },
};

const link = new HttpLink({ uri: "http://localhost:4000/" });

const client = new ApolloClient({
  cache,
  link,
  resolvers,
});

const ApiProvider = (props) => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);

export default ApiProvider;
