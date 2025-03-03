import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { uid } = useContext(AuthContext);  
console.log("uid",uid);
  const INITIAL_STATE = {
    chatId: "null", 
    user: {},  
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,  
          chatId:
            uid > action.payload.uid
              ? uid + action.payload.uid
              : action.payload.uid + uid, 
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data:state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
