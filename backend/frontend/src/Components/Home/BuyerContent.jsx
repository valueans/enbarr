import React, { useEffect, useState } from 'react'
import { Grid,Typography,FormControl,FormControlLabel,Radio,RadioGroup, CircularProgress} from '@mui/material';
import LongHorizontalLineIcon from '../Svgs/LongHorizontalLineIcon';
import CustomInputBox from '../Inputs/CustomInputBox';
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from '@mui/material';
import CustomChips from '../Chips/CustomChips';
import Button from '../Buttons/Button';
import HorseService from '../../Services/HorseService';
import BuyerService from '../../Services/BuyerService';
import BreedSelect from '../Selects/BreedSelect';
import DisciplineSelect from '../Selects/DisciplineSelect';
import ColorsSelect from '../Selects/ColorsSelect';
import TemperamentSelect from '../Selects/TemperamentSelect';
import LocationSelect from '../Selects/LocationSelect';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import StateSelect from '../Selects/StateSelect';
import CitiesSelect from '../Selects/CitiesSelect';
import RadiusSelect from '../Selects/RadiusSelect';
import GoogleMapsCluster from '../Maps/GoogleMapsCluster';

const BuyerContent = ({setSnackBarData,lat,lng}) => {
  
  const navigator = useNavigate();

  const isAuthenticated = AuthService.checkUserAuthenticated();

  useEffect(() => {
    if (!isAuthenticated){
      navigator("/")   
    }
  },[isAuthenticated,navigator])

  const [allHorseLatLng,setAllHorseLatLng] = useState([]);
  const [keywords,setKeywords] = useState([]);
  const [keywordVal,setKeywordVal] = useState("");
  const [keywordLoading,setKeywordLoading] = useState(false);

  const [userSearchSaveData,setUserSearchSaveData] = useState({country:"",city:"",state:"",breed_id:"",min_age:"",max_age:"",min_height:"",max_height:"",min_price:"",max_price:"",discipline_id:"",gender:[],gender_list:[],color_id:"",temperament_id:"",keywords_id:[],radius:20});


  const handleMatch = async ()=>{
    try {
      await HorseService.getMatchHorse(); 
      return navigator('/home/matchhorses')
    } catch (error) {
      setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
    }

  }

  const keywordClick = async ()=>{
    setKeywordLoading(true)
    try {
      const response = await HorseService.saveHorseKeyword(keywordVal)
      let user_keywords_ids = userSearchSaveData.keywords_id?userSearchSaveData.keywords_id:[]
      user_keywords_ids.push(response.id)
      setUserSearchSaveData({...userSearchSaveData,keywords_id:user_keywords_ids})
      setKeywords([...keywords,{id:response.id,keyword:keywordVal}])
      setKeywordLoading(false)
      setKeywordVal("") 
    } catch (error) {
      if (error.response?.data.message){
        setSnackBarData({open:true,message:error.response.data.message,severity:"error"})
      }
      else{
        setSnackBarData({open:true,message:"Something went wrong",severity:"error"})
      }
    }
    setKeywordLoading(false)
  }

  useEffect(()=>{
    const getUserSearchSave = async ()=>{
      try {
        const response = await BuyerService.getSaveBuyersSearch();
        if (response.length > 0){
          setUserSearchSaveData(response[0])
          if(response[0].keywords.length > 0){
            setUserSearchSaveData({...response[0],keywords_id:response[0].keywords.map((object)=>object.id)})
          }
          setKeywords(response[0].keywords)
        }
      } catch (error) {
          setSnackBarData({open:true,message:"something went wrong",severity:"error"})
      }
    }
    const getAllHorsesLatLng = async ()=>{
      try {
        const response = await HorseService.getAllHorsesLatLng();
        setAllHorseLatLng(response) 
      } catch (error) {
        setSnackBarData({open:true,message:"something went wrong",severity:"error"})
      }
    }
    getUserSearchSave()
    getAllHorsesLatLng()
  },[])

  const onSave = async ()=>{
    try {
      await BuyerService.saveSaveBuyersSearch(userSearchSaveData);
      setSnackBarData({open:true,message:"Successfull",severity:"success"})
    } catch (error) {
        setSnackBarData({open:true,message:"something went wrong",severity:"error"})
    }
  }


  return (
    <Grid container sx={{minHeight:"calc(100vh - 101px)"}} className="justifyContentCenter" id="root">
      <Grid item xs={12} lg={6} sx={{background:"#FFFFFF",borderRadius:"15px",marginTop:"39px",padding:"65px"}}>
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
          {/* Google Maps starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <GoogleMapsCluster lat={lat} lng={lng} allHorseLatLng={allHorseLatLng}/>
          </Grid>
          {/* Google Maps ends */}
          {/* search radius input starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Search Radius</Typography>
            <RadiusSelect userSearchSaveData={userSearchSaveData} setUserSearchSaveData={setUserSearchSaveData}/>
          </Grid>
          {/* search radius input ends */}
          {/* Location dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Locations</Typography>
            <LocationSelect horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
          </Grid>
          {/* Location dropdown ends */}
          {/* Location dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>States</Typography>
            <StateSelect horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
          </Grid>
          {/* Location dropdown ends */}
          {/* Location dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Cities</Typography>
            <CitiesSelect horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
          </Grid>
          {/* Location dropdown ends */}

          {/* Breed dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Breed</Typography>
            <BreedSelect horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
          </Grid>
          {/* Breed dropdown ends */}

          {/* Age Inputs starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Age</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{maxHeight:"60px"}}>
              <Grid item xs={6} sx={{pr:2}}>
                <CustomInputBox title="Min" dis type="number" onChange={(e)=>{
                        setUserSearchSaveData({...userSearchSaveData,min_age:e.target.value})
                  }} value={userSearchSaveData.min_age} placeholder="5.1"/>
              </Grid>
              <Grid item xs={6} sx={{pl:2}}>
                <CustomInputBox title="Max" type="number" onChange={(e)=>{
                        setUserSearchSaveData({...userSearchSaveData,max_age:e.target.value})
                  }} value={userSearchSaveData.max_age} placeholder="5.1"/>
              </Grid>
            </Grid>
          </Grid>

          {/* Age Inputs ends */}

          {/* Height Inputs starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Height (Hands)</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container sx={{maxHeight:"60px"}}>
              <Grid item xs={6} sx={{pr:2}}>
              <CustomInputBox title="Min" type="number" onChange={(e)=>{
                        setUserSearchSaveData({...userSearchSaveData,min_height:e.target.value})
                  }} value={userSearchSaveData.min_height} placeholder="5.1"/>
              </Grid>
              <Grid item xs={6} sx={{pl:2}}>
                <CustomInputBox title="Max" type="number" onChange={(e)=>{
                        setUserSearchSaveData({...userSearchSaveData,max_height:e.target.value})
                  }} value={userSearchSaveData.max_height} placeholder="5.1"/>
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
                <CustomInputBox title="Min" type="number" placeholder="$3000" maxLength={10} onChange={(e)=>{
                        setUserSearchSaveData({...userSearchSaveData,min_price:e.target.value})
                  }} value={userSearchSaveData.min_price}/>
              </Grid>
              <Grid item xs={6} sx={{pl:2}}>
              <CustomInputBox title="Max" type="number" placeholder="$5000" maxLength={10} onChange={(e)=>{
                        setUserSearchSaveData({...userSearchSaveData,max_price:e.target.value})
                  }} value={userSearchSaveData.max_price}/>
              </Grid>
            </Grid>
          </Grid>

          {/* Price Inputs ends */}

          {/* Discipline dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Discipline</Typography>
            <DisciplineSelect horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
          </Grid>
          {/* Discipline dropdown ends */}

          {/* Gender select starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='authInputTitle'>Gender</Typography>
              </Grid>
              <Grid item xs={12}>
              <FormControl>
                  <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" defaultValue={"Gelding"}
                      name="radio-buttons-group" onClick={(e)=>{
                          var _genderlist = userSearchSaveData.gender_list?userSearchSaveData.gender_list:[];
                          var _gender = "";
                          if (_genderlist.includes(e.target.value)){
                            _genderlist = _genderlist.filter((item)=>item!==e.target.value);
                          }
                          else{
                            _genderlist.push(e.target.value)
                          }
                          _gender = _genderlist.join(",");
                          setUserSearchSaveData({...userSearchSaveData,gender:_gender?_gender:"",gender_list:_genderlist})
                      }}>
                      <FormControlLabel value="Gelding" control={<Radio checked={userSearchSaveData.gender_list?.includes("Gelding")}/>} label="Gelding" />
                      <FormControlLabel value="Mare" control={<Radio checked={userSearchSaveData.gender_list?.includes("Mare")}/>} label="Mare" />
                      <FormControlLabel value="Stallion" control={<Radio checked={userSearchSaveData.gender_list?.includes("Stallion")}/>} label="Stallion" />
                  </RadioGroup>
              </FormControl>
              </Grid>

            </Grid>
          </Grid>
          {/* Gender select ends */}

          {/* Color dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Color</Typography>
            <ColorsSelect horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
          </Grid>
          {/* Color dropdown ends */}

          {/* Temperament dropdown starts */}
          <Grid item xs={12} sx={{mt:3}}>
            <Typography variant='authInputTitle'>Temperament</Typography>
            <TemperamentSelect horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
          </Grid>
          {/* Temperament dropdown ends */}

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
                  direction='end' 
                  paddingLeft='5%' 
                  maxLength={100} 
                  value={keywordVal}
                  setKeywordVal={setKeywordVal} 
                  placeholder="arabian horse etc..." 
                  onChange={(e)=>{
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
                      <CustomChips title={object} keywords={keywords} setKeywords={setKeywords} horseData={userSearchSaveData} setHorseData={setUserSearchSaveData}/>
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

          {/* Buttons starts */}
          <Grid item xs={12}>
              <Grid container>
                  <Grid item xs={12} sx={{mt:2,pr:2}}><Button title="save" width="100%" onClick={onSave}/></Grid>
                  <Grid item xs={6} sx={{mt:2,pr:2}}><Button title="clear" width="100%" backgroundColor='#F4F4F4' color="#313033" onClick={()=>{
                    setUserSearchSaveData({location_id:"",breed_id:"",min_age:"",max_age:"",min_height:"",max_height:"",min_price:"",max_price:"",discipline_id:"",gender:"",color_id:"",temperament_id:"",keywords_id:[]})
                  }}/></Grid>
                  <Grid item xs={6} sx={{mt:2,pl:2}}>
                    <Button title="match" width="100%" onClick={handleMatch}/>
                    </Grid>
              </Grid>
          </Grid>
          {/* Buttons ends */}

        </Grid>
      </Grid>
    </Grid>
  )
}

export default BuyerContent