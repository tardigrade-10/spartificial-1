import firebase from "firebase";

//export const BASE_URL='http://localhost:3000/api';
export const BASE_URL='https://spartificial.herokuapp.com/api';
export const RZP_KEY="rzp_test_038x6mXw4YTv6g";
export const RZP_SEC="";
export const REF_BASE_URL='https://spartificial.herokuapp.com'
//export const REF_BASE_URL='http://localhost:3001'

export const SERVICE_ID="service_7wt9n6u"
export const TEMPLATE_OTP="template_ti1grog"
export const USER_ID="user_Hk40V6MAtnhv5GSO1Xuh4"

const firebaseConfig = {
  apiKey: "AIzaSyAIRh0oRyYIsIYaPIPSycU9RhdDtgKSfak",
  authDomain: "sp-artificial.firebaseapp.com",
  projectId: "sp-artificial",
  storageBucket: "sp-artificial.appspot.com",
  messagingSenderId: "116185746555",
  appId: "1:116185746555:web:9f2735ff7923fe7de826de",
  measurementId: "G-8MJMLFFZ5N"
};

export default firebase.initializeApp(firebaseConfig)