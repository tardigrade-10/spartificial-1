export const involved=(involved=[],action)=>{
  switch (action.type) {
    case 'GET_INVOLVED':
      return {...involved,involved:action.payload}  
    case 'POST_INVOLVED':
      return {...involved,involved:action.payload}  
      default:
      return involved;
  }
}
