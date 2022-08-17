/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import ReactNavbar from '../ReactStyle/ReactNavbar/ReactNavbar';
import './Shipping.scss'
import { ContextUser } from './../../App';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Payment from '../PaymentGateWay/Payment';
import useLocalDB from './../Hooks/useLocalDB';


const Shipping = () => {
    const { value2, value4, value3,value5 } = useContext(ContextUser)
    const [order, setOrder] = value2
    const [loggedInUser, setLoggedInUser] = value3
    const [paymentData, setPaymentData] = value4

    const [selected, setSelected] = useState('')
    const [toggle, setToggle] = useState(false)
    const [orderSuccess, setOrderSuccess] = value5

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [contactNumber, setContactNumber] = useState(Number)
    const {cartItems,fullAmount,grandTotal} = useLocalDB()


    //Payment Toggler 

    const handleSelect = (e) => {
        setSelected(e.target.value);
    }

    const handleFalse = () => {
        setToggle(false)
    }

    const handleToggle = (e) => {
        const card = 'card payment'
        const getInfo = e.target.value
        if (card === getInfo) {
            setToggle(true)
        }
    }


    //GrandTotal...

    // const totalPrice = order.reduce((acc, curr) => { //calculate total
    //     let cur = curr.price.match(/\d./g).join('') //parse string to integer(cost)
    //     return acc + Number(cur);
    // }, 0)


    //Submit data in Database

    const handleSubmitAllData = () => {

        const billingData = {
            name: firstName + ' ' + lastName,
            email: loggedInUser.email,
            phone: contactNumber,
            country: country,
            state: city,
            address: address
        }

      
        const newAllData = { cartItems, loggedInUser, billingData, fullAmount, selected, paymentData}


        fetch('https://boiling-badlands-11783.herokuapp.com/orderdata', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newAllData)
        })
            .then(res => setOrderSuccess(res.ok))

       localStorage.clear('cart') 
       
    }



    return (
        <div >
            <ReactNavbar></ReactNavbar>
            <div className='container bg-light'>
                {
                    !orderSuccess ?

                        <div className='d-flex align-items-center justify-content-center ' style={{marginTop:'120px'}} >
                            <div class="row col-md-10" >
                                <div class="col-md-8 mb-4 mt-3">
                                    <div class="card mb-4">
                                        <div class="card-header py-3">
                                            <h5 class="mb-0">Biling details</h5>
                                        </div>
                                        <div class="card-body">
                                            <form>
                                                <div class="row mb-4">
                                                    <div class="col">
                                                        <div class="form-outline">
                                                            <label class="form-label fw-bold" for="form7Example1">First name</label>

                                                            <input type="text" placeholder='first name' id="form7Example1" class="form-control border" onBlur={(e) => setFirstName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div class="col">
                                                        <div class="form-outline">
                                                            <label class="form-label fw-bold" for="form7Example2">Last name</label>
                                                            <input type="text" id="form7Example2" class="form-control border" onBlur={(e) => setLastName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='row'>

                                                    <div className='col'>
                                                        <div class="form-outline mb-4">
                                                            <label class="form-label fw-bold" for="form7Example3">Country</label>
                                                            <input type="text" id="form7Example3" class="form-control border" placeholder='region' onBlur={(e) => setCountry(e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div className='col'>
                                                        <div class="form-outline mb-4">
                                                            <label class="form-label fw-bold" for="form7Example3">City</label>
                                                            <input type="text" id="form7Example3" class="form-control border" placeholder='city' onBlur={(e) => setCity(e.target.value)} />
                                                        </div>
                                                    </div>

                                                </div>


                                                <div class="form-outline mb-4">
                                                    <label class="form-label fw-bold" for="form7Example4">Address</label>
                                                    <input type="text" id="form7Example4" class="form-control border" placeholder='2-road/b-block....' onBlur={(e) => setAddress(e.target.value)} />

                                                </div>


                                                <div class="form-outline mb-4">
                                                    <label class="form-label fw-bold" for="form7Example5">Email</label>
                                                    <input type="email" id="form7Example5" value={loggedInUser.email}  placeholder='example@gmail.com' class="form-control border"  />

                                                </div>


                                                <div class="form-outline mb-4">
                                                    <label class="form-label fw-bold" for="form7Example6">Phone</label>
                                                    <input type="number" id="form7Example6" placeholder='01717-000000' class="form-control border" onBlur={(e) => setContactNumber(e.target.value)} />

                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="row col-md-4 mb-4">
                                    <div className='col-md-12 '>
                                        <div class="card mb-4 mt-3">
                                            <div class="card-header py-3">
                                                <h5 class="mb-0">Summary</h5>
                                            </div>
                                            <div class="card-body">
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                        Products Buy
                                                        <span>${grandTotal}</span>
                                                    </li>
                                                    <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                        Shipping
                                                        <span>$ 50</span>
                                                    </li>
                                                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                        <div>
                                                            <strong>Total amount</strong>
                                                            <strong>
                                                                <p class="mb-0"></p>
                                                            </strong>
                                                        </div>
                                                        <span><strong>${fullAmount}</strong></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='card'>
                                            <div className='card-header py-3'>
                                                <h5 className='mb-0'>Payment Method</h5>
                                            </div>
                                            <div className='mt-2 py-3 px-3'>
                                                <div class="form-check mb-2">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={'cash on delivery'} onChange={handleSelect} onClick={handleFalse} />
                                                    <label class="form-check-label" for="flexRadioDefault1"> Cash on Delivery</label>
                                                </div>

                                                <div class="form-check">
                                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={'card payment'} onChange={handleSelect} onClick={handleToggle} />
                                                    <label class="form-check-label" for="flexRadioDefault2"> Pay with Card </label>
                                                </div>
                                            </div>


                                            <div>
                                                {
                                                    toggle ?
                                                        <div class="card-body">
                                                            <p class="mb-4 fw-bold">Your payment details</p>

                                                            <Payment
                                                                paymentPrice={fullAmount}
                                                            >
                                                            </Payment>
                                                        </div> : ''
                                                }
                                            </div>

                                        </div>

                                        <button type="button" class="btn btn-primary btn-lg btn-block mt-4" onClick={handleSubmitAllData}>
                                            Make purchase
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='successPage'>
                            <div class="card">
                                <div style={{ borderRadius: "200px", height: '200px', width: '200px', background: '#F8FAF5', margin: '0 auto' }}>
                                    <i class="checkmark">✓</i>
                                </div>
                                <h1>Success</h1>
                                <p>We received your purchase request;<br /> we'll be in touch shortly!</p>
                                <p className='mt-5'><Link to='/'> Back to Home </Link></p>
                            </div>
                        </div>
                }
            </div>

        </div>
    );
};

export default Shipping;