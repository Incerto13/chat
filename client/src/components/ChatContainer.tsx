import React, { useEffect, useRef, useState } from "react";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient, { Socket } from "socket.io-client";

// Define the type for chat messages
interface Chat {
  username: string;
  message: string;
  avatar: string;
}

const ChatContainer = () => {
  // Define state types
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const socketio: Socket = socketIOClient("http://localhost:3002");
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    socketio.on("chat", (chats: Chat[]) => {
      setChats(chats);
    });

    socketio.on('message', (msg: Chat) => {
      setChats((prevChats) => [...prevChats, msg])
    });

    // Cleanup the event listeners when the component is unmounted
    return () => {
      socketio.off('chat');
      socketio.off('message');
    };
  }, []);

  // Function to handle adding a new message
  const addMessage = (chat: string) => {
    const newChat: Chat = {
      username: localStorage.getItem("user") || "Anonymous",
      message: chat,
      avatar: localStorage.getItem("avatar") || "",
    };
    socketio.emit('newMessage', newChat);
  };

  // Function to handle logout
  const Logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem('avatar');
    setUser(null); // Set user to null after logout
  };

  return (
    <div className="container">
      {user ? (
        <div className="home">
          <div className="chats_header">
            <h4>Username: {user}</h4>
            <h1>Akin's Forum</h1>
            <p className="chats_logout" onClick={Logout}>
              <strong>Logout</strong>
            </p>
          </div>
          <ChatLists chats={chats} />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
};

export default ChatContainer;
