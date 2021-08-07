import { BASE_URL } from "../../config";
import {Redirect} from 'react-router-dom'
const url =BASE_URL+'/users';

export const setLoading=()=>async(dispatch)=>{
  dispatch({type:'USER_LOADING'})
}

export const userRegister=(formData)=>async(dispatch)=>{
  ////console.log(formData)
  const body=JSON.stringify(formData)
  ////console.log(body)
  return fetch(url+'/signup',{
    method:"POST",
    body:body,
    headers:{
      'Content-Type':'application/json'
    }
  })
  .then(response=>{
    //response.json().then(body=>{console.log(body.message)})
    if(response.ok) return response
    else{
      var error=''
      response.json().then(body=> {
        error =new Error (body.message)
        error.response=response;
        dispatch({type:'ANY_ERROR',payload:error})
      })
    }
  },error=>{throw error})
  .then(response=>response.json())
  .then(response=>{
    if(response.success){
      //setCredentials to Local Storage
      console.log(response);
      localStorage.setItem('userdetails',response.token)
      dispatch({type:'SIGNUP',payload:response})
      //window.location.href="/dash"
      if(response.admin){
        window.location.href='/admin'
      }else{
        window.location.href="/dash"
      }

      //alert(response.status)
    }
  })
  .catch(error=>dispatch({type:'ANY_ERROR',payload:error}))
}

export const userLogin=(formData)=>async(dispatch)=>{
  //console.log(formData)
  //console.log(body)
  return fetch(url+'/login',{
    method:"POST",
    body:JSON.stringify({username:formData.username,password:formData.password}),
    headers:{
      'Content-Type':'application/json'
    }
  })
  .then(response=>{
    if(response.ok) return response
    else{
      var error=''
      response.json().then(body=> {
        error =new Error (body.message)
        error.response=response;
        dispatch({type:'ANY_ERROR',payload:error})
      })
    }
  },error=>{throw error})
  .then(response=>response.json())
  .then(response=>{
    if(response.success){
      //setCredentials to Local Storage
      console.log(response);
      localStorage.setItem('userdetails',response.token)
      dispatch({type:'LOGIN',payload:response})
      if(response.admin){
        window.location.href='/admin'
      }else{
        window.location.href="/dash"
      }
      //alert(response.status)
    }
  })
  .catch(error=>dispatch({type:'ANY_ERROR',payload:error}))
}
export const userLogout=()=>async(dispatch)=>{
  return fetch(url+'/logout')
  .then(response=>{
    //console.log(response)
    if(response.ok) return response
    else{
      var error =new Error ('Error '+response.status+': '+response.statusText)
      error.response=response;
      ////console.log(error)
      dispatch({type:'ANY_ERROR',payload:error})
      throw error;
    }
  },error=>{throw error})
  .then(response=>{
    localStorage.removeItem('userdetails')
    window.location.href="/home"
    //alert('logout')
    dispatch({type:'LOGOUT'})
  })
  .catch(error=>dispatch({type:'ANY_ERROR',payload:error}))
}

export const changeUserPassword=(changeData)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');

  const bearer=`Bearer ${userdetails}`

  return fetch(`${url}/changepassword`,{
    method:"POST",
    body:JSON.stringify(changeData),
    headers:{
      'Content-Type':'application/json',
      'Authorization':bearer
    },
    credentials:"same-origin"
  })
  .then(response=>{
    //console.log(response)
    if(response.ok) return response
    else{
      var error=''
      response.json().then(body=> {
        //console.log(body)
        error =new Error (body.message)
        error.response=response;
        dispatch({type:'ANY_ERROR',payload:error})
      })
    }
  },error=>{throw error})
  .then(response=>{
    return response.json()
  })
  .then((response)=>{
    if(response.success){
      //setCredentials to Local Storage
      //console.log(response);
      // localStorage.setItem('userdetails',JSON.stringify(response))
      dispatch({type:'CHANGE_PASSWORD',payload:response})
      // //alert(response.status)
      // window.location.href="/dash"
    }
  })
  .catch(error=>dispatch({type:'ANY_ERROR',payload:error}))
}

export const userProfileUpdate=(formData,user_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');

  const bearer=`Bearer ${userdetails}`

  //console.log(formData)
  return fetch(`${url}/${user_id}`,{
    method:"PUT",
    body:JSON.stringify(formData),
    headers:{
      'Content-Type':'application/json',
      'Authorization':bearer
    },
    credentials:"same-origin"
  })
  .then(response=>{
    //console.log(response)
    if(response.ok) return response
    else{
      var error =new Error ('Error '+response.status+': '+response.statusText)
      error.response=response;
      ////console.log(error)
      dispatch({type:'ANY_ERROR',payload:error})
      throw error;
    }
  },error=>{throw error})
  .then(response=>{
    return response.json()
  })
  .then((response)=>{
    if(response.success){
      //setCredentials to Local Storage
      console.log(response);
      dispatch({type:'LOGIN',payload:response})
      //alert(response.status)
      window.location.href="/dash"
    }
  })
  .catch(error=>dispatch({type:'ANY_ERROR',payload:error}))
}

export const getUser=()=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`
  //console.log(bearer)
  return fetch(url+'/',{
    method: "GET",
    headers: {
      'Authorization': bearer
    },
    credentials: "same-origin"
  }).then((response)=>{
    if(response.ok){
      return response
    }else{
      var error=new Error('Error: '+response.status+': '+response.statusText);
      error.response=response;
      if(response.status===401){
        dispatch(userLogout())
      }
      dispatch({type:'ANY_ERROR',payload:error})
      throw error;
    }
  },error=>{
    var errmess=new Error(error.message)
    throw errmess;
  })
  .then((response)=>{
    return response.json()
  })
  .then((user)=>{
    //console.log(user)
    dispatch({type:'GET_USER',payload:user})
  })
  .catch((error)=>dispatch({type:'ANY_ERROR',payload:error}));
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'ANY_ERROR',payload:error})
  }
}

export const getUserList=()=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`
  //console.log(bearer)
  return fetch(url+'/all',{
    method: "GET",
    headers: {
      'Authorization': bearer
    },
    credentials: "same-origin"
  }).then((response)=>{
    if(response.ok){
      return response
    }else{
      var error=new Error('Error: '+response.status+': '+response.statusText);
      error.response=response;
      if(response.status===401){
        dispatch(userLogout())
      }
      dispatch({type:'ANY_ERROR',payload:error})
      throw error;
    }
  },error=>{
    var errmess=new Error(error.message)
    throw errmess;
  })
  .then((response)=>{
    return response.json()
  })
  .then((users)=>{
    //console.log(user)
    dispatch({type:'GET_USER_LIST',payload:users})
  })
  .catch((error)=>dispatch({type:'ANY_ERROR',payload:error}));
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'ANY_ERROR',payload:error})
  }
}

