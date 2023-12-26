import { Link, Navigate } from 'react-router-dom';
import logo from './assets/coder_boy.png';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './userContext';
import SearchBar from './searchBar';
import Menu from './menu';


export default function Header(){
    const [class_, setClass_] = useState('menu-list-onload');
    const {setUserInfo,userInfo}= useContext(UserContext);
    const username = userInfo?.username;

    

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER_URL}/profile`,{
            credentials: 'include',
        }).then(response=>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
            })
        });
    },[]);

    function logout(){
        fetch(`${process.env.REACT_APP_SERVER_URL}/logout`,{
            credentials:'include',
        }).then(response=>{
            response.json().then(userInfo =>{
                setUserInfo(userInfo);
            })
        });

        setClass_('menu-list-onload');
     
    }

    return (
        <header>
            <div className="logo">
            <Link to="/"><img src={logo} height={150} alt="coderboy" /></Link>
            <div className="title"><Link to="/" >CoderBoy</Link></div>
            </div>
            <div className="search">
                <SearchBar />
            </div>
            <nav>
            <div className="menu-icon">
                <div className="menu-button" onClick={()=> {(class_==='menu-list-expanded') ? setClass_('menu-list') : setClass_('menu-list-expanded');}}>
                <Menu />
                </div>
                
                <div className={class_}>
                <Link to="/" >Home</Link>
                <Link to="/about" >About</Link>
                <Link to="/contact" >Contact</Link>
                        {
                            username==='coderboy' &&
                            (
                                <>
                                <Link to="/create">Create</Link>
                                <div className="logout-menu" onClick={logout}>Logout</div>
                                </>
                            )
                        }
                        {
                            username && username!=='coderboy' && 
                            (
                                <>
                                <div className="logout-menu" onClick={logout}>Logout</div>
                                </>
                            )
                        }
                        {
                            !username && (
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                            )
                        }
                </div>
                </div>




            <Link to="/" >Home</Link>
            <Link to="/about" >About</Link>
            <Link to="/contact" >Contact</Link>
            {
                username==='coderboy' &&
                 (
                    <>
                    <Link to="/create">Create</Link>
                    <div className="logout" onClick={logout}>Logout</div>
                    </>
                )
            }
            {
                username && username!=='coderboy' && 
                (
                    <>
                    <div className="logout" onClick={logout}>Logout</div>
                    </>
                )
            }
            {
                !username && (
                    <>
                        <Link to="/login">Login/Register</Link>
                    </>
                )
            }
            
            {/* <Link to="/create" >Create Post</Link> */}
            
            </nav> 
        
        </header>
    );
}