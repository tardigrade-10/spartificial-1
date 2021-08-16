import React,{useState} from 'react'
import './Login.css'
import { Link, Redirect } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {userRegister,setLoading} from '../../redux/actions/user'
import Loader from '../loader/Loading'
import Toaster from '../loader/Toast'
import { sendEmailOTP, verifyOtp } from '../../redux/actions/email'
const Signup=()=>{
  const dispatch=useDispatch();
  const isLoading=useSelector(state=>state.users.isLoading)

  const emailData=useSelector(state=>state.email)

  const [emailOtp,setEmailOtp]=useState("")
  const [validated,setValidated]=useState(true)

  const [signUpData,setsignUpdata]=useState({email:'',firstname:'',lastname:'',password:''})

  const sendOtp=()=>{
    if(signUpData.email!==""&&signUpData.firstname!==""&&signUpData.lastname!==""&&signUpData.password!==""&&signUpData.password.length>=8){
      signUpData.username=signUpData.email.split('@')[0];
      signUpData.otp=Math.floor(Math.random() * 99999) + 10000;  
      setValidated(true)
      dispatch(sendEmailOTP(signUpData))
    }else{
      setValidated(false)
    }
  }
  const signUp=(e)=>{
    e.preventDefault();
    //console.log(loginData)
    dispatch(verifyOtp(emailOtp,emailData))    
    //dispatch(userRegister(signUpData))
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
              {!emailData.enterOtp?<>
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
              </div></>:null}
              {emailData.enterOtp?<div className="row">
                <div className="col-12 pb-3"><small className="text-white">OTP sent to <strong>{emailData.signUpData.email}</strong></small></div>
                <div className="col-12">
                  <input required type="text" name="emailOtp" placeholder="Enter OTP" value={emailOtp} onChange={(e)=>setEmailOtp(e.target.value)}/>
                </div>
              </div>:null}
              {!validated?<small className="text-danger">All fields are mandatory*</small>:null}
              <div className="row">
                <div className="col-12">
                  {!emailData.isLoading?(emailData.enterOtp?!isLoading?<button className="login-btn" type="submit">Sign Up</button>:<Loader/>:<button className="login-btn" type="button" onClick={sendOtp}>Send OTP</button>):(<Loader/>)}
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



















