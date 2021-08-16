import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { BASE_URL } from '../../config';
import firebase from '../../config'
import Loading from '../loader/Loading'
import { useDispatch, useSelector } from 'react-redux';
import { createProject, setLoading } from '../../redux/actions/project';
const AddProjectModal=({show,handleModal})=>{
  const dispatch=useDispatch()
  const [localState,setLocalState]=useState({
    project:{
      image:'',
      title:'',
      description:'',
      start_date:'',
      duration:'',
      prerequisites:[],
      objectives:[],
      deliverables:[],
      fees:{
        T1:0,
        T2:0
      },
      instructors:[]
    },
    uploading:false,
    submitloading:false,
    prerequisites:'',
    objectives:'',
    deliverables:'',
    instructors:{
      name:'',
      photo:''
    },
    numberofpre:[1],
    numberofobj:[1],
    numberofdel:[1],
    numberofins:[1],
  })

  const onChangeProjectImage=(file)=>{
    //console.log(file,name)
    setLocalState({
      ...localState,
      uploading:true
    })
    const task=firebase.storage().ref(`/images/${file.name}`).put(file)
    task.on('state_changed',(snap)=>{

    },err=>{
      console.log(err)
    },()=>{
      firebase.storage().ref(`images`).child(file.name).getDownloadURL().then((url)=>{
        setLocalState({
          ...localState,
          project:{
            ...localState.project,
            image:url
          },
          uploading:false
        })
      })
    })
  }
  const onChangeInstrImage=(file)=>{
    setLocalState({
      ...localState,
      uploading:true
    })
    const task=firebase.storage().ref(`/images/${file.name}`).put(file)
    task.on('state_changed',(snap)=>{

    },err=>{
      console.log(err)
    },()=>{
      firebase.storage().ref(`images`).child(file.name).getDownloadURL().then((url)=>{
        setLocalState({
          ...localState,
          instructors:{
            ...localState.instructors,
            photo:url
          },
          uploading:false
        })
        //console.log(url)
      })
    })
  }
  const handleChange=(e)=>{
    setLocalState({
      ...localState,
      project:{
        ...localState.project,
        [e.target.name]:e.target.value
      }})
  }
  const handleChangeFee=(e)=>{
    setLocalState({
      ...localState,
      project:{
        ...localState.project,
        fees:{
          ...localState.project.fees,
          [e.target.name]:e.target.value
        }
      }
    })
  }
  const handleChangeInstr=(val,name)=>{
    setLocalState({
      ...localState,
      instructors:{
        ...localState.instructors,
        [name]:val
      }
    })
  }
  const handleChangeArrVal=(e)=>{
    setLocalState({
      ...localState,
      [e.target.name]:e.target.value
    })
  }
  const addMore=(name,no)=>{
    if(!localState.uploading){
      let newData=localState.project[name]
      newData.push(localState[name])
      setLocalState({
        ...localState,
        [no]:[...localState[no],Math.floor(Math.random()*10)],
        project:{
          ...localState.project,
          [name]:newData
        },
        [name]:name==="instructors"?{name:'',image:''}:''
      })
    }else{
      console.log("Please wait")
    }
  }
  const isLoading=useSelector(state=>state.projects.isLoading)
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(setLoading())
    dispatch(createProject(localState.project,handleCancel))
  }
  const handleCancel=()=>{
    setLocalState({
      project:{
        image:'',
        title:'',
        description:'',
        start_date:'',
        duration:'',
        prerequisites:[],
        objectives:[],
        deliverables:[],
        fees:{
          T1:'',
          T2:''
        },
        instructors:[]
      },
      uploading:false,
      submitloading:false,
      prerequisites:'',
      objectives:'',
      deliverables:'',
      instructors:{
        name:'',
        photo:''
      },
      numberofpre:[1],
      numberofobj:[1],
      numberofdel:[1],
      numberofins:[1],
    })
    handleModal(false)
  }
  return(
    <Modal show={show} onHide={()=>handleModal(false)} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title as="h5" className="blue">Add Project</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body style={{maxHeight:'70vh',overflowY:'scroll'}}>
          <div className="form-group">
            <h6 className="text-primary text-center">Basic Details</h6>
            <label htmlFor="title">Title</label>
            <input required className="w-100" name="title" id="title" type="text" placeholder="Project Title" value={localState.project.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea required className="w-100" rows="5" name="description" id="description" placeholder="Project Description" value={localState.project.description} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input required className="w-100" name="start_date" type="date" id="start_date" placeholder="01/01/2001" value={localState.project.start_date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (in weeks)</label>
            <input required className="w-100" name="duration" type="text" id="duration" placeholder="Duration(in weeks)" value={localState.project.duration} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="prerequisites">Prerequisites</label>
            {localState.numberofpre.map((val,idx)=>{
              return(
                <input style={{marginTop:'10px'}} key={idx} disabled={idx!==localState.numberofpre.length-1} className="w-100" name="prerequisites" type="text" placeholder={`Prerequisite ${idx+1}`} value={idx===localState.numberofpre.length-1?localState.prerequisites:localState.project.prerequisites[idx]} onChange={handleChangeArrVal} />
              )
            })}
            <small className="text-orange" onClick={()=>{addMore("prerequisites","numberofpre")}}><strong>Add</strong></small>
          </div>
          <div className="form-group">
            <label htmlFor="objectives">Objectives</label>
            {localState.numberofobj.map((val,idx)=>{
              return(
                <input style={{marginTop:'10px'}} key={idx} disabled={idx!==localState.numberofobj.length-1} className="w-100" name="objectives" type="text" placeholder={`Objective ${idx+1}`} value={idx===localState.numberofobj.length-1?localState.objectives:localState.project.objectives[idx]} onChange={handleChangeArrVal} />
              )
            })}
            <small className="text-orange" onClick={()=>{addMore("objectives","numberofobj")}}><strong>Add</strong></small>
          </div>
          <div className="form-group">
            <label htmlFor="deliverables">Deliverables</label>
            {localState.numberofdel.map((val,idx)=>{
              return(
                <input style={{marginTop:'10px'}} key={idx} disabled={idx!==localState.numberofdel.length-1} className="w-100" name="deliverables" type="text" placeholder={`Deliverable ${idx+1}`} value={idx===localState.numberofdel.length-1?localState.deliverables:localState.project.deliverables[idx]} onChange={handleChangeArrVal} />
              )
            })}
            <small className="text-orange" onClick={()=>{addMore("deliverables","numberofdel")}}><strong>Add</strong></small>
          </div>
          <div className="form-group">
            <input onChange={(e)=>onChangeProjectImage(e.target.files[0])} accept="image/*" name="uploadedFile" type="file"/>
            {localState.project.image!==''?<div className="m-1 p-2 border">
              <img className="img-fluid p-2" src={localState.project.image} alt="Preview not available." />
            </div>:null}
          </div>
          <div className="form-group">
            <h6 className="text-primary text-center">Fees</h6>
            <label htmlFor="feest1">Fees T1</label>
            <input required className="w-100" name="T1" type="text" id="feest2" placeholder="Fees T1" value={localState.project.fees.T1} onChange={handleChangeFee} />
          </div>
          <div className="form-group">
            <label htmlFor="feest1">Fees T2</label>
            <input required className="w-100" name="T2" type="text" id="feest1" placeholder="Fees T2" value={localState.project.fees.T2} onChange={handleChangeFee} />
          </div>
          <div className="form-group">
            <h6 className="text-primary text-center">Instructors</h6>
            {localState.numberofins.map((val,idx)=>{
              return(
                <div key={idx}>
                {idx===localState.numberofins.length-1?
                <>
                  <label htmlFor="photo">Instructor Image</label>
                  <input className="w-100 py-1" id="photo" onChange={(e)=>onChangeInstrImage(e.target.files[0])} accept="image/*" name="uploadedFile" type="file"/>
                  <label htmlFor="instr-name">Instructor Name</label>
                  <input className="w-100 py-1" id="instr-name" type="text" placeholder="Instructor Name" name="name" value={localState.instructors.name} onChange={(e)=>handleChangeInstr(e.target.value,"name")}/>
                </>:
                <div className="border my-2">
                  <img className="img-fluid p-2" src={localState.project.instructors[idx].photo} alt="No preview Available"/>
                  <p className="text-success"><strong>{localState.project.instructors[idx].name}</strong></p>
                </div>
                }
                </div>
              )
            })}
            {localState.uploading?<Loading/>:<small className="text-orange" onClick={()=>{addMore("instructors","numberofins")}}><strong>Add</strong></small>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-outline-danger btn-sm" onClick={handleCancel} type="button">Cancel</button>
          {!localState.uploading?<button className="btn btn-sm btn-success" type="submit"><strong>{isLoading?"Submitting":"Submit"}</strong></button>:"Uploading files. Please wait"}
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default AddProjectModal;