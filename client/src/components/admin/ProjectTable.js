import { Card, Modal } from "react-bootstrap"
import moment from 'moment'
import { useState } from "react"
import { Link } from "react-router-dom"
import NoRecords from "./NoRecords"
import { BASE_URL } from "../../config"

const ViewModal=({show,setShow,req})=>{
  //console.log(req)

  return(show?
    <Modal backdrop="static" size="xl" show={show} onHide={()=>setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h5"><strong>{req.projectName}</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height:'75vh',overflowY:'scroll'}}>
        <div className="user-details">
          <div className="text-center"><h5><strong>Submission Details</strong></h5></div>
          <div><p className="text-danger"><strong>Request Id: {req._id}</strong></p></div>
          <div><p><strong>Email: </strong>{req.email}</p></div>
          <div><p><strong>Status: </strong>{req.isResolved?"RESOLVED":"UNRESOLVED"}</p></div>
          <div><p><strong>Project Name: </strong>{req.projectName}</p></div>
          <div><p><strong>Problem Statement: </strong>{req.statement}</p></div>
          <div><p><strong>Project Objectives: </strong>{req.projectObjectives.split(";").map((val,idx)=>{return <span key={idx}>{val}.<br/></span>})}</p></div>
          <div><p><strong>Keywords: </strong>{req.keywords.split(";").map((val)=>{return val+", "})}</p></div>
          <div><p><strong>Duration: </strong>{req.duration} weeks</p></div>
          <div><p><strong>Start Date: </strong>{moment(req.startDate).format('Do MMMM YYYY')}</p></div>
          <div><p><strong>Need help: </strong>{req.help?"YES":"NO"}</p></div>
          <div><p><strong>Fees: </strong>₹{req.fees} per student</p></div>
          <div><p><strong>Documents: </strong><a href={`${BASE_URL}/files/${req.documents}`}>{req.documents}</a></p></div>
          <div className="text-center py-5">
            <button className="btn btn-sm btn-outline-danger"><strong>Approve</strong></button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-sm btn-outline-primary" onClick={()=>setShow(false)}>Okay</button>
      </Modal.Footer>
    </Modal>:null
  )
}

const ProjectTable=({tableCol,data})=>{
  const [view,setView]=useState(false)
  const [req,setReq]=useState(null)
  return(
    <Card className="table-responsive">
      <ViewModal show={view} setShow={setView} req={req}/>
      <table className="table table-hover table-sm table-striped table-bordered">
        <thead>
          <tr>
            {tableCol.map((val,idx)=>{
              return <th key={idx}>{val}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((req,idx)=>{
            return <tr key={idx} onClick={()=>{setView(true);setReq(req)}}>
              <th>{idx+1}</th>
              <td>{req.projectName}</td>
              <td>{req.email}</td>
              <td>{req.isResolved?"RESOLVED":"UNRESOLVED"}</td>
              <td>{moment(req.createdAt).format('MMMM Do YYYY')}</td>
            </tr>
          })}
        </tbody>
      </table>
    </Card>
  )
}

export default ProjectTable