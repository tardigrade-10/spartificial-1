import React from 'react'
import {Toast} from 'react-bootstrap'

const Toaster =({message,style})=>{
  return(
    <Toast style={style?(style):({position:'absolute',right:'0',top:'20%'})}>
      <Toast.Body className="text-center" >
        {message}
      </Toast.Body>
    </Toast>
  )
}

export default Toaster;