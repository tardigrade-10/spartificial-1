import React,{useState} from 'react'
import './Login.css'
import {useDispatch,useSelector} from 'react-redux'
import {userLogin,setLoading} from '../../redux/actions/user'
import Loader from '../loader/Loading'
import Toaster from '../loader/Toast'
import { Link, Redirect } from 'react-router-dom'

const Login=()=>{
  const dispatch=useDispatch();
  const isLoading=useSelector(state=>state.users.isLoading)

  const [forget,setForget]=useState(false)
  const [loginData,setLoginData]=useState({email:'',password:''})
  const [forgetData,setForgetData]=useState({email:''})

  const logIn=(e)=>{
    e.preventDefault();
    //console.log(loginData)
    loginData.username=loginData.email.split('@')[0]
    dispatch(setLoading())
    dispatch(userLogin(loginData))
    setLoginData({email:'',password:''})
  }
  const forGet=(e)=>{
    e.preventDefault()
    window.confirm("Do you want to forget password?\n"+JSON.stringify(forgetData))
    setForgetData({email:''})
  }
  const handleChangeLogin=(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }
  const handleChangeForget=(e)=>{
    setForgetData({...forgetData,[e.target.name]:e.target.value})
  }

  var errmess=useSelector((state)=>state.users.errmess)
  const current=useSelector((state)=>state.users.current)
    if(!forget){
      return(!current?
        <div  className="body" id="login">
          {errmess?<Toaster message={errmess.message}/>:<></>}

          <div className="login">
            <div className="login-header">
            <div className="animate">
            <h1>Log In</h1>
              <div className="container">
                <form onSubmit={logIn}>
                  <div className="row">
                    <div className="col-12">
                      <input autoComplete="off" autoCapitalize="off" spellCheck="false" required type="email" name="email" placeholder="Email Address" value={loginData.email} onChange={handleChangeLogin}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <input autoComplete="off" autoCapitalize="off" minLength="8" spellCheck="false" required type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChangeLogin}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      {!isLoading?(<button className="login-btn" type="submit">Login</button>):(<Loader/>)}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <span onClick={()=>setForget(true)}>Forgotten Password?</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h6>New to Spartificial? <b><Link to="/user/signup" >Sign Up</Link></b> here</h6>
                    </div>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        </div>:current.admin?<Redirect to="/admin"/>:<Redirect to="/dash"/>
      )
    }else{
      return(!current?
        <div  className="body" id="login">
          <div className="login">
            <div className="login-header">
            <div className="animate">
            <h1>Log In</h1>
              <div className="container">
                <form onSubmit={forGet}>
                  <div className="row">
                    <div className="col-12">
                      <input autoComplete="off" autoCapitalize="off" spellCheck="false" required type="email" name="email" placeholder="Email Id/Phone" value={forgetData.email} onChange={handleChangeForget}/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button className="login-btn" type="submit">Forget</button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <h6>New to Saprtificial? <b><Link to="/user/signup" >Sign Up</Link></b> here</h6>
                    </div>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        </div>:current.admin?<Redirect to="/admin"/>:<Redirect to="/dash"/>
      )
    }
}

export default Login



