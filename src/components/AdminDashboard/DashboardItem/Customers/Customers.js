import React, { useEffect, useState } from 'react';
import './Customer.scss'
import LetteredAvatar from 'react-lettered-avatar';
import { Link } from 'react-router-dom';


const Customers = () => {
    const [allOrder, setAllOrder] = useState([])
    const [customer, setCustomer] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://boiling-badlands-11783.herokuapp.com/orderAllShow')
            .then(res => res.json())
            .then(data => setAllOrder(data.allOrderData))
        setLoading(false)
    }, [])


    useEffect(() => {
        let dataMap = {};
        allOrder.forEach((el) => {
            let tempUser = el.loggedInUser.email
            if (tempUser in dataMap) {
                dataMap[tempUser].value.push(el);
            } else {
                dataMap[tempUser] = {
                    name: el.loggedInUser.displayName,
                    email: tempUser,
                    value: [el],
                    register: new Date(parseInt(el.loggedInUser.createdAt)).toLocaleDateString()
                };
            }
        });

        const data = [];

        // Fill the data
        Object.keys(dataMap).forEach((el) => data.push(dataMap[el]));
        setCustomer(data)

    }, [allOrder])



    console.log(customer)


    return (
        <div className=' container'>
            <div>
                <h5>Customers</h5>
            </div>

            <div className='col-md-12'>
                <div className='row my-4'>
                    {
                        customer.map(user =>

                            <div className='col-md-3 col-12 mb-2'>
                                <div className='card py-3 '>
                                    <div className='mx-auto'>
                                        <LetteredAvatar name={user.name} size={120} />

                                    </div>
                                    <div className='card-body my-2 text-center'>
                                        <h4 >{user.name}</h4>
                                        <Link to={`/dashboard/orderUserDetails/${user.email}`}>
                                            <p className='mb-0'>{user.email}</p>
                                        </Link>
                                        <small>register: {user.register}</small>
                                    </div>
                                </div>
                            </div>
                        )
                    }

            </div>

        </div>

        </div >
    );
};

export default Customers;