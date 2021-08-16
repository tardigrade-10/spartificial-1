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

export const filterJoining=(searchText,data)=>async(dispatch)=>{
  let temp1=data.filter(join=>join.name.toLowerCase().search(String(searchText.toLowerCase()))!==-1);

  let temp2=data.filter(join=>join.email.toLowerCase().search(String(searchText.toLowerCase()))!==-1);

  const instructorMap=new Map();
  temp1.forEach(join=>instructorMap.set(join._id,join));
  temp2.forEach(join=>{
    const exists=instructorMap.has(join._id);
    if(!exists){
      instructorMap.set(join._id,join)
    }
  })
  var filteredData=[];
  instructorMap.forEach(join=>filteredData.push(join));

  dispatch({type:"FILTER_JOIN_REQUEST",payload:[
    ...filteredData,
  ]})
}

export const filterSubmission=(searchText,data)=>async(dispatch)=>{
  let temp1=data.filter(submission=>submission.projectName.toLowerCase().search(String(searchText.toLowerCase()))!==-1);

  let temp2=data.filter(submission=>submission.email.toLowerCase().search(String(searchText.toLowerCase()))!==-1);

  const instructorMap=new Map();
  temp1.forEach(submission=>instructorMap.set(submission._id,submission));
  temp2.forEach(submission=>{
    const exists=instructorMap.has(submission._id);
    if(!exists){
      instructorMap.set(submission._id,submission)
    }
  })
  var filteredData=[];
  instructorMap.forEach(submission=>filteredData.push(submission));

  console.log(filteredData)
  dispatch({type:"FILTER_SUBMISSION_REQUEST",payload:[
    ...filteredData
  ]})
}