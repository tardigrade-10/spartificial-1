import {BASE_URL} from '../../config'
const url=`${BASE_URL}/instructor`;

var userdetails=localStorage.getItem('userdetails');
const bearer=`Bearer ${userdetails}`

const instructorLoading=()=>async(dispatch)=>{
  dispatch({type:'INSTRUCTOR_LOADING'})
}

export const getJoinRequest=()=>async(dispatch)=>{
  dispatch(instructorLoading)
  return fetch(`${url}/join-request`,{
    method:"GET",
    headers:{
      'Authorization':bearer,
      'Content-Type':'application/json'
    },
    credentials:'same-origin'
  }).then(response=>{
    if(response.ok) return response
    else{
      var error=new Error("Error "+response.status+": "+response.statusText)
      throw error
    }
  }).then(response=>{return response.json()})
  .then(joindata=>{
    dispatch({type:'GET_JOIN_REQUEST',payload:joindata})
  }).catch(err=>console.log(err.message))
}

export const getProjectRequest=()=>async(dispatch)=>{
  dispatch(instructorLoading)
  return fetch(`${url}/submit-project`,{
    method:"GET",
    headers:{
      'Authorization':bearer,
      'Content-Type':'application/json'
    },
    credentials:'same-origin'
  }).then(response=>{
    if(response.ok) return response
    else{
      var error=new Error("Error "+response.status+": "+response.statusText)
      throw error
    }
  }).then(response=>{return response.json()})
  .then(submitdata=>{
    dispatch({type:'GET_SUBMISSION_REQUEST',payload:submitdata})
  }).catch(err=>console.log(err.message))
}