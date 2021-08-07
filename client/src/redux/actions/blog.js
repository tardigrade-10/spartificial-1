import { BASE_URL } from "../../config";

const url=BASE_URL+'/blogs';

export const setLoading=()=>async(dispatch)=>{
  dispatch({type:'LOADING'})
}

export const getBlogs=()=>async(dispatch)=>{
  return fetch(url).then(response=>{
    if(response.ok) return response
    else{
      var error=""
      response.json(err=>{
        error=new Error(err.messsage)
        dispatch({type:'BLOG_FAILED',payload:error})
      },err=>{throw err})
      .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
    }
  })
  .then(response=>{
    return response.json()
  }).then(blogs=>{
    //console.log(blogs)
    dispatch({type:'GET_BLOGS',payload:blogs})
  },err=>{throw err})
  .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
}

export const createBlog=(blogData)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`

    return fetch(url,{
      method:"POST",
      body:JSON.stringify(blogData),
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
          dispatch({type:'BLOG_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(blog=>{
      //console.log(blog)
      dispatch({type:'CREATE_BLOG',payload:blog})
      dispatch(getBlogs());
    },err=>{throw err})
    .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'BLOG_FAILED',payload:error})
  }
}

export const editBlog=(blogData,blog_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`

    return fetch(`${url}/${blog_id}`,{
      method:"PUT",
      body:JSON.stringify(blogData),
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
          dispatch({type:'BLOG_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(blog=>{
      //console.log(blog)
      dispatch({type:'EDIT_BLOG',payload:blog})
      dispatch(getBlogs());
    },err=>{throw err})
    .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'BLOG_FAILED',payload:error})
  }
}

export const deleteBlog=(blog_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`

    return fetch(`${url}/${blog_id}`,{
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
          dispatch({type:'BLOG_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(message=>{
      //console.log(blog)
      dispatch({type:'DELETE_BLOG',payload:message})
      dispatch(getBlogs());
      window.location.href="/blogs"
    },err=>{throw err})
    .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'BLOG_FAILED',payload:error})
  }
}

export const createComment=(commentData,blog_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`

    return fetch(`${url}/${blog_id}/comments`,{
      method:"POST",
      body:JSON.stringify(commentData),
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
          dispatch({type:'BLOG_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(blog=>{
      //console.log(blog)
      dispatch({type:'CREATE_BLOG',payload:blog})
      dispatch(getBlogs());
    },err=>{throw err})
    .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'BLOG_FAILED',payload:error})
  }
}

export const editComment=(commentData, blog_id, comment_id)=>async(dispatch)=>{
  //console.log(comment_id)
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`

    return fetch(`${url}/${blog_id}/comments/${comment_id}`,{
      method:"PUT",
      body:JSON.stringify(commentData),
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
          dispatch({type:'BLOG_FAILED',payload:error})
        },err=>{throw err})
        .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(blog=>{
      //console.log(blog)
      dispatch({type:'EDIT_COMMENT',payload:blog})
      dispatch(getBlogs());
    },err=>{throw err})
    .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'BLOG_FAILED',payload:error})
  }
}

export const deleteComment=(blog_id, comment_id)=>async(dispatch)=>{
  var userdetails=localStorage.getItem('userdetails');
  //console.log(userdetails)
  
  if(userdetails){
    const bearer=`Bearer ${userdetails}`

    return fetch(`${url}/${blog_id}/comments/${comment_id}`,{
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
          dispatch({type:'BLOG_FAILED',payload:error})
        },error=>{throw error})
        .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
      }
    })
    .then(response=>{
      return response.json()
    })
    .then(message=>{
      //console.log(blog)
      dispatch({type:'DELETE_COMMENT',payload:message})
      dispatch(getBlogs());
    },error=>{throw error})
    .catch(error=>dispatch({type:'BLOG_FAILED',payload:error}))
  }else{
    var error=new Error('Login/Signup to proceed!');
    //error.response=response;
    dispatch({type:'BLOG_FAILED',payload:error})
  }
}