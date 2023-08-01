import React, {useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid,Typography,IconButton,Menu,MenuItem} from '@mui/material';
import AuthService from '../../Services/AuthService';
import Headers from '../Header/Headers';
import { Chat as PubChat,ChannelList,MessageList,MessageInput,TypingIndicator } from "@pubnub/react-chat-components";
import CustomChatInput from '../Inputs/CustomChatInput';
import CustomAvatarOnline from '../Chat/Avatar/CustomAvatarOnline';
import RecentChat from '../Chat/RecentChat/RecentChat';
import { useState } from 'react';
import ChatService from '../../Services/ChatService';
import CustomAvatar from '../Chat/Avatar/CustomAvatar';
import CustomMessageRender from '../Chat/RecentChat/CustomMessageRender';
import {useDispatch,useSelector} from 'react-redux';
import { setSelectedChannelId,setSelectedChannel } from '../../store/actions';
import CustomMessageInput from '../Inputs/CustomMessageInput';
import SendButton from '../Buttons/SendButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Picker from '@emoji-mart/react'
import emojiData from "@emoji-mart/data";



const Chat = ({pubnub,userprofile}) => {

    const navigator = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state=>state);

    // set current page for message pagination
    const [currentPage,setCurrentPage] = useState(1);
    // set all conversations 
    const [conversations,setConversations] = useState([]);
    // filtered Conversations
    const [filterConversations,setFilterConversations] = useState([]);
    // total count conversations
    const [totalConversations,setTotalConversations] = useState(0);
    // users status
    const [users,setUsers] = useState([]);
    // store all conversations id's
    const [allConversationsIds,setAllConversationsIds] = useState([])

    const [filterInput,setFilterInput] = useState("");
    
    const [unreadTimeTokens,setUnreadTimeTokens] = useState([]);

    const fileRef = useRef(null);

    const [fileInput,setFileInput] = useState(null);

    const [messageInputVal,setMessageInputVal] = useState("");
    const messagesEndRef = useRef(null)
    const [showEmojis, setShowEmojis] = useState(false);

    const [lastMessageTimetoken,setLastMessageTimetoken] = useState("");


    const isAuthenticated = AuthService.checkUserAuthenticated();
    
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = () => {
        setAnchorEl(null);
      };
    

    const deleteConversation = async ()=>{
        try {
            await ChatService.deleteConversation(state.SelectedChat.id);
            const _remaining_conversation_ids = allConversationsIds.filter((item)=>item !== state.SelectedChatId)
            setAllConversationsIds(_remaining_conversation_ids)
            const _remaining_conversation = conversations.filter((item)=>item.channel !== state.SelectedChatId)
            setConversations(_remaining_conversation)
            setFilterConversations(_remaining_conversation)
            setAnchorEl(null)
            if (_remaining_conversation_ids.length > 0){
                dispatch(setSelectedChannelId(_remaining_conversation_ids[0]))
                dispatch(setSelectedChannel(_remaining_conversation[0]))
                let _remaining_users = _remaining_conversation.map((item)=>{
                    return {
                        ...item.user_two_profile,online:false,channel:item.channel
                    }
                })
                setUsers(_remaining_users)
            }
            else{
                dispatch(setSelectedChannelId(""))
                dispatch(setSelectedChannel(""))
                setUsers([])
            }
        } catch (error) {
            console.log(error)   
        }
    }

    useEffect(() => {
        if (!isAuthenticated){
        navigator("/")
        }
    },[isAuthenticated,navigator])


    useEffect(()=>{
        const getAllConversations = async () =>{
            const response = await ChatService.getAllConversations(currentPage)
            let check_delete = response.results.filter((item)=>item.is_deleted===false)
            const all_conversations = [...conversations,...check_delete]
            setConversations(all_conversations)
            setFilterConversations(all_conversations)
            setTotalConversations(response.count)
            setUsers([...users,...all_conversations.map((item)=>{return {...item.user_two_profile,online:false,channel:item.channel}})])
            if (response.results?.length > 0){
                let channel_ids = response.results.map((item)=>item.channel)
                dispatch(setSelectedChannelId(response.results[0].channel))
                dispatch(setSelectedChannel(response.results[0]))
                setAllConversationsIds([...allConversationsIds,...channel_ids])
                getUnread(all_conversations)
            }
        }
        getAllConversations()
        pubnub.subscribe({channels: allConversationsIds,withPresence: true})
    },[currentPage])


    
    pubnub.addListener({
        presence : (presenceEvent)=>{
            let event_type = presenceEvent.action
            let email = presenceEvent.uuid
            let filteredUser = users.filter((user)=>user.user.email===email)
            let filteredNotUser = users.filter((user)=>user.user.email!==email)
            if (filteredUser.length > 0 && event_type==='join'){
                filteredUser[0]['online'] = true
            }
            else if (filteredUser.length > 0 && event_type==='leave'){
                filteredUser[0]['online'] = false
            }
            setUsers([...filteredUser,...filteredNotUser])
        },
    })
      
      const handleFilterConversations = (e)=>{
        let input_val = e.target.value
        setFilterInput(input_val);
        if (input_val.length > 0){
            let filteredConversations = conversations.filter((conversation)=>conversation.user_two_profile.user.email.split('@')[0].startsWith(input_val))
            setFilterConversations(filteredConversations)
        }
        else{
            setFilterConversations(conversations)
        }
    }

    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setMessageInputVal(messageInputVal + emoji);
    };

    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = ()=>{

        if (fileInput){
            pubnub.sendFile({
                channel: state.SelectedChatId,
                file: fileInput,
            }).then(result =>{
                console.log("result",result)
            }).catch(error =>{
                console.log("error",error.status)
            });
        }
        else{
            pubnub.publish({
                message: {text:messageInputVal},
                channel: state.SelectedChatId,
              }).then(result =>{
                setLastMessageTimetoken(result.timetoken)
                setLastRead(result.timetoken);
              }).catch(error =>{
                console.log("result.error",error.status)
              });
        }
        setMessageInputVal("");
        setFileInput(null);
        scrollToBottom();
    }

    const getUnread = (conversations)=>{
        pubnub.objects.getMemberships({
            include: {
              customFields: true
            }
          }).then((response)=>{
    
            let channel_ids = conversations.map((item)=>item.channel)
            const _allConversationIds = [...allConversationsIds,...channel_ids];

            var _channels = []
            var _timetokens = []

            response.data.forEach((item)=>{
                if (_allConversationIds.includes(item.channel.id)){
                    _channels.push(item.channel.id)
                }
            })
            response.data.forEach((item)=>{
                if (_allConversationIds.includes(item.channel.id)){
                    _timetokens.push(item.custom[userprofile.user.id])
                }
            })
            pubnub.messageCounts({
                channels: _channels,
                channelTimetokens: _timetokens,
              }).then((response) => {
                  let _keys = Object.keys(response.channels)
                  let _conversations = [];
                  conversations.forEach((item)=>{
                      if (_keys.includes(item.channel)){
                        item['unread'] = response.channels[item.channel]
                    }
                    _conversations.push(item)
                })
                setConversations(_conversations)
                setFilterConversations(_conversations)
              }).catch(error =>{
                console.log("unread error",error.status)
            })
          }).catch(error=>{
            console.log("error.",error.status)
          })
    }

    const setLastRead = (timetoken)=>{
        pubnub.objects.setMemberships({
            channels: [{
                id: state.SelectedChatId,
                custom: {
                    [userprofile.user.id]: timetoken?timetoken:lastMessageTimetoken
                }
                }]
            }).then(response =>{
                console.log("setMemberships",response)
            }).catch(error =>{
                console.log("error",error.status);
            })
        filterConversations.forEach((item)=>{
            if (item.channel === state.SelectedChatId){
                item.unread = 0
            }
        })
        setFilterConversations(filterConversations)
    }

  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page"  currentPage="message"/>
        {/* header when the user will logged in ends */}
        <PubChat currentChannel={state?.SelectedChatId}>
        <Grid container >
            <Grid item xs={3} sx={{height:"calc(100vh - 101px)",p:2,background:"#FFFFFF"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <Typography variant="subscriptionCardTitle">Message</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomChatInput input_type="search" onChange={handleFilterConversations} value={filterInput} placeholder="search...."/>
                    </Grid>
                    <Grid container item xs={12} sx={{ overflow: "auto" }} wrap="nowrap">
                        {users.map((user,index)=>{
                            return <CustomAvatarOnline name={user?.user?.username} image={user?.profile_photo} key={index} online={user.online} channel={user.channel}/>
                        })
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="horseDetailsUserName" sx={{color:"#000000"}}>Recents</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{overflow:"scroll",maxHeight:"400px"}}>
                        {
                            filterConversations.length > 0?
                            <ChannelList channels={filterConversations} channelRenderer={(props)=>{
                                return <RecentChat props={props} setLastRead={setLastRead} key={props.channel}/>
                            }}/>:
                            <Typography variant="chatUsersTitle" sx={{color:"#302F32"}}>no conversation found..</Typography>
                        }
                    </Grid>
                    {
                        totalConversations > 12 * currentPage?
                        <Grid item xs={12} className="justifyContentCenter">
                            <IconButton onClick={()=>{
                            setCurrentPage(currentPage+1)
                            }}>
                                <Typography>Show older...</Typography>
                            </IconButton>
                        </Grid>:""
                    }
                </Grid>
            </Grid>
            {
                state.SelectedChatId?
                <Grid item xs={9} style={{height:"calc(100vh - 101px)",overflow:"scroll"}}>
                
                {/* message header starts */}
                {/* */}
                <Grid item container xs={12} sx={{minHeight:"120px",background:"#FFFFFF",boxShadow:"0px 4px 10px rgba(0, 0, 0, 0.1)",position:"relative",top:"0px",paddingLeft:"20px"}} className="alignContentCenter">
                    <Grid item xs={1} >
                        <CustomAvatar image={state.SelectedChat?.user_two_profile?.profile_photo}/>
                    </Grid>
                    <Grid item xs={10} >
                        <Typography variant="horseDetailsUserName" sx={{color:"#000000"}}>{state.SelectedChat?.user_two_profile?.user?.username}</Typography>
                    </Grid>
                    <Grid item xs={1} >
                    <IconButton
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                        <MoreHorizIcon color="primary" sx={{width:"30px",height:"30px"}}/>
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        className="singleNotification"
                        sx={{minWidth:"200px"}}
                        >
                        <MenuItem onClick={deleteConversation} sx={{minWidth:"200px"}}>Delete</MenuItem>
                    </Menu>
                    </Grid>
                </Grid>
                {/* message header ends */}
                
                {/* message list starts */}
                
                <Grid item xs={12} sx={{minHeight:"calc(100vh - 341px)",maxHeight:"calc(100vh - 341px)",overflow:"scroll",boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",p:4}}> 
                <MessageList fetchMessages={100} onScroll={(e)=>{
                }} messageRenderer={(props)=>{
                    setLastMessageTimetoken(props.message.timetoken);
                    return <CustomMessageRender message={props.message} pubnub={pubnub} isOwn={props.isOwn}/>}}>
                </MessageList>
                <div ref={messagesEndRef} />
                </Grid>
                {/* message list ends */}

                <Grid item container xs={12} sx={{maxHeight:"120px",minHeight:"120px",background:"#FFFFFF",p:3}} className="alignContentCenter justifyContentBetween">
                    {
                    showEmojis?
                    <div style={{position:"absolute",bottom:"101px"}}><Picker onEmojiSelect={addEmoji} data={emojiData}/></div>:""
                    }
                    <input type="file" style={{display:'none'}} ref={fileRef} onChange={(e)=>{
                        setFileInput(e.target.files[0]);
                        setMessageInputVal(e.target.files[0].name)
                    }} accept="*"/>
                    <Grid item xs={10}>
                        <CustomMessageInput placeholder="write message here..." file_ref={fileRef} value={messageInputVal} setMessageInputVal={setMessageInputVal} setShowEmojis={setShowEmojis} showEmojis={showEmojis} onChange={(e)=>{
                            setMessageInputVal(e.target.value);
                            setFileInput(null);
                        }} onEnter={sendMessage}/>
                    </Grid>
                    <Grid item xs={2} sx={{pl:3}}>
                        <SendButton width="50%" disabled={messageInputVal.length===0} onClick={sendMessage} />
                    </Grid>
                </Grid>
                {/* message input ends  */}
            </Grid>:""
            }
            
        </Grid>
        </PubChat>
    </>
  )
}

export default Chat