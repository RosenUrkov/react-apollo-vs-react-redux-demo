import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { NEW_RECIPES } from './queries';

const cache = new InMemoryCache();
cache.writeQuery({
  query: NEW_RECIPES,
  data: { newRecipes: [] }
});

const link = new HttpLink({ uri: 'http://localhost:4000/' });

const client = new ApolloClient({
  cache,
  link
});

const ApiProvider = props => (
  <ApolloProvider client={client}>{props.children}</ApolloProvider>
);

export default ApiProvider;
