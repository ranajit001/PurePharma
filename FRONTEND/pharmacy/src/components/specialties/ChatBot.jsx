import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(
  "https://online-pharmacy-jwkq.onrender.com"
);

const PetMedicineChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    socket.on("botResponse", (response) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: response },
      ]);
    });
    return () => {
      socket.off("botResponse");
    };
  }, []);

  const sendMessage = () => {
    if (!userInput.trim()) return;

    socket.emit("userMessage", userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", text: userInput },
    ]);
    setUserInput("");
  };

  return (
    <div>
      <div
        id="chatBox"
        style={{
          height: "250px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter symptom..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default PetMedicineChatbot;
