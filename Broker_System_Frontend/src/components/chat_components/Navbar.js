import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUsersByUid } from '../../services/UserService';

const Navbar = () => {
  const authState = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();
  const { uid } = authState;
     
  useEffect(() => {
    const getCurrentUserData = async () => {
      const response = await getUsersByUid(uid);
      setCurrentUser(response);
      console.log("profilePicture",response.profilePicture);
    };
    getCurrentUserData();
  }, [uid]);

  if (!authState.authenticated) {
    return (
      <div className="navbar">
        <span className="logo">DirectLink</span>
      </div>
    );
  }

  return (
    <div className="navbar">
      <span className="logo">DirectLink Chat</span>
      <div className="user">
        <img src={currentUser?.profilePicture || "default-profile.jpg"} alt="User" />
        <span>{currentUser?.firstName}</span>
      </div>
    </div>
  );
};

export default Navbar;
