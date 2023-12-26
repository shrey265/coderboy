import leetcode from './assets/LeetCode_logo_black.png';
import {format} from 'date-fns';
import { Link } from 'react-router-dom';
import { UserContext } from './userContext';
import { useContext } from 'react';


export default function Post({_id,title,summary,cover,content,createdAt,author}){

    const {setLoginBeforeRedirect} = useContext(UserContext);
    const {userInfo} = useContext(UserContext);
    function pageRedirect() {
        const login = userInfo.logged_in ? true : false;
        setLoginBeforeRedirect(login);
    }

    return (
        <div className='post'>
            <div className="image">
                <Link to={`/post/${_id}`} onClick={pageRedirect}>
                <img src={`${process.env.REACT_APP_SERVER_URL}/`+cover} height={340} alt="cover" />
                </Link>
            </div>
            <div className="text">
                <Link to={`/post/${_id}`} onClick={pageRedirect}>
                <h2>{title}</h2>
                <p>{format(new Date(createdAt),'MMM dd, yyyy HH:mm')} {author}</p>
                <p>{summary}</p>
                </Link>
            </div>
            <hr />
        </div>
    );
}