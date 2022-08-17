/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, Suspense, useContext, useState } from 'react';
import './AdminDashboard.scss'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import AddItem from './DashboardItem/Inventory/ProductAdd/AddItem';
import ViewItem from './DashboardItem/Inventory/ProductList/ViewItem';
import OrderList from './DashboardItem/Orders/OrderList/OrderList';
import OrderDetails from './DashboardItem/Orders/OrderDetails/OrderDetails';
import OrderUser from './DashboardItem/Orders/OrderWithUser/OrderUser';
import Customers from './DashboardItem/Customers/Customers';
import { ToggleButton } from '@mui/material';
import { FormatAlignJustify } from '@mui/icons-material';
import Profile from './DashboardItem/Profile/Profile';
import ProductUpdate from './DashboardItem/Inventory/ProductUpdate/ProductUpdate';
import { getAuth, signOut } from 'firebase/auth';
import { ContextUser } from '../../App';
import LetteredAvatar from 'react-lettered-avatar';
import Reviews from './DashboardItem/CustomerReviews/Reviews';


const DashSidebar = lazy(() => import('./DashSidebarItem/DashSidebar'))
const MainDashboard = lazy(() => import('./DashboardItem/MainDashboard/MainDashboard'))


const routes = [
  {
    path: "/dashboard/",
    exact: true,
    main: () => <MainDashboard></MainDashboard>

  },
  {
    path: "/dashboard/order",
    main: () => <OrderList></OrderList>
  },
  {
    path: "/dashboard/additem",
    main: () => <AddItem></AddItem>
  },
  {
    path: "/dashboard/viewitem",
    main: () => <ViewItem></ViewItem>
  },
  {
    path: "/dashboard/orderDetails/:orderDetailsId",
    main: () => <OrderDetails></OrderDetails>
  },
  {
    path: "/dashboard/orderUserDetails/:orderEmail",
    main: () => <OrderUser></OrderUser>
  },
  {
    path: "/dashboard/customer",
    main: () => <Customers></Customers>
  },
  {
    path: "/dashboard/profile",
    main: () => <Profile></Profile>
  },
  {
    path: "/dashboard/productUpdate/:id",
    main: () => <ProductUpdate></ProductUpdate>
  },
  {
    path: "/dashboard/customerReview",
    main: () => <Reviews></Reviews>
  },

];


const AdminDashboard = () => {
  const { value3 } = useContext(ContextUser)
  const [loggedInUser] = value3

  const [sidebarToggle, setSidebarToggle] = useState(true)

  const handleToggle = () => {
    setSidebarToggle(!sidebarToggle)
  }


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


  return (
    <BrowserRouter>
      <div class="container-fluid">
        <div class="row flex-nowrap" >
          <Suspense fallback={<div className='fw-bold'>Loading...</div>}>
            {
              sidebarToggle ? <DashSidebar></DashSidebar> : ''
            }
          </Suspense>

          <div class="col py-3">
            <main class="row overflow-auto">

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
                        <a class="nav-link me-3 fw-bold " href="#">{loggedInUser.displayName}</a>
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

                            <Link to='/dashboard/profile' className='dropdown-item d-flex'><i class="bi bi-person-circle fs-5 me-2"></i> <a class="my-1 text-dark" href="#">Profile</a>

                            </Link>
                          </li>
                          <li>
                            <span className='dropdown-item d-flex' onClick={handleSignOut}> <i class="bi bi-box-arrow-left fs-5 me-2"></i> <a class="my-1 text-dark" href="#"> LogOut</a> </span>
                          </li>

                        </ul>
                      </div>

                    </div>
                  </div>
                </div>
              </nav>

              <div class="col pt-4 ">
                <Suspense fallback={<div>loading...</div>}>
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
                </Suspense>
              </div>
            </main>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AdminDashboard;  