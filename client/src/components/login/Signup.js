import React,{useState} from 'react'
import './Login.css'
import { Link, Redirect } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {userRegister,setLoading} from '../../redux/actions/user'
import Loader from '../loader/Loading'
import Toaster from '../loader/Toast'
const Signup=()=>{
  const dispatch=useDispatch();
  const isLoading=useSelector(state=>state.users.isLoading)

  const [signUpData,setsignUpdata]=useState({email:'',firstname:'',lastname:'',password:''})

  const signUp=(e)=>{
    e.preventDefault();
    //console.log(loginData)
    signUpData.username=signUpData.email.split('@')[0];
    dispatch(setLoading())
    dispatch(userRegister(signUpData))
    setsignUpdata({email:'',firstname:'',lastname:'',password:''})
  }
  const handleChangeSign=(e)=>{
    setsignUpdata({...signUpData,[e.target.name]:e.target.value})
  }
  var errmess=useSelector((state)=>state.users.errmess)
  const current=useSelector((state)=>state.users.current)

  return(!current?
    <div  className="body" id="login">
      {errmess?<Toaster message={errmess.message}/>:<></>}
      <div className="login">
        <div className="login-header">
        <div className="animate">
          <h1>Register</h1>
          <div className="container">
            <form onSubmit={signUp}>
              <div className="row">
                <div className="col-12">
                  <input autoComplete="off" autoCapitalize="off" spellCheck="false" required type="email" name="email" placeholder="Email Address" value={signUpData.email} onChange={handleChangeSign}/>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <input autoComplete="on" autoCapitalize="on" spellCheck="false" required type="name" name="firstname" placeholder="First Name" value={signUpData.firstname} onChange={handleChangeSign}/>
                </div>
                <div className="col-6">
                  <input autoComplete="on" autoCapitalize="on" spellCheck="false" required type="name" name="lastname" placeholder="Last Name" value={signUpData.lastname} onChange={handleChangeSign}/>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <input autoComplete="off" autoCapitalize="off" minLength="8" spellCheck="false" required type="password" name="password" placeholder="Password" value={signUpData.password} onChange={handleChangeSign}/>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {!isLoading?(<button className="login-btn" type="submit">Sign Up</button>):(<Loader/>)}
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <h6>Already registered? <b><Link to="/user/login" >Login</Link></b> here</h6>
                </div>
              </div>
            </form>
          </div>
        </div>        
        </div>
      </div>
    </div>:<Redirect to="/dash"/>
  )
}

export default Signup



















