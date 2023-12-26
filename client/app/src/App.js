import logo from './logo.svg';
import './App.css';
import Header from './header';
import Post from './post';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import Layout from './layout';
import IndexPage from './pages/indexPage';
import CreatePost from './pages/createPost';
import Login from './pages/login';
import Register from './pages/register';
import { UserContext, UserContextProvider } from './userContext';
import PostPage from './pages/postPage';
import EditPost from './pages/editPost';
import About from './pages/about';
import Contact from './pages/contact';


function App() {
 
  return (
    <Router>
      <UserContextProvider>
     
      <Routes>
        <Route path='/' element={ <Layout />}>

        <Route index element={<IndexPage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/post/:id" element={<PostPage />}></Route>
        <Route path="/edit/:id" element={<EditPost />}></Route>

        </Route>
      </Routes>
      </UserContextProvider>
    </Router>
  );
}

export default App;
