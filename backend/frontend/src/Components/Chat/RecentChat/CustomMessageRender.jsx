import React from 'react'
import SenderMessageCard from '../../Cards/SenderMessageCard'
import ReceiverMessageCard from '../../Cards/ReceiverMessageCard'
import { getUserProfile } from '../../../Constants/storage'


const CustomMessageRender = ({message,pubnub}) => {

  const user_profile = getUserProfile();
  const email = user_profile.user.email;

  console.log("message",message)
  return (
    message.uuid===email?<ReceiverMessageCard message={message} pubnub={pubnub}/>:<SenderMessageCard message={message} pubnub={pubnub}/>
  )
}

export default CustomMessageRender