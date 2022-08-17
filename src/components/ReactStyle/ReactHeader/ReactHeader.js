import React, { useEffect, useState } from 'react';
import './ReactHeader.scss'
import img1 from './penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table.jpg'
import img2 from './chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay.jpg'
import img3 from './dietary-menu-healthy-vegan-salad-vegetables-broccoli-mushrooms-spinach-quinoa-bowl-flat-lay-top-view.jpg'
import { Link } from 'react-router-dom';
const ReactHeader = () => {
  const [discountDataAll, setDiscountDataAll] = useState([])

  useEffect(() => {
    fetch(`https://boiling-badlands-11783.herokuapp.com/showAllProduct`)
      .then(res => res.json())
      .then(data => {
        const list = data.products
        const filtered = list.filter(data => data.discount !== '')
        setDiscountDataAll(filtered)
        
      })
  }, [])




  console.log(discountDataAll)



  return (
    <div className='container '>
      <div id="carouselExampleCaptions" class="carousel slide main-header" data-bs-ride="carousel">
        {/* <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to='3'  aria-label="Slide 3"></button>
  
        </div> */}
        <div class="carousel-inner">
          {
            discountDataAll.map((pd, i) =>

              <div class={i === 0 ? "carousel-item active" : "carousel-item"} key={i}>
                <div className='bg-image hover-zoom ripple slideshow-wrapper'>

                  <img src={pd.imageUrl} class="d-block w-100 img1" alt="..." />
                  <a href="#!">
                    <div class="mask">
                      <div class="d-flex justify-content-end align-items-start h-100 badged">
                        <h5 >

                          <span class="badge bg-danger mt-2">{pd.discount} %</span>
                        </h5>
                      </div>
                    </div>
                    <div class="hover-overlay">
                      <div class="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                    </div>
                  </a>
                </div>
                <div class="carousel-caption d-none d-md-block title">
                  <Link to={`/detailspage/${pd._id}`}> <h5 className='text-primary fw-bold '>{pd.name}</h5></Link>
                  <p className=''>Some representative placeholder content for the first slide.</p>
                </div>
              </div>
            )
          }
        </div>


        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ReactHeader;