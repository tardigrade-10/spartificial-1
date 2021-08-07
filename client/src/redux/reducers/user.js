export const users=(state={
  isLoading:true,
  users:null,
  errmess:null,
  success:null,
  current:null,
  message:null
},action)=>{
  switch(action.type){
    case 'ANY_ERROR':
      return {...state, isLoading: false, errmess: action.payload};
    case 'USER_LOADING':
      return {...state, isLoading: true, errmess: null};
    case 'GET_USER':
      return {...state, isLoading:false,errmess:null,current:action.payload}
    case 'GET_USER_LIST':
      return {...state, isLoading:false,errmess:null,users:action.payload}
      case 'SIGNUP':
      return {...state, isLoading:false,errmess:null,success:action.payload}
    case 'LOGIN':
      return {...state, isLoading:false,errmess:null,success:action.payload}

    case 'LOGOUT':
      return {...state, isLoading:false,errmess:null,current:null}
    case 'CHANGE_PASSWORD':
      return {...state, isLoading: false, errmess: null, message: action.payload};
    default:
      return state
  }
}
