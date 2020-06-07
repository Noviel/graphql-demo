import ApolloClient from 'apollo-boost';

export function createClient() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
  });

  return client;
}
