import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCfTMx9rTNMgmNvdLsUNBkNaeakstp-zi8",
  authDomain: "azscrap-b7879.firebaseapp.com",
  projectId: "azscrap-b7879",
  storageBucket: "azscrap-b7879.appspot.com",
  messagingSenderId: "676293313381",
  appId: "1:676293313381:web:e2cb5c6d98b04e1c29978c",
  measurementId: "G-3KRVYW58LL"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BFapIA24cm5P9OgL4sAOseiWHJ7g4vqPJ4-xTOOkqfAT2xrMJUJ0AEx1y650ek9x9r6cq-9nlYI_VREP9lgCtxo'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      localStorage.setItem("fcmToken", currentToken)
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});