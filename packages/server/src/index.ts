import { ApolloServer, gql } from 'apollo-server';
import { connect } from './mongo';
import { getUsers } from './models/User';

const typeDefs = gql`
  type Query {
    user(id: ID!): User!
    users(skip: Int = 0, limit: Int = 10): [User]
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }

  input CreateUserInput {
    email: String!
    name: String!
  }

  input UpdateUserInput {
    email: String
    name: String
  }
`;

const server = new ApolloServer({
  typeDefs,
  introspection: true,
  playground: true,
  cors: true,
});

server.listen(process.env.PORT ?? 4201).then(async ({ url }) => {
  console.log(`🚀  Server ready at ${url}`);

  await connect();

  const u = await getUsers();
  console.log(u);
});
