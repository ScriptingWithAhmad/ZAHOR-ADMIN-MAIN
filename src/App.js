import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from "react-hot-toast";
import { fetchToken, onMessageListener } from './firebase';
// import {Button, Toast} from 'react-bootstrap';
import { useState } from 'react';
import logo from './logo.svg';
import Login from './pages/Login';

import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);
  onMessageListener().then(payload => {
    setNotification({ title: payload.notification.title, body: payload.notification.body })
    setShow(true);
    console.log({"title": payload.notification.title, "body": payload.notification.body})
    
    const title = payload.notification.title;
    const body = payload.notification. body;
    const message = `${title}: ${body}`;


    toast.success(message, {
      duration: 4000, // Duration in milliseconds
    });
    console.log(payload);
  }).catch(err => console.log('failed: ', err));


  const onShowNotificationClicked = () => {
    setNotification({ title: "Notification", body: "This is a test notification" })
    setShow(true);
  }

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='*' element={<ProtectedRoute />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
