import React from "react";
import './styles/app.css';
import theme from './theme';
import { ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import LandingPage from "./Components/Pages/landingPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline/>
      <LandingPage></LandingPage>
    </div>
    </ThemeProvider>
  );
}

export default App;
