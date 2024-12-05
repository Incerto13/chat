import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { EventEmitter } from 'stream';
import Connection from './db'; 
import Chat from './models/Chat';
import { getMessages, createMessage, updateMessage, deleteMessage, getMessage } from './controllers/messageController';
import setupSwagger from './swaggerDocs'; 

// Initialize express app
const app = express();
app.use(express.json());
Connection();

// Create an HTTP server and Socket.IO instance
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Set up Swagger documentation
setupSwagger(app);

// RESTful API Endpoints
app.get('/api/messages', getMessages);
app.get('/api/messages/:id', getMessage);
app.post('/api/messages', createMessage);
app.put('/api/messages/:id', updateMessage);
app.delete('/api/messages/:id', deleteMessage);

// WebSocket logic (Socket.IO)
io.on("connection", (socket: EventEmitter) => {
  console.log("connected");

  // Load and send existing messages to the new client
  const loadMessages = async () => {
    try {
      const messages = await Chat.find().sort({ timestamp: 1 }).exec();
      socket.emit('chat', messages);  // Emit messages to the client
    } catch (err) {
      console.log(err);
    }
  };

  loadMessages();

  // Handle receiving new message and broadcasting it to all clients
  socket.on('newMessage', async (msg: any) => {
    try {
      const newMessage = new Chat(msg);
      await newMessage.save();
      io.emit('message', msg);  // Broadcast message to all clients
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen("3002", () => {
  console.log("Running on 3002 port");
});
function redisAdapter(arg0: { host: string; port: number; }): typeof import("socket.io-adapter").Adapter {
    throw new Error('Function not implemented.');
}

