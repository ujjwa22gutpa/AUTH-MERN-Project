import { useState } from "react"
import { Link } from "react-router-dom";
import Home from "./Home"
import {ToastContainer} from "react-toastify"
import  './signup.css'
import { handleError, handleSuccess } from "../Utils/util";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
    const navigate = useNavigate();
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })

    function handleChange(event){
        const {name,value} = event.target;
        setUser(prevUser => ({
          ...prevUser,
          [name]:value
        }))
    }
  
    async function handleSubmit(event){
        event.preventDefault();
        const {name,email,password} = user;
        
        if(!name || !email || !password){
            handleError("Name, Email and Password cannot be Empty")
            return;
        }
        
        try {
            const response = await fetch("http://localhost:5000/signup",{ // to match the backend route
                method:"POST", // to tell backend that we are sending data to create a new resource
                headers:{
                    "Content-Type":"application/json" // to tell backend that we are sending json data
                },
                body:JSON.stringify({ // to send the user data in the request body
                    name:user.name.trim(),
                    email:user.email.trim(),
                    password:user.password.trim()
                })
            })
            
            const data = await response.json();
            console.log("Raw Response:", response);
            const {success,message,error} = data;
            
            if(response.ok){
                handleSuccess(message || "Account Created Successfully")
                setUser({
                    name:'',
                    email:'',
                    password:''
                })
                navigate("/login");
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details ||  error || "Signup failed")
                
            } else if(!success){
                handleError(message || "Signup failed")
            }
             console.log("Response Data:", data);
            
        } catch (error) {
            handleError("Error: " + error.message)
            console.error("Error:",error);
        }
    }
    
    return (
        <>
        <div className="container1">
            <h2>SignUp Form</h2>
            <div className="container2">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Name">Enter Name:
                        <input type="text" placeholder="Enter the Name..."  name="name" value={user.name} onChange={handleChange} required autoFocus/>
                    </label> 
                    <label htmlFor="Email">Enter Email:
                        <input type="email" placeholder="Enter the Email..."  name="email" value={user.email} onChange={handleChange} required />
                    </label> 
                    <label htmlFor="Password">Enter Password:
                        <input type="password" placeholder="Enter the password..." name="password" value={user.password} onChange={handleChange} required />
                    </label>
                   
                    <button type="submit">SignUp</button>
                    <span>Already Have an Account ?
                        <Link to="/login">Login</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
        </>
    )
}