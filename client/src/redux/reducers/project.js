export const projects=(state={
  isLoading:true,
  errmess:null,
  message:null,
  projects:[],
  project:null,
},action)=>{
  switch(action.type){
    case 'PROJECT_LOADING':
      return {...state, isLoading:true}
    case 'PROJECT_FAILED':
      return {...state, isLoading:false,errmess:action.payload}
    case 'GET_PROJECTS':
      return {...state, isLoading:false, errmess:null, message:null, projects:action.payload, project:null}
    case 'CREATE_PROJECT':
      return {...state, project:action.payload}
    case 'EDIT_PROJECT':
      return {...state, project:action.payload}
    case 'DELETE_PROJECT':
      return {...state, message:action.payload}
    case 'EDIT_INSTRUCTOR':
      return {...state, project:action.payload}
    case 'DELETE_INSTRUCTOR':
      return {...state, message:action.payload}
    case 'ADD_INSTRUCTOR':
      return {...state, project:action.payload}
    default:
      return state;
  }
}