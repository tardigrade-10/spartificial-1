import { BASE_URL } from "../../config";

const url=BASE_URL+'/projects';

export const setLoading=()=>async(dispatch)=>{
  dispatch({type:'PROJECT_LOADING'})
}

export const getProjects=()=>async(dispatch)=>{
  return fetch(url).then(response=>{
    if(response.ok) return response
    else{
      var error=""
      response.json(err=>{
        error=new Error(err.messsage)
        dispatch({type:'PROJECT_FAILED',payload:error})
      },err=>{throw err})
      .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
    }
  })
  .then(response=>{
    return response.json()
  }).then(projects=>{
    //console.log(projects)
    dispatch({type:'GET_PROJECTS',payload:projects})
  },err=>{throw err})
  .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
}

export const createProject=(projectData)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  userdetails=JSON.parse(userdetails);
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails.token}`

    return fetch(url,{
      method:"POST",
      body:JSON.stringify(projectData),
      headers:{
        'Authorization':bearer,
        'Content-Type':'application/json'
      },
      credentials:'same-origin'
    })
    .then(response=>{
      if(response.ok) return response
      else{
        var error=""
        response.json(err=>{
          error=new Error(err.messsage)
          dispatch({type:'PROJECT_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(project=>{
      //console.log(project)
      dispatch({type:'CREATE_PROJECT',payload:project})
      dispatch(getProjects());
    },err=>{throw err})
    .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'PROJECT_FAILED',payload:error})
  }
}

export const editProject=(projectData,project_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  userdetails=JSON.parse(userdetails);
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails.token}`

    return fetch(`${url}/${project_id}`,{
      method:"PUT",
      body:JSON.stringify(projectData),
      headers:{
        'Authorization':bearer,
        'Content-Type':'application/json'
      },
      credentials:'same-origin'
    })
    .then(response=>{
      //console.log(response)
      if(response.ok) return response
      else{
        var error=""
        response.json(err=>{
          error=new Error(err.messsage)
          dispatch({type:'PROJECT_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(project=>{
      //console.log(project)
      dispatch({type:'EDIT_PROJECT',payload:project})
      dispatch(getProjects());
    },err=>{throw err})
    .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'PROJECT_FAILED',payload:error})
  }
}

export const deleteProject=(project_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  userdetails=JSON.parse(userdetails);
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails.token}`

    return fetch(`${url}/${project_id}`,{
      method:"DELETE",
      headers:{
        'Authorization':bearer,
        'Content-Type':'application/json'
      },
      credentials:'same-origin'
    })
    .then(response=>{
      //console.log(response)
      if(response.ok) return response
      else{
        var error=""
        response.json(err=>{
          error=new Error(err.messsage)
          dispatch({type:'PROJECT_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(message=>{
      //console.log(message)
      dispatch({type:'DELETE_PROJECT',payload:message})
      dispatch(getProjects());
      window.location.href="/projects"
    },err=>{throw err})
    .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'PROJECT_FAILED',payload:error})
  }
}

export const createInstructor=(instructorData,project_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  userdetails=JSON.parse(userdetails);
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails.token}`

    return fetch(`${url}/${project_id}/instructors`,{
      method:"POST",
      body:JSON.stringify(instructorData),
      headers:{
        'Authorization':bearer,
        'Content-Type':'application/json'
      },
      credentials:'same-origin'
    })
    .then(response=>{
      //console.log(response)
      if(response.ok) return response
      else{
        var error=""
        response.json(err=>{
          error=new Error(err.messsage)
          dispatch({type:'PROJECT_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(project=>{
      //console.log(project)
      dispatch({type:'CREATE_PROJECT',payload:project})
      dispatch(getProjects());
    },err=>{throw err})
    .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'PROJECT_FAILED',payload:error})
  }
}

export const editInstructor=(instructorData, project_id, instructor_id)=>async(dispatch)=>{
  //console.log(comment_id)
  var userdetails=localStorage.getItem('userdetails');
  userdetails=JSON.parse(userdetails);
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails.token}`

    return fetch(`${url}/${project_id}/comments/${instructor_id}`,{
      method:"PUT",
      body:JSON.stringify(instructorData),
      headers:{
        'Authorization':bearer,
        'Content-Type':'application/json'
      },
      credentials:'same-origin'
    })
    .then(response=>{
      //console.log(response)
      if(response.ok) return response
      else{
        var error=""
        response.json(err=>{
          error=new Error(err.messsage)
          dispatch({type:'PROJECT_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(project=>{
      //console.log(project)
      dispatch({type:'EDIT_INSTRUCTOR',payload:project})
      dispatch(getProjects());
    },err=>{throw err})
    .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'PROJECT_FAILED',payload:error})
  }
}

export const deleteInstructor=(project_id, instructor_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  userdetails=JSON.parse(userdetails);
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails.token}`

    return fetch(`${url}/${project_id}/comments/${instructor_id}`,{
      method:"DELETE",
      headers:{
        'Authorization':bearer,
        'Content-Type':'application/json'
      },
      credentials:'same-origin'
    })
    .then(response=>{
      //console.log(response)
      if(response.ok) return response
      else{
        var error=""
        response.json(err=>{
          error=new Error(err.messsage)
          dispatch({type:'PROJECT_FAILED',payload:error})
        },error=>{throw error})
        .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(message=>{
      //console.log(blog)
      dispatch({type:'DELETE_INSTRUCTOR',payload:message})
      dispatch(getProjects());
    },error=>{throw error})
    .catch(error=>dispatch({type:'PROJECT_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'PROJECT_FAILED',payload:error})
  }
}