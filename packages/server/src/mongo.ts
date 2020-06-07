import mongoose from 'mongoose';

export async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI enviroment variable must be provided.');
  }

  return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}
