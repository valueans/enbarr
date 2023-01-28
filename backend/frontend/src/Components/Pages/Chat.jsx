import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid,Typography } from '@mui/material';
import AuthService from '../../Services/AuthService';
import Headers from '../Header/Headers';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat as PubChat, MessageList, MessageInput,ChannelList,TypingIndicator } from "@pubnub/react-chat-components";
import CustomInput from '../Inputs/CustomInput';
import CustomAvatarOnline from '../Chat/Avatar/CustomAvatarOnline';
import RecentChat from '../Chat/RecentChat/RecentChat';
import { useState } from 'react';
import ChatService from '../../Services/ChatService';
import { getUserProfile } from '../../Constants/storage';

const Chat = () => {
    

    const navigator = useNavigate();
    const [currentPage,setCurrentPage] = useState(1);
    const [conversations,setConversations] = useState([]);
    const [selectedConversationsId,setSelectedConversationsId] = useState(null)

    const isAuthenticated = AuthService.checkUserAuthenticated();

    const userprofile = getUserProfile();

    const pubnub = new PubNub({
        publishKey: "pub-c-17cb7332-770a-4b7b-a4c8-f6aa6e86deb8",
        subscribeKey: "sub-c-813ba4c4-971e-42d7-a6f7-9a885fa58663",
        userId: `userId:${userprofile?.user?.id}+${userprofile?.user.email}`,
    });
    const theme = "light";
    


    useEffect(() => {
        if (!isAuthenticated){
        navigator("/")
        }
    },[isAuthenticated,navigator])


    useEffect(()=>{
        const getAllConversations = async () =>{
            const response = await ChatService.getAllConversations(currentPage)
            setConversations(response.results)
            if (response.results?.length > 0){
                setSelectedConversationsId(response.results[0].channel)
            }
        }
        getAllConversations()
    },[])




  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page"  currentPage="message"/>
        {/* header when the user will logged in ends */}
        <PubNubProvider client={pubnub}>
        <PubChat {...{ selectedConversationsId, theme }}>
        <Grid container >
            <Grid item xs={3} sx={{height:"calc(100vh - 101px)",overflow:"scroll",p:2,background:"#FFFFFF"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Typography variant="subscriptionCardTitle">Message</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomInput input_type="search"/>
                    </Grid>
                    <Grid container item xs={12} sx={{ overflow: "auto" }} wrap="nowrap">
                        {conversations.map((conversation)=>{
                            return <CustomAvatarOnline name={conversation.user_two_profile.user.email.split('@')[0]} image={conversation.user_two_profile.profile_photo}/>
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
                <Grid container direction="column">
                    <Grid item sx={12} style={{border:"1px solid black"}}>
                        <MessageList fetchMessages={5} />
                    </Grid>
                    <Grid item sx={12} style={{border:"1px solid black"}}>
                        <MessageInput typingIndicator />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </PubChat>
        </PubNubProvider>
    </>
  )
}

export default Chat