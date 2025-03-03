import React, { useContext } from "react";
import Input from "./Input";
import Messages from "./Messages";
import { ChatContext } from "../../context/ChatContext";
import { useModalContext } from "../../context/ModalContext"; // Corrected import

const Chat = () => {
  const { data } = useContext(ChatContext);
  const { openModal, setModalData } = useModalContext(); // Use the correct hook

  const handleOpenProfile = () => {
    setModalData({ user: data.user }); // Set the user data
    openModal(); // Open the modal
  };

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <button 
            onClick={handleOpenProfile} // Use the handler to open the modal with user data
            className="px-4 py-2 bg-emerald-500/90 text-white rounded-md font-medium shadow-sm hover:bg-emerald-600/90 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Profile Info
          </button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
