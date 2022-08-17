import React from 'react';
import './Modal.scss'
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useLocalDB from '../../../Hooks/useLocalDB';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   // width: '100%',
    height: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    borderRadius: '10px',
    border: 'none'
};

const ModalNav = () => {

    const { cartItems,
        setCartItems,
        totalAmount,
        tax,
        grandTotal,
        removeFromCart,
        handleDecrement,
        handleIncrement
    } = useLocalDB()

    return (
        
            <Box sx={style} className=' col-lg-8 col-md-8 col-12 bg-light' >
                <section class="h-100 gradient-custom">
                    <div class="container py-4">
                        <div class="row d-flex justify-content-center my-4">
                            <div class="col-md-8 col-12">
                                <div class="card mb-4">
                                    <div class="card-header py-3">
                                        <h5 class="mb-0">Cart - {cartItems.length} items</h5>
                                    </div>
                                    {
                                        cartItems.map((cart, index) => {

                                            return <div class="card-body" key={index}>

                                                <div class="row">
                                                    <div class="col-lg-3 col-md-12 col-4 mb-4 mb-lg-0">

                                                        <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                            <img src={cart.imageUrl}
                                                                class="w-100" alt="Blue Jeans Jacket" />

                                                        </div>
                                                    </div>
                                                    <div class="col-lg-5 col-md-6 col-4 mb-4 mb-lg-0">

                                                        <p><strong>{cart.name}</strong></p>

                                                        <button type="button" class="btn btn-danger btn-sm me-1 mb-2" onClick={() => removeFromCart(cart)} data-mdb-toggle="tooltip"
                                                            title="Remove Item">
                                                            <i class="bi-trash"></i>
                                                        </button>

                                                    </div>
                                                    <div class="col-lg-4 col-md-6 col-4  mb-4 mb-lg-0">

                                                        <div class="d-flex mb-4" style={{ maxWidth: "300px" }}>
                                                            <button class="btn btn-primary px-2 me-2"
                                                                onClick={() => handleDecrement(cart._id)} >
                                                                <i class="bi-dash"></i>
                                                            </button>

                                                            <p>{cart.quantity}</p>

                                                            <button class="btn btn-primary px-2 ms-2"
                                                                onClick={() => handleIncrement(cart._id)} >
                                                                <i class="bi-plus"></i>
                                                            </button>
                                                        </div>
                                                        <p class="text-start text-md-center">
                                                            <strong>${cart.price}</strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr class="my-4" />
                                            </div>

                                        })
                                    }




                                </div>
                            </div>
                            <div class="col-md-4 col-12">
                                <div class="card mb-4">
                                    <div class="card-header py-3">
                                        <h5 class="mb-0">Summary</h5>
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                                Products
                                                <span>{totalAmount}</span>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                                                Tax(10%)
                                                <span>{tax}</span>
                                            </li>
                                            <li
                                                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                                <div>
                                                    <strong>Total amount</strong>
                                                    <strong>
                                                        <p class="mb-0">(including VAT)</p>
                                                    </strong>
                                                </div>
                                                <span><strong>${grandTotal}</strong></span>
                                            </li>
                                        </ul>
                                        <div>
                                            {
                                                cartItems.length > 0 ?

                                                    <Link to='/ship'>
                                                        <button type="button" class="btn btn-primary btn-lg btn-block">
                                                            Go to checkout
                                                        </button>
                                                    </Link> :
                                                    <p className='text-center text-danger' >Please order</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
            </Box>
       
    );
};

export default ModalNav;