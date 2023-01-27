import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import AuthService from '../../Services/AuthService';
import Headers from '../Header/Headers';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { Chat as PubChat, MessageList, MessageInput,ChannelList,TypingIndicator } from "@pubnub/react-chat-components";

const Chat = () => {

    const navigator = useNavigate();

    const isAuthenticated = AuthService.checkUserAuthenticated();

    const pubnub = new PubNub({
        publishKey: "pub-c-17cb7332-770a-4b7b-a4c8-f6aa6e86deb8",
        subscribeKey: "sub-c-813ba4c4-971e-42d7-a6f7-9a885fa58663",
        userId: "myFirstUser",
    });
    const currentChannel = "Default";
    const theme = "light";
    



    useEffect(() => {
        if (!isAuthenticated){
        navigator("/")
        }
    },[isAuthenticated,navigator])

  return (
    <>
        {/* header when the user will logged in starts */}
        <Headers headerType="home-page"  currentPage="message"/>
        {/* header when the user will logged in ends */}
        <PubNubProvider client={pubnub}>
        <PubChat {...{ currentChannel, theme }}>
        <Grid container >
            <Grid item sx={3} style={{height:"calc(100vh - 101px)",overflow:"scroll"}}>
            <ChannelList
    channels={[
    {
        "name": "Movies",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/149e60f311749f2a7c6515f7b34?s=256&d=identicon"
        },
        "description": "Everything about movies",
        "eTag": "AbOx6N+6vu3zoAE",
        "id": "space.149e60f311749f2a7c6515f7b34",
        "updated": "2020-09-23T09:23:37.175764Z"
    },
    {
        "name": "Daily Standup",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/2ada61db17878cd388f95da34f9?s=256&d=identicon"
        },
        "description": "Async virtual standup",
        "eTag": "Ab+2+deSmdf/Fw",
        "id": "space.2ada61db17878cd388f95da34f9",
        "updated": "2020-09-23T09:23:36.960491Z"
    },
    {
        "name": "Running",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/363d9255193e45f190539e0c7d5?s=256&d=identicon"
        },
        "description": "soc-running space",
        "eTag": "AcrWgrqgmcyHswE",
        "id": "space.363d9255193e45f190539e0c7d5",
        "updated": "2020-09-23T09:23:37.183458Z"
    },
    {
        "name": "India Office",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/515fc9a2a1a895f4059c84b2971?s=256&d=identicon"
        },
        "description": "भारत के कार्यालय में आपका स्वागत है🇮🇳!",
        "eTag": "AZSu2tPUuLeO2QE",
        "id": "space.515fc9a2a1a895f4059c84b2971",
        "updated": "2020-09-23T09:23:36.935077Z"
    },
    {
        "name": "Off Topic",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/a204f87d215a40985d35cf84bf5?s=256&d=identicon"
        },
        "description": "Non-work banter and water cooler conversation",
        "eTag": "AZ2/xY3Qv9GGUQ",
        "id": "space.a204f87d215a40985d35cf84bf5",
        "updated": "2020-09-23T09:23:36.945993Z"
    },
    {
        "name": "London Office",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/a652eb6cc340334ff0b244c4a39?s=256&d=identicon"
        },
        "description": "London Office 🇬🇧",
        "eTag": "AfD93cn945yNTA",
        "id": "space.a652eb6cc340334ff0b244c4a39",
        "updated": "2020-09-23T09:23:36.951506Z"
    },
    {
        "name": "Introductions",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/ac4e67b98b34b44c4a39466e93e?s=256&d=identicon"
        },
        "description": "This channel is for company wide chatter",
        "eTag": "AfeD+Zn+idGFTQ",
        "id": "space.ac4e67b98b34b44c4a39466e93e",
        "updated": "2021-02-19T18:01:51.886025Z"
    },
    {
        "name": "Poland Office",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/c1ee1eda28554d0a34f9b9df5cfe?s=256&d=identicon"
        },
        "description": "Zapytaj Nas O Cokolwiek 🇵🇱",
        "eTag": "Adzu4uSC45jGsgE",
        "id": "space.c1ee1eda28554d0a34f9b9df5cfe",
        "updated": "2020-09-23T09:23:36.939098Z"
    },
    {
        "name": "Company Culture",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/ce466f2e445c38976168ba78e46?s=256&d=identicon"
        },
        "description": "Company culture space",
        "eTag": "AYTS0uL/zs/nXA",
        "id": "space.ce466f2e445c38976168ba78e46",
        "updated": "2020-09-23T09:23:37.170896Z"
    },
    {
        "name": "Exec AMA",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/e1eda2fd92e551358e4af1b6174?s=256&d=identicon"
        },
        "description": "Ask the CEO anything",
        "eTag": "Ade5g4XZzN652AE",
        "id": "space.e1eda2fd92e551358e4af1b6174",
        "updated": "2020-09-23T09:23:37.18019Z"
    },
    {
        "name": "Poland Office",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/c1ee1eda28554d0a34f9b9df5cfe?s=256&d=identicon"
        },
        "description": "Zapytaj Nas O Cokolwiek 🇵🇱",
        "eTag": "Adzu4uSC45jGsgE",
        "id": "space.c1ee1eda28554d0a34f9b9df5cfe",
        "updated": "2020-09-23T09:23:36.939098Z"
    },
    {
        "name": "Company Culture",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/ce466f2e445c38976168ba78e46?s=256&d=identicon"
        },
        "description": "Company culture space",
        "eTag": "AYTS0uL/zs/nXA",
        "id": "space.ce466f2e445c38976168ba78e46",
        "updated": "2020-09-23T09:23:37.170896Z"
    },
    {
        "name": "Exec AMA",
        "custom": {
            "profileUrl": "https://www.gravatar.com/avatar/e1eda2fd92e551358e4af1b6174?s=256&d=identicon"
        },
        "description": "Ask the CEO anything",
        "eTag": "Ade5g4XZzN652AE",
        "id": "space.e1eda2fd92e551358e4af1b6174",
        "updated": "2020-09-23T09:23:37.18019Z"
    }
]}
  />
            </Grid>
            <Grid item sx={9} style={{height:"calc(100vh - 101px)",overflow:"scroll"}}>
                <Grid container direction="column">
                    <Grid item sx={12} style={{border:"1px solid black"}}>
                        <MessageList fetchMessages={5}>
                            <TypingIndicator />
                        </MessageList>
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