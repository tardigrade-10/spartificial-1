import * as emailjs from 'emailjs-com'
import { SERVICE_ID, TEMPLATE_OTP, USER_ID } from '../../config'
import { setLoading, userRegister } from './user'
export const sendEmailOTP=(emailData)=>async(dispatch)=>{
  dispatch({type:'EMAIL_LOADING'})
  const templateParams={
    subject:"Verification Code - Spartificial",
    data:emailData,
    to_email:emailData.email
  }
  emailjs.send(SERVICE_ID,TEMPLATE_OTP,templateParams,USER_ID).then(result=>{
    dispatch({type:'ENTER_OTP',payload:emailData})
  })
}
export const verifyOtp=(otp,emailData)=>async(dispatch)=>{
  //console.log(emailData,otp)
  if(otp===String(emailData.signUpData.otp)){
    console.log('Verified')
    dispatch(setLoading())
    dispatch(userRegister(emailData.signUpData))
  }
  else{
    alert("Not Verified!\nPlease enter correct OTP.\n\nThank You!")
  }
}