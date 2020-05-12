import React from 'react';
import { ApolloClient, InMemoryCache, HttpLink, gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const cache = new InMemoryCache();
const link = new HttpLink({ uri: 'http://localhost:4000/' });

const client = new ApolloClient({
  link,
  cache
});

const ApiProvider = props => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};

export default ApiProvider;
