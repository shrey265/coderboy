import Post from "../post";
import { useEffect } from "react";
import { useState } from "react";
import '../scroll.css'
import Loader from "../loader";

export default function IndexPage(){
    const [posts,setPosts] = useState([]);
    const [visible, setVisible] = useState(false);


    useEffect(() =>{   
        const response = fetch(`${process.env.REACT_APP_SERVER_URL}/post`).then(response =>{
            response.json().then(posts =>{
                setPosts(posts);
            })
        });
    },[])


    const scrollToTop = () => {
        document.querySelector('body').scrollTo({ top: 0, behavior: 'smooth' });
      };
    
    if(posts.length === 0){
        return (
            <div className="index">
                <div className="index-page-loader">
                <Loader />
                </div>
            </div>
        );
    }
    return (
        <div className="index">
            <h2 className="PostsHeading">Recent Posts</h2>
            <div className="posts">
            {posts.length>0 && posts.map((post,index)=>(
            <Post {...post} key={index} />
        ))}
        </div>

        {/* <div className={visible ? "back-to-top-visible" : null} id="scroll-up-left" onClick={scrollToTop}></div>
        <div className={visible ? "back-to-top-visible" : null} id="scroll-up-right" onClick={scrollToTop}></div> */}

        </div>
        
    );
}