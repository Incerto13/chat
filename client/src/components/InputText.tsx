import React, { useState, KeyboardEvent } from "react";

interface InputTextProps {
  addMessage: (message: string) => void;
}

const InputText: React.FC<InputTextProps> = ({ addMessage }) => {
  const [message, setMessage] = useState<string>("");

  const sendMessage = () => {
    addMessage(message);
    setMessage(""); // reset textbox
  };

  // Event handler for keydown (to handle 'Enter' key)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the textarea from creating a new line
      sendMessage(); // Call sendMessage function
    }
  };

  return (
    <div className="inputtext_container">
      <textarea
        name="message"
        id="message"
        rows={6}
        placeholder="Input Message ..."
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        onKeyDown={handleKeyDown}
      ></textarea>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default InputText;
