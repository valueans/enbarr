import React, { useEffect } from 'react'
import SenderMessageCard from '../../Cards/SenderMessageCard'
import ReceiverMessageCard from '../../Cards/ReceiverMessageCard'


const CustomMessageRender = ({message,pubnub,isOwn}) => {

  return (
    isOwn?<ReceiverMessageCard message={message} pubnub={pubnub}/>:<SenderMessageCard message={message} pubnub={pubnub}/>
  )
}

export default CustomMessageRender