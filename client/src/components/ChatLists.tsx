import React, { useEffect, useRef } from 'react';

// Define types for the individual chat message
interface Chat {
  message: string;
  username: string;
  avatar: string;
}

// Define props for the main ChatLists component
interface ChatListsProps {
  chats: Chat[];
}

const ChatLists: React.FC<ChatListsProps> = ({ chats }) => {
  const endOfMessages = useRef<HTMLDivElement | null>(null);
  const user = localStorage.getItem('user') || ''; // Ensures it defaults to an empty string if null

  // Sender chat component
  const SenderChat: React.FC<Chat> = ({ message, username, avatar }) => {
    return (
      <div className="chat_sender">
        <img src={avatar} alt="" />
        <p>
          <strong>{username}</strong> <br />
          {message}
        </p>
      </div>
    );
  };

  // Receiver chat component
  const ReceiverChat: React.FC<Chat> = ({ message, username, avatar }) => {
    return (
      <div className="chat_receiver">
        <img src={avatar} alt="" />
        <p>
          <strong>{username}</strong> <br />
          {message}
        </p>
      </div>
    );
  };

  // Scroll to bottom effect when chats change
  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const scrollToBottom = () => {
    if (endOfMessages.current) {
      endOfMessages.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="chats_list">
      {chats.map((chat, index) => {
        if (chat.username === user) {
          return (
            <SenderChat
              key={index}
              message={chat.message}
              username={chat.username}
              avatar={chat.avatar}
            />
          );
        } else {
          return (
            <ReceiverChat
              key={index}
              message={chat.message}
              username={chat.username}
              avatar={chat.avatar}
            />
          );
        }
      })}
      <div ref={endOfMessages}></div>
    </div>
  );
};

export default ChatLists;
