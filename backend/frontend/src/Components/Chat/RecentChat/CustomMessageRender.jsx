import React from 'react'
import SenderMessageCard from '../../Cards/SenderMessageCard'
import ReceiverMessageCard from '../../Cards/ReceiverMessageCard'



const CustomMessageRender = (props) => {
  console.log("props",props)
  return (
    props.isOwn?<ReceiverMessageCard message={props.message}/>:<SenderMessageCard message={props.message}/>
  )
}

export default CustomMessageRender