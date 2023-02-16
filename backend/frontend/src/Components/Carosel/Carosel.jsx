import React,{useRef, useState} from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import {IconButton} from '@mui/material';
import PlayArrow from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

const Carosel = ({images=[]}) => {

  const [isPlaying,setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const videoRef = useRef(null);

  const handlePlay = ()=>{
      videoRef.current.play();
      setIsPlaying(true);
  }
  const handlePause = ()=>{
      videoRef.current.pause();
      setIsPlaying(false);
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Carousel showArrows={true} swipeable={true} showThumbs={false} useKeyboardArrows={true} onChange={handlePause} >
        {
            images.map((image)=>{
                return <div style={{width:"100%",height:"800px"}} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                    {image?.file_type === 'IMAGE'?
                    <img src={image?.file} alt="img" style={{width:"100%",height:"800px",objectFit:"fill"}}/>:
                    <video src={image?.file} style={{width:"100%",height:"800px",objectFit:"fill"}} ref={videoRef} onEnded={()=>{
                      setIsPlaying(false);
                    }}/>
                  }
                  {image?.file_type === 'VIDEO' && isHovering || image?.file_type === 'VIDEO' && isPlaying === false? 
                  <div className='content' style={{color:"black",position:"absolute",top:"40%",width:"100%",height:"100%",display:"flex",justifyContent:"center",alignContent:'center'}}>
                    <IconButton sx={{background:"rgba(198, 198, 198, 0.8)",width:"146.81px",height:"146.81px"}} onClick={isPlaying?handlePause:handlePlay}>
                      {
                        isPlaying?
                        <PauseIcon sx={{color:"#efefef",height:"80%",width:"80%"}}/>:
                        <PlayArrow sx={{color:"#efefef",height:"80%",width:"80%"}}/>
                      }
                    </IconButton>
                  </div>:""
                  }
                </div>
            })
        }
    </Carousel>
  )
}

export default Carosel