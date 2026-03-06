import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import RefreshHandler from "./RefreshHandler";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  
  return (
    <>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={ <PrivateRoute element ={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<PrivateRoute element={<SignUp />} />} />
      </Routes>
    </>
  );
}

export default App;
