import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'
import logo from '../../assets/images/logoname.png'
import { useLocation } from 'react-router'
import { useSelector } from 'react-redux'
const NavbarComp=()=>{
	const [open,setOpen]=useState(false)
	const {pathname}=useLocation()
	if(pathname==='/'||pathname==='/home'||pathname==='/home/'||pathname==='/home#home-div'){
		var x=document.getElementById("navbar")
		if(x!==null){
		x.style.backgroundColor="transparent"
		if(open){
			x.style.backgroundColor="aliceblue"
		}
	}
	}
	var current=useSelector(state=>state.users.current)
	var preScrollPos=window.pageYOffset;
	window.onscroll=()=>{
		var currentScrollPos=window.pageYOffset;
		if(preScrollPos>currentScrollPos){
			document.getElementById("navbar").style.top="0"
			document.getElementById("navbar").style.backgroundColor="aliceblue"
		}else{
			document.getElementById("navbar").style.top="-57px"
		}
		if(currentScrollPos===0){
			document.getElementById("navbar").style.top="0px"
			if(pathname==='/'||pathname==='/home'||pathname==='/home/'||pathname==='/home#home-div'){
				document.getElementById("navbar").style.backgroundColor="transparent"
			}


		}
		preScrollPos=currentScrollPos
	}

	const openNav=()=>{
		setOpen(true)
		//console.log("clicked")
		var x=document.getElementById("navbar")
		if(x.className==="topnav"){
			x.className+=" responsive"
		}else{
			x.className="topnav"
		}
	}
	const closeNav=()=>{
		setOpen(false)
		var x=document.getElementById("navbar")
		if(x.className==="topnav responsive"){
			x.className="topnav"
		}
	}
	return (
		<header>
			<div className="topnav" id="navbar">
					<span onClick={()=>window.location.href="/home"} id="title"><img src={logo} alt="logo"/></span>
					{current?(<NavLink to="/dash" onClick={closeNav}>Dashboard</NavLink>):(<></>)}

					{current?current.admin?<NavLink to="/admin" onClick={closeNav}>Admin</NavLink>:null:null}
					{/* <NavLink to="/home" onClick={closeNav}>Home</NavLink>
					<NavLink to="/blogs" onClick={closeNav}>Blogs</NavLink>
					<NavLink to="/projects" onClick={closeNav}>Projects</NavLink>
					<NavLink to="/getInvolved" onClick={closeNav}>Get Involved</NavLink>
					<NavLink to="/teams" onClick={closeNav}>Our Teams</NavLink>
					{/* <NavLink to="/about" onClick={closeNav}>About</NavLink> 
					{current?(<></>):(<NavLink to="/user/login" onClick={closeNav}>LogIn</NavLink>)} */}
					{current?(<></>):(<NavLink className="btn btn-outline-danger btn-sm" to="/user/login" onClick={closeNav}>LogIn</NavLink>)}
					{/* <NavLink to="/teams" onClick={closeNav}>Our Teams</NavLink> */}
					<NavLink to="/blogs" onClick={closeNav}>Blogs</NavLink>
					<NavLink to="/instructor" onClick={closeNav}>Become an Instructor</NavLink>
					<NavLink to="/getInvolved" onClick={closeNav}>Get Involved</NavLink>
					<NavLink to="/projects" onClick={closeNav}>Projects</NavLink>
					<NavLink to="/home" onClick={closeNav}>Home</NavLink>
					
					<span className="icon" onClick={openNav}><i className="fa fa-bars"></i></span>
					<span className="icon-close" onClick={closeNav}><i className="fa fa-times"></i></span>
			</div>

		</header>
	)
}

export default NavbarComp;