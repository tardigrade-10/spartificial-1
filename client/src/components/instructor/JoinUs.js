import React, { useState } from 'react';
import {Form, Modal} from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL } from '../../config';

const JoinUs=({show,handleModal})=>{
  const [formData,setFormData]=useState({name:'',email:'',language:'',linkedin:'',topics:'',description:'',idea:'',experience:''})

  const [loading,setLoading]=useState({resume:false,submit:false,success:false})

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    let form = document.getElementById ('form');
    let formD = new FormData (form);

    //console.log(formD.getAll('uploadedFile'))
    //console.log(formData)
    setLoading({resume:true,submit:false,success:false})
    try{
      let response=await fetch(`${BASE_URL}/files/upload`,{
        method:'POST',
        body: formD
      })
      let result=await response.json();
      setLoading({resume:false,submit:true,success:false})
      formData.resume=result.filename
      //console.log(result)
      let response_submit=await fetch (`${BASE_URL}/instructor/join-request`,{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(!response_submit.ok){ throw new Error("Something went wrong! Please try again later.")}
      //result=await response_submit.json()
      setLoading({resume:false,submit:false,success:true})
      setFormData({name:'',email:'',language:'',linkedin:'',topics:'',description:'',idea:'',experience:''})
      setTimeout(()=>{handleModal(false)},3000)
    }catch(error){
      alert("Something went wrong! Please try again later.")
      console.log(error)
      setLoading({resume:false,submit:false,success:false})
    }
  }
  return(
    <div className="joinus">
      <Modal size="lg" centered show={show} onHide={()=>handleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Join Us</Modal.Title>
        </Modal.Header>
        {!loading.success?<Form onSubmit={handleSubmit} id="form" encType="multipart/form-data">
          <Modal.Body style={{maxHeight:'70vh',overflowY:'scroll'}}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control required value={formData.name} type="name" name="name" placeholder="Enter Name" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email id</Form.Label>
                <Form.Control required value={formData.email} type="email" name="email" placeholder="Enter Email id" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Preferred Languages(separated by semicolon)</Form.Label>
                <Form.Control required value={formData.language} type="text" name="language" placeholder="Enter Languages" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Linkedin Profile</Form.Label>
                <Form.Control required value={formData.linkedin} type="url" name="linkedin" placeholder="Enter Linkedin profile link" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Topics you think you are qualified to teach(separated by semicolon)</Form.Label>
                <Form.Control required value={formData.topics} type="text" name="topics" placeholder="Enter Topics name" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Briefly describe any previous ML project initiated by yourself</Form.Label>
                <Form.Control as="textarea" rows="4" required value={formData.description} name="description" placeholder="Enter text here." onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Submit your idea or problem statement you want to work on</Form.Label>
                <Form.Control as="textarea" rows="4" required value={formData.idea} name="idea" placeholder="Enter text here." onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Tell us about your previous teaching or mentorship experience(if any)</Form.Label>
                <Form.Control as="textarea" rows="4" value={formData.experience} name="experience" placeholder="Enter text here." onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group required controlId="formFileSm">
                <Form.Label>Resume/CV</Form.Label>
                <Form.Control accept=".pdf" name="uploadedFile" type="file" size="sm"/>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {!loading.resume&&!loading.submit?<>
              <button className="close" onClick={()=>handleModal(false)}>Cancel</button>
              <button className="btn btn-outline-primary" type="submit">Submit</button>
            </>:
            loading.resume?
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Uploading
            </button>
            :
            <button class="btn btn-primary" type="button" disabled>
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Submitting
            </button>
          
          }
          </Modal.Footer>
        </Form>:
        <div className="text-center p-5">
          Submission Successful!
        </div>}
      </Modal>
    </div>
  )
}
export default JoinUs