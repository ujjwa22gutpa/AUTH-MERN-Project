import { useState } from "react"


export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function handleChange(event){
      setEmail(event.target.value)
      setPassword(event.target.value)

    }
    function handleSubmit(event){
        event.preventDefault();
        setEmail('')
        setPassword('')
    }
    return (
        <>
        <div className="div1">
            <h2>Login Form</h2>
            <div className="div2">
                <form action="">
                    <label htmlFor="Email">Enter Email:
                        <input type="email" placeholder="Enter the Email..." required name ="Email" value={email} onChange={handleChange} autoFocus/>
                    </label> <br /><br />
                    <label htmlFor="Password">Enter Password:
                        <input type="password" placeholder="Enter the password.."name="password" value={password} required onChange={handleChange} />
                    </label>
                    <button>Login</button>
                </form>
            </div>
        </div>
        </>
    )
}