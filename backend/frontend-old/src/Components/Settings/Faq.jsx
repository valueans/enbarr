import React,{useState,useEffect} from 'react';
import { Typography } from '@mui/material';
import CommonServices from '../../Services/CommonServices';

const Faq = () => {
  const [data,setData] = useState("");

  useEffect(()=>{
      const getData = async ()=>{
        const response = await CommonServices.getFaq();
        if (response.data.length > 0){
          setData(response.data[0])
        }
      }
      getData()
  },[])


  return (
    <div style={{padding:"20px",minHeight:"calc(100vh - 101px)"}}>
    <Typography variant="authTitle">FAQ</Typography>
    <div id={data.id} dangerouslySetInnerHTML={{__html: data.content}}/>
</div>
  )
}

export default Faq