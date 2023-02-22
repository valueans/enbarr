import React,{useEffect,useState} from 'react';
import { Typography } from '@mui/material';
import CommonServices from '../../Services/CommonServices';

const TermsAndCondition = () => {
  const [data,setData] = useState("");

  useEffect(()=>{
      const getData = async ()=>{
        const response = await CommonServices.getTermsAndCondition();
        if (response.data.length > 0){
          setData(response.data[0])
        }
      }
      getData()
  },[])

  return (
    <div style={{padding:"20px"}}>
    <Typography variant="authTitle">Terms And Condition</Typography>
    <div id={data.id} dangerouslySetInnerHTML={{__html: data.content}}/>
</div>
  )
}

export default TermsAndCondition