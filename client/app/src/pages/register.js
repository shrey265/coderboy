import { Link } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Register(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function register(ev){
        ev.preventDefault();
        const response =  await fetch(`${process.env.REACT_APP_SERVER_URL}/register`,{
            method: 'POST',
            body: JSON.stringify({username,email,password}),
            headers: {'Content-Type':'application/json'},
        })
        if(response.status === 200){
            alert('registration successful');
            setRedirect(true);
        }
        else{
            alert('registration failed');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="registerpage">
            <h2>Register</h2>
            <form className="register" onSubmit={register}>
                <input
                 type="text"
                  placeholder="username"
                  value={username}
                  onChange={ev => setUsername(ev.target.value)}
                  required={true} />
                <input type="email"
                 placeholder="email"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)}
                 required={true} />
                <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev=> setPassword(ev.target.value)} 
                 required={true} />
                <button>Register</button>
            </form>
            
        </div>
    );
}