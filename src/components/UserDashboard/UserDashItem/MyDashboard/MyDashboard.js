import React, { useContext, useEffect, useState } from 'react';
import './MyDashboard.scss'
import LetteredAvatar from 'react-lettered-avatar';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContextUser } from '../../../../App';



const MyDashboard = () => {
    const {value3} = useContext(ContextUser)
    const [loggedInUser] = value3
    const [newlyOrder,setNewlyOrder] = useState([])


    useEffect(() => {
        fetch('https://boiling-badlands-11783.herokuapp.com/ordershow?email=' + loggedInUser.email, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${sessionStorage.getItem('idToken')}`
          }
        })
          .then(res => res.json())
          .then(data => setNewlyOrder(data))
      }, [loggedInUser])

     console.log(newlyOrder)
    
     const totalCost = Math.ceil(newlyOrder.reduce((prv,curr) => prv + curr.fullAmount,0)) 

     const totalOrder = newlyOrder.reduce((prv,curr) => prv + curr.cartItems.length,0)
     

      
    return (
        <div className=''>
            <h5>My Dashboard</h5>
            <div className='col-md-12 col-12 mx-auto row my-4'>
                <div className='col-md-4 col-12 mb-4'>
                    <div className='card p-3'>
                        <div className='mx-auto my-3 mb-5'>
                            <LetteredAvatar name={loggedInUser.displayName} size={120} />
                            <h5 className='text-center mt-2'>{loggedInUser.displayName}</h5>
                        <Link to={'/userDashboard/MyAccount'}><Button variant="contained" className='mt-4' >View Profile</Button></Link>    
                        </div>
                        <div className='border p-1 rounded-5 mb-3 px-2 mx-2'>
                            <p className='mb-1 text-muted'>Email</p>
                            <h6>{loggedInUser.email}</h6>
                        </div>
                        {/* <div className='border p-1 rounded-5 mb-3 px-2 mx-2' >
                            <p className='mb-1 text-muted'>Gender</p>
                            <h6>N/A</h6>
                        </div>
                        <div className='border p-1 rounded-5 mb-3 px-2 mx-2'>
                            <p className='mb-1 text-muted'>Phone</p>
                            <h6>N/A</h6>
                        </div> */}
                    </div>
                </div>
                <div className='col-md-8 col-12'>
                    <div className='col-md-12 col-12 row mx-auto'>
                        <div className='col-md-6 col-12' >
                            <div class="mb-4 ">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between ">
                                            <div>
                                                <h5 class="text-success ">$ {totalCost}</h5>
                                                <p class="mb-0">Total Cost</p>
                                            </div>
                                            <div class="align-self-center">
                                                <i class="fa-solid fa-circle-dollar-to-slot text-success fa-2x"></i>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-12 '>
                            <div class="mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between ">
                                            <div>
                                                <h5 class="text-primary "> + {totalOrder} </h5>
                                                <p class="mb-0">Total Order</p>
                                            </div>
                                            <div class="align-self-center">
                                                <i class="fa-solid fa-cart-arrow-down text-primary fa-2x"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 col-12 mb-3'>
                        <div className='card p-3'>
                            <div className=' row mb-2'>
                                <div className='col-auto me-auto'>
                                    <h6>Newly Order</h6>
                                </div>
                                <div className='col-auto'>
                                    <Link to={'/userDashboard/MyOrder'}><p class="">view All</p> </Link>
                                </div>
                            </div>
                            <div className='table-responsive'>

                                <table class="table align-middle mb-0 bg-white">
                                 
                                    <tbody>
                                        {
                                            [...newlyOrder].reverse().map((items,index) => index < 5 && (
                                                    items.cartItems.map(pd =>  
                                                      <tr>
                                                        <td>
                                                            <div class="d-flex align-items-center">
                                                                <img
                                                                    src={pd.imageUrl}
                                                                    alt=""
                                                                    style={{ width: '45px', height: '45px' }}
                                                                    class="rounded-circle"
                                                                />
                                                                <div class="ms-3">
                                                                    <p class="fw-bold mb-1">{pd.name}</p>
                                                                    <p class="text-muted mb-0"></p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p class="fw-normal mb-1">{items.createdAt}</p>
                                                           
                                                        </td>
                                                        <td>
                                                            <span class="badge badge-success rounded-pill d-inline">{pd.quantity}</span>
                                                        </td>
                                                        <td>$ {pd.price}</td>
            
                                                    </tr>
                                                    )
                                            ))
                                        }
                                     
                                       <p>Show only 5</p>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyDashboard;