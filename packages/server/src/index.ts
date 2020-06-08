import { join } from 'path';
import { ApolloServer } from 'apollo-server';

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { Resolvers } from '../types';

import { connect } from './mongo';
import { DataSources, dataSources } from './datasources';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

type Context = { dataSources: DataSources };

const resolvers: Resolvers<Context> = {
  Query: {
    user: async (_, params, { dataSources }) => {
      const user = dataSources.userAPI.getUser(params);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    users: async (_, { skip, limit }, { dataSources }) => {
      return dataSources.userAPI.getUsersList({ skip, limit });
    },
  },
  Mutation: {
    createUser: async (_, params, { dataSources }) => {
      const result = await dataSources.userAPI.createUser(params);

      return result;
    },
    updateUser: async (_, params, { dataSources }) => {
      const result = await dataSources.userAPI.updateUser(params);

      return result;
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      const result = await dataSources.userAPI.deleteUser(id);

      return result;
    },
  },
};

const schemaWithResolvers = addResolversToSchema({ schema, resolvers: resolvers as any });

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
