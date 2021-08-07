import React,{useEffect,useLayoutEffect} from 'react'
import { Switch, Route, Redirect,useLocation} from 'react-router-dom';
import Header from '../home/Navbar'
import Home from '../home/Home'
import Login from '../login/Login'
//import About from '../about/About'
import Projects from '../projects/Projects'
import Project from '../projects/Project'
import Blogs from '../blogs/Blogs'
import getInvolved from '../getInvolved/getInvolved'
import Footer from '../footer/Footer'
import './App.css';
import Signup from '../login/Signup';
//import Teams from '../teams/Teams'
import Instructor from '../instructor/Instructor'
import Blog from '../blogs/Blog'
import Dash from '../dash/Dash'
import Privacy from '../legal/Privacy'
import Terms from '../legal/Terms'

import {useDispatch, useSelector} from 'react-redux'
import {getUser} from '../../redux/actions/user'
import {getBlogs} from '../../redux/actions/blog'
import {getTeams} from '../../redux/actions/teams'
import {getProjects} from '../../redux/actions/project'
import ReferralRules from '../addons/ReferralRules';
import ProjectTypes from '../addons/ProjectTypes';
import Admin from '../admin/Admin';

function App() {

  // var userdetails=localStorage.getItem('userdetails');
  // userdetails=JSON.parse(userdetails);
  const {pathname}=useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUser())
    dispatch(getBlogs())
    dispatch(getTeams())
    dispatch(getProjects())
  },[dispatch])

  const current=useSelector((state)=>state.users.current)
  const blogs=useSelector((state)=>state.blogs)
  const projects=useSelector((state)=>state.projects)

  //console.log(users)
  //console.log(blogs)
  //console.log(projects)
  return (
    <div className="app">
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/dash" component={Dash}/>        
        {/* <Route exact path="/about" component={About}/> */}
        <Route exact path="/projects" component={()=><Projects projects={projects.projects}/>}/>
        <Route exact path="/projects/:query" component={Project}/>
        <Route exact path="/blogs" component={()=><Blogs blogs={blogs.blogs}/>}/>
        <Route exact path="/blogs/:blog_id" component={Blog}/>
        <Route exact path="/getInvolved" component={getInvolved}/>
        {/* <Route exact path="/teams" component={Teams}/> */}
        <Route exact path="/instructor" component={Instructor}/>
        <Route exact path="/privacy-policy" component={Privacy}/>
        <Route exact path="/terms-conditions" component={Terms}/>
        <Route exact path="/project-types" component={ProjectTypes}/>
        <Route exact path="/referral-rules" component={ReferralRules}/>
        
        <Route exact path="/user/login" component={Login}/>
        <Route exact path="/user/signup" component={Signup}/>
        <Route exact path="/admin" component={Admin}/>
        <Redirect to="/"/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
