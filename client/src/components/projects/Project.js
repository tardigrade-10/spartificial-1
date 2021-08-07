import React, { useState } from 'react'
import Payments from '../payments/Payment'
import {useSelector,useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap';
import Projects from './Projects';
import {BASE_URL,REF_BASE_URL} from '../../config'
import Loader from '../loader/Loading';
import axios from 'axios'
import { getUser } from '../../redux/actions/user';
import moment from 'moment';

const Project =({match}) =>{
  const dispatch=useDispatch()
  const queries=match.params.query.split("us=");
  //console.log(queries)
  if(queries.length===4){
    console.log("referal")
  }
  const [show,setShow]=useState(false)
  const projects=useSelector(state=>state.projects.projects)
  const users=useSelector((state)=>state.users)
  var current=null
  if(users.current) current=users.current

  var purchased=null
  if(users.current) purchased=users.current.payments.filter((project)=>project.project_id===atob(queries[1]))[0]
  //console.log(purchased)
  //console.log(users.current)
  // console.log(match.params.project_id)
  var isInstructor=null
  if(users.current) isInstructor=users.current.projects.filter(project=>project.project_id===atob(queries[1]))[0]

  const project=projects.filter(project=>project._id===atob(queries[1]))[0]

  console.log(project)

  const [referModal,setShowReferModal]=useState(false)
  const [discount,setDiscount]=useState('')
  const [referalLink,setReferalLink]=useState('')
  const handleCloseRefer=()=>{
    setShowReferModal(false)
    setDiscount(false)
    setReferalLink(``)

  }
  const handleChangeDiscount=(e)=>{
    setDiscount(e.target.value)
    setReferalLink(`${REF_BASE_URL}/projects/us=${project?btoa(project._id):''}us=${btoa(current._id)}us=${btoa(e.target.value<91?e.target.value:0)}`)

  }
  const copyToClip=()=>{
    var copyText = document.getElementById("discount");
    //console.log(copyText.value)
    copyText.select();
    copyText.setSelectionRange(0,9999);
    document.execCommand("copy")
    alert("Copied to Clipboard!")
  }
  const [load,setLoad]=useState(false);
  const createReferal=async(e)=>{
    //console.log(referalLink)
    e.preventDefault()
    if(discount===""){
      alert("Please enter a discount value!")
    }else{
      setLoad(true)
      const data={referalInstructor:referalLink}
      const result=await axios.put(`${BASE_URL}/users/${current._id}`,data,{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('userdetails')}`,
          'Content-Type':'application/json'
        }
      })
      alert("Link Generated Successfully.\nCopy, Share and Earn!")
      setLoad(false)
      dispatch(getUser())
    }
  }

  return(project?
    <div className="project-desc">
      <Payments show={show} fees={project.fees} onHide={()=>setShow(false)} title={project.title} queries={queries} description={project.description} image={project.image}/>
      <div className="container">
        <div className="row pb-5">
          <div className="col-sm-6 col-12 text-center align-self-center">
            {queries.length===4&&!isInstructor?<h6 className="text-dark">Welcome to Spartificial projects Referral. Here you will get a discount of {atob(queries[3])}% on this project. This referral link can be disabled any time by the Instructor.<br/><strong className="text-danger">Hurry Up!!</strong></h6>:null}
            <h4 className="m-3" style={{fontWeight:'600',color:'darkblue'}}><i>{project.title}</i></h4>
            <p><strong style={{color:'darkblue'}}>Starting from: </strong>{moment(project.start_date).format('Do MMMM YYYY')}</p>
            <p style={{color: 'rgb(87, 5, 5)'}}><strong style={{color:'darkblue'}}>Duration: </strong> {project.duration}</p>
            {
              purchased?
              null

              :
              <>            
                {!isInstructor?<button className="btn btn-primary btn-sm" onClick={()=>setShow(true)}><strong>Enroll Now</strong></button>:null}<br/>
                {/* <small><strong>@</strong> <br/>Rs.{project.price} and <br/>get discounts upto Rs. 300</small> */}
              </>
            }
            {isInstructor?current.referalInstructor.length<1?<><button className="btn btn-outline-primary btn-sm m-1" onClick={()=>{setShowReferModal(true)}}><strong>Refer</strong></button>
              
            <Modal show={referModal} onHide={()=>handleCloseRefer()}>
                      <Modal.Header>
                        <h5>Refer</h5>
                      </Modal.Header>
                      <Modal.Body>
                        <form onSubmit={createReferal}>
                          <div className="row justify-content-center p-2">
                            <div className="col-8">
                              <label>Discount:&nbsp;</label>
                              <input style={{width:'60%'}} required type="number" min="0" max="90" name="discount" value={discount} onChange={handleChangeDiscount} placeholder="% discount"></input>
                            </div>
                            <div className="col-4">
                              {load?<Loader/>:<button type="submit" className="btn btn-sm btn-primary">Create</button>}
                            </div>
                          </div>
                        </form>
                        <div className="row">
                          <div className="col-12 p-3 text-center">
                            <h6>Get 90% extra of project registration fees for every student who enroll through your referral link or coupon.</h6>
                            <small><strong>You will decide the discount student get through referral link. i.e. if you give a discount of 15% to the student then reffered student will get 15% discount and your commision will be 90-15=85%.</strong></small>
                            <h6 className="text-danger"><strong>Note: </strong><small> Spartificial’s share will be 10% of the original registration fees.</small></h6>
                          </div>
                        </div>
                          <div className="row justify-content-center text-center pb-2">
                            <div className="col-3 align-self-center" style={{textAlign:'right'}}>
                              Send to:
                            </div>
                            <div className="col-1">
                              <span className="btn btn-sm btn-outline-dark" onClick={()=>copyToClip()}><i className="fa fa-copy"></i></span>
                            </div>
                            <div className="col-1">
                              <a href={`whatsapp://send?text=${referalLink}`} className="btn btn-primary btn-sm"><span className="fa fa-whatsapp"></span></a>
                            </div>
                            <div className="col-1">
                              <a href={`sms:?body=${referalLink}`} className="btn btn-primary btn-sm"><span className="fa fa-paper-plane"></span></a>
                            </div>
                            <div className="col-3">
                            </div>
                        </div>
                        <div className="row">
                          <div className="col-12">
                            <input style={{width:'100%',color:'gray'}} type="text" id="discount" value={referalLink}/>
                          </div>
                        </div>
                      </Modal.Body>
                    </Modal>
            </>:null:null}
          </div>
          <div className="col-sm-6 align-self-center p-3 top">
            <div style={{textAlign:'right'}}>
              <img src={project.image} alt="..." className="img-fluid"/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            {/* <h4 style={{borderBottom:'1px solid #c4c4c4',color:'darkblue'}}>Project Description</h4> */}
            <p className="p-3 mb-3">{project.description}</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4 style={{borderBottom:'1px solid #c4c4c4',color:'darkblue'}}>Objectives</h4>
            <ol style={{paddingLeft:'25px'}}>
              {project.objectives.map((val,idx)=>{
                return <li key={idx}>{val}</li>
              })}
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4 style={{borderBottom:'1px solid #c4c4c4',color:'darkblue'}}>Prerequisites</h4>
            <ol style={{paddingLeft:'25px'}}>
              {project.prerequisites.map((val,idx)=>{
                return <li key={idx}>{val}</li>
              })}
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h4 style={{borderBottom:'1px solid #c4c4c4',color:'darkblue'}}>Deliverables</h4>
            <ol style={{paddingLeft:'25px'}}>
              {project.deliverables.map((val,idx)=>{
                return <li key={idx}>{val}</li>
              })}
            </ol>
          </div>
        </div>
        <div className="row justify-content-center">
          <h4 style={{borderBottom:'1px solid #c4c4c4',color:'darkblue'}}>Our Instructors</h4>
          {project.instructors.map((val,idx)=>{
            return(
              <div className="col-6 col-sm-4 col-md-3 text-center" key={idx}>
                <div className="card mb-4">
                  <img src={val.photo} alt="..." className="img-fluid"/>
                  <div className="card-img-overlay" style={{backgroundColor:'transparent'}}>
                    <h6 style={{position:'absolute',bottom:'0',left:'5px',right:'5px',backgroundColor:'#0a0e2abe',color:'white',borderRadius:'20px',padding:'3px 4px', fontSize:'14px'}}>{val.name}</h6>
                  </div>
                </div>
              </div>  
            )
          })}
        </div>
      </div>
    </div>:<Projects projects={projects} que={queries}/>
  )
}

export default Project;