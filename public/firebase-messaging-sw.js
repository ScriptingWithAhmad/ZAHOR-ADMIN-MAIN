// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCfTMx9rTNMgmNvdLsUNBkNaeakstp-zi8",
  authDomain: "azscrap-b7879.firebaseapp.com",
  projectId: "azscrap-b7879",
  storageBucket: "azscrap-b7879.appspot.com",
  messagingSenderId: "676293313381",
  appId: "1:676293313381:web:e2cb5c6d98b04e1c29978c",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
