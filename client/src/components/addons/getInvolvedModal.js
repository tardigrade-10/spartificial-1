import React, {useState} from 'react'
import {Modal} from 'react-bootstrap'
import {useDispatch} from 'react-redux'
import { postInvolve } from '../../redux/actions/involved'
import './addOns.css'
const InvolvedModal=({show,onHide,appType,title})=>{
  const dispatch=useDispatch()
  const [formData,setFormData]=useState({organisation:'',name:'',email:'',phone:'',type:'',proposal:''})

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const hideAddOn=()=>{
    setFormData({name:'',email:'',phone:'',type:'',proposal:''})
    onHide()
  }
  const submitForm=async(e)=>{
    e.preventDefault()
    formData.type=appType
    console.log(formData)
    await dispatch(postInvolve(formData))
    hideAddOn()
    
  }
  //console.log(appType)
  return(
    <Modal show={show} backdrop="static" centered onHide={onHide}>
      <Modal.Header style={{backgroundColor:'#0a0e2adf',color:'aliceblue'}}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <form onSubmit={submitForm}>
        <Modal.Body>
          <div className="addons">
            {appType==="Partnership"?
            <input required type="name" name="organisation" placeholder="Organisation Name" value={formData.organisation} onChange={handleChange}/>:null}

            <input required type="name" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}/>

            <input required type="email" name="email" placeholder="Your Email Id" value={formData.email} onChange={handleChange}/>

            <input required minLength="10" maxLength="10" type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange}/>
            
            <textarea rows="5" required type="text" name="proposal" placeholder="Your Proposal" value={formData.proposal} onChange={handleChange}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={()=>hideAddOn()}type="button">Cancel</button>
          <button className="btn btn-primary" type="submit">Submit</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default InvolvedModal