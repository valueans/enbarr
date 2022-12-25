import React,{useState} from 'react'
import { Grid,Typography,FormControl,FormControlLabel,Radio,RadioGroup} from '@mui/material';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon';
import CustomSelect from '../Selects/CustomSelect';
import CustomInput from '../Inputs/CustomInput';
import CustomChips from '../Chips/CustomChips';
import Button from '../Buttons/Button';
import {IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomInputBox from '../Inputs/CustomInputBox';
import HorseImageUploadCard from '../Cards/HorseImageUploadCard';

const SellerContent = () => {
    const [keywords,setKeywords] = useState([]);
  const [keywordVal,setKeywordVal] = useState("");


  const keywordClick = ()=>{
    setKeywords(keywords => [...keywords,<CustomChips title={keywordVal}/>])
  }

  return (
    // seler page starts
    <Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter">
        <Grid item xs={12} lg={6} sx={{background:"#FFFFFF",borderRadius:"15px",marginTop:"39px",padding:"65px"}}>
            {/* main container starts */}
            <Grid container>
                {/* title starts */}
                <Grid item xs={12}>
                    <Typography variant='authTitle'>Seller</Typography>
                </Grid>
                {/* title ends */}
                {/* line starts */}
                <Grid item xs={12}>
                    <LongHorizontalLineIcon />
                </Grid>
                {/* line ends */}

                {/* Sub heading starts */}
                <Grid item xs={12}>
                    <Typography variant='authInputTitle'>Add a horse</Typography>
                </Grid>
                {/* Sub heading ends */}

                {/* Image upload starts */}
                <Grid item xs={12}>
                    <Grid container
                        sx={{border: "2px dashed #666666",minHeight:"400px",borderRadius:"15px",p:4,margin:"0 auto"}}>
                        {/* image upload heading starts */}
                        <Grid item xs={12} className="justifyContentCenter">
                            <Typography variant="authInputTitle">Upload image/video</Typography>
                        </Grid>
                        {/* image upload heading ends */}
                        {/* image upload sub-heading starts */}
                        <Grid item xs={12} className="justifyContentCenter">
                            <Typography variant="imageDescriptions">First image/video-is the title picture, Drag to
                                change the order</Typography>
                        </Grid>
                        {/* image upload sub-heading ends */}

                        {/* image upload add button starts */}
                        <Grid item xs={12} className="justifyContentCenter">
                            <IconButton
                                sx={{border: "1.65909px solid #666666",height:"73px",width:"73px",borderRadius:"15px"}}>
                                <AddIcon sx={{height:"100%",width:"100%"}} />
                            </IconButton>
                        </Grid>
                        {/* image upload add button ends */}

                        {/* image upload sub-heading starts */}
                        <Grid item xs={12} className="justifyContentCenter">
                            <Typography variant="imageDescriptions">Upload up to 5 images/3 videos (max of 90 seconds)
                            </Typography>
                        </Grid>
                        {/* image upload sub-heading ends */}

                        {/* upload images display starts */}
                        <Grid item xs={12} className="justifyContentCenter">
                            <Grid container className="justifyContentCenter">
                                <Grid item xs={2}>
                                    <HorseImageUploadCard />
                                </Grid>
                                <Grid item xs={2}>
                                    <HorseImageUploadCard />
                                </Grid>
                                <Grid item xs={2}>
                                    <HorseImageUploadCard />
                                </Grid>
                                <Grid item xs={2}>
                                    <HorseImageUploadCard />
                                </Grid>
                                <Grid item xs={2}>
                                    <HorseImageUploadCard />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* upload images display ends */}
                    </Grid>
                </Grid>
                {/* Image upload ends */}
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Name of Horse</Typography>
                    <CustomInput type="text" />
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Location</Typography>
                    <CustomSelect />
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Breed</Typography>
                    <CustomSelect />
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Year of birth</Typography>
                    <CustomInput type="text" />
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Height</Typography>
                    <CustomInput type="text" />
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Price</Typography>
                    <CustomInput type="text" />
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Breed</Typography>
                    <CustomSelect />
                </Grid>

                {/* Gender select starts */}
                <Grid item xs={12} sx={{mt:3}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='authInputTitle'>Gender</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
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
                                </IconButton> direction='end' paddingLeft='5%' maxLength={100} keywordVal={keywordVal}
                                setKeywordVal={setKeywordVal}/>
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

                <Grid item xs={12} sx={{mt:3}}>
                    <Button title="Add another" color='#313033' backgroundColor='#868686' width="100%"/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='imageDescriptions'>Available for premium users (up to 10 horses)</Typography>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Button title="Create" width="100%"/>
                </Grid>
            </Grid>
            {/* main container ends */}
        </Grid>
    </Grid>
    // seler page ends
  )
}

export default SellerContent