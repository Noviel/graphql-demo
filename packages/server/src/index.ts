import { resolve } from 'path';
import { ApolloServer, gql } from 'apollo-server';

import { loadSchema, loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { UserCreateParams } from './models/User';
import { UserAPI } from './datasources/user';

import { connect } from './mongo';

const schema = loadSchemaSync(resolve(__dirname, '.\\schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = {
  Query: {
    users: async (_: any, { skip, limit }: any, { dataSources }: any) => {
      return dataSources.userAPI.getUsersList({ skip, limit });
    },
  },
  Mutation: {
    createUser: async (_: any, params: UserCreateParams, { dataSources }: any) => {
      const result = await dataSources.userAPI.createUser(params);

      return result;
    },
    updateUser: async (_: any, params: UserCreateParams, { dataSources }: any) => {
      const result = await dataSources.userAPI.createUser(params);

      return result;
    },
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const dataSources = () => ({
  userAPI: new UserAPI(),
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources,
  introspection: true,
  playground: true,
  cors: true,
});

server.listen(process.env.PORT ?? 4201).then(async ({ url }) => {
  console.log(`🚀  Server ready at ${url}`);

  await connect();
});
