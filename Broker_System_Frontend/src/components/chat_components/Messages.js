import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);  
  const { data } = useContext(ChatContext); 

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages); 
      }
    });

    return () => {
      unSub(); 
    };
  }, [data.chatId]);  

  return (
    <div className="messages">
      {messages.map((message) => (
        <Message key={message.id} message={message} />  
      ))}
    </div>
  );
};

export default Messages;
