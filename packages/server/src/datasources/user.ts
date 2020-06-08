import { DataSource, DataSourceConfig } from 'apollo-datasource';

import { UserCreateParams, User, UserGetListPArams } from '../models/User';

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

  async createUser({ input }: { input: UserCreateParams }) {
    const user = new User(input);
    const doc = await user.save();

    return userDto(doc as any);
  }

  async getUsersList(params: UserGetListPArams) {
    const docs = await User.find({}, null, params);
    return (docs as any).map(userDto);
  }
}
