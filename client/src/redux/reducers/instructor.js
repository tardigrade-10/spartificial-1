export const instructor=(state={
  isLoading:true,
  joinrequestOrig:null,
  joinrequest:null,
  submissionOrig:null,
  submission:null,
},action)=>{
  switch(action.type){
    case 'INSTRUCTOR_LOADING':
      return {...state, isLoading: true};
    case 'GET_JOIN_REQUEST':
      return {...state, isLoading:false, joinrequestOrig:action.payload, joinrequest:action.payload}
    case 'GET_SUBMISSION_REQUEST':
      return {...state, isLoading:false, submissionOrig:action.payload, submission:action.payload}
    case 'FILTER_SUBMISSION_REQUEST':
      return {...state, isLoading:false, submission:action.payload}
    case 'FILTER_JOIN_REQUEST':
      return {...state, isLoading:false, joinrequest:action.payload}
    default:
      return state
  }
}
