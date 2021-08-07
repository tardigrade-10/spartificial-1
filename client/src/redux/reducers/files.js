export const files=(state={
  isLoading:true,
  fileList:null,
},action)=>{
  switch(action.type){
    case 'FILE_LOADING':
      return {...state, isLoading: true};
    case 'GET_FILE_LIST':
      return {...state, isLoading:false, fileList:action.payload}
    default:
      return state
  }
}
