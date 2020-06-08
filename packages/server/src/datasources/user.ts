import { Document } from 'mongoose';
import { DataSource, DataSourceConfig } from 'apollo-datasource';

import {
  User as UserType,
  MutationCreateUserArgs,
  QueryUsersArgs,
  QueryUserArgs,
  MutationUpdateUserArgs,
} from '../../types';

import { User } from '../models/User';

type UserDocument = {
  name: string;
  email: string;
  _id: string;
};

const userDto = ({ _id, name, email }: UserDocument): UserType => ({
  name,
  email,
  id: _id,
});

function assertUserDoc(doc: Document | null): asserts doc is Document {
  if (doc === null) {
    throw new Error(`No user document`);
  }
}

export class UserAPI extends DataSource {
  initialize(config: DataSourceConfig<any>) {}

  async getUser({ id }: QueryUserArgs) {
    const doc = await User.findById(id);
    assertUserDoc(doc);
    return userDto(doc as any);
  }

  async getUsersList({ skip, limit }: QueryUsersArgs) {
    const docs = await User.find({}, null, { skip: skip ?? undefined, limit: limit ?? undefined });
    return (docs as any).map(userDto);
  }

  async createUser({ input }: MutationCreateUserArgs) {
    const user = new User(input);
    const doc = await user.save();

    return userDto(doc as any);
  }

  async updateUser({ id, input }: MutationUpdateUserArgs) {
    const doc = await User.findById(id);

    assertUserDoc(doc);

    if (input.name) {
      (doc as any).name = input.name;
    }
    if (input.email) {
      (doc as any).email = input.email;
    }

    await doc.save();

    return userDto(doc as any);
  }

  async deleteUser(id: string) {
    const doc = await User.findByIdAndDelete(id);

    assertUserDoc(doc);

    return userDto(doc as any);
  }
}
