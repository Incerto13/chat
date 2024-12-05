import mongoose, { Schema, Document } from 'mongoose';

// Define an interface that extends mongoose.Document
export interface IChat extends Document {
    username: string;
    message: string;
    avatar: string;
    timeStamp: Date;
  }
  
  // Define the schema
  const chatSchema: Schema<IChat> = new Schema({
    username: { type: String, required: true },
    message: { type: String, required: true },
    avatar: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now },
  });
  
  // Create the model using the interface and schema
  const Chat = mongoose.model<IChat>('message', chatSchema);
  
  export default Chat;