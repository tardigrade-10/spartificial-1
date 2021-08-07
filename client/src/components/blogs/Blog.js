import React, { useState } from 'react'
import Toaster from '../loader/Toast'
import {Modal} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {setLoading,createComment, deleteBlog, editComment, deleteComment} from '../../redux/actions/blog'
import EditBlog from './EditBlog'
import moment from 'moment'
import Loading from '../loader/Loading'

const Blog=({match})=>{
  const dispatch=useDispatch()
  const [edit,setEdit]=useState(false);

  var userdetails=localStorage.getItem('userdetails');

  const users=useSelector((state)=>state.users)
  var current=null
  if(users.current) current=users.current
  //console.log(current)

  //console.log(match.params.blog_id)
  var parameters=match.params.blog_id.split("+")
  var id=parameters[1]
  //console.log(data.image)
  const [commentData,setCommentData]=useState({comment:'',rating:'4'})

  const errmess=useSelector(state=>state.blogs.errmess)
  const isLoading=useSelector(state=>state.blogs.isLoading)

  const blogs=useSelector(state=>state.blogs.blogs)
  const blog=blogs.filter((ablog)=>ablog._id===id)[0]
  //console.log(blog)
  const [editCommentData,setEditCommentData]=useState({comment:'',rating:''})

  const handleChange=(e)=>{
    setCommentData({...commentData,[e.target.name]:e.target.value})
  }
  const handleComment=(e)=>{
    e.preventDefault()
    //console.log(commentData, blog._id)
    dispatch(setLoading());
    dispatch(createComment(commentData,blog._id))
  }
  const openEditBlog=()=>{
    setEdit(true)
  }
  const onHide=()=>{
    setEdit(false)
  }
  const delBlog=()=>{
    //console.log('Deleting')
    if(window.confirm(`Are you sure to delete the blog, ${blog.title}?`)){
      dispatch(setLoading())
      dispatch(deleteBlog(blog._id))
    }
  }
  const [comment_id,setComment_id]=useState('')
  const [isOpenEditComment,setIsOpenEditComment]=useState(false)
  const openEditComment=(id,comment, rating)=>{
    setComment_id(id)
    setEditCommentData({comment:comment,rating:rating})
    setIsOpenEditComment(true);
  }
  const handleChangeEditComment=(e)=>{
    setEditCommentData({...editCommentData,[e.target.name]:e.target.value})
  }
  const editComm=()=>{
    dispatch(setLoading());
    dispatch(editComment(editCommentData,blog._id,comment_id))
    //console.log(editCommentData)
    setIsOpenEditComment(false)
  }
  const delComm=(comment_id)=>{
    if(window.confirm("Are you sure to delete this comment?")){
      dispatch(setLoading())
      dispatch(deleteComment(blog._id,comment_id))
    }
  }
  return(blog?
    <div className="body" id="blog">
      {errmess?<Toaster message={errmess.message}/>:<></>}
      <EditBlog show={edit} onHide={onHide} blog={blog}/>
      <div className="container">
      <div className="row">
          <div className="col-12">
            <h1>{blog.title}</h1>
            <div style={{textAlign:'right',padding:'2px 0px 8px 0px'}}>
              {!isLoading?(
                userdetails&&current?current.username===blog.username?<>
                <span onClick={openEditBlog} style={{textAlign:'right',cursor:'pointer', padding:'5px 7px', marginRight:'8px', borderRadius:'50%',boxShadow:'0 0 8px #c4c4c4'}} className="fa fa-pencil"></span>
                
                <span onClick={delBlog} style={{textAlign:'right',cursor:'pointer', padding:'5px 7px', borderRadius:'50%',boxShadow:'0 0 8px #c4c4c4'}} className="fa fa-trash"></span>
                </>:<></>:<></>
              ):(<Loading/>)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10 text-center offset-1">
            <img loading="lazy" className="img-fluid" src={blog.image} alt={`${blog.category}. Failed to load.`}/>
          </div>
        </div>
        <div className="row">
          <div className="col-10 text-center offset-1">
            <p>{blog.description}</p>
          </div>
        </div>
        <div className="text-left">
          <h4>Comments:</h4>
        </div>
        {userdetails?<div className="text-right" style={{textAlign:'left'}}>
          <form onSubmit={handleComment} className="create-blog-form">
            <input required type="text" name="comment" placeholder="Your comment" value={commentData.comment} onChange={handleChange}/>
            <label>Rating:</label>
            <select required placeholder="rating" name="rating" value={commentData.rating} onChange={handleChange}>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
            <div style={{textAlign:'right',padding:'8px',marginBottom:'18px',borderBottom:'1px solid green'}}>
              {isLoading?(<Loading/>):(<button type="submit" className="btn btn-sm btn-primary">Comment</button>)}
            </div>
          </form>
        </div>:<></>}
        {blog.comments.length>0?blog.comments.map(comment=>{
          //console.log(comment)
          return(
            <div className="row" id="comments" key={comment._id}>
              <div className="col-12">
                <h6>{comment.author}</h6>
                <p>{comment.comment}</p>
                <p>Rating: {comment.rating}</p>
              </div>

              {isOpenEditComment?<Modal backdrop="static" onHide={()=>setIsOpenEditComment(false)} show={isOpenEditComment}>
                <Modal.Header>Edit Comment</Modal.Header>
                <form onSubmit={editComm} className="create-blog-form">
                  <Modal.Body >
                    <input required type="text" name="comment" placeholder="Your comment" value={editCommentData.comment} onChange={handleChangeEditComment}/>
                    <label>Rating:</label>
                    <select required placeholder="rating" name="rating" value={editCommentData.rating} onChange={handleChangeEditComment}>
                      <option value="5">5</option>
                      <option value="4">4</option>
                      <option value="3">3</option>
                      <option value="2">2</option>
                      <option value="1">1</option>
                    </select>
                  </Modal.Body>
                  <Modal.Footer>
                    {!isLoading?(<><button type="button" onClick={()=>setIsOpenEditComment(false)} className="btn btn-sm btn-success">Cancel</button>
                    <button type="submit" className="btn btn-sm btn-primary">Save</button></>):(<Loading/>)}
                  </Modal.Footer>
                </form>
              </Modal>:
              !isLoading?(
                userdetails&&current?current.username===comment.username?
              <div style={{textAlign:'right',padding:'2px 0px 8px 0px'}}>
                <span style={{textAlign:'right',cursor:'pointer', padding:'5px 7px', borderRadius:'50%',boxShadow:'0 0 8px #c4c4c4'}}className="fa fa-pencil" onClick={()=>openEditComment(comment._id,comment.comment,comment.rating)}></span>
                <span style={{textAlign:'right',cursor:'pointer', padding:'5px 7px', borderRadius:'50%',boxShadow:'0 0 8px #c4c4c4'}}className="fa fa-trash" onClick={()=>delComm(comment._id)}></span>
              </div>:<></>:<></>
              ):(<Loading/>)}
            </div>
          )
        }):<></>}

        <div className="row justify-content-center" id="author">
          <div className="col-12">
          <div className="card mb-3" key={blog._id}>
								<div className="row g-0">
									<div className="col-md-4 text-center align-self-center">
										<img loading="lazy" width="auto" className="img-fluid" src={blog.profilePic} alt="..."/>
									</div>
									<div className="col-md-8 align-self-center">
										<div className="card-body">
											<h5 className="card-title">{blog.author}</h5>
											<p className="card-text"><small className="text-muted">{blog.about}</small></p>
                      <small className="text-danger">{moment(blog.createdAt).fromNow()}</small>
										</div>
									</div>
								</div>
							</div>
          </div>
        </div>
      </div>
    </div>:<div className="body" id="blog">
      <h3 className="text-center">Please Wait...</h3>
      <Loading/>
    </div>
  )
}
export default Blog