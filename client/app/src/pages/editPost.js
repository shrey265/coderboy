import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../editor";
import { UserContext } from '../userContext';
import { useContext } from 'react';
import '../styles/editPost.css'


export default function EditPost(){
    const {id} = useParams();
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {userInfo} = useContext(UserContext);


    useEffect(() =>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/post/`+id).then(
            response=>{
                response.json().then(postInfo=>{
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                    // setFiles(postInfo.files);
                })
            }
        )
    },[])

    async function updatePost(ev){
        ev.preventDefault();

        const userid = (userInfo!==null) ? userInfo.id : "";
        const username = (userInfo!==null) ? userInfo.username : "";

        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('author', username);
        data.set('id',id);
        if(files?.[0]) data.set('file',files[0]);

        
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/post/:${userid}`,{
            method: 'PUT',
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

    if(redirect){
        return <Navigate to={'/post/'+id} />
    }

    return (
        <div className="editPost">
            <form onSubmit={updatePost}>
            <h2>Edit Post</h2>
            <input type="title" placeholder={'Title'} value={title}
            onChange={ev=>setTitle(ev.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary}
            onChange={ev=>setSummary(ev.target.value)} />
            <input type="file"
            onChange={ev=>setFiles(ev.target.files)}/>
            
            <div className="editor">
            <Editor onChange={setContent} value={content}/>
            </div>
            
            <button type="submit">Update Post</button>
        </form>
        </div>
    );
}