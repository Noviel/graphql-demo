import { Resolvers } from '../types';

import { DataSources } from './datasources';

type Context = { dataSources: DataSources };

export const resolvers: Resolvers<Context> = {
  Query: {
    user: async (_, params, { dataSources }) => {
      return dataSources.userAPI.getUser(params);
    },
    users: async (_, { skip, limit }, { dataSources }) => {
      return dataSources.userAPI.getUsersList({ skip, limit });
    },
  },
  Mutation: {
    createUser: async (_, params, { dataSources }) => {
      return dataSources.userAPI.createUser(params);
    },
    updateUser: async (_, params, { dataSources }) => {
      return dataSources.userAPI.updateUser(params);
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.deleteUser(id);
    },
  },
};
