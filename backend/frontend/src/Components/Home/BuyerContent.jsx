import React, { useState } from 'react'
import { Grid,Typography,FormControl,FormControlLabel,Radio,RadioGroup} from '@mui/material';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon';
import CustomSelect from '../Selects/CustomSelect';
import CustomInputBox from '../Inputs/CustomInputBox';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from '@mui/material';
import CustomChips from '../Chips/CustomChips';
import Button from '../Buttons/Button';

const BuyerContent = () => {
  
  const [keywords,setKeywords] = useState([]);
  const [keywordVal,setKeywordVal] = useState("");


  const keywordClick = ()=>{
    setKeywords(keywords => [...keywords,<CustomChips title={keywordVal}/>])
  }


  return (
    <Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter">
      <Grid item xs={6} sx={{background:"#FFFFFF",borderRadius:"15px",marginTop:"39px",padding:"65px"}}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='authTitle'>Buyer</Typography>
          </Grid>
          <Grid item xs={12}>
            <LongHorizontalLineIcon />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='authInputTitle'>My preferences</Typography>
          </Grid>
          {/* Location dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Location</Typography>
            <CustomSelect />
          </Grid>
          {/* Location dropdown ends */}

          {/* Breed dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Breed</Typography>
            <CustomSelect />
          </Grid>
          {/* Breed dropdown ends */}

          {/* Age Inputs starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Age</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{maxHeight:"60px"}}>
              <Grid item xs={6} sx={{pr:2}}>
                <CustomInputBox title="Min" />
              </Grid>
              <Grid item xs={6} sx={{pl:2}}>
                <CustomInputBox title="Max" />
              </Grid>
            </Grid>
          </Grid>

          {/* Age Inputs ends */}

          {/* Height Inputs starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Height</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{maxHeight:"60px"}}>
              <Grid item xs={6} sx={{pr:2}}>
                <CustomInputBox title="Min" />
              </Grid>
              <Grid item xs={6} sx={{pl:2}}>
                <CustomInputBox title="Max" />
              </Grid>
            </Grid>
          </Grid>

          {/* Height Inputs ends */}

          {/* Price Inputs starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Price</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{maxHeight:"60px"}}>
              <Grid item xs={6} sx={{pr:2}}>
                <CustomInputBox title="Min" maxLength={10} placeholder="$" />
              </Grid>
              <Grid item xs={6} sx={{pl:2}}>
                <CustomInputBox title="Max" maxLength={10} placeholder="$" />
              </Grid>
            </Grid>
          </Grid>

          {/* Price Inputs ends */}

          {/* Discipline dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Discipline</Typography>
            <CustomSelect />
          </Grid>
          {/* Discipline dropdown ends */}

          {/* Gender select starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='authInputTitle'>Gender</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl onC>
                  <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue="Gelding"
                    name="radio-buttons-group">
                    <FormControlLabel value="Gelding" control={<Radio />} label="Gelding" />
                    <FormControlLabel value="Mare" control={<Radio />} label="Mare" />
                    <FormControlLabel value="Stallion" control={<Radio />} label="Stallion" />
                  </RadioGroup>
                </FormControl>
              </Grid>

            </Grid>
          </Grid>
          {/* Gender select ends */}

          {/* Color dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Color</Typography>
            <CustomSelect />
          </Grid>
          {/* Color dropdown ends */}

          {/* Temperament dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Temperament</Typography>
            <CustomSelect />
          </Grid>
          {/* Temperament dropdown ends */}

          {/* Input Keywords starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='authInputTitle'>Input Keywords</Typography>
              </Grid>
              <Grid item xs={12}>
                <CustomInputBox marginRight='0px' title=<IconButton color="secondary" onClick={keywordClick}
                  sx={{height:"100%",width:"100%"}}>
                  <AddIcon />
                  </IconButton> direction='end' paddingLeft='5%' maxLength={100} keywordVal={keywordVal} setKeywordVal={setKeywordVal}/>
              </Grid>
            </Grid>
          </Grid>
          {/* Input Keywords ends */}
          {/* Display Added Keywords starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Grid container>
              {keywords.map((object,i)=>{
              return <Grid item xs={3} sx={{mt:2}}>{object}</Grid>
              })}
            </Grid>
          </Grid>
          {/* Display Added Keywords ends */}

          {/* Buttons starts */}
          <Grid item xs={12}>
              <Grid container>
                  <Grid item xs={8} sx={{mt:2,pr:2}}><Button title="save" width="100%"/></Grid>
                  <Grid item xs={4} sx={{mt:2,pl:2}}><Button title="Edit" width="100%" backgroundColor='#F4F4F4' color="#313033"/></Grid>
                  <Grid item xs={6} sx={{mt:2,pr:2}}><Button title="clear" width="100%" backgroundColor='#F4F4F4' color="#313033"/></Grid>
                  <Grid item xs={6} sx={{mt:2,pl:2}}><Button title="match" width="100%"/></Grid>
              </Grid>
          </Grid>
          {/* Buttons ends */}

        </Grid>
      </Grid>
    </Grid>
  )
}

export default BuyerContent