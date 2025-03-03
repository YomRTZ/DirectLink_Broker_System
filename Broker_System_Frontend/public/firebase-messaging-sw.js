// Import Firebase scripts for service workers
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.0.1/firebase-messaging-compat.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz4zjjt9aIp5pVk-Z5M9t88OtCT4Z39sk",
  authDomain: "broker-system-2f8c5.firebaseapp.com",
  projectId: "broker-system-2f8c5",
  storageBucket: "broker-system-2f8c5.firebasestorage.app",
  messagingSenderId: "214436796043",
  appId: "1:214436796043:web:edf89b4f8aa3f99921a68e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  const notificationTitle = payload.notification?.title || 'Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message.',
    icon: payload.notification?.icon || '/default-icon.png',
  };

  // Display the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});




