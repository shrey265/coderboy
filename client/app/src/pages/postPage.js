import { useParams, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import Loader from "../loader";
import {format} from 'date-fns';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function PostPage(){
    const [postInfo,setPostInfo] = useState(null);
    const {id} = useParams();
    const {userInfo} = useContext(UserContext);
    const {loginBeforeRedirect} = useContext(UserContext);
    const [comment,setComment] = useState('');
    const [comments, setComments] = useState([]);
    // const [commentPresent, setPresence] = useState(false);
    const [commentLoaded, setLoader] = useState(false);
    
    // const [loginInfo, setLoginInfo] = useState(false);

    const name = (userInfo!==null) ? userInfo.username : "";
    const addComment = async() => {
        if(userInfo.logged_in===true && comment!==""){
            await fetch(`${process.env.REACT_APP_SERVER_URL}/comment/${id}`,{
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({name, comment}),
                headers: {'Content-Type':'application/json'},
            });
        }
        else if(comment===""){
            alert('Write a Comment first');
        }
        else{
            alert('Login to Comment');
        }
    }


    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/post/${id}`)
        .then(response=>{
            response.json().then(postInfo=>{
                setPostInfo(postInfo);
            });
        });
        fetch(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`)
        .then(response=>{
            response.json().then(comments=>{
                setLoader(true);
                setComments(comments);
                // if(comments.length>0){
                //     setPresence(true);
                // }
            });
        });
    },[]);

    if(userInfo.logged_in === loginBeforeRedirect || userInfo.logged_in===undefined || userInfo.logged_in===true){
        if(!postInfo) return (
            <div className="post-page">
                <div className="post-page-loader">
                <Loader />
                </div>
            </div>
        );
    
        return (
            <div className="post-page">
    
                <div className="page">
                { userInfo && userInfo.username === postInfo.author &&(
                    <div className="edit-row">
                        <Link className="edit-btn" to={`/edit/${postInfo._id}`}>Edit Post</Link>
                    </div>
                )}
                {/* <div className="postimage">
                <img src={`http://localhost:4000/${postInfo.cover}`} alt="cover" />
                </div> */}
                <h1>{postInfo.title}</h1>
                <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
                </div>
    
                <div className="comments">
                    <h2>Comments</h2>
    
                    <div className="comment-list">
                        {
                            !commentLoaded && (
                                <div className="comment-loader">
                                    <Loader />
                                </div>
                            )
                        }
                        {
                            comments.length===0 && (
                                <p>No comments yet</p>
                            )
                        }
                        {comments.length>0 && comments.map((comment, index)=>{
                            return (
                                <div className="comment" key={index}>
                                    <div className="comment-header">
                                    <h5>{comment.name}</h5>
                                    <p>{format(new Date(comment.updatedAt),'MMM dd, yyyy HH:mm')}</p>
                                    </div>
                                <p className="comment-text">{comment.comment}</p>
                                </div>
                            );
                        })}
                    </div>
    
                    <form onSubmit={addComment}>
                        <textarea rows="5" placeholder="Add a comment" value={comment} onChange={e=> setComment(e.target.value)}></textarea>
                        <button type="submit">Add comment</button>
                    </form>
                </div>
    
    
            </div>
        );
        
    }
    else{
        return <Navigate to="/" />
    }
    
}