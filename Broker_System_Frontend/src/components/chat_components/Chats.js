import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";

const Chats = () => {
  const [chats, setChats] = useState({});  
  const { uid } = useContext(AuthContext);
  const{currentUser}=useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  console.log(dispatch);
 
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", uid), (doc) => {
        setChats(doc.data() || {});  
      });

      return () => unsub();
      
    };

    if (uid) getChats();
  }, [uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log("chat",chats);
  return (
    <div className="chats">
      {/* Ensure chats is an object before using Object.entries */}
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(([key, chat]) => (
     
        <div
          className="userChat"
          key={key}
          onClick={() => handleSelect(chat.userInfo)}
        >
          <img src={chat.userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat.userInfo.displayName}</span>
            <p>{chat.lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default Chats;


