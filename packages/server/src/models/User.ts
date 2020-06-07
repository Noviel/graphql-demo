import { Schema, Types, model } from 'mongoose';

export const UserSchema = new Schema({
  id: Types.ObjectId,
  email: String,
  name: String,
});

export const User = model('User', UserSchema);

export async function createUser(name: string, email: string) {
  const user = new User({
    name,
    email,
  });

  const result = await user.save();

  return result;
}

export async function getUsers() {
  return User.find({});
}
