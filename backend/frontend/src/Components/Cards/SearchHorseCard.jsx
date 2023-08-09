import React from 'react'
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const SearchHorseCard = ({element}) => {
    const navigator = useNavigate();

    const route = ()=>{
        return navigator(`/home/horse?id=${element.id}`)
    }
  return (
    <div onClick={route}>
        <Grid container sx={{display:"flex",alignItems:"center",padding:"8px",justifyContent:"center",cursor:"pointer",border:"1px solid transparent",boxShadow:"0px 10px 10px rgba(0, 0, 0, 0.1)",borderRadius:"30px",mt:2,mb:2}}>
            <Grid xs={4}>
                <img src={element?.images[0]?.file} alt="" style={{width:"65px",height:"62px",border:"1px solid transparent",borderRadius:"30px"}}/>
            </Grid>
            <Grid xs={8} md={12}>
                <p>{element.title}</p>
            </Grid>
        </Grid>
    </div>
  )
}

export default SearchHorseCard