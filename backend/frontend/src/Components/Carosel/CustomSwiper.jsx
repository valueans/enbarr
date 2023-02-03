import React from 'react'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import HorseCard from '../Cards/HorseCard';
import horseimg from '../../assets/horse.png'
import { useState } from 'react';
import { useEffect } from 'react';
import HorseService from '../../Services/HorseService';
import { useNavigate } from 'react-router-dom';

const CustomSwiper = ({currentHorseId,setCurrentHorseId,setIsLiked,setIsDisLiked}) => {

    const navigator = useNavigate();

    const [matchList,setMatchList] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalAddsCount,setTotalAddsCount] = useState(0);



    useEffect(()=>{
        const getMatchHorse = async () =>{
            try{
                const response = await HorseService.getMatchHorse(currentPage);
                console.log("response",response)   
                setTotalAddsCount(response?.count)
                setMatchList([...matchList,...response?.results])
                if (response.count > 0){
                    setCurrentHorseId(response?.results[0].id)
                    setIsLiked(response?.results[0].isliked)
                    setIsDisLiked(response?.results[0].isdisliked)
                } 
            }
            catch(error){
                console.log("error",error)
            }
        }
        getMatchHorse()
    },[currentPage])

    const handleClick = ()=>{
        return navigator(`/home/horse?id=${currentHorseId}`)
    }


  return (
    <Swiper
    // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSlideChange={(e) => {
            setCurrentHorseId(matchList[e.activeIndex].id)
            setIsLiked(matchList[e.activeIndex].isliked)
            setIsDisLiked(matchList[e.activeIndex].isdisliked)
        }}
        centeredSlides={true}
        onReachEnd={(e) => {
            let totalPages = Math.ceil(totalAddsCount/12)
            if (currentPage < totalPages){
                setCurrentPage(currentPage+1)
            }
        }}
        onClick={handleClick}
    >
        {
            matchList.map((item)=>{
                return <SwiperSlide><HorseCard image={item?.images}/></SwiperSlide>
            })
        }
    </Swiper>
  )
}

export default CustomSwiper