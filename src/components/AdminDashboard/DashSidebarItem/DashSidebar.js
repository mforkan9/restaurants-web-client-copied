/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, useContext, useState } from 'react';
import './DashSidebar.scss'
import {  Collapse,  List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { ContextUser } from '../../../App';
import { getAuth, signOut } from 'firebase/auth';
import img1 from './user.png'


const DashSidebar = () => {
    const [open, setOpen] = useState(false)
    const [orderOpen, setOrderOpen] = useState(false)
    const [isActiveIndex, setIsActiveIndex] = useState(0)
    const { value3 } = useContext(ContextUser)
    const [loggedInUser] = value3


    const handleOpen = () => {
        setOpen(current => !current)
    }
    const handleOrderOpen = () => {
        setOrderOpen(curr => !curr)
    }

    const handleActive = (event, index) => {
        setIsActiveIndex(index)
    }


    const handleReload = () => {
        setTimeout(() => {
            window.location.reload()
        }, 100);
    }

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


    return (
        <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar'>
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 make-me-sticky">
                <Link to='/' onClick={handleReload}>
                    <div className='d-flex text-dark logo-div'>
                        <RestaurantMenuIcon fontSize='large' className='icon'></RestaurantMenuIcon>
                        <h4>foodBrand</h4>
                    </div>
                </Link>

                <div className='profile-div'>
                    <div class="d-flex align-items-center">
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
                            alt=""
                            style={{ width: '40px', height: '40px' }}
                            class="rounded-circle"
                        />
                    }
                        <div class="ms-3">
                            <p class="fw-bold mb-0" style={{ color: 'black' }}>{loggedInUser.displayName}</p>
                            <small class="text-muted mb-0">Admin</small>
                        </div>
                    </div>
                </div>
                {/* <div className='  mx-auto profile-div d-none d-sm-block '>
                                <div className="col mx-auto profile-div-img ">
                                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className='rounded-circle' />
                                </div>
                                <p className='mt-2 text-center'>Name</p>
                                <div className='text-center mx-auto'>
                                    <button className='px-2 py-2'>View Profile</button>
                                </div>
                            </div> */}
                <ul class=" nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start mt-4" id="menu">
                    <div style={{ color: '#11101d', fontWeight: 'bolder' }}>Main</div>
                    <li className={isActiveIndex === 0 ? 'selected' : ''} onClick={(event) => handleActive(event, 0)}>
                        <a href='.' >   <Link to='/dashboard/' class=" px-0 align-middle">
                            <i class="fs-4 bi-speedometer2"></i> <span class="ms-1">Dashboard</span>
                        </Link></a>
                    </li>
                    <li>
                        <ListItemButton onClick={handleOpen} className='categoryBox'>
                            <ListItemIcon className='icon'>
                                <i class="fs-4 bi-grid"></i>
                            </ListItemIcon>
                            <ListItemText className=' name'>Product</ListItemText>
                            {open ? <ExpandLess className='text-dark'></ExpandLess> : <ExpandMore className='text-dark'></ExpandMore>}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to={'/dashboard/additem'} className={isActiveIndex === 2 ? 'selected' : ''} onClick={(event) => handleActive(event, 2)}>
                                    <ListItemButton sx={{ pl: 4 }} className='categoryBox'>
                                        <ListItemIcon>
                                            <i class="fa-solid fa-circle-plus fa-1x"></i>
                                        </ListItemIcon>
                                        <ListItemText primary="Add" className='text-dark name' />
                                    </ListItemButton>
                                </Link>
                                <Link to={'/dashboard/viewitem'} className={isActiveIndex === 3 ? 'selected' : ''} onClick={(event) => handleActive(event, 3)}>
                                    <ListItemButton sx={{ pl: 4 }} className='categoryBox'>
                                        <ListItemIcon>
                                            <i class="fa-solid fa-list"></i>
                                        </ListItemIcon>
                                        <ListItemText primary="List" className='text-dark name' />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                    </li>
                    <li className=''>

                        <ListItemButton onClick={handleOrderOpen} className='categoryBox'>
                            <ListItemIcon className='icon'>
                                <i class="bi bi-cart2 fs-4"></i>
                            </ListItemIcon>
                            <ListItemText className=' name'>Order</ListItemText>
                            {orderOpen ? <ExpandLess className='text-dark'></ExpandLess> : <ExpandMore className='text-dark'></ExpandMore>}
                        </ListItemButton>
                        <Collapse in={orderOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to={'/dashboard/order'} className={isActiveIndex === 4 ? 'selected' : ''} onClick={(event) => handleActive(event, 4)}>
                                    <ListItemButton sx={{ pl: 4 }} className='categoryBox'>
                                        <ListItemIcon>
                                            <i class="fa-solid fa-list"></i>
                                        </ListItemIcon>
                                        <ListItemText primary=" List" className='text-dark name' />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                    </li>
                    {/*                     
                                <li className='productLi' data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    <a href="#submenu3" class=" px-0 align-middle fs-bold productHover">

                                        <i class="fs-4 bi-grid"></i> <span class="ms-1 d-none d-sm-inline">Catalogues  <i class="bi bi-caret-down"></i></span></a>
                                    <ul class="collapse nav flex-column ms-1 " id="collapseExample" data-bs-parent="#menu">
                                        <li class="w-100">
                                            <a href="#" class="px-0 ">
                                                <Link to={'/dashboard/additem'}>
                                                    <i class="fa-solid fa-circle-plus fa-1x"></i><span class="d-none d-sm-inline">Product Add</span>
                                                </Link>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class=" px-0">
                                                <Link to={'/dashboard/viewitem'}>
                                                    <i class="fa-solid fa-list"></i><span class="d-none d-sm-inline">Product List</span>
                                                </Link>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class=" px-0"> <span class="d-none d-sm-inline">Product </span> 3</a>
                                        </li>
                                        <li>
                                            <a href="#" class=" px-0"> <span class="d-none d-sm-inline">Product</span> 4</a>
                                        </li>
                                    </ul>
                                </li> */}

                    {/* <li className='productLi' data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
                                    <a href="#submenu3" class=" px-0 align-middle fs-bold productHover">

                                        <i class="bi bi-cart2 fs-4"></i><span class="ms-1 d-none d-sm-inline">Orders    <i class="bi bi-caret-down "></i></span></a>
                                    <ul class="collapse nav flex-column ms-1 " id="multiCollapseExample2" data-bs-parent="#menu">
                                        <li class="w-100">
                                            <a href="#" class="px-0 ">
                                                <Link to={'/dashboard/order'}>
                                                    <i class="fa-solid fa-list"></i><span class="d-none d-sm-inline">Order List</span>
                                                </Link>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" class=" px-0">
                                                <Link to={'/dashboard/orderDetails/'}>
                                                    <i class="fa-solid fa-file-lines"></i><span class="d-none d-sm-inline">Order Details</span>
                                                </Link>
                                            </a>
                                        </li>

                                    </ul>
                                </li> */}

                    <li className={isActiveIndex === 5 ? 'selected' : ''} onClick={(event) => handleActive(event, 5)}>
                        <a href='.' ><Link to='/dashboard/customer' class=" align-middle px-0">
                            <i class="fs-4 bi-people"></i><span class="ms-1 " >Customers</span>
                        </Link>
                        </a>
                    </li>

                    <li className={isActiveIndex === 6 ? 'selected' : ''} onClick={(event) => handleActive(event, 6)}>
                        <a href='.'> <Link to='/dashboard/customerReview' class=" px-0 align-middle">
                            <i class="bi bi-pencil-square fs-4"></i> <span class="ms-1 ">Review</span>
                        </Link></a>
                    </li>
                    {/* <div style={{ color: '#11101d', fontWeight: 'bolder' }}>Settings</div>
                    <li className={isActiveIndex === 7 ? 'selected' : ''} onClick={(event) => handleActive(event, 7)}>
                        <a href='#' > <Link to='/dashboard' class=" px-0 align-middle">
                        <i class="fa-solid fa-user fs-4"></i> <span class="ms-1 ">User</span>
                        </Link></a>
                    </li>
                    <li className={isActiveIndex === 8 ? 'selected' : ''} onClick={(event) => handleActive(event, 8)}>
                        <a href='#'> <Link to='/dashboard' class=" px-0 align-middle">
                        <i class="bi bi-person-plus fs-4"></i> <span class="ms-1 ">Create</span>
                        </Link></a>
                    </li> */}

                </ul>


                <div class='mb-4 logoutBtn'>
                    <a href="#" class="logA px-1 align-middle text-dark" onClick={handleSignOut}>

                        <i class=" fs-4 bi-box-arrow-left"></i><span class="ms-1 ">SignOut</span>
                    </a>
                </div>

            </div>

        </div>
    );
};

export default DashSidebar;