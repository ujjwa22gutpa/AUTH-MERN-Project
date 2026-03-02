import { useState, useEffect } from "react";
import { handleSuccess } from "../Utils/util";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Home(){

    const [loggedInUser,setLoggedInUser] = useState('');
    const Navigate = useNavigate();

    useEffect(()=>{
       const storedUser = localStorage.getItem("userData");

       if(storedUser){
          const parsedUser = JSON.parse(storedUser);
          setLoggedInUser(parsedUser.name);
       }
    },[]);

    function handleButton(){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
        handleSuccess("User Logged out")
        setTimeout(()=>{
               Navigate('/login');
        },1000)
        setLoggedInUser('');
    }
    return (
        <>
          <h2>Welcome {loggedInUser || "User"}</h2>
          <button onClick={handleButton}>Log Out</button>
          <ToastContainer />
        </>
    )
}