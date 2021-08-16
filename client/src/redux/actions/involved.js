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

export const filterInvolved=(searchText,data)=>async(dispatch)=>{
  let temp1=data.filter(inv=>inv.name.toLowerCase().search(String(searchText.toLowerCase()))!==-1);

  let temp2=data.filter(inv=>inv.email.toLowerCase().search(String(searchText.toLowerCase()))!==-1);

  let temp3=data.filter(inv=>inv.type.toLowerCase().search(String(searchText.toLowerCase()))!==-1);

  const involvedMap=new Map();
  temp1.forEach(inv=>involvedMap.set(inv._id,inv));
  temp2.forEach(inv=>{
    const exists=involvedMap.has(inv._id);
    if(!exists){
      involvedMap.set(inv._id,inv)
    }
  })
  temp3.forEach(inv=>{
    const exists=involvedMap.has(inv._id)
    if(!exists){
      involvedMap.set(inv._id,inv)
    }
  })
  var filteredData=[];
  involvedMap.forEach(inv=>filteredData.push(inv));

  dispatch({type:"FILTER_INVOLVED",payload:[
    ...filteredData
  ]})
}