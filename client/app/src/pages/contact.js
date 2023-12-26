import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Contact(ev){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function sendContactFormData(ev){
        ev.preventDefault();
       
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/email`,{
            method: 'POST',
            body: JSON.stringify({name, email, message}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className="contact">
            <h4>I would love to hear from you.</h4>
            <form onSubmit={sendContactFormData}>
                <div className="name">Name</div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required={true} />
                <div className="email">Email</div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required={true} />
                <div className="messageheading">Message</div>
                <textarea className="message" value={message} onChange={e => setMessage(e.target.value)} required={true} ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}