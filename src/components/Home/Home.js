import React, { lazy, Suspense } from 'react';
import Navbar from './../MainHomeItem/Navbar/Navbar';
import CategoryNav from '../MainHomeItem/CategoryNav/CategoryNav';
import Features from '../MainHomeItem/Features/Features';
import Footer from '../MainHomeItem/Footer/Footer';
import { CircularProgress } from '@mui/material';

const Header = lazy(() => import('../MainHomeItem/Header/Header'))
const Breakfast = lazy(() => import('../MainHomeItem/Categories/Breakfast/Breakfast'))
const Lunch = lazy(() => import('../MainHomeItem/Categories/Lunch/Lunch'))
const Dinner = lazy(() => import('../MainHomeItem/Categories/Dinner/Dinner'))
const Snacks = lazy(() => import('../MainHomeItem/Categories/Snacks/Snacks'))
const Testimonial = lazy(() => import('../MainHomeItem/Testimonial/Testimonial'))

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>

            <Suspense fallback={<CircularProgress />}>
                <Header></Header>
            </Suspense>

            <CategoryNav></CategoryNav>

            <Suspense fallback={<CircularProgress />}>
             <Breakfast></Breakfast>
            </Suspense>

            <Suspense fallback={<CircularProgress />}>
               <Lunch></Lunch>
            </Suspense>

            <Suspense fallback={<CircularProgress />}>
               <Dinner></Dinner>
            </Suspense>

            <Suspense fallback={<CircularProgress />}>
              <Snacks></Snacks>
            </Suspense>

            <Features></Features>

            <Suspense fallback={<div>Loading...</div>}>
              <Testimonial></Testimonial>
            </Suspense>

            <Footer></Footer>
        </div>
    );
};

export default Home;