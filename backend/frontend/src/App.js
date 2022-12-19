import React from "react";
import './styles/app.css';
import theme from './theme';
import { ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import Routes from './Routes/Routes'

function App() {
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
