export const email=(state={
  isLoading:false,
  enterOtp:false,
  signUpData:null
},action)=>{
  switch(action.type){
    case 'EMAIL_LOADING':
      return {...state, isLoading: true};
    case 'ENTER_OTP':
      return {...state, isLoading:false, enterOtp:true,signUpData:action.payload}
    default:
      return state
  }
}
