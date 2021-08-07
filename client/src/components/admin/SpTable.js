import { Card, Modal } from "react-bootstrap"
import moment from 'moment'
import { useState } from "react"
import { Link } from "react-router-dom"
import NoRecords from "./NoRecords"

const ViewModal=({show,setShow,user})=>{
  //console.log(user)
  var refStu=user?user.referalStudent[0]?user.referalStudent[0].split("us="):[]:[]
  var refIns=user?user.referalInstructor[0]?user.referalInstructor[0].split("us="):[]:[]
  //console.log(refStu)
  return(show?
    <Modal backdrop="static" size="xl" show={show} onHide={()=>setShow(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h5"><strong>{user.personal.firstname} {user.personal.lastname}</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body style={{height:'75vh',overflowY:'scroll'}}>
        <div className="text-center p-4">
          <img className="img-fluid" width="220px" src={user.personal.img} alt="..."/>
        </div>
        <div className="user-details">
          <div className="text-center"><h5><strong>Personal</strong></h5></div>
          <div><p className="text-danger"><strong>UID: {user._id}</strong></p></div>
          <div><p><strong>Email: </strong>{user.personal.email}</p></div>
          <div><p><strong>Phone: </strong>{user.personal.phone}</p></div>
          <div><p><strong>Gender: </strong>{user.personal.gender}</p></div>
          <div><p><strong>Education: </strong>{user.personal.education}</p></div>
          <div><p><strong>Address: </strong>{user.personal.address}</p></div>
          <div><p><strong>Date of Birth: </strong>{user.personal.dob}</p></div>
          <div><p><strong>About: </strong>{user.personal.about}</p></div>
        </div>
        <div className="user-projects">
          <div className="text-center"><h5><strong>Projects</strong></h5></div>
          {user.projects.length>0?user.projects.map((project,idx)=>{
            return(
              <div className="container-fluid pb-4" key={idx}>
                <div className="row user-project-inner">
                  <div className="col-3 text-center  align-self-center">
                    <img className="img-fluid" alt="..." src={project.image}/>
                  </div>
                  <div className="col-9 align-self-center">
                    <h6>{project.title}</h6>
                    <small>Approved on: {moment(project.createdAt).format('MMMM Do YYYY, h:mm a')}</small><br/>
                    <Link to={`/projects/us=${btoa(project.project_id)}`}><small className="text-primary">See more</small></Link>
                  </div>
                </div>
              </div>
            )
          }):<NoRecords/>}
        </div>
        <div className="user-payments table-responsive">
          <div className="text-center"><h5><strong>Payments</strong></h5></div>
            {user.payments.length>0?<table className="table table-bordered table-hover table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project ID</th>
                  <th>Project Title</th>
                  <th>Referrer ID</th>
                  <th>Discount</th>
                  <th>Referrer Type</th>
                  <th>Payment ID</th>
                  <th>Txn Date</th>
                </tr>
              </thead>
              <tbody>
                {user.payments.map((pay,idx)=>{
                  const link=pay.link.split("us=")
                  console.log(link)
                  return(
                    <tr key={idx}>
                      <th>{idx+1}</th>
                      <td>{pay.project_id}</td>
                      <td>{pay.title}</td>
                      <td>{link[2]?atob(link[2]):"N/A"}</td>
                      <td>{link[3]?atob(link[3]):"N/A"}</td>
                      <td>{link[2]?link[1]!==""?"Instructor":"Open":"N/A"}</td>
                      <td>{pay.payment_id}</td>
                      <td>{moment(pay.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>:<NoRecords/>}
        </div>
        <div className="user-referrals">
          <div className="text-center"><h5><strong>Referrals</strong></h5></div>
          <h6><strong>As Student:</strong></h6>
          {user.referalStudent.length>0?
          <div className="table-responsive mx-3 my-2">
            <small><strong>Discount: </strong>{atob(refStu[3])}%</small><br/>
            <small><strong>Link: </strong><span className="text-primary">{user.referalStudent[0]}</span></small>
          </div>
          :<NoRecords/>}

          <h6><strong>As Instructor:</strong></h6>
          {user.referalInstructor.length>0?
          <div className="table-responsive mx-3 my-2">
            <small><strong>Discount: </strong>{atob(refIns[3])}%</small><br/>
            <small><strong>Project Id: </strong>{atob(refIns[1])}</small><br/>
            <small><strong>Link: </strong><span className="text-primary">{user.referalInstructor[0]}</span></small>
          </div>
          :<NoRecords/>}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-sm btn-outline-primary" onClick={()=>setShow(false)}>Okay</button>
      </Modal.Footer>
    </Modal>:null
  )
}
const SpTable=({tableCol,data})=>{
  const [view,setView]=useState(false)
  const [user,setuser]=useState(null)
  return(
    <Card className="table-responsive">
      <ViewModal show={view} setShow={setView} user={user}/>
      <table className="table table-hover table-sm table-striped table-bordered">
        <thead>
          <tr>
            {tableCol.map((val,idx)=>{
              return <th key={idx}>{val}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((user,idx)=>{
            const personal=user.personal
            return <tr key={idx} onClick={()=>{setView(true);setuser(user)}}>
              <th>{idx+1}</th>
              <td>{personal.firstname} {personal.lastname}</td>
              <td>{personal.email}</td>
              <td>{personal.phone}</td>
              <td>{personal.gender}</td>
              <td>{personal.education}</td>
              <td>{personal.address}</td>
              <td>{moment(user.createdAt).format('MMMM Do YYYY')}</td>
            </tr>
          })}
        </tbody>
      </table>
    </Card>
  )
}

export default SpTable