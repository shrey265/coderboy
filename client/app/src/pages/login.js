import { Link } from "react-router-dom";
import styled from 'styled-components'
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { useContext } from "react";



export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

  async function login(ev){
        ev.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`,{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        })
        if(response.ok){
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
                setRedirect(true);
            });
        }
        else{
            alert('wrong credentials');
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }


    return (
        <div className="loginpage">
            <h2>Login</h2>
            <form className="login" onSubmit={login}>
                <input type="text" placeholder="username"
                value={username}
                onChange={ev=> setUsername(ev.target.value)}
                required={true}/>
                <input type="password" placeholder="password"
                value={password}
                onChange={ev=> setPassword(ev.target.value)} 
                required={true} />
                <button>Login</button>
            </form>
            <Link to='/register'>Don't have an account. Register here.</Link>
           
        </div>
    );
}