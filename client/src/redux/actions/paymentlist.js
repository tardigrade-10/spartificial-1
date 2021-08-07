import {BASE_URL} from '../../config'
const url=`${BASE_URL}/payments/all`;

var userdetails=localStorage.getItem('userdetails');
const bearer=`Bearer ${userdetails}`

const paymentLoading=()=>async(dispatch)=>{
  dispatch({type:'PAYMENT_LOADING'})
}

export const getPayments=()=>async(dispatch)=>{
  dispatch(paymentLoading())
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
  .then(payments=>{
    //console.log(payments)
    dispatch({type:'GET_PAYMENT_LIST',payload:payments})
  }).catch(err=>console.log(err.message))
}
