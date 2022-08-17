/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import './OrderUser.scss'
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import LetteredAvatar from 'react-lettered-avatar';


const OrderUser = () => {
    const { orderEmail } = useParams()
    const [orderUserAllData, setOrderUserAllData] = useState([])
    const [test, setTest] = useState([])

    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/orderShowByEmail/${orderEmail}`)
            .then(res => res.json())
            .then(data => setOrderUserAllData(data))
    }, [orderEmail])


    useEffect(() => {
        orderUserAllData.map(ps => setTest(ps.loggedInUser))
    }, [orderUserAllData])



    return (
        <div className='container'>
            <h5>UserDetails</h5>
            <div className='row mt-4'>
                <div className="col-md-4 profile-side">
                    <div className='one'>
                        <div className='mx-auto pt-2'>
                            <div className=' mx-auto profile-div' >
                                <LetteredAvatar name={test.displayName} size={110} />
                            </div>
                            <div className='mt-4 text-center'>
                                <h5 className='mb-0'>{test.displayName}</h5>
                                <a href='#' className='mb-0'>{test.email}</a>

                            </div>
                        </div>
                        <hr />

                        <div className='nid'>
                            <dl>
                                <dt className=''>Last Order</dt>
                                <dd>{orderUserAllData.slice(-1).map(pd => (pd.createdAt))}</dd>
                            </dl>
                            <dl>
                                <dt className=''>Last Order Value</dt>
                                <dd>$ {orderUserAllData.slice(-1).map(pd => (pd.fullAmount))}</dd>
                            </dl>
                            <dl>
                                <dt className=''>Registered</dt>
                                <dd>{new Date(parseInt(test.createdAt)).toLocaleDateString()}</dd>
                            </dl>

                        </div>
                    </div>
                </div>
                <div className="col-md-8 last-side">
                    <div className='col-md-12 '>
                        <div className='oneside'>
                            <div className=' row '>
                                <div className='col-auto me-auto px-4 py-2'>
                                    <h6>Product List</h6>
                                </div>
                                <div className='col-auto'>
                                    <i class="fas fa-ellipsis-v p-3"></i>
                                </div>
                            </div>
                            <div className='table-responsive table-div mb-3'>
                                <table class="table align-middle mb-3">
                                    <tbody>
                                        {
                                            [...orderUserAllData].reverse().map(pd =>
                                                <tr>
                                                    <th scope="row" className='text-primary'>#{pd._id.slice(-5)}</th>
                                                    <td>{pd.createdAt}</td>
                                                    <td>{pd.cartItems.length} items</td>
                                                    <td>$ {pd.fullAmount}</td>
                                                </tr>)
                                        }
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

export default OrderUser;