import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useModalContext } from "../../context/ModalContext";
import { db, storage } from "../../Firebase";
import { v4 as uuid } from "uuid";
import { getUsersByUid } from "../../services/UserService";
import { IoSend } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";

const Input = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { uid } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [currentUser, setCurrentUser] = useState();

  // new
  const { setModalData, openModal, closeModal } = useModalContext();
  const openModalWithUserData = () => {
    setModalData({ user: data.user });
    openModal();
  };

  useEffect(() => {
    const getCurrentUserData = async () => {
      const response = await getUsersByUid(uid);
      setCurrentUser(response);
    };
    getCurrentUserData();
  }, [uid]);

  const handleSend = async () => {
    if (!text.trim()) return;
    
    try {
      setIsLoading(true);
      const chatRef = doc(db, "chats", data.chatId);
      const chatDoc = await getDoc(chatRef);

      if (!chatDoc.exists()) {
        await setDoc(chatRef, { messages: [] });

        const userChatsUpdate = {
          [data.chatId]: {
            userInfo: {
              uid: data.user.uid,
              displayName: data.user.displayName,
              photoURL: data.user.photoURL || null,
            },
            date: serverTimestamp(),
          },
        };
        await updateDoc(doc(db, "userChats", uid), userChatsUpdate);
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.firstName,
              photoURL: currentUser.profilePicture,
            },
            date: serverTimestamp(),
          },
        });
      }
        await updateDoc(chatRef, {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: uid,
            date: Timestamp.now(),
          }),
        });
      

      await updateDoc(doc(db, "userChats", uid), {
        [`${data.chatId}.lastMessage`]: { text },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: { text },
        [`${data.chatId}.date`]: serverTimestamp(),
      });

      setText("");
      // setImg(null);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type your message..."
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          // onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file" className="cursor-pointer">
          <IoMdAttach className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors" />
        </label>
        <BsEmojiSmile className="h-6 w-6 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer" />
        <button
          onClick={handleSend}
          disabled={isLoading || (!text.trim())}
          className="flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <IoSend className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Input;
