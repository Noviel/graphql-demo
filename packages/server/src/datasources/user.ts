import { DataSource, DataSourceConfig } from 'apollo-datasource';

import { UserCreateParams, User, UserGetListParams, UserUpdateParams } from '../models/User';

type UserDocument = {
  name: string;
  email: string;
  _id: string;
};

const userDto = ({ _id, name, email }: UserDocument) => ({
  name,
  email,
  id: _id,
});

export class UserAPI extends DataSource {
  initialize(config: DataSourceConfig<any>) {}

  async getUser(id: string) {
    const doc = await User.findById(id);
    return doc ? userDto(doc as any) : null;
  }

  async getUsersList(params: UserGetListParams) {
    const docs = await User.find({}, null, params);
    return (docs as any).map(userDto);
  }

  async createUser({ input }: { input: UserCreateParams }) {
    const user = new User(input);
    const doc = await user.save();

    return userDto(doc as any);
  }

  async updateUser({ id, input }: { id: string; input: UserUpdateParams }) {
    const doc: any = await User.findById(id);
    if (doc) {
      if (input.name) {
        doc.name = input.name;
      }
      if (input.email) {
        doc.email = input.email;
      }
      await doc.save();

      return userDto(doc);
    }
    return null;
  }

  async deleteUser(id: string) {
    const doc = await User.findByIdAndDelete(id);

    return doc ? userDto(doc as any) : null;
  }
}
