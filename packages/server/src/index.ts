import { join } from 'path';
import { ApolloServer } from 'apollo-server';

import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { addResolversToSchema } from '@graphql-tools/schema';

import { connect } from './mongo';
import { resolvers } from './resolvers';
import { dataSources } from './datasources';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

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
