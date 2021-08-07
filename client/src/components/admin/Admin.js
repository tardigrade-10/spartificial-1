import React, { useEffect, useState } from 'react'
import {Tab, Row, Col ,Nav, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap'
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

const userCol=["#","Name","Email","Phone","Gender","Education","Address","Registered"]
const joinCol=["#","Name","Email","Status","Submitted"]
const submitCol=["#","Project Name","Email","Status","Submitted"]
const payCol=["#","Order ID","Payment ID","Project ID","Amount","Message","Txn Date"]
const fileCol=["#","File Name","Created On"]
const Admin =()=>{
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getUserList())
    dispatch(getJoinRequest())
    dispatch(getProjectRequest())
    dispatch(getPayments())
    dispatch(getFiles())
  },[])
  const current=useSelector(state=>state.users.current)
  const users=useSelector(state=>state.users.users)
  const joinrequest=useSelector(state=>state.instructor.joinrequest)
  const submitrequest=useSelector(state=>state.instructor.submission)
  const payments=useSelector(state=>state.payment.paymentData)
  const files=useSelector(state=>state.files.fileList)
  //console.log(files)

  const [search,setSearch]=useState({searchText:'', category:null});
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
      <Row>
                <Col>
                  <InputGroup className="mb-3">
                    <DropdownButton
                      variant="outline-secondary"
                      title={search.category?search.category:"Select Category"}
                      id="input-group-dropdown-1"
                    >
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Registered Users'})}}>Registered Users</Dropdown.Item><Dropdown.Divider />
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Join Requests'})}}>Join Requests</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Project Requests'})}}>Project Requests</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Get Involved'})}}>Get Involved</Dropdown.Item><Dropdown.Divider />
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Projects'})}}>Projects</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Payments'})}}>Payments</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Teams'})}}>Teams</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={()=>{setSearch({...search,category:'Uploaded Files'})}}>Uploaded Files</Dropdown.Item>
                    </DropdownButton>
                    <FormControl  aria-label="Text input with dropdown button" value={search.searchText} name="search" type="text" placeholder="Search..." onChange={handleSearch} />

                  </InputGroup>
                </Col>
              </Row>
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
                <Nav.Item>
                  <Nav.Link eventKey="files">Uploaded Files</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="registered">
                <div>
                    <h5><strong>Registered users</strong></h5>
                    {users?users.length>0?
                    <SpTable tableCol={userCol} data={users}/>:<NoRecords/>:<NoRecords/>}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="requests">
                  <div className="pb-5">
                    <h5><strong>Join Requests</strong></h5>
                    {joinrequest.length>0?
                    <JoinTable tableCol={joinCol} data={joinrequest}/>:<NoRecords/>}
                  </div>
                  <div>
                    <h5><strong>Project Requests</strong></h5>
                    {submitrequest.length>0?
                    <ProjectTable tableCol={submitCol} data={submitrequest}/>:<NoRecords/>}
                  </div>

                </Tab.Pane>
                <Tab.Pane eventKey="involved">
                  Get Involved Control Panel
                </Tab.Pane>
                <Tab.Pane eventKey="projects">
                  Projects Control Panel
                </Tab.Pane>
                <Tab.Pane eventKey="payments">
                  <div>
                    <h5><strong>Payments</strong></h5>
                    {payments.length>0?
                    <PaymentTable tableCol={payCol} data={payments}/>:<NoRecords/>}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="teams">
                  Teams Control Panel
                </Tab.Pane>
                <Tab.Pane eventKey="files">
                  <div>
                    <h5><strong>Uploaded files</strong></h5>
                    {files.length>0?
                    <FileTable tableCol={fileCol} data={files}/>:<NoRecords/>}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
    :<Redirect to="/dash"/>
    :<div className="admin">Login please</div>
  )
}
export default Admin;