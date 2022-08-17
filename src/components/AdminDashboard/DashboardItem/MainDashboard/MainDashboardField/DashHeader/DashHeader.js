import React, { useEffect, useState } from 'react';
import './DeshHeader.scss'


const DashHeader = () => {
    const [allShow,setAllShow] = useState([])

    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/orderAllShow`)
        .then(res => res.json())
        .then(data => setAllShow(data.allOrderData))
    }, [])

    const totalEarnings = Math.ceil(allShow.reduce((prv,curr) => prv + curr.fullAmount,0)) 

    const totalOrder = allShow.reduce((prv,curr) => prv + curr.cartItems.length,0)

    

    return (
        <div>
            <div className="col-md-12  row " >
                <div className='col-md-3 col-6 earning-card' >
                    <div class="mb-4 ">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between ">
                                    <div>
                                        <p class="text-success fw-bold">$ {totalEarnings}</p>
                                        <p class="mb-0">Earnings</p>
                                    </div>
                                    <div class="align-self-center">
                                        <i class="fas fa-rocket text-success fa-2x"></i>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-6 sales-card'>
                    <div class="mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between ">
                                    <div>
                                        <p class="text-primary fw-bold">{totalOrder}+ </p>
                                        <p class="mb-0">Sales</p>
                                    </div>
                                    <div class="align-self-center">
                                        <i class="fa-solid fa-cart-shopping text-primary fa-2x"></i>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-6 danger-card'>
                    <div class="mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between ">
                                    <div>
                                        <p class="fw-bold">278</p>
                                        <p class="mb-0">New Projects</p>
                                    </div>
                                    <div class="align-self-center">
                                        <i class="bi bi-wallet-fill fs-2 "></i>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-3 col-6 order-card' >
                    <div class="mb-4">
                        <div class="card">
                            <div class="card-body">
                                <div class="d-flex justify-content-between ">
                                    <div>
                                        <p class="fw-bold">{totalOrder}</p>
                                        <p class="mb-0">Total Order</p>
                                    </div>
                                    <div class="align-self-center">
                                        <i class="fa-solid fa-bag-shopping fa-2x "></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashHeader;