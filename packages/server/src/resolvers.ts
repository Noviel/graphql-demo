import { Resolvers } from '../types';

import { DataSources } from './datasources';

type Context = { dataSources: DataSources };

export const resolvers: Resolvers<Context> = {
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
