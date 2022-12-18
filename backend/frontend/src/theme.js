import { createTheme } from "@mui/material/styles";
const theme = createTheme({
    typography: {
        logo:{
            fontFamily: 'Bookman Old Style',
            fontStyle: "normal",
            fontWeight: "300",
            fontSize: "29.0323px",
            lineHeight: "34px",
            color: "#302F32",
        },
        headerLinks:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "400",
            fontSize: "15px",
            lineHeight: "40px",
            color: "#313033",
            textAlign:"center"
        },
        landingPageTitle:{
            fontFamily: 'Poppins',
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "30px",
            lineHeight: "70px",
            color: "#302F32"
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
        }
    }
  });


export default theme;