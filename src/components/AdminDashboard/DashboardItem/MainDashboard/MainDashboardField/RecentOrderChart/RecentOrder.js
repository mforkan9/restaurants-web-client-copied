import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './RecentOrder.scss'
const RecentOrder = () => {
    const [newlyOrderData, setNewlyOrderData] = useState([])

    const date = new Date().toLocaleDateString()
    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/orderShowByDate?date=${date}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setNewlyOrderData(data))
    }, [date])



    return (
        <div className=' table-design '>
            <div className='row'>
                <div className='col-md-6 col-6'>
                    <h5 className='m-4'>Recent Order</h5>
                </div>
                <div className='col-md-6 col-6 text-end'>
                    <Link to={'/dashboard/order'}><button type="button" class="btn btn-warning m-3 text-black rounded-pill">View All</button></Link>
                </div>
            </div>
            <div className='table-responsive mb-3'>
                <table class="table align-middle mb-5 bg-white ">
                    <thead class="bg-light">
                        <tr>
                            <th>Name</th>
                            <th> No.</th>
                            <th>Payment</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        newlyOrderData.length === 0 ? <p className='text-center text-danger fw-bold'>Today No Order</p> : <tbody>
                            {
                                newlyOrderData.map(item =>

                                    <tr>

                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img
                                                    src={item.loggedInUser.photoURL}
                                                    alt=""
                                                    style={{ width: "45px", height: "45px" }}
                                                    class="rounded-circle"
                                                />
                                                <div class="ms-3">
                                                    <p class="fw-bold mb-1">{item.loggedInUser.displayName}</p>
                                                    <p class="text-muted mb-0">{item.loggedInUser.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="fw-normal mb-1">#{item._id.slice(-5)}</p>

                                        </td>
                                        <td><span className={item.selected === 'card payment' ? 'badge badge-primary rounded-pill d-inline' : 'badge badge-warning rounded-pill d-inline'}>{item.selected}</span></td>
                                        <td>
                                            $ {item.fullAmount}
                                        </td>
                                        <td>
                                            <span class="badge badge-success rounded-pill d-inline">Active</span>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    }

                </table>
            </div>
        </div>
    );
};

export default RecentOrder;