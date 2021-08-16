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

export const filterPayment=(searchText,data)=>async(dispatch)=>{
  let temp1=data.filter(pay=>pay.paymentId.search(String(searchText))!==-1);

  let temp2=data.filter(pay=>pay.orderId.search(String(searchText))!==-1);

  let temp3=data.filter(pay=>pay.projectId.search(String(searchText))!==-1);

  const payMap=new Map();
  temp1.forEach(pay=>payMap.set(pay._id,pay));
  temp2.forEach(pay=>{
    const exists=payMap.has(pay._id);
    if(!exists){
      payMap.set(pay._id,pay)
    }
  })
  temp3.forEach(pay=>{
    const exists=payMap.has(pay._id)
    if(!exists){
      payMap.set(pay._id,pay)
    }
  })
  var filteredData=[];
  payMap.forEach(pay=>filteredData.push(pay));

  dispatch({type:"FILTER_PAYMENT_LIST",payload:[
    ...filteredData
  ]})
}