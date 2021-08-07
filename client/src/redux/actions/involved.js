import { BASE_URL } from "../../config";

const url=BASE_URL+'/involved';


export const getInvolve=()=>async(dispatch)=>{
  return fetch(url).then(response=>{
    if(response.ok) return response
    else{
      var error=new Error("Error "+response.status+": "+response.statusText)
      throw error
    }
  })
  .then(response=>{
    return response.json()
  }).then(involved=>{
    //console.log(involved)
    dispatch({type:'GET_INVOLVED',payload:involved})
  },err=>{throw err})
  .catch(error=>console.log(error))
}

export const postInvolve=(formData)=>async(dispatch)=>{
    return fetch(url,{
      method:"POST",
      body:JSON.stringify(formData),
      headers:{
        'Content-Type':'application/json'
      },
      credentials:'same-origin'
    })
    .then(response=>{
      if(response.ok) return response
      else{
        var error=new Error("Error "+response.status+": "+response.statusText)
        throw error
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(involved=>{
      //console.log(involved)
      alert("Posted Successfully")
      dispatch({type:'POST_INVOLVED',payload:involved})
    },err=>{throw err})
    .catch(error=>alert(error))
}

