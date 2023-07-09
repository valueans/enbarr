import React,{useEffect, useRef, useState} from 'react'
import { Grid,Typography,FormControl,FormControlLabel,Radio,RadioGroup,CircularProgress,IconButton} from '@mui/material';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon';
import CustomInput from '../Inputs/CustomInput';
import CustomChips from '../Chips/CustomChips';
import Button from '../Buttons/Button';
import AddIcon from '@mui/icons-material/Add';
import CustomInputBox from '../Inputs/CustomInputBox';
import HorseImageUploadCard from '../Cards/HorseImageUploadCard';
import HorseService from '../../Services/HorseService';
import CustomSnackBar from '../SnackBar/CustomSnackBar';
import { useLocation, useNavigate } from 'react-router-dom';
import BreedSelect from '../Selects/BreedSelect';
import DisciplineSelect from '../Selects/DisciplineSelect';
import ColorsSelect from '../Selects/ColorsSelect';
import TemperamentSelect from '../Selects/TemperamentSelect';
import AuthService from '../../Services/AuthService';
import SellerGoogleMaps from '../Maps/SellerGoogleMaps';

const SellerContent = ({lat,lng,setLat,setLng}) => {

    const [editHorse,setEditHorse] = useState(false)
    const [editHorseId,setEditHorseId] = useState(null)

    const location = useLocation();

    const [keywords,setKeywords] = useState([]);
    const [keywordVal,setKeywordVal] = useState("");

    const [loading,setLoading] = useState(false);
    const [keywordLoading,setKeywordLoading] = useState(false);

    const [innerLat,setInnerLat] = useState(lat?lat:location?.state?.lat);
    const [innerLng,setInnerLng] = useState(lng?lng:location.state?.lng);

    const [horseData,setHorseData] = useState({images_id:[],title:"",year_of_birth:"",country:"",price:"",description:"",breed_id:"",gender:"",color_id:"",height:"",temperament_id:"",discipline_id:"",keywords_id:[],user_location:`POINT(${lng} ${lat})`});
    const [files, setFiles] = useState([]);
    const [snackBarData,setSnackBarData] = useState({
        open:false,
        message:"",
        severity:"success"
    });

    const inputFile = useRef(null);

    const navigate = useNavigate();

    const isAuthenticated = AuthService.checkUserAuthenticated();

    useEffect(() => {
      if (!isAuthenticated){
        navigate("/")   
      }
    },[isAuthenticated,navigate])


    useEffect(()=>{
        setHorseData({...horseData,user_location:`POINT(${innerLng} ${innerLat})`})
        setLat(innerLat)
        setLng(innerLng)
    },[innerLat,innerLng])

const uploadImage = async (image)=>{
    setLoading(true)
    const response = await HorseService.saveHorseImage(image);
    setLoading(false)
    let horse_images = [...horseData.images_id]
    horse_images.push(response.id)
    setHorseData({...horseData,images_id:horse_images})
    setFiles([...files,{id:response.id,image:image,file_type:response?.file_type}]);
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
    setKeywords([...keywords,{id:response.id,keyword:keywordVal}])
    setKeywordLoading(false)
    setKeywordVal("")
  }

  useEffect(()=>{
    if (location?.state?.editHorse){
        setFiles(location.state.images)
        setEditHorse(true)
        setEditHorseId(location.state.horse_id)
        setLoading(true)
        setInnerLat(location.state.horseData.lat)
        setInnerLng(location.state.horseData.lng)
        setTimeout(()=>{
            setHorseData(location.state.horseData)
            setKeywords(location.state.keywords)
            setLoading(false)
        },5000)
    }
  },[])

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
            let response = ""
            if(editHorse){
                const _response =  await HorseService.updateHorse(horseData,editHorseId)
                response = _response
            }
            else{
                const _response =  await HorseService.saveHorse(horseData)
                response = _response
            }
            setSnackBarData({...snackBarData,open:true,message:"Add posted",severity:"success"})
            if( button_type_click === "add_another"){
                setHorseData({images_id:[],title:"",year_of_birth:"",country:"",user_location:"",price:"",description:"",breed_id:"",gender:"",color_id:"",height:"",temperament_id:"",discipline_id:"",keywords_id:[]})
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
    <Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter" id="root">
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

                {/* line starts */}
                <Grid item xs={12}>
                    <SellerGoogleMaps lat={innerLat} lng={innerLng} setLat={setInnerLat} setLng={setInnerLng}/>
                </Grid>
                {/* line ends */}

                {/* Sub heading starts */}
                <Grid item xs={12} sx={{mt:3}}>
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
                    <Typography variant='authInputTitle'>Name of Horse <span style={{color:"red"}}>*</span></Typography>
                    <CustomInput type="text" onChange={(e)=>{
                        setHorseData({...horseData,title:e.target.value})
                        }} value={horseData?.title} />
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Breed <span style={{color:"red"}}>*</span></Typography>
                    <BreedSelect horseData={horseData} setHorseData={setHorseData}/>
                </Grid>

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Year of birth <span style={{color:"red"}}>*</span></Typography>
                    <CustomInput type="number" onChange={(e)=>{
                        setHorseData({...horseData,year_of_birth:e.target.value})
                        }} value={horseData?.year_of_birth}/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Height (Hands) <span style={{color:"red"}}>*</span></Typography>
                    <CustomInput type="number" onChange={(e)=>{
                        setHorseData({...horseData,height:e.target.value})
                        }} value={horseData?.height} />
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Price ($) <span style={{color:"red"}}>*</span></Typography>
                    <CustomInput type="number" onChange={(e)=>{
                        setHorseData({...horseData,price:e.target.value})
                        }} value={horseData?.price} />
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Discipline <span style={{color:"red"}}>*</span></Typography>
                    <DisciplineSelect horseData={horseData} setHorseData={setHorseData}/>
                </Grid>

                {/* Gender select starts */}
                <Grid item xs={12} sx={{mt:3}}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='authInputTitle'>Gender <span style={{color:"red"}}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue={horseData?.gender?horseData?.gender:"Gelding"}
                                    name="radio-buttons-group" onChange={(e)=>{
                                        setHorseData({...horseData,gender:e.target.value})
                                    }}>
                                    <FormControlLabel value="Gelding" control={<Radio checked={horseData.gender==="Gelding"}/>} label="Gelding" />
                      <FormControlLabel value="Mare" control={<Radio checked={horseData.gender==="Mare"}/>} label="Mare" />
                      <FormControlLabel value="Stallion" control={<Radio checked={horseData.gender==="Stallion"}/>} label="Stallion" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                    </Grid>
                </Grid>
                {/* Gender select ends */}

                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Colors <span style={{color:"red"}}>*</span></Typography>
                    <ColorsSelect horseData={horseData} setHorseData={setHorseData}/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Temperaments <span style={{color:"red"}}>*</span></Typography>
                    <TemperamentSelect horseData={horseData} setHorseData={setHorseData}/>
                </Grid>
                <Grid item xs={12} sx={{mt:3}}>
                    <Typography variant='authInputTitle'>Describe your Horse <span style={{color:"red"}}>*</span></Typography>
                    <CustomInput type="text" minRows={10} maxRows={20} multiline={true} maxLength={1000} onChange={(e)=>{
                        setHorseData({...horseData,description:e.target.value})
                        }} value={horseData?.description}/>
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
                            </IconButton>}
                            direction='end' paddingLeft='5%' maxLength={100} value={keywordVal}
                                setKeywordVal={setKeywordVal} onChange={(e)=>{
                                    setKeywordVal(e.target.value)
                                  }}/>
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
                {
                    !editHorse?
                    <>
                    <Grid item xs={12} sx={{mt:3}}>
                        <Button title="Add another" color='#313033' backgroundColor='#868686' width="100%" onClick={e => submitHorse("add_another")}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='imageDescriptions'>Available for premium users (up to 10 horses)</Typography>
                    </Grid>
                    </>:""
                }
                <Grid item xs={12} sx={{mt:3}}>
                    <Button title={editHorse?"Update":"Create"} width="100%" onClick={submitHorse}/>
                </Grid>
            </Grid>
            {/* main container ends */}
        </Grid>
    </Grid>
    // seler page ends
  )
}

export default SellerContent