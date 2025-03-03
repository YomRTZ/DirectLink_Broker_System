import React, { createContext, useState, useEffect } from 'react';
import { checkAuthentication } from '../repository/AuthRepository'; 
import { useNavigate } from "react-router-dom";
import { getUserByUid } from '../repository/UserRepository';
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState({ authenticated: false, role: null , uid:null, email:null});
  useEffect(() => {
    const fetchAuthState = async () => {
      const result = await checkAuthentication();
      console.log("authState",result);
      setAuthState(result);
      if (result.authenticated) {
        navigate('/home'); 
      }
    };
    fetchAuthState();
  }, []);

 


  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
