import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../editor";
import '../styles/createPost.css'
import { UserContext } from '../userContext';

export default function CreatePost(){
    const {userInfo}= useContext(UserContext);
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);


    async function createNewPost(ev){
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        ev.preventDefault();
        // console.log(files);
        const userid = (userInfo!==null) ? userInfo.id : "";
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/post/:${userid}`,{
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if(response.status===400){
            alert("Request denied. Unauthorized access");
           setRedirect(true);
        }
        if(response.ok){
            setRedirect(true);
        }
    }
    
    if(redirect){
        return <Navigate to={'/'} />
    }


    return (
        <div className="createPost">
            <h2>Create Post</h2>
            <form onSubmit={createNewPost}>
            <input type="title" placeholder={'Title'} value={title}
            onChange={ev=>setTitle(ev.target.value)} required={true} />
            <input type="summary" placeholder={'Summary'} value={summary}
            onChange={ev=>setSummary(ev.target.value)} required={true} />
            <input type="file"
            onChange={ev=>setFiles(ev.target.files)} required={true} />
            <div className="editor">
            <Editor value={content} onChange={setContent}/>
            </div>
            <button type="submit">Create Post</button>
        </form>
        </div>
    );
}