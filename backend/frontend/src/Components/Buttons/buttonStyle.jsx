import Button from '@mui/material/Button';
import {styled } from '@mui/material/styles';

const CustomButton = styled(Button)(({ theme }) => ({
    width: "201px",
    height: "60px",
    borderRadius: "30px",
    backgroundColor:"#313033",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "12px",
    lineHeight: "18px",
    textAlign: "center",
    textTransform:"none",
    color:"#FFFFFF",
    '&:hover': {
        backgroundColor:"#313033",
        color:"#FFFFFF",
        },
  }));
  
export default CustomButton;