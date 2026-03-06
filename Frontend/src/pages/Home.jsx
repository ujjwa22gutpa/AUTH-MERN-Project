import { useState, useEffect } from "react";
import { handleError, handleSuccess } from "../Utils/util";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("Name"));
  }, []);

  const fetchProduct = async () => {
    try {
      const header = {
        Authorization: localStorage.getItem("jwtToken") ? `Bearer ${localStorage.getItem("jwtToken")}` : "",
      };
      const response = await fetch("http://localhost:5000/products", {
      
        headers: header,
      });
      const data = await response.json();
        console.log("Products Data:", data);
    } catch (err) {
      handleError(err);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  function handleButton() {
    localStorage.clear();
    handleSuccess("User Logged out");
    setLoggedInUser("");
    setTimeout(() => {
      Navigate("/login");
    }, 1000);
  }
  return (
    <>
      <h2>Welcome {loggedInUser || "User"}</h2>
      <button onClick={handleButton}>Log Out</button>
      <ToastContainer />
    </>
  );
}
