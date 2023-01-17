import React,{useEffect, useRef, useState} from 'react'
import { Grid,Typography,FormControl,FormControlLabel,Radio,RadioGroup,CircularProgress,IconButton} from '@mui/material';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon';
import CustomSelect from '../Selects/CustomSelect';
import CustomInput from '../Inputs/CustomInput';
import CustomChips from '../Chips/CustomChips';
import Button from '../Buttons/Button';
import AddIcon from '@mui/icons-material/Add';
import CustomInputBox from '../Inputs/CustomInputBox';
import HorseImageUploadCard from '../Cards/HorseImageUploadCard';
import HorseService from '../../Services/HorseService';
import CustomSnackBar from '../SnackBar/CustomSnackBar';
import { useNavigate } from 'react-router-dom';

const SellerContent = () => {

    const [keywords,setKeywords] = useState([]);
    const [keywordVal,setKeywordVal] = useState("");

    const [loading,setLoading] = useState(false);
    const [keywordLoading,setKeywordLoading] = useState(false);

    const [horseData,setHorseData] = useState({images_id:[],title:"",year_of_birth:"",location_id:"",user_location:"",price:"",description:"",breed_id:"",gender:"",color_id:"",height:"",temperament_id:"",discipline_id:"",keywords_id:[]});
    const [files, setFiles] = useState([]);
    const [snackBarData,setSnackBarData] = useState({
        open:false,
        message:"",
        severity:"success"
    });

    const inputFile = useRef(null);

    const navigate = useNavigate();



const uploadImage = async (image)=>{
    setLoading(true)
    const response = await HorseService.saveHorseImage(image);
    setLoading(false)
    let horse_images = [...horseData.images_id]
    horse_images.push(response.id)
    setHorseData({...horseData,images_id:horse_images})
    setFiles([...files,{id:response.id,image:image}]);
  }

const handleFileInputChange = async e => {
    await uploadImage(e.target.files[0])
}

const keywordClick = async ()=>{
    setKeywordLoading(true)
    const response = await HorseService.saveHorseKeyword(keywordVal)
    let horse_keywords = [...horseData.keywords_id]
    horse_keywords.push(response.id)
    setHorseData({...horseData,keywords_id:horse_keywords})
    setKeywords([...keywords,{id:response.id,value:keywordVal}])
    setKeywordLoading(false)
    setKeywordVal("")
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(function (position) {
        setHorseData({...horseData,user_location:`${position.coords.latitude},${position.coords.longitude}`})
    });
  },[horseData.user_location])

 const submitHorse = async (button_type_click="add_another")=>{

    if(horseData.images_id.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Minimum 1 image is required",severity:"error"})
    }
    else if (horseData.title.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Name of Horse is required",severity:"error"})
    }
    else if (horseData.year_of_birth.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Year of Birth is required",severity:"error"})
    }
    else if (horseData.location_id.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Location is required",severity:"error"})
    }
    else if (horseData.price.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Price is required",severity:"error"})
    }
    else if (horseData.description.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Description is required",severity:"error"})
    }
    else if (horseData.breed_id.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Breed is required",severity:"error"})
    }
    else if (horseData.gender.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Gender is required",severity:"error"})
    }
    else if (horseData.color_id.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Color is required",severity:"error"})
    }
    else if (horseData.height.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Height is required",severity:"error"})
    }
    else if (horseData.temperament_id.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Temperament is required",severity:"error"})
    }
    else if (horseData.discipline_id.length === 0){
        setSnackBarData({...snackBarData,open:true,message:"Discipline is required",severity:"error"})
    }
    else{
        try {
            const response =  await HorseService.saveHorse(horseData)
            setSnackBarData({...snackBarData,open:true,message:"Add posted",severity:"success"})
            if( button_type_click === "add_another"){
                setHorseData({images_id:[],title:"",year_of_birth:"",location_id:"",user_location:"",price:"",description:"",breed_id:"",gender:"",color_id:"",height:"",temperament_id:"",discipline_id:"",keywords_id:[]})
                setFiles([])
            }
            else{
                return navigate(`/home/horse?id=${response.id}`)
            }
        } catch (error) {
            setSnackBarData({...snackBarData,open:true,message:error.response.data.message,severity:"error"})
        }
    }
 } 

  return (
    // seler page starts
    <Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter">
        <CustomSnackBar snackBarData={snackBarData} setSnackBarData={setSnackBarData} />
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
                            <Typography variant="imageDescriptions">First image/video-is the title picture</Typography>
                        </Grid>
                        {/* image upload sub-heading ends */}

                        {/* image upload add button starts */}
                        <Grid item xs={12} className="justifyContentCenter">
                            <input type="file" style={{display:'none'}} ref={inputFile} onChange={handleFileInputChange} accept="image/png,image/jpeg,image/jpg,video/*"/>
                            <IconButton onClick={()=>{inputFile.current.click()}} disabled={files.length===5 || loading}
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
                                {
                                    files.map((object)=>{
                                        return <Grid item xs={2} key={object.id}>
                                            <HorseImageUploadCard image={object} setFiles={setFiles} files={files} horseData={horseData} setHorseData={setHorseData}/>
                                        </Grid>
                                    })
                                }
                                {
                                    loading?
                                    <CircularProgress sx={{height:"20px",width:"20px",position:"relative",top:"40px"}}/>
                                    :null
                                }
                            </Grid>
                        </Grid>
                        {/* upload images display ends */}
                    </Grid>
                </Grid>
                {/* Image upload ends */}
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Name of Horse</Typography>
                    <CustomInput type="text" onChange={(e)=>{
                        setHorseData({...horseData,title:e.target.value})
                        }} value={horseData.title} placeholder="Enbarr horse"/>
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Location</Typography>
                    <CustomSelect select_type="locations" horseData={horseData} setHorseData={setHorseData}/>
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Breed</Typography>
                    <CustomSelect select_type="breeds" horseData={horseData} setHorseData={setHorseData}/>
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Year of birth</Typography>
                    <CustomInput type="number" onChange={(e)=>{
                        setHorseData({...horseData,year_of_birth:e.target.value})
                        }} value={horseData.year_of_birth} placeholder="2000"/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Height (ft)</Typography>
                    <CustomInput type="number" onChange={(e)=>{
                        setHorseData({...horseData,height:e.target.value})
                        }} value={horseData.height} placeholder="5.1"/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Price ($)</Typography>
                    <CustomInput type="number" onChange={(e)=>{
                        setHorseData({...horseData,price:e.target.value})
                        }} value={horseData.price} placeholder="$5000"/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Discipline</Typography>
                    <CustomSelect select_type="discipline" horseData={horseData} setHorseData={setHorseData}/>
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
                                    name="radio-buttons-group" onChange={(e)=>{
                                        setHorseData({...horseData,gender:e.target.value})
                                    }}>
                                    <FormControlLabel value="Gelding" control={<Radio />} label="Gelding" />
                                    <FormControlLabel value="Mare" control={<Radio />} label="Mare" />
                                    <FormControlLabel value="Stallion" control={<Radio />} label="Stallion" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>
                </Grid>
                {/* Gender select ends */}

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Colors</Typography>
                    <CustomSelect select_type="colors" horseData={horseData} setHorseData={setHorseData}/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Temperaments</Typography>
                    <CustomSelect select_type="temperaments" horseData={horseData} setHorseData={setHorseData}/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Describe your Horse</Typography>
                    <CustomInput type="text" minRows={10} maxRows={20} multiline={true} maxLength={1000} onChange={(e)=>{
                        setHorseData({...horseData,description:e.target.value})
                        }} value={horseData.description} placeholder="write your description here..."/>
                </Grid>

                {/* Input Keywords starts */}
                <Grid item xs={12} sx={{mt:3}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='authInputTitle'>Input Keywords</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CustomInputBox marginRight='0px' title={<IconButton color="secondary" onClick={keywordClick} disabled={keywordLoading || keywordVal.length === 0}
                                sx={{height:"100%",width:"100%"}}>
                                <AddIcon />
                            </IconButton>}direction='end' paddingLeft='5%' maxLength={100} keywordVal={keywordVal}
                                setKeywordVal={setKeywordVal} placeholder="arabian horse etc..."/>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Input Keywords ends */}



                {/* Display Added Keywords starts */}
                <Grid item xs={12} sx={{mt:3}}>
                    <Grid container>
                        {keywords.map((object,idx)=>{
                        return <Grid item xs={3} sx={{mt:2}} key={idx}>
                            <CustomChips title={object} keywords={keywords} setKeywords={setKeywords} horseData={horseData} setHorseData={setHorseData}/>
                            </Grid>
                        })}

                                {    keywordLoading?
                                    <div className="justifyContentCenter"style={{width:"100%"}}>
                                        <CircularProgress sx={{height:"20px",width:"20px"}}/>
                                    </div>
                                    :null
                                }
                    </Grid>
                </Grid>
                {/* Display Added Keywords ends */}

                <Grid item xs={12} sx={{mt:3}}>
                    <Button title="Add another" color='#313033' backgroundColor='#868686' width="100%" onClick={e => submitHorse("add_another")}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='imageDescriptions'>Available for premium users (up to 10 horses)</Typography>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Button title="Create" width="100%" onClick={submitHorse}/>
                </Grid>
            </Grid>
            {/* main container ends */}
        </Grid>
    </Grid>
    // seler page ends
  )
}

export default SellerContent