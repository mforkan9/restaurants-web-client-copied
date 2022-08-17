import React, { useEffect, useState } from 'react';
import './Testimonial.scss'
import LetteredAvatar from 'react-lettered-avatar';


const Testimonial = () => {
    const [testimonialData,setTestimonialData] = useState([])

    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/showTestimonial`)
        .then(res => res.json())
        .then(data => setTestimonialData(data))
    }, [])

    return (
        <div className='container mb-5  py-4 '>
            <h4 className='text-center fw-bold'>Reviews</h4>
            <p className='text-center text-muted'>our customers observation</p>
            <div id="carouselExampleControls" class="carousel slide   text-center carousel-dark" data-mdb-ride="carousel">
                <div class="carousel-inner">
                    {
                        testimonialData.map((info,key) => 
                    
                    <div class={key === 0 ? "carousel-item active" : "carousel-item"}>
                        {/* <img class="rounded-circle shadow-1-strong mb-4"
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" alt="avatar"
                            style={{ width: '150px' }} /> */}
                            <div className='mx-5 d-flex justify-content-center mb-4' >
                            <LetteredAvatar name={info.name} size={120} />
                            </div>
  

                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-8">
                                <h5 class="mb-3">{info.name}</h5>
                                <p class="text-muted">
                                    <i class="fas fa-quote-left pe-2"></i>
                                  {info.comment} loremfldksflsdkflk loremfldksflsdkflk loremfldksflsdkflk
                                </p>
                            </div>
                        </div>
                    </div>
                        )
                    }
             
                </div>
                <button class="carousel-control-prev" type="button" data-mdb-target="#carouselExampleControls"
                    data-mdb-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-mdb-target="#carouselExampleControls"
                    data-mdb-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    );
};

export default Testimonial;