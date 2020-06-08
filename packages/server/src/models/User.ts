import { Schema, Types, model } from 'mongoose';

export const UserSchema = new Schema({
  id: Types.ObjectId,
  email: String,
  name: String,
});

export const User = model('User', UserSchema);
