import { Carousel } from '@trendyol-js/react-carousel';
import React, { useContext, useEffect, useState } from 'react';
import './Lunch.scss'
import img1 from './chumil-photo-TK5VlaGqkZc-unsplash.jpg'
import img2 from './farhad-ibrahimzade-07RKITgmScQ-unsplash (1).jpg'
import img3 from './louis-hansel--9CjvlbUGhY-unsplash.jpg'
import img4 from './luisa-brimble-gBNRcViwHwQ-unsplash.jpg'
import img5 from './olayinka-babalola-r01ZopTiEV8-unsplash.jpg'
import { Swiper } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import "swiper/components/pagination/pagination.min.css"
import "swiper/swiper.min.css";

import SwiperCore, { Autoplay } from 'swiper/core';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { ContextUser } from './../../../../App';
SwiperCore.use([Pagination, Autoplay]);



const Lunch = () => {
    const [launchData, setLaunchData] = useState([])
    const { value1 } = useContext(ContextUser)
    const [detailsData, setDetailsData] = value1

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'launch' })
        };
        fetch(`https://boiling-badlands-11783.herokuapp.com/showItem`, requestOptions)
            .then(res => res.json())
            .then(data => setLaunchData(data))
    }, [])

    return (
        <div className='container'>
            <div className="container">
                <div class="row">
                    <div class="col-auto me-auto nameFont"><h5>Lunch</h5></div>
                    <div class="col-auto"> <Link to={'/morelunch'}>More</Link></div>
                </div>
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
                className="launch-main"
            >
                {
                    launchData.map(item => (
                        <SwiperSlide>
                            <div className='one-lunch'>
                                <Link to={`/detailspage/${item._id}`}>
                                    <div className='one-lunch-inner bg-image' onClick={() => setDetailsData(item)}>
                                        <img src={item.imageUrl} className='imag' alt="" />
                                        <div className="row card-body">
                                            <div className='col-md-12 col-12 text-center'>
                                                <p className='mb-0 fw-bold'>{item.name}</p>
                                                <p className='mb-0'>
                                                    <Rating className='mb-2' name="half-rating-read" defaultValue={2.5} precision={0.5} size='small' readOnly />
                                                </p>
                                                <small className='fw-bold'>{item.price}</small>
                                            </div>
                                            {/* <div className="col-md-12 col-12">
                                       <p className='text-start fw-bold p-2'>{item.name}</p>
                                    </div>
                                    <div className="col-md-12">
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

export default Lunch;