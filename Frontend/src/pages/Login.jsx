import { useState } from "react";
import Home from "./Home";
import "./login.css";
import { handleError, handleSuccess } from "../Utils/util";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      handleError("Email and Password are required");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email.trim(),
          password: user.password.trim(),
        }),
      });
      const data = await response.json();
      console.log("Raw Response:", response);
      const { success, message, error } = data;
      if (response.ok) {
        handleSuccess(message, "Login Successful");
        setUser({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        console.log("Error Details:", error);
        const details = error?.details ? error.details[0].message : null;
        handleError(details || error || "Login failed");
        
      } else if (!success) {
        handleError(message || "Login failed");
      }
    } catch (error) {
      handleError("Error: " + error.message);
    }
  }
  return (
    <>
      <div className="parent">
        <h2>Login Form</h2>
        <div className="child">
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="Email">
              Enter Email:
              <input
                type="email"
                placeholder="Enter the Email..."
                required
                name="email"
                value={user.email}
                onChange={handleChange}
                autoFocus
              />
            </label>{" "}
            <br />
            <br />
            <label htmlFor="Password">
              Enter Password:
              <input
                type="password"
                placeholder="Enter the password.."
                name="password"
                value={user.password}
                required
                onChange={handleChange}
              />
            </label>
            <button type="submit">Login</button>
             <span>Don't Have an Account ?
                                    <Link to="/signup">SignUp</Link>
                                </span>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}
