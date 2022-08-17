import React, { useContext, useEffect, useState } from 'react';
import { ContextUser } from '../../../../../App';
import './OrderList.scss'
import { Pagination, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';





const OrderList = () => {
  const { value3 } = useContext(ContextUser)
  const [loggedInUser, setLoggedInUser] = value3
  const [orderList, setOrderList] = useState([])
  const [activePage, setActivePage] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(false)
  const [testState, setTestState] = useState([])


  // useEffect(() =>{
  //     fetch('https://boiling-badlands-11783.herokuapp.com/ordershow?email='+ loggedInUser.email,{
  //         method:'GET',
  //         headers:{
  //             'content-type' : 'application/json',
  //             authorization : `Bearer ${sessionStorage.getItem('idToken')}`
  //         }
  //     })
  //     .then(res => res.json())
  //     .then(data => setOrderList(data))
  // },[])

  // console.log(orderList)

  const size = 10

  useEffect(() => {
    setLoading(true)
    fetch(`https://boiling-badlands-11783.herokuapp.com/orderAllShow?page=${activePage}&size=${size}`)
      .then(res => res.json())
      .then(data => {
        setOrderList(data.allOrderData)
        const digit = data.counter
        const pageDigit = Math.ceil(digit / size)
        setPageNumber(pageDigit)
        setLoading(false)
      })
  }, [activePage])

  // console.log(orderList);

  const handleActivePageChange = (event, value) => {
    setActivePage(value - 1)
  }

  // useEffect(() => {
  //   fetch(`https://boiling-badlands-11783.herokuapp.com/orderAllShow`)
  //   .then(res => res.json())
  //   .then(data => console.log(data.allOrderData))
  // }, [])



  return (
    <div>
      <div>
        <h4>Order List</h4>
      </div>
      <div className='tableList table-responsive mb-5'>
        <table class="table align-middle mb-3 ">
          <thead>
            <tr>
              <th scope="col" >Order Id</th>
              <th scope="col">Date</th>
              <th scope="col">Customer</th>
              <th scope="col">Paid</th>
              <th scope="col">Status</th>
              <th scope="col">Item</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
              <th scope="col" width='2%'></th>

            </tr>
          </thead>
          {
            loading ?

              <div class="spinner-border text-warning" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>

              :

              <tbody>
                {
                  orderList.map((info, index) =>

                    <tr>
                      <th scope="row">#{info._id.slice(-5)}</th>
                      <td>{info.createdAt}</td>
                      <td>
                        <Link to={`/dashboard/orderUserDetails/${info.loggedInUser.email}`}> {info.loggedInUser.displayName} </Link>
                      </td>
                      <td>
                        <span class={info.selected === 'card payment' ? "badge badge-primary rounded-pill d-inline" : "badge badge-warning rounded-pill d-inline"}>{info.selected}</span>
                      </td>
                      <td>
                        <span class="badge badge-success rounded-pill d-inline">On delivery</span>
                      </td>
                      <td>
                        {info.cartItems.length} item
                      </td>
                      <td>
                        $ {info.fullAmount}
                      </td>
                      <td className=''>
                        <Link to={`/dashboard/orderDetails/${info._id}`}> view details </Link>
                      </td>
                      <td>
                        <i class="fas fa-ellipsis-v"></i>
                      </td>
                    </tr>
                  )
                }

              </tbody>
          }

        </table>

        <div className='d-flex'>
          <div className='col-md-8 col-8'>
            <Pagination count={pageNumber} shape="rounded" color='warning' onChange={handleActivePageChange} />

          </div>
          <div className='col-md-4 col-4'>
            <p className='text-end'>Show 1 to 10</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderList;