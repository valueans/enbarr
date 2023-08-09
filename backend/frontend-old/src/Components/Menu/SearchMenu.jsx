import React,{useEffect, useState} from 'react';
import {Menu,Grid,Typography,IconButton,CircularProgress} from '@mui/material';
import SearchIcon from '../Svgs/SearchIcon';
import CustomInput from '../Inputs/CustomInput.jsx';
import Button from '../Buttons/Button.jsx'
import HorseService from '../../Services/HorseService';
import SearchHorseCard from '../Cards/SearchHorseCard';

const SearchMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      //   function to close main notification dailog or menu
      const handleClose = () => {
        setAnchorEl(null);
      };

      const [inpuptVal,setInputVal] = useState("");
      const [horses,setHorses] = useState([]);
      const [totalHorseCount,setTotalHorseCount] = useState(0);
      const [disableButton,setDisableButton] = useState(true);
      const [page,setPage] = useState(1);
      const [loading,setLoading] = useState(false);

    const searchHorse = async ()=>{ 
        setLoading(true)
        const response = await HorseService.searchHorse(inpuptVal,page);
        setHorses([...horses,...response.results])
        setTotalHorseCount(response.count)
        setDisableButton(true)
        setLoading(false)
    }

    useEffect(()=>{
        searchHorse();
    },[page])

    

  return (
    <>
    <SearchIcon className="headerIcons" id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
            aria_haspopup="true" aria_expanded={open ? 'true' : undefined} onClick={handleClick} />
    <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}>
         <Grid container sx={{minWidth:"600px",maxWidth:"600px",p:4,maxHeight:"600px",overflow:"scroll"}} spacing={2}>
            <Grid item xs={5} sx={{textAlign:"start"}}>
                <Typography variant="notification">Search Horses</Typography>
            </Grid>
            <Grid item xs={10}>
                <CustomInput value={inpuptVal} onChange={(e)=>{
                    setInputVal(e.target.value);
                    if (e.target.value.length !== 0){
                        setDisableButton(false)
                    }
                }}/>
            </Grid>
            <Grid item xs={2}>
                <Button title="Search" width="100%" onClick={searchHorse} disabled={disableButton} borderRadius='10px'/>
            </Grid>

            <Grid xs={12} sx={{mt:3}}>
            {
                horses.map((element)=>{
                    return(
                        <SearchHorseCard element={element} key={element.id}/>
                    )
                })
            }
            {    loading?
                        <div className="justifyContentCenter" style={{width:"100%"}}>
                            <CircularProgress sx={{height:"20px",width:"20px"}}/>
                        </div>
                        :null
            }
            </Grid>
         </Grid>
         {
            totalHorseCount > 20*page ?
            <Grid item container xs={12} className="justifyContentCenter">
                <IconButton onClick={()=>{
                    let current_page = page+1
                    setPage(current_page)
                    }}><Typography variant="button" sx={{color:"#8F8F8F"}}>show more...</Typography></IconButton>
            </Grid> :""
        }
    </Menu>
    </>
  )
}

export default SearchMenu