// Create admin use
db.createUser(
  {
      user: "admin",
      pwd: "password",
      roles: [
          {
              role: "readWrite",
              db: "chat"
          }
      ]
  }
);

// switch to the "chat" database
db = db.getSiblingDB("chat");

// create the "messages" collection
db.createCollection("messages");

// insert an initial document to verify the collection creation
db.messages.insertOne({ text: "Welcome to the chat!", timestamp: new Date() });