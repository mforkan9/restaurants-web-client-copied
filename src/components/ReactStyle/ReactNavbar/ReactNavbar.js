/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './ReactNavbar.scss'
import { ContextUser } from './../../../App';
import { Box, Modal, Typography } from '@mui/material';
import { useEffect } from 'react';
import useLocalDB from './../../Hooks/useLocalDB';
import { getAuth, signOut } from 'firebase/auth';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import img1 from './profile.png'
import ModalNav from './ModalNav/ModalNav';




const ReactNavbar = () => {
    const { value3 } = useContext(ContextUser)
    const [loggedInUser] = value3

    const { cartItems } = useLocalDB()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const auth = getAuth()

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            })
            .catch((error) => {
                // An error happened.
            });
        sessionStorage.clear('idToken')
    }


    const [scrolled, setScrolled] = useState()
    useEffect(() => {
        const handleScroll = _ => {
            if (window.pageYOffset > 1) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return _ => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    //GetTotal.....

    // const totalPrice = order.reduce((acc, curr) => { //calculate total
    //     let cur = curr.price.match(/\d./g).join('') //parse string to integer(cost)
    //     return acc + Number(cur);
    // }, 0)

   
    return (
        <div className='fixed-top'>
            <nav class="navbar navbar-expand-lg navbar-light "

                style={scrolled ? { backgroundColor: 'white' } : { backgroundColor: 'white' }}

            >
                <div class="container-fluid">
                    <div class="" id="navbarSupportedContent">
                        <Link to='/'>
                            <a class="navbar-brand mt-2 container" href="">
                                <div className='d-flex text-dark logo-div'>
                                    <RestaurantMenuIcon fontSize='large' className='icon'></RestaurantMenuIcon>
                                    <h4>foodBrand</h4>
                                </div>
                            </a>
                        </Link>
                    </div>
                    <div class="d-flex align-items-center">
                        <ul class="navbar-nav me-auto  mb-lg-0">
                            {/* <li class="nav-item">
                                <a class="nav-link me-3" href="#">Dashboard</a>
                            </li> */}
                        </ul>

                        <a href="#" class="cart position-relative d-inline-flex m-2 me-4 " aria-label="View your shopping cart" onClick={handleOpen}>
                            <i class="zmdi zmdi-shopping-cart  zmdi-hc-2x carted "></i>
                            <span class="cart-basket d-flex align-items-center justify-content-center">
                                {cartItems.length}
                            </span>
                        </a>
                        <div>
                            {
                                sessionStorage.getItem('idToken') ||
                                    loggedInUser.email ?


                                    <div class="dropdown me-2">
                                        <a
                                            class="dropdown-toggle d-flex align-items-center hidden-arrow "
                                            href='#'
                                            id="navbarDropdownMenuAvatar"
                                            role="button"
                                            data-mdb-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {
                                                loggedInUser.photoURL === null ?

                                                    <img
                                                        src={img1}
                                                        class="rounded-circle"
                                                        height="40"
                                                        alt="Avatar"
                                                        loading="lazy"
                                                    />
                                                    :

                                                    <img
                                                        src={loggedInUser.photoURL}
                                                        class="rounded-circle border"
                                                        height="40"
                                                        alt="Avatar"
                                                       
                                                    />
                                            }

                                        </a>
                                        <ul
                                            class="dropdown-menu dropdown-menu-end py-4 px-3 border"
                                            aria-labelledby="navbarDropdownMenuAvatar"
                                        >
                                            <div className='text-center'>
                                                <i class="fa-solid fa-circle-user fa-5x text-primary"></i>
                                                <p className='my-2 fw-bold mb-0'>{loggedInUser.displayName}</p>
                                            </div>
                                            <hr />
                                            <li>

                                                <Link to='/dashboard' className='dropdown-item d-flex'><i class="bi bi-speedometer fs-5 me-2"></i> <a class="my-1 text-dark" href="#">  Admin Dashboard</a>

                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/userDashboard' className='dropdown-item d-flex'> <i class="bi bi-person-circle fs-5 me-2"></i>  <a class="my-1 text-dark" href="#"> My Profile</a> </Link>
                                            </li>

                                            {/* <li>
                                                <a class="dropdown-item" href="#">Settings</a>
                                            </li> */}
                                            <li onClick={handleSignOut} >
                                                <span className='dropdown-item d-flex'>
                                                    <i class="bi bi-box-arrow-left fs-5 me-2"></i> <a class="my-1 text-dark" href="#">Logout</a>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    : <Link to='/login'><button className='btn btn-outline-primary btn-rounded hover-zoom'>login</button></Link>}
                        </div>
                    </div>
                </div>
            </nav>
            {/* <nav class="navbar navbar-expand-md navbar-light bg-light">
                <a href="#" class="navbar-brand ms-3">Brand</a>
                <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <div class="navbar-nav">

                    </div>
                    <form class="form-inline">
                        <div class="input-group">
                            <input style={{ width: '500px', borderRadius: '20px' }} type="text" class="form-control" placeholder="Search" />
                            <div class="input-group-append">
                                <button type="button" style={{ borderRadius: '20px' }} class="btn btn-secondary"><i class="zmdi zmdi-search"></i></button>
                            </div>
                        </div>
                    </form>
                    <div class="navbar-nav">
                        <Link to='/login'>Login</Link>
                        <Link to='/dashboard' class="nav-item nav-link me-2">Dashboard</Link>
                        <a href="#" class="nav-item nav-link me-2">Login</a>
                        <a href="#" class="cart position-relative d-inline-flex m-2 me-3" aria-label="View your shopping cart" onClick={handleOpen}>
                            <i class="zmdi zmdi-shopping-cart  zmdi-hc-2x"></i>
                            <span class="cart-basket d-flex align-items-center justify-content-center">
                                {order.length}
                            </span>
                        </a>
                    </div>
                </div>
            </nav> */}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
            >
                <ModalNav></ModalNav>

            </Modal>
        </div>
    );
};

export default ReactNavbar;