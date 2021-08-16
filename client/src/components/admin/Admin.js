import React, { useEffect, useState } from 'react'
import {Tab, Row, Col, Nav} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import logoname from '../../assets/images/logoname.png'
import { getUserList } from '../../redux/actions/user'
import SpTable from './SpTable'
import NoRecords from './NoRecords'
import './Admin.css'
import { getJoinRequest, getProjectRequest } from '../../redux/actions/instructor'
import JoinTable from './JoinTable'
import ProjectTable from './ProjectTable'
import PaymentTable from './PaymentTable'
import FileTable from './FileTable'
import { getPayments } from '../../redux/actions/paymentlist'
import { getFiles } from '../../redux/actions/files'
import { getInvolve } from '../../redux/actions/involved'
import GetInvolvedTable from './GetInvolvedTable'
import Filter from './Filter'
import AddProjectModal from './AddProjectModal'

const userCol=["#","Name","Email","Phone","Gender","Education","Address","Registered"]
const joinCol=["#","Name","Email","Status","Submitted"]
const submitCol=["#","Project Name","Email","Status","Submitted"]
const payCol=["#","Order ID","Payment ID","Project ID","Amount","Message","Txn Date"]
const fileCol=["#","File Name","Created On"]
const invCol=["#","Name","Email","Type","Created On","Status"]
const Admin =()=>{
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getUserList())
    dispatch(getJoinRequest())
    dispatch(getProjectRequest())
    dispatch(getInvolve())
    dispatch(getPayments())
    dispatch(getFiles())
  },[])
  const current=useSelector(state=>state.users.current)
  const usersOrig=useSelector(state=>state.users.usersOrig)
  const users=useSelector(state=>state.users.users)
  const joinrequestOrig=useSelector(state=>state.instructor.joinrequestOrig)
  const joinrequest=useSelector(state=>state.instructor.joinrequest)
  const submitrequestOrig=useSelector(state=>state.instructor.submissionOrig)
  const submitrequest=useSelector(state=>state.instructor.submission)
  const getInvolvedOrig=useSelector(state=>state.involved.involvedOrig)
  const getInvolved=useSelector(state=>state.involved.involved)
  const paymentsOrig=useSelector(state=>state.payment.paymentDataOrig)
  const payments=useSelector(state=>state.payment.paymentData)
  //const files=useSelector(state=>state.files.fileList)
  //console.log(users)

  const [search,setSearch]=useState({searchText:'', category:null});
  const [show,setShow]=useState(false)

  const handleModal=(value)=>{
    setShow(value)
  }

  const handleSearch=(e)=>{
    setSearch({...search,searchText:e.target.value})
    console.log("Searching")
  }
  return (current?current.admin?
    <div className="admin">
      <div className="container text-center pb-5">
        <img className="img-fluid" src={logoname} alt="..."/>
        <u><h1 className="text-primary">Welcome to <strong>Admin Panel</strong></h1></u>
      </div>
      <div className="container pb-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="registered">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="registered">Registered users</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="requests">Requests</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="involved">Get Involved</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="projects">Projects</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="payments">All Payments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="teams">Teams</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                  <Nav.Link eventKey="files">Uploaded Files</Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="registered">
                  <div>
                    <h5><strong>Registered users</strong></h5>
                    {usersOrig?usersOrig.length>0?<>
                    <Filter data={usersOrig} tab="users"/>
                    <SpTable tableCol={userCol} data={users}/></>:<NoRecords/>:<NoRecords/>}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="requests">
                  <div className="pb-5">
                    <h5><strong>Join Requests</strong></h5>
                    {joinrequestOrig?joinrequestOrig.length>0?<>
                    <Filter data={joinrequestOrig} tab="join-requests"/>
                    <JoinTable tableCol={joinCol} data={joinrequest}/></>:<NoRecords/>:<NoRecords/>}
                  </div>
                  <div>
                    <h5><strong>Project Requests</strong></h5>
                    {submitrequestOrig?submitrequestOrig.length>0?<>
                    <Filter data={submitrequestOrig} tab="submission-requests"/>
                    <ProjectTable tableCol={submitCol} data={submitrequest}/></>:<NoRecords/>:<NoRecords/>}
                  </div>

                </Tab.Pane>
                <Tab.Pane eventKey="involved">
                  <div>
                    <h5><strong>Get Involved Requests</strong></h5>
                    {getInvolvedOrig?getInvolvedOrig.length>0?<>
                    <Filter data={getInvolvedOrig} tab="involved"/>
                    <GetInvolvedTable tableCol={invCol} data={getInvolved}/></>:<NoRecords/>:<NoRecords/>}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="projects">
                  <div>
                    <h5><strong>Projects</strong></h5>
                    <div style={{textAlign:'right'}}>
                      <button className="btn btn-sm btn-outline-success" onClick={()=>{handleModal(true)}}><strong>Add Project</strong></button>
                    </div>
                    <AddProjectModal show={show} handleModal={handleModal}/>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="payments">
                  <div>
                    <h5><strong>Payments</strong></h5>
                    {paymentsOrig?paymentsOrig.length>0?<>
                    <Filter data={paymentsOrig} tab="payments"/>
                    <PaymentTable tableCol={payCol} data={payments}/></>:<NoRecords/>:<NoRecords/>}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="teams">
                  Teams Control Panel
                </Tab.Pane>
                {/* <Tab.Pane eventKey="files">
                  <div>
                    <h5><strong>Uploaded files</strong></h5>
                    {files?files.length>0?
                    <FileTable tableCol={fileCol} data={files}/>:<NoRecords/>:null}
                  </div>
                </Tab.Pane> */}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
    :<Redirect to="/dash"/>
    :<div className="admin"></div>
  )
}
export default Admin;