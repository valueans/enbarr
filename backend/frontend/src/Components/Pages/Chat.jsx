import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid,Typography} from '@mui/material';
import AuthService from '../../Services/AuthService';
import Headers from '../Header/Headers';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat as PubChat,ChannelList,MessageList,MessageInput,TypingIndicator } from "@pubnub/react-chat-components";
import CustomChatInput from '../Inputs/CustomChatInput';
import CustomAvatarOnline from '../Chat/Avatar/CustomAvatarOnline';
import RecentChat from '../Chat/RecentChat/RecentChat';
import { useState } from 'react';
import ChatService from '../../Services/ChatService';
import { getUserProfile } from '../../Constants/storage';
import CustomAvatar from '../Chat/Avatar/CustomAvatar';
import CustomMessageRender from '../Chat/RecentChat/CustomMessageRender';


const userprofile = getUserProfile();
const pubnub = new PubNub({
    publishKey: "pub-c-17cb7332-770a-4b7b-a4c8-f6aa6e86deb8",
    subscribeKey: "sub-c-813ba4c4-971e-42d7-a6f7-9a885fa58663",
    userId: `${userprofile?.user?.email}`,
});
const theme = "light";
const channelPrefix = "channel-chat-";

const Chat = () => {
    

    const navigator = useNavigate();
    // set current page for message pagination
    const [currentPage,setCurrentPage] = useState(1);
    // set all conversations 
    const [conversations,setConversations] = useState([]);
    // store the selected conversation id 
    const [selectedConversationsId,setSelectedConversationsId] = useState(null)
    // store the selected conversation object 
    const [selectedConversation,setSelectedConversation] = useState({})
    // store all conversations id's
    const [allConversationsIds,setAllConversationsIds] = useState([])
    // set all the messages for conversation
    const [messages,setMessage] = useState([])
    // input value
    const [input,setInput] = useState("")

    const isAuthenticated = AuthService.checkUserAuthenticated();


    useEffect(() => {
        if (!isAuthenticated){
        navigator("/")
        }
    },[isAuthenticated,navigator])


    const sendMessage = async ()=>{
        let data = {
            receiver:selectedConversation?.user_two_profile?.user?.id,
            message: input
        }
        const response = await ChatService.sendMessage(data)
        setInput("")
    }

    useEffect(()=>{
        const getAllConversations = async () =>{
            const response = await ChatService.getAllConversations(currentPage)
            setConversations(response.results)
            if (response.results?.length > 0){
                let channel_ids = response.results.map((item)=>item.channel)
                setAllConversationsIds(channel_ids)
                setSelectedConversationsId(response.results[0].channel)
                setSelectedConversation(response.results[0])
            }
        }
        getAllConversations()
    },[selectedConversationsId])

    pubnub.addListener({
        status: async (statusEvent) => {
            if (statusEvent.category === "PNConnectedCategory") {
                try {
                    await pubnub.setState({
                        channels:allConversationsIds,
                        state: {
                            userprofile: userprofile,
                        },
                    });
                } catch (status) {
                }
            }
        },
        message: (messageEvent) => {
            console.log("message Event",messageEvent)
        },
        presence: (presenceEvent)=>{
            console.log("presenceEvent",presenceEvent)
        }
    });

    pubnub.subscribe({channels: allConversationsIds,withPresence: true})


  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page"  currentPage="message"/>
        {/* header when the user will logged in ends */}
        <PubNubProvider client={pubnub}>
        <PubChat currentChannel={selectedConversationsId}>
        <Grid container >
            <Grid item xs={3} sx={{height:"calc(100vh - 101px)",overflow:"scroll",p:2,background:"#FFFFFF"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Typography variant="subscriptionCardTitle">Message</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomChatInput input_type="search"/>
                    </Grid>
                    <Grid container item xs={12} sx={{ overflow: "auto" }} wrap="nowrap">
                        {conversations.map((conversation,index)=>{
                            return <CustomAvatarOnline name={conversation.user_two_profile.user.email.split('@')[0]} image={conversation?.user_two_profile?.profile_photo} key={index}/>
                        })
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="horseDetailsUserName" sx={{color:"#000000"}}>Recents</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ChannelList channels={conversations} channelRenderer={RecentChat}/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={9} style={{height:"calc(100vh - 101px)",overflow:"scroll"}}>
                
                {/* message header starts */}
                {/* */}
                <Grid item container xs={12} sx={{minHeight:"120px",background:"#FFFFFF",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",position:"relative",top:"0px",paddingLeft:"20px"}} className="alignContentCenter">
                    <Grid item xs={1} >
                        <CustomAvatar image={selectedConversation?.user_two_profile?.profile_photo}/>
                    </Grid>
                    <Grid item xs={11} >
                        <Typography variant="horseDetailsUserName" sx={{color:"#000000"}}>{selectedConversation?.user_two_profile?.user?.email.split('@')[0]}</Typography>
                    </Grid>
                </Grid>
                {/* message header ends */}
                
                {/* message list starts */}
                
                <Grid item xs={12} sx={{minHeight:"calc(100vh - 341px)",maxHeight:"calc(100vh - 341px)",overflow:"scroll",boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",p:4}}> 
                <MessageList fetchMessages={100} messageRenderer={CustomMessageRender}>
                    <TypingIndicator />
                </MessageList>
                </Grid>
                {/* message list ends */}

                {/* message input starts  */}
                <Grid item container xs={12} sx={{minHeight:"120px",background:"#FFFFFF",p:3}} className="alignContentCenter justifyContentBetween">
                    <Grid item xs={12}>
                        <MessageInput typingIndicator={true} senderInfo={true} fileUpload="image"/>
                    </Grid>
                </Grid>
                {/* message input ends  */}
            </Grid>
        </Grid>
        </PubChat>
        </PubNubProvider>
    </>
  )
}

export default Chat