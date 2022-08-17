import React from 'react';
import './Footer.scss'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className='mt-5'>
            <footer class=" text-dark text-center text-lg-start" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>

                <div class="container py-5">
                    <div class="row container">
                        <div class="col-lg-4 col-md-3  col-6 mb-4 mb-md-0 ">

                            <div className='d-flex text-dark logo-div'>
                                <RestaurantMenuIcon fontSize='large' className='icon'></RestaurantMenuIcon>
                                <h4>foodBrand</h4>
                            </div>
                            <div className='container '>
                                <i class="fa-brands fa-facebook fa-2x"></i>
                                <i class="fa-brands fa-instagram fa-2x mx-3"></i>
                                <i class="fa-brands fa-twitter fa-2x"></i>
                            </div>

                        </div>
                        <div class="col-lg-2 col-md-3 col-6 mb-4 mb-md-0">
                            <h5 class="text fw-bold">Quicks Links</h5>

                            <ul class="list-unstyled mb-0">

                                <li>
                                    <Link to={'/morebreakfast'}><a href="#!" class="text-dark">Breakfast</a></Link>
                                </li>
                                <li>
                                    <Link to={'/morelunch'}><a href="#!" class="text-dark">Lunch</a></Link>
                                </li>
                                <li>
                                    <Link to={'/moredinner'}><a href="#!" class="text-dark">Dinner</a></Link>
                                </li>
                                <li>
                                    <Link to={'/moresnack'}><a href="#!" class="text-dark">Snack</a></Link>
                                </li>

                            </ul>
                        </div>



                        <div class="col-lg-2 col-md-3 col-6 mb-4 mb-md-0">
                            <h5 class="text mb-0 fw-bold">Links</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!" class="text-dark">About</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-dark">Features</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-dark">FAQ</a>
                                </li>
                            </ul>
                        </div>


                        <div class="col-lg-2 col-md-3 mb-4 col-6 mb-md-0">
                            <h5 class="text mb-0 fw-bold">Contact Us</h5>

                            <ul class="list-unstyled">
                                <li>
                                    <a href="#!" class="text-dark">example@gmail.com</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-dark">+8801595994</a>
                                </li>
                                <li>
                                    <a href="#!" class="text-dark">www.example.com</a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>



                <div class="text-center p-3">
                    © {new Date().getFullYear()} Copyright:
                    <a class="text-dark" href="https://mdbootstrap.com/">foodBrand.com</a>
                </div>

            </footer>
        </div>
    );
};

export default Footer;