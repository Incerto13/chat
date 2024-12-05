import mongoose from 'mongoose';

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://admin:password@127.0.0.1:27017/chat');
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error', err);
  }
};

export default connectToDatabase;