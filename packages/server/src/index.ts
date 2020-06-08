import { join } from 'path';
import { ApolloServer, gql } from 'apollo-server';

import { loadSchema, loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { UserCreateParams, UserUpdateParams, UserGetListParams } from './models/User';
import { UserAPI } from './datasources/user';

import { connect } from './mongo';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const resolvers = {
  Query: {
    user: async (_: any, { id }: { id: string }, { dataSources }: any) => {
      return dataSources.userAPI.getUser(id);
    },
    users: async (_: any, { skip, limit }: UserGetListParams, { dataSources }: any) => {
      return dataSources.userAPI.getUsersList({ skip, limit });
    },
  },
  Mutation: {
    createUser: async (_: any, params: UserCreateParams, { dataSources }: any) => {
      const result = await dataSources.userAPI.createUser(params);

      return result;
    },
    updateUser: async (_: any, params: { id: string; input: UserUpdateParams }, { dataSources }: any) => {
      const result = await dataSources.userAPI.updateUser(params);

      return result;
    },
    deleteUser: async (_: any, { id }: { id: string }, { dataSources }: any) => {
      const result = await dataSources.userAPI.deleteUser(id);

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
