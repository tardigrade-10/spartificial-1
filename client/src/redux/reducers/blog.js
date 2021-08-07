export const blogs=(state={
  isLoading:true,
  errmess:null,
  message:null,
  blogs:[],
  blog:null,
},action)=>{
  switch(action.type){
    case 'LOADING':
      return {...state, isLoading:true}
    case 'BLOG_FAILED':
      return {...state, isLoading:false,errmess:action.payload}
    case 'GET_BLOGS':
      return {...state, isLoading:false, errmess:null, message:null, blogs:action.payload, blog:null}
    case 'CREATE_BLOG':
      return {...state, blog:action.payload}
    case 'EDIT_BLOG':
      return {...state, blog:action.payload}
    case 'DELETE_BLOG':
      return {...state, message:action.payload}
    case 'EDIT_COMMENT':
      return {...state, blog:action.payload}
    case 'DELETE_COMMENT':
      return {...state, message:action.payload}
    default:
      return state;
  }
}