import coderboy from './assets/coder_boy.png'
import './footer.css'
import leetcode from './assets/LeetCode_logo_black.png'
import github from './assets/github-mark.png'
import linkedin from './assets/linkedin_logo.png'
import { Link } from 'react-router-dom'


export default function Footer(){
    return (
        <footer>
            <Link to="/">
                <img src={coderboy} alt="coderboy" className='footer_image'/>
            </Link>
            
            <div className="footer-logos">
            <a href='https://leetcode.com/sshrey183/' target='_blank'>
            <img src={leetcode} alt="leetcode-profile" className='leetcode-footer' />
            </a>
            <a href="https://github.com/shrey265" target='_blank'>
            <img src={github} alt="github" className='github-footer'/>
            </a>
            <a href="https://www.linkedin.com/in/shrey-sharma-80748222a/" target='_blank'>
            <img src={linkedin} alt="linkedin" className='linkedin-footer'/>
            </a>
            
            </div>
            
        </footer>
    );
}