import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import chatbotIcon from "../../../assets/Images/icons/chatbot.png";
import arrow from "../../../assets/Images/icons/arrow.svg";
import messageArrow from "../../../assets/Images/icons/message-arrow.png";
import "./chatbot.css";

const chatbotClosedIcon =
  "https://static.vecteezy.com/system/resources/previews/012/628/411/original/chatbot-3d-render-icon-illustration-png.png";

const socket = io(
  "https://online-pharmacy-jwkq.onrender.com"
);

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on("botResponse", (response) => {
      setBotTyping(false);
      setChatHistory((prevMessages) => [
        ...prevMessages,
        { role: "bot", text: response },
      ]);
    });

    socket.on("connect_error", () => {
      setError("Connection error. Please try again later.");
    });

    return () => {
      socket.off("botResponse");
      socket.off("connect_error");
    };
  }, []);

  // const sendMessage = (e) => {
  //   e.preventDefault();
  //   if (!userInput.trim()) return;

  //   socket.emit("userMessage", userInput);
  //   setChatHistory((prevMessages) => [
  //     ...prevMessages,
  //     { role: "user", text: userInput },
  //   ]);
  //   setUserInput("");
  //   setBotTyping(true);
  // };
  const sendMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const message = userInput.toLowerCase();

    // Handle greetings on the frontend if needed
    const greetings = ["hello", "hi", "hey", "good morning", "good evening"];
    if (greetings.includes(message)) {
      setChatHistory((prevMessages) => [
        ...prevMessages,
        { role: "user", text: userInput },
        { role: "bot", text: "Hello! How can I assist you today?" },
      ]);
      setUserInput("");
      return;
    }

    // Send message to backend
    socket.emit("userMessage", userInput);
    setChatHistory((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userInput },
    ]);
    setUserInput("");
    setBotTyping(true);
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <img src={chatbotIcon} alt="chatbot-image" />
              <h2 className="logo-text">ChatBot</h2>
            </div>
            <button className="down-arrow-btn" onClick={() => setIsOpen(false)}>
              <img src={arrow} alt="Close" />
            </button>
          </div>
          <div className="chatbot-body" ref={chatBoxRef}>
            <div className="message bot-message">
              <img src={chatbotIcon} alt="" />
              <p className="message-text">
                Hello! I am your assistant. <br /> How can I help you today?
              </p>
            </div>
            {chatHistory.map((chat, index) => (
              <div key={index} className={`message ${chat.role}-message`}>
                {chat.role === "bot" && <img src={chatbotIcon} alt="" />}
                <p className="message-text">{chat.text}</p>
              </div>
            ))}
            {botTyping && <p className="typing-indicator">Bot is typing...</p>}
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="chat-footer">
            <form className="chat-form" onSubmit={sendMessage}>
              <input
                type="text"
                className="chat-input"
                placeholder="Type a message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <button type="submit" className="material-symbol-rounded">
                <img
                  src={messageArrow}
                  alt="Send"
                  style={{ width: "25px", height: "25px" }}
                />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <img
          src={chatbotIcon}
          alt="Chatbot Icon"
          className="chatbot-closed-icon"
          onClick={() => setIsOpen(true)}
          style={{ cursor: "pointer", width: "80px", height: "80px" }}
        />
      )}
    </div>
  );
};

export default Chatbot;
