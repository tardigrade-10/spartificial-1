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
        <Modal.Title as="h5"><strong>{req.name}</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height:'75vh',overflowY:'scroll'}}>
        <div className="user-details">
          <div className="text-center"><h5><strong>{req.type}</strong></h5></div>
          <div><p className="text-danger"><strong>Request Id: {req._id}</strong></p></div>
          <div><p><strong>Email: </strong>{req.email}</p></div>
          <div><p><strong>Phone: </strong>{req.phone}</p></div>
          <div><p><strong>Status: </strong>{req.isResolved?"RESOLVED":"UNRESOLVED"}</p></div>
          {req.organisation?<div><p><strong>Organisation: </strong>{req.organisation}</p></div>:null}
          <div><p><strong>Proposal: </strong>{req.proposal}</p></div>
          <div className="text-center py-5">
            <button className="btn btn-sm btn-outline-danger"><strong>Accept</strong></button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-sm btn-outline-primary" onClick={()=>setShow(false)}>Okay</button>
      </Modal.Footer>
    </Modal>:null
  )
}

const GetInvolvedTable=({tableCol,data})=>{
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
              <td>{req.name}</td>
              <td>{req.email}</td>
              <td>{req.type}</td>
              <td>{moment(req.createdAt).format('MMMM Do YYYY')}</td>
              <td>{req.isResolved?"RESOLVED":"UNRESOLVED"}</td>
            </tr>
          })}
        </tbody>
      </table>
    </Card>
  )
}

export default GetInvolvedTable