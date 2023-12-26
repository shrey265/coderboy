import about_img from '../assets/about_img.png'
import { Link } from 'react-router-dom';

export default function About(){
    return (
        <div className="about-page">
            <div className="about">
            <div className="profile">
                <img src={about_img} alt="about img" />
            </div>
            <div className="text">
                <h3>Hi, I'm 22 year old random boy who loves writing code.</h3>
                <h5>Coding solutions & tutorials</h5>
                <p>Coder Boy is a place where you'll find daily Leetcode & GFG dsa solutions with explanation. I'll try my best to explain each solution very clearly. This is it !!!</p>
                <Link to="/contact">Contact</Link>
            </div>
            
        </div>
        </div>
    );
}