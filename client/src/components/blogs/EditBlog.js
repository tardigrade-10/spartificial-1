import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import FileBase from 'react-file-base64';
import Loader from '../loader/Loading'

import {setLoading, editBlog} from '../../redux/actions/blog'

const EditBlog=({show,onHide,blog})=> {
  const dispatch=useDispatch()

  const [blogData,setBlogData]=useState({category:blog.category,title:blog.title,description:blog.description,image:blog.image})

  const isLoading=useSelector(state=>state.blogs.isLoading)

  const handleChange=(e)=>{
    setBlogData({...blogData,[e.target.name]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
      dispatch(setLoading())
      //console.log(blogData)
      dispatch(editBlog(blogData,blog._id))
      onHide()
  }
  return (
    <Modal backdrop="static"
      show={show} onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Blog
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit} className="create-blog-form">
        <Modal.Body>
          <label htmlFor="category">Select Category</label>
          <select id="category" required name="category" value={blogData.category} onChange={handleChange}>
            <option value="AI">Artificial Intelligence</option>
            <option value="Robotics">Robotics</option>
            <option value="Programming">Programming</option>
            <option value="Exploration">Exploration Series</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="title">Title</label>
          <input type="text" required id="title" name="title" value={blogData.title} onChange={handleChange} placeholder="Title of Blog"/>

          <label htmlFor="description">Description</label>
          <textarea name="description" id="description" required rows="4" value={blogData.description} placeholder="Type some description" onChange={handleChange}></textarea>
          <label>Image</label>
          <FileBase required accept="image/png, image/jpg, image/jpeg" type="file" multiple={false} onDone={({ base64 }) => setBlogData({ ...blogData, image: base64 })} />           
        </Modal.Body>
        <Modal.Footer>
          {isLoading?<Loader/>:
          <>
            <Button type="button" onClick={onHide}>Close</Button>
            <Button type="submit">Submit</Button>
          </>}
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default EditBlog;
