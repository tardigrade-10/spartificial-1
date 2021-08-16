import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterJoining, filterSubmission } from '../../redux/actions/instructor'
import { filterInvolved } from '../../redux/actions/involved'
import { filterPayment } from '../../redux/actions/paymentlist'
import { filterUser } from '../../redux/actions/user'

const Filter=({data,tab},props)=>{
  const dispatch=useDispatch()

  const [search,setSearch]=useState("")
  //console.log(tab,data)

  const handleSearch=(e)=>{
    setSearch(e.target.value)
    if(tab==="users"){
      dispatch(filterUser(e.target.value,data))
    }else if(tab==="join-requests"){
      dispatch(filterJoining(e.target.value,data))
    }else if(tab==="submission-requests"){
      dispatch(filterSubmission(e.target.value,data))
    }else if(tab==="involved"){
      dispatch(filterInvolved(e.target.value,data))
    }else if(tab==="projects"){

    }else if(tab==="payments"){
      dispatch(filterPayment(e.target.value,data))
    }else if(tab==="teams"){

    }
  }
  return(
    <div className="filter">
      <input className="filter-input" name="filter" type="text" placeholder="Search..." value={search} onChange={handleSearch} />
    </div>
  )
}

export default Filter