import React, {useState} from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./userContext";


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [posts,setPosts] = useState([]);
    const [postList, setPostList] = useState([]);
    const {setLoginBeforeRedirect} = useContext(UserContext);
    const {userInfo} = useContext(UserContext);

    useEffect(() =>{
        const response = fetch(`${process.env.REACT_APP_SERVER_URL}/post`).then(response =>{
            response.json().then(posts =>{
                setPosts(posts);
            })
        })
    },[])
   
    function pageRedirect() {
        const login = userInfo.logged_in ? true : false;
        setLoginBeforeRedirect(login);
        // setSearchInput("");
    }


      const handleChange = (e) => {
        var searchedPosts = [];
        e.preventDefault();
        const title = e.target.value;
        setSearchInput(e.target.value);
        if (title.length > 0 && title!=' ') {
        
        posts.map((post)=>{
            if(post.title.toLowerCase().match(title.toLowerCase())){
                searchedPosts.push(post);
            }
        });
        }
        setPostList(searchedPosts);
    };

    
    if(postList.length>0){
        return <div className="searchdata">
        <input 
        type="text"
        placeholder="Search"
        onChange={(e)=> handleChange(e)}
        value={searchInput}
    />
    <table className="table">
        <tbody>
        {
        postList.map((post,index) =>{
               return <tr key = {index}>
                
                <td className="tableImage">
                    <a href={`/post/${post._id}`} onClick={pageRedirect}>
                        <img src={`${process.env.REACT_APP_SERVER_URL}/`+post.cover} alt={post.title} />
                    </a>
                </td>
                <td className="tableTitle">
                    <a href={`/post/${post._id}`} onClick={pageRedirect}>
                    {post.title}
                    </a>
                    </td>
            </tr>
        })}
        </tbody>
    </table>
    </div>
    }

    return <div className="searchdata">
        <input 
    type="text"
    placeholder="Search"
    onChange={(e)=> handleChange(e)}
    value={searchInput}
/>
        </div>
    
};

export default SearchBar;