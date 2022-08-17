import React, { useContext } from 'react';
import { useState, useEffect } from 'react';

import './Breakfast.scss'
import img1 from './chris-ralston-09HGdZzkP-Q-unsplash.jpg'
import img2 from './randy-fath-SQ20tWzxXO0-unsplash.jpg'
import img3 from './eiliv-sonas-aceron-uAm1CZMdPCw-unsplash.jpg'
import img4 from './calum-lewis-8Nc_oQsc2qQ-unsplash.jpg'
import { Carousel } from '@trendyol-js/react-carousel';
import { Swiper } from 'swiper/react';
import { SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Navigation } from 'swiper';
import "swiper/components/pagination/pagination.min.css"
import "swiper/swiper.min.css";
import SwiperCore, { Autoplay } from 'swiper/core';
import { CircularProgress, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

SwiperCore.use([Pagination, Autoplay]);


const Breakfast = () => {
    const [breakfastData, setBreakfastData] = useState([])
    const [breakLoading,setLoading] = useState(false)
  

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'breakfast' })
        };
        setLoading(true)
        fetch(`https://boiling-badlands-11783.herokuapp.com/showItem`, requestOptions)
            .then(res => res.json())
            .then(data =>  {
                setBreakfastData(data)
                setLoading(false)
            })
    }, [])


    return (
        <div className='container'>
            <div class="row">
                <div class="col-auto me-auto header-font"><h5>Breakfast</h5></div>
               <div class="col-auto"> <Link to='/morebreakfast'>  More </Link> </div>
            </div>
            <Swiper
                slidesPerView={2}
                spaceBetween={0}
                slidesPerGroup={1}
                //loop={true}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    500: {
                        width: 450,
                        slidesPerView: 2
                    },
                    640: {
                        width: 640,
                        slidesPerView: 2,
                    },
                    720: {
                        width: 720,
                        slidesPerView: 3,
                    },
                    960: {
                        width: 1000,
                        slidesPerView: 4
                    }
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="breakfast-main "
            > 
        
                {
                    breakfastData.map((item,i) => (
                        <SwiperSlide>
                            <div className='one'>
                                <Link to={`/detailspage/${item._id}`}>
                                 <div className='one-inner bg-image text-center' key={i} >
                                    <img src={item.imageUrl} className='imag' alt="" />
             
                                    <div className="row  card-body">
                                        <div className='col-md-12 col-12 text-center'>
                                            <p className='mb-0 fw-bold'>{item.name}</p>
                                            <p className='mb-0'>
                                            <Rating className='mb-2' name="half-rating-read" defaultValue={2.5} precision={0.5} size='small' readOnly  />
                                            </p>
                                            <small className='fw-bold'>{item.price}</small>
                                        </div>
                                        {/* <div className="col-md-12 col-12">
                                           <p className='text-start fw-bold p-2'>{item.name}</p>
                                        </div>
                                        <div className="col-md-12 ">
                                            <div className='row'>
                                            <div className="col-md-7 col-7">
                                            <Rating className='mb-2' name="half-rating-read" defaultValue={2.5} precision={0.5} size='small' readOnly  />

                                            </div>
                                            <div className="col-md-4 col-4">
                                            <p>$ <strong>{item.price}</strong> </p> 
                                            </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div> 
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))
                }
                       
            </Swiper>
        </div>
    );
};

export default Breakfast;