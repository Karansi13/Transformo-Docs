// components/Chatbot.js

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from "../styles/Chatbot.module.css"; 
import ScrollToBottom from 'react-scroll-to-bottom';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasStarted) {
      setMessages([{ text: "Hi there! How can I help you?", sender: "bot" }]);
    }
  }, [isOpen, hasStarted]); 
  

  const handleSend = async () => {
    if (input.trim()) {
      if (!hasStarted) {
        setHasStarted(true); 
      }
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setIsLoading(true); // Show loader
  
      try {
        const response = await fetch('/api/assistant/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ question: input }), 
        });
        console.log(response)

        const data = await response.json();

        console.log(data)
        
        setMessages((prev) => [
          ...prev,
          { text: data.answer, sender: "bot" },
        ]);
      } catch (error) {
        console.error('Error:', error);
        setMessages((prev) => [
          ...prev,
          { text: "Sorry, something went wrong. Please try again.", sender: "bot" },
        ]);
      } finally {
        setIsLoading(false); 
      }
    }
  };
  
  return (
    <>
      <motion.div
        className={styles.chatboticon}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={styles.iconsvg}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 5v.01M6.938 7.84l-.01-.011m7.92 0l.01-.011M7.5 15h9m-6.324 3.39A7.978 7.978 0 0012 21c1.863 0 3.585-.636 4.96-1.71"
          />
        </svg>
      </motion.div>

      <motion.div
        className={styles.chatbotwindow}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ display: isOpen ? "block" : "none" }}
      >
        <div className={styles.chatbotheader}>AI Assistant</div>

        {/* Scrollable messages area */}
        <ScrollToBottom className={styles.chatbotmessages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.sender === "user" ? styles.userMessage : styles.botMessage
              }`}
            >
              {message.text}
            </div>
          ))}
          {isLoading && <div className={styles.loader}>Loading...</div>}
        </ScrollToBottom>

        <div className={styles.chatbotinputcontainer}>
          <input
            type="text"
            className={styles.chatbotinput}
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleSend() : null)}
            disabled={isLoading} 
          />
        </div>
      </motion.div>
    </>
  );
}