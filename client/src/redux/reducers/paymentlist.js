export const payment=(state={
  isLoading:true,
  paymentData:null,
},action)=>{
  switch(action.type){
    case 'PAYMENT_LOADING':
      return {...state, isLoading: true};
    case 'GET_PAYMENT_LIST':
      return {...state, isLoading:false, paymentData:action.payload}
    default:
      return state
  }
}
