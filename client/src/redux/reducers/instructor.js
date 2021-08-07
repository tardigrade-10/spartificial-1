export const instructor=(state={
  isLoading:true,
  joinrequest:null,
  submission:null,
},action)=>{
  switch(action.type){
    case 'INSTRUCTOR_LOADING':
      return {...state, isLoading: true};
    case 'GET_JOIN_REQUEST':
      return {...state, isLoading:false, joinrequest:action.payload}
    case 'GET_SUBMISSION_REQUEST':
      return {...state, isLoading:false, submission:action.payload}
    default:
      return state
  }
}
