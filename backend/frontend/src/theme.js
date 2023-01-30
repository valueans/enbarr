import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    palette: {
        primary: {
          main: '#302F32'
        },
        secondary: {
          main: '#FFFFFF'
        }
    },
    typography: {
        logo:{
            fontFamily: 'Bookman Old Style',
            fontStyle: "normal",
            fontWeight: "300",
            fontSize: "29.0323px",
            lineHeight: "34px",
            color: "#302F32",
            textDecoration:"none",
        },
        headerLinks:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "40px",
            color: "#313033",
            textAlign:"center",
            cursor:"pointer"
        },
        landingPageTitle:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "30px",
            lineHeight: "70px",
            color: "#302F32"
        },
        notification:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "15px",
            lineHeight: "15px",
            color: "#302F32"
        },
        notificationMessage:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "15px",
            color: "#313033"
        },
        landingPageDesc:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "58.7449px",
            lineHeight: "70px",
            color: "#302F32"
        },
        landingPageSubDesc:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "30px",
            color: "#000000"
        },
        authTitle:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "70px",
            color: "#302F32"
        },
        authInputTitle:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "18px",
            color: "#313033"
        },
        horseDetailsUserName:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "15px",
            lineHeight: "22.5px",
            color: "#FFFFFF"
        },
        myHorseCardTitle:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "20px",
            lineHeight: "30px",
            color: "#FFFFFF"
        },
        characteristicsHeading:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "22.5px",
            color: "#313033"
        },
        enbarTitleWhite:{
            fontFamily: 'Bookman Old Style',
            fontStyle: "normal",
            fontWeight: "300",
            fontSize: "40px",
            lineHeight: "47px",
            color: "#FFFFFF",
        },
        imageDescriptions:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "15px",
            color: "#313033",
        },
        subscriptionCardTitle:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "40px",
            lineHeight: "40px",
            color: "#2F3C4C",
        },
        chatUsersTitle:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "18px",
            color: "#000000",
        },
        chatMessageTime:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: 300,
            fontSize: "10px",
            lineHeight: "15px",
            color: "#302F32",
        },
    }
  });


export default theme;