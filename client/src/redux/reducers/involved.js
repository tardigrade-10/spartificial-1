export const involved=(state={
  isLoading:true,
  involvedOrig:null,
  involved:null
},action)=>{
  switch (action.type) {
    case 'GET_INVOLVED':
      return {...state,involvedOrig:action.payload,involved:action.payload}  
    case 'POST_INVOLVED':
      return {...state,involvedOrig:action.payload} 
    case 'FILTER_INVOLVED':
      return {...state,involved:action.payload}     
    default:
      return state;
  }
}
