import React from 'react';
import './ReactCategoriesNav.scss'
import img1 from './coffee.png'
import img2 from './meal.png'
import img3 from './dinner.png'
import img4 from './spoon-and-fork-crossed.png'
import { Link } from 'react-router-dom';





const ReactCategoriesNav = () => {
    return (
        <div className='categoryMain container'>
            <div className='row'>
                
                <div className='col-md-3 col-lg-3 col-3 breakfast'>
              <Link to={'/morebreakfast'}>
                    <img src={img1} alt="" />
                    <h5>Breakfast</h5>
                    </Link>
                </div>
                
                <div className='col-md-3 col-3 lunch'>
                    <Link to={'/morelunch'}>
                    <img src={img2} alt="" />
                    <h5>Lunch</h5>
                    </Link>
                </div>
                <div className='col-md-3  col-3 dinner'>
                    <Link to={'/moredinner'}>
                    <img src={img3} alt="" />
                    <h5>Dinner</h5>
                    </Link>
                </div>
                <div className='col-md-3 col-3 snacks'>
                    <Link to={'/moresnack'}>
                    <img src={img4} alt="" />
                    <h5>Snacks</h5>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ReactCategoriesNav;