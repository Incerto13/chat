import { Request, Response } from 'express';
import Chat from '../models/Chat';

// Controller to get all messages
export const getMessages = async (req: Request, res: any) => {
  try {
    const messages = await Chat.find().sort({ timestamp: 1 }).exec();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving messages' });
  }
};

// Controller to get single message
export const getMessage = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const message = await Chat.findById(id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving message' });
  }
};

// Controller to create a new message
export const createMessage = async (req: Request, res: any) => {
  const { username, message, avatar } = req.body;
  try {
    const newMessage = new Chat({
      username,
      message,
      avatar,
    });

    await newMessage.save();
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error creating message' });
  }
};

// Controller to update a message
export const updateMessage = async (req: Request, res: any) => {
  const { id } = req.params;
  const { username, message:newMessage, avatar } = req.body;

  if ((typeof id) != 'number') {

  }

  try {
    const message = await Chat.findById(id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    
    const updatedMessage = await Chat.findByIdAndUpdate(
      id,
      { username, message:newMessage, avatar },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error updating message' });
  }
};

// Controller to delete a message
export const deleteMessage = async (req: Request, res: any) => {
  const { id } = req.params;

  try {
    const deletedMessage = await Chat.findById(id);

    if (!deletedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await Chat.findByIdAndDelete(id);

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting message' });
  }
};
