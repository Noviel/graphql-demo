import { Schema, Types, model } from 'mongoose';

export const UserSchema = new Schema({
  id: Types.ObjectId,
  email: String,
  name: String,
});

export type UserCreateParams = { email: string; name: string };
export type UserUpdateParams = Partial<UserCreateParams>;
export type UserGetListParams = { limit: number; skip: number };

export const User = model('User', UserSchema);
