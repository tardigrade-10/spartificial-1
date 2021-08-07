import {BASE_URL} from '../../config'
const url=`${BASE_URL}/files`;

var userdetails=localStorage.getItem('userdetails');
const bearer=`Bearer ${userdetails}`

const fileLoading=()=>async(dispatch)=>{
  dispatch({type:'FILE_LOADING'})
}

export const getFiles=()=>async(dispatch)=>{
  dispatch(fileLoading())
  return fetch(url,{
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
  .then(files=>{
    //console.log(files)
    dispatch({type:'GET_FILE_LIST',payload:files})
  }).catch(err=>console.log(err.message))
}
