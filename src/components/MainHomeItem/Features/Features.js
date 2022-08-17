import React from 'react';
import './Features.scss'
import img1 from './pizza-deliver.png'
import img2 from './recommended-food.png'
import img3 from './food-delivery.png'



const Features = () => {
  return (
    <div className='mb-5 my-5 container'>
      <div className='row features-main' >
        <div className='col-md-8' >
          <div className='row features-body py-3 '>
            <h4 className='text-center  fw-bold  text-dark'>Our Restaurants Features</h4>
            <p className='text-center text-light mb-4'>our service is very quickly & food quality is well</p>

            <div className='col-md-4 col-4' >
              <div className='card py-4'>
                <div className=' py-2 text-center'>
                  <img src={img2} alt="" />
                </div>
                <div className='card-body text-center'>
                  <p className='fw-bold' style={{fontSize:'1.5vh'}}>Qualtity Food</p>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-4 '>
              <div className='card py-4'>
                <div className=' py-2 text-center'>
                  <img src={img1} alt="" className='' />
                </div>
                <div className='card-body text-center'>
                  <p className='fw-bold' style={{fontSize:'1.5vh'}}>Quick Delivery</p>
                </div>
              </div>
            </div>
            <div className='col-md-4 col-4'>
              <div className='card py-4'>
                <div className=' py-2 text-center'>
                  <img src={img3} alt="" />
                </div>
                <div className='card-body text-center '>
                  <p className='fw-bold' style={{fontSize:'1.5vh'}}>Online Order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;