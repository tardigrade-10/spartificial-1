import { BASE_URL } from "../../config";

const url = BASE_URL+'/teams';

export const getTeams=()=>async(dispatch)=>{
  return fetch(url).then((response)=>{
    if(response.ok){
      return response;
    }else{
      var error=new Error('Error: '+response.status+': '+response.statusText);
      error.response=response;
      throw error;
    }
  },error=>{
    var errmess=new Error(error.message)
    throw errmess;
  })
  .then((response)=>{
    return response.json();
  })
  .then((teams)=>{
    //console.log(teams)
    dispatch({type:'GET_TEAMS',payload:teams})
  })
  .catch((error)=>console.log(error));
}