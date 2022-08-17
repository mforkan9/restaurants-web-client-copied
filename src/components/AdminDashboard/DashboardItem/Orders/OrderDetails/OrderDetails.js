/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import './OrderDetails.scss'
import LetteredAvatar from 'react-lettered-avatar';


const OrderDetails = () => {
  const { orderDetailsId } = useParams()


  const [orderDetailsData, setOrderDetailsData] = useState({})
  const [cartProduct, setCartProduct] = useState([])
  const [billingInfo, setBillingInfo] = useState({})

  useEffect(() => {
    fetch(`https://boiling-badlands-11783.herokuapp.com/orderShowById/${orderDetailsId}`)
      .then(res => res.json())
      .then(data => {
        setOrderDetailsData(data)
        setCartProduct(data.cartItems)
        setBillingInfo(data.billingData)

      })
  }, [orderDetailsId])


  return (
    <div className='listed container'>
      <h5>Order Details</h5>
      <div className='row my-4'>
        <div className='col-md-7 first-side'>
          <div className='col-md-12 one-box' >
            <div>
              <div className=' row'>
                <div className='col-auto me-auto px-4 py-3'>
                  <h6>Product List</h6>
                </div>
                <div className='col-auto'>
                  <i class="fas fa-ellipsis-v p-3"></i>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-middle mb-0 table-responsive bg-light">
                  <tbody>
                    {
                      cartProduct.map(pd => <tr>
                        <td>
                          <div class="d-flex align-items-center">
                            <img
                              src={pd.imageUrl}
                              alt=""
                              style={{ width: '75px', height: '60px' }}
                              class="rounded"
                            />
                            <div class="ms-3">
                              <p className='mb-0 text-primary'>{pd.categories}</p>
                              <p class="fw-bold mb-1">{pd.name}</p>
                              <p class="text-muted mb-0">#{pd._id.slice(-5)}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          {pd.quantity} x
                        </td>
                        <td>{pd.price}</td>
                        <td>
                          $ {
                            pd.price * pd.quantity
                          }
                        </td>
                      </tr>
                      )
                    }
                  </tbody>
                </table>
                <table class="table table-borderless table-sm">
                  <tbody>
                    <tr className='fw-bold'>
                      <td colSpan={4}>Tax includes(10%)</td>
                      <td width={'10%'}>$0.10</td>
                    </tr>
                    <tr className='fw-bold'>
                      <td colSpan={4}>Shipping</td>
                      <td width={'10%'}>$ 50</td>
                    </tr>
                    <tr className='fw-bold text-primary'>
                      <td colSpan={4}>Total</td>
                      <td width={'5%'}>${orderDetailsData.fullAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <div className='col-md-12' style={{border:'1px solid green'}} >
                     <div className='two-box'>
                        <h5>Transactions</h5>
                       <div>
                         
                       </div>
                     </div>
                   </div>
                   <div className='col-md-12' style={{border:'1px solid red'}} >
                     <h2>dsfdsf</h2>
                   </div> */}
        </div>
        <div className='col-md-4 last-side'>
          <div className='row'>
            <div className='col-md-12'>

              <div className='one-comp p-2'>
                <h5 className='mx-3 my-2'>Customer</h5>
                <div class="d-flex align-items-center mx-4 my-4">
                  {/* <img
                    src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                    alt=""
                    style={{ width: '45px', height: '45px' }}
                    class="rounded-circle"
                  /> */}
                   <LetteredAvatar name={billingInfo.name} />

                  <div class="ms-3">
                    <p class="fw-bold mb-1">{billingInfo.name}</p>
                    <p class="text-muted mb-0">{billingInfo.email}</p>
                  </div>
                </div>

              </div>
            </div>
            <div className='col-md-12'>
              <div className='tow-comp p-2'>
                <h5 className='mx-3 my-2'>Contact Person</h5>
                <div className='mx-3 my-3'>
                  <p className='mb-0'>{billingInfo.name}</p>
                  <a href='#' className='mb-0'>{billingInfo.email}</a>
                  <p>{billingInfo.phone}</p>
                </div>
              </div>
            </div>
            <div className='col-md-12 '>
              <div className='tow-comp p-2'>
                <h5 className='mx-3 my-2'>Shipping Address</h5>
                <div className='mx-4 my-3'>
                  <p className='mb-0'>{billingInfo.name}</p>
                  <p className='mb-0'>{billingInfo.address} </p>
                  <p>{billingInfo.state},<span>{billingInfo.country}</span></p>
                </div>
              </div>
            </div>
            <div className='col-md-12 '>
              <div className='tow-comp p-2'>
                <h5 className='mx-3 my-2'>Billing Address</h5>
                <div className='mx-4 my-3'>
                  <p className='mb-0'>{billingInfo.name}</p>
                  <p className='mb-0'>{billingInfo.address} </p>
                  <p>{billingInfo.state},<span>{billingInfo.country}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;