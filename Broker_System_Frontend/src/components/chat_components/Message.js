import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { getUsersByUid } from "../../services/UserService";

const Message = ({ message }) => {
  const { uid } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const ref = useRef();

  useEffect(() => {
    const getCurrentUserData = async () => {
      try {
        setIsLoading(true);
        const response = await getUsersByUid(uid);
        if (response) {
          setCurrentUser(response);
          console.log("Current user data:", response);
        } else {
          setError("Failed to load user data");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message || "Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    if (uid) {
      getCurrentUserData();
    }
  }, [uid]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const defaultProfilePic = "https://via.placeholder.com/40x40?text=User";

  const getProfilePicture = () => {
    if (message.senderId === uid) {
      return currentUser?.profilePicture || defaultProfilePic;
    }
    return data.user?.photoURL || defaultProfilePic;
  };

  if (isLoading) {
    return <div className="message-loading">Loading...</div>;
  }

  if (error) {
    console.error("Error in Message component:", error);
  }

  const isOwner = message.senderId === uid;

  return (
    <div
      ref={ref}
      className={`message ${isOwner ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img
          src={getProfilePicture()}
          alt="Profile"
          onError={(e) => {
            // Prevent infinite loop
            e.target.onerror = null; 
            e.target.src = defaultProfilePic;
          }}
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
};

export default Message;
