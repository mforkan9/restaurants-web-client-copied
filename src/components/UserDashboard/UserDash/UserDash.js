/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import './UserDash.scss'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth';
import { ToggleButton } from '@mui/material';
import { FormatAlignJustify } from '@mui/icons-material';
import MyOrder from '../UserDashItem/MyOrder/MyOrder';
import MyReview from '../UserDashItem/MyReview/MyReview';
import MyAccount from '../UserDashItem/MyAccount/MyAccount';
import MyDashboard from '../UserDashItem/MyDashboard/MyDashboard';
import { ContextUser } from '../../../App';
import LetteredAvatar from 'react-lettered-avatar';



const routes = [
    {
        path: "/userDashboard",
        exact: true,
        main: () => <MyDashboard></MyDashboard>
    },
    {
        path: "/userDashboard/MyReview",
        main: () => <MyReview></MyReview>
    },
    {
        path: "/userDashboard/MyAccount",
        main: () => <MyAccount></MyAccount>
    },
    {
        path: "/userDashboard/MyOrder",
        main: () => <MyOrder></MyOrder>
    }
];

const UserDash = () => {
    const { value3 } = useContext(ContextUser)
    const [loggedInUser] = value3

    const [userSidebarToggle, setUserSidebarToggle] = useState(true)

    const handleToggle = () => {
        setUserSidebarToggle(!userSidebarToggle)
    }

    //console.log(sidebarToggle)


    const auth = getAuth()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
                alert(error)
            });
        sessionStorage.clear('idToken')
    }

    const handleReload = () => {
        setTimeout(() => {
            window.location.reload()
        }, 100);
    }

    return (
        <BrowserRouter>
            <div className='container-fluid bg-light'>
                <div className='row flex-nowrap'>
                    {
                        userSidebarToggle ?

                            <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 userSidebar'>
                                <div className='d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 make-me-sticky'>
                                    <Link to='/' onClick={handleReload}>
                                        <div className='d-flex text-dark logo-div'>
                                            <RestaurantMenuIcon fontSize='large' className='icon'></RestaurantMenuIcon>
                                            <h4>foodBrand</h4>
                                        </div>
                                    </Link>

                                    <ul className='nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start mt-4'>
                                        <li className=''>
                                            <a href='#'> <Link to='/userDashboard' class=" px-0 align-middle">
                                                <i class="fs-4 bi-speedometer2"></i><span class="ms-1 ">Dashboard</span>
                                            </Link></a>
                                        </li>
                                        <li className=''>
                                            <a href='#'> <Link to='/userDashboard/MyOrder' class=" px-0 align-middle">
                                                <i class="fa-solid fa-cart-arrow-down"></i> <span class="ms-1 ">My Order</span>
                                            </Link></a>
                                        </li>
                                        <li className=''>
                                            <a href='#'> <Link to='/userDashboard/MyReview' class=" px-0 align-middle">
                                                <i class="bi bi-pencil-square fs-5"></i> <span class="ms-1 ">Review</span>
                                            </Link></a>
                                        </li>

                                    </ul>
                                    <div class='mb-4 logoutBtn text-dark'>
                                        <a href="#" class="logA px-1 align-middle text-dark" onClick={handleSignOut}>

                                            <i class=" fs-4 bi-box-arrow-left" ></i><span class="ms-1 " >SignOut</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            : ''

                    }

                    <div className='col py-3'>
                        <main className='row overflow-auto'>

                            <nav class="navbar navbar-expand-lg navbar-light ">
                                <div class="container-fluid">
                                    <div class="" id="navbarSupportedContent">

                                        <ToggleButton value="justify" key="justify" onClick={handleToggle}>
                                            <FormatAlignJustify />
                                        </ToggleButton>

                                    </div>
                                    <div class="d-flex align-items-center">
                                        <ul class="navbar-nav me-auto  mb-lg-0">
                                            <li class="nav-item">
                                                <a class="nav-link me-3 fw-bold" href="#">{loggedInUser.displayName}</a>
                                            </li>
                                        </ul>

                                        {/* <a href="#" class="cart position-relative d-inline-flex m-2 me-4 " aria-label="View your shopping cart" >
                      <i class="zmdi zmdi-shopping-cart  zmdi-hc-2x"></i>
                      <span class="cart-basket d-flex align-items-center justify-content-center">
                        
                      </span>
                    </a> */}
                                        <div>
                                            <div class="dropdown me-1">
                                                <a
                                                    class="dropdown-toggle d-flex align-items-center hidden-arrow"
                                                    href='#'
                                                    id="navbarDropdownMenuAvatar"
                                                    role="button"
                                                    data-mdb-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {
                                                        loggedInUser.photoURL === null ?

                                                            <LetteredAvatar name={loggedInUser.displayName} />

                                                            :

                                                            <img
                                                                src={loggedInUser.photoURL}
                                                                class="rounded-circle"
                                                                height="40"
                                                                alt="Avatar"
                                                                loading="lazy"
                                                            />
                                                    }
                                                </a>
                                                <ul
                                                    class="dropdown-menu dropdown-menu-end py-4 px-3"
                                                    aria-labelledby="navbarDropdownMenuAvatar"
                                                >
                                                    <li>

                                                        <Link
                                                            to='/userDashboard/MyAccount'
                                                            className='dropdown-item d-flex'
                                                        >
                                                            <i class="bi bi-person-circle fs-5 me-2"></i>
                                                            <a class="my-1 text-dark" href="#">My Account</a>

                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <span className='dropdown-item d-flex' onClick={handleSignOut}>
                                                            <i class="bi bi-box-arrow-left fs-5 me-2"></i>
                                                            <a class="my-1 text-dark" href="#"> LogOut</a>
                                                        </span>
                                                    </li>

                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </nav>
                            <div class="col pt-4">
                                <Switch>
                                    {routes.map((route, index) => (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            exact={route.exact}
                                            children={<route.main />}
                                        />
                                    ))}
                                </Switch>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default UserDash;