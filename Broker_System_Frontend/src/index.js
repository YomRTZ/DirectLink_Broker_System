import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import './i18n';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { ChatContextProvider } from "./context/ChatContext";
import { ModalProvider } from "./context/ModalContext";
import { ModalComponent } from "./components/chat_components/ModalComponent";
import { PropertyProvider } from "./context/PropertyContext";


// Check if the browser supports service workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ModalProvider>
          <ChatContextProvider>
            <PropertyProvider> 
                <App />
            </PropertyProvider>
            <ModalComponent />
          </ChatContextProvider>
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
