export const teams=(teams=[],action)=>{
  switch (action.type) {
    case 'GET_TEAMS':
      return {...teams,teams:action.payload}  
    default:
      return teams;
  }
}
