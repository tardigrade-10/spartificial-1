import React, { useState } from 'react';
import {Form, Modal} from 'react-bootstrap'
import axios from 'axios'
import { BASE_URL } from '../../config';

const SubmitProject=({show,handleModal})=>{
  const [formData,setFormData]=useState({email:'',statement:'',projectName:'',projectObjectives:'',keywords:'',duration:0,startDate:'',help:false,fees:0,documents:''})

  const [loading,setLoading]=useState({documents:false,submit:false,success:false})

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    let form = document.getElementById ('form');
    let formD = new FormData (form);

    //console.log(formD.getAll('uploadedFile'))
    //console.log(formData)
    setLoading({documents:true,submit:false,success:false})
    try{
      let response=await fetch(`${BASE_URL}/files/upload`,{
        method:'POST',
        body: formD
      })
      let result=await response.json();
      setLoading({documents:false,submit:true,success:false})
      formData.documents=result.filename
      //console.log(formData)
      let response_submit=await fetch (`${BASE_URL}/instructor/submit-project`,{
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(!response_submit.ok){ throw new Error("Something went wrong! Please try again later.")}
      //result=await response_submit.json()
      setLoading({documents:false,submit:false,success:true})
      setFormData({email:'',statement:'',projectName:'',projectObjectives:'',keywords:'',duration:0,startDate:'',help:false,fees:0,documents:''})
      setTimeout(()=>{handleModal(false)},3000)
    }catch(error){
      alert("Something went wrong! Please try again later.")
      console.log(error)
      setLoading({documents:false,submit:false,success:false})
    }
  }
  return(
    <div className="joinus">
      <Modal size="lg" centered show={show} onHide={()=>handleModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a Project</Modal.Title>
        </Modal.Header>
        {!loading.success?<Form onSubmit={handleSubmit} id="form" encType="multipart/form-data">
          <Modal.Body style={{maxHeight:'70vh',overflowY:'scroll'}}>
              <Form.Group>
                <Form.Label>Email id</Form.Label>
                <Form.Control required value={formData.email} type="email" name="email" placeholder="Enter Email id" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Project Name</Form.Label>
                <Form.Control required value={formData.projectName} type="text" name="projectName" placeholder="Project Name" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Problem Statement</Form.Label>
                <Form.Control as="textarea" rows="4" value={formData.statement} name="statement" placeholder="Enter text here." onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Project Objectives(separated by semicolons)</Form.Label>
                <Form.Control as="textarea" rows="4" value={formData.projectObjectives} name="projectObjectives" placeholder="Enter text here." onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Keywords(separated by semicolons)</Form.Label>
                <Form.Control required value={formData.keywords} type="text" name="keywords" placeholder="Enter keywords" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Duration(in weeks)</Form.Label>
                <Form.Control required value={formData.duration} type="number" name="duration" placeholder="Enter duration(in weeks)" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Earliest possible date you can start if approved</Form.Label>
                <Form.Control type="date" required value={formData.startDate} name="startDate" placeholder="dd/mm/yyyy" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Do you need any help from Spartificial in finalizing the project</Form.Label>
                <Form.Check type="checkbox" label="Yes" onClick={(e)=>{setFormData({...formData,help:e.target.checked})}}/>
              </Form.Group>
              <Form.Group>
                <Form.Label>Fees per student for the whole project</Form.Label>
                <Form.Control type="number" required value={formData.fees} name="fees" placeholder="Enter fees" onChange={handleChange}></Form.Control>
              </Form.Group>
              <Form.Group required controlId="formFileSm">
                <Form.Label>Upload project file(as single pdf file only)</Form.Label>
                <Form.Control accept=".pdf" name="uploadedFile" type="file" size="sm"/>
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {!loading.documents&&!loading.submit?<>
              <button className="close" onClick={()=>handleModal(false)}>Cancel</button>
              <button className="btn btn-outline-primary" type="submit">Submit</button>
            </>:
            loading.documents?
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
export default SubmitProject