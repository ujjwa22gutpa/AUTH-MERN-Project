import { useState, useEffect } from "react";
import { handleSuccess } from "../Utils/util";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home(){

    const [loggedInUser,setLoggedInUser] = useState('');
    const Navigate = useNavigate();

    useEffect(()=>{
       setLoggedInUser(localStorage.getItem("Name"))

    },[]);

    function handleButton(){
        localStorage.clear();
        handleSuccess("User Logged out")
       setLoggedInUser('');
        setTimeout(()=>{
               Navigate('/login');
        },1000)
       
    }
    return (
        <>
          <h2>Welcome { loggedInUser || "User"}</h2>
          <button onClick={handleButton}>Log Out</button>
          <ToastContainer />
        </>
    )
}