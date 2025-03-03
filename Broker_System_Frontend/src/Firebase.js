import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
const firebaseConfig = {
    apiKey: "AIzaSyBz4zjjt9aIp5pVk-Z5M9t88OtCT4Z39sk",
    authDomain: "broker-system-2f8c5.firebaseapp.com",
    projectId: "broker-system-2f8c5",
    storageBucket: "broker-system-2f8c5.firebasestorage.app",
    messagingSenderId: "214436796043",
    appId: "1:214436796043:web:edf89b4f8aa3f99921a68e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const messaging = getMessaging(app);
const storage = getStorage(app);
export { app, auth,messaging,db,storage };

const vapidKey="BMyx4U86losYDzX__l3anD66RoV9OhLc-eC_XNagasB7WA8eR-n6uw3SfULTzgtB6xJi48S96Z28aVPDrEWvam4";
export const requestPermition = async () => {
    try {
      const permission = await Notification.requestPermission();
  
      if (permission === 'granted') {
        return getToken(messaging, { vapidKey });
      } else if (permission === 'denied') {
        alert('You denied notifications. Please allow notifications for a better experience.');
      } else if (permission === 'default') {
        alert('You need to grant notification permission to receive alerts.');
      }
  
    } catch (error) {
      console.log('Error getting FCM token:', error);
      throw error;
    }
  }
  
  