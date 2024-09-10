import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import InboxPage from "./pages/onebox/InboxPage.jsx";
import Body from "./components/Body.jsx";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/google-login" />} />
        <Route path="/google-login" element={<Login />} />
        <Route path="/onebox" element={<Body/>}>
          <Route index element={<Home />} />  {/* Default route when navigating to /onebox */}
          <Route path="list" element={<InboxPage />} /> {/* /onebox/list route */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer/>
    </>
  );
};

export default App;
