import React,{useEffect} from "react";
import './styles/app.css';
import theme from './theme';
import { ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import Routes from './Routes/Routes'
import { useDispatch } from "react-redux";
import CommonServices from "./Services/CommonServices";
import { setSocialLinks } from "./store/actions";

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const getSocialLinks = async ()=>{
      const response = await CommonServices.getSocialLinks();
      if (response.data.length > 0){
        dispatch(setSocialLinks(response.data[0]))
      }
    }
    getSocialLinks()
  },[])



  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline/>
      <Routes />
    </div>
    </ThemeProvider>
  );
}

export default App;
