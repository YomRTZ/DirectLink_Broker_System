import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Chat from '../components/chat_components/Chat'
import Sidebar from '../components/chat_components/Sidebar'
import React from 'react'
const ChatPage = () => {
return(
  <div className="home">
  <div className="container">
    <Sidebar/>
        <Chat />
      </div>
  </div>
);
}

export default ChatPage;