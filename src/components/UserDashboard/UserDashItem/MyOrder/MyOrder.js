import React, { useContext, useEffect, useState } from 'react';
import { ContextUser } from '../../../../App';
import './MyOrder.scss'



const MyOrder = () => {
  const { value3 } = useContext(ContextUser)
  const [loggedInUser] = value3
  const [orderList, setOrderList] = useState([])

  const [test, setTest] = useState([])


  useEffect(() => {
    fetch('https://boiling-badlands-11783.herokuapp.com/ordershow?email=' + loggedInUser.email, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${sessionStorage.getItem('idToken')}`
      }
    })
      .then(res => res.json())
      .then(data => setOrderList(data))
  }, [loggedInUser])

  

  useEffect(() => {
    let dataMap = {};
    orderList.forEach((el) => {
      let tempUser = el.createdAt
      if (tempUser in dataMap) {
        dataMap[tempUser].value.push(el);
      } else {
        dataMap[tempUser] = {
          // name:el.loggedInUser.displayName,
          date: tempUser,
          value: [el],
          //register: new Date(parseInt(el.loggedInUser.createdAt)).toLocaleDateString()
        };
      }
    });

    const data = [];

    // Fill the data
    Object.keys(dataMap).forEach((el) => data.push(dataMap[el]));
    setTest(data)

  }, [orderList])



  return (
    <div className='container'>
      <div className=' row mb-4'>
        <div className='col-auto me-auto'>
          <h5>My Order</h5>
        </div>
       
      </div>

      <div className='row  list-section'>
        <div className='col-md-12 row '>

          <div className='col-md-12 mx-2 mb-3' >
            {
              [...test].reverse().map(data =>

                <div className=' table-responsive container my-2 py-2'>
                  <p className='mb-2'>{data.date === new Date().toLocaleDateString() ? 'Today' : data.date}</p>
                  <table class="table align-middle mb-4  bg-white table-sm table-borderless rounded-6">
                    {
                      data.value.map(pd =>

                        <tbody>
                          {
                            pd.cartItems.map(list =>
                              <tr>
                                <td>
                                  <div class="d-flex align-items-center">
                                    <img
                                      src={list.imageUrl}
                                      alt=""
                                      style={{ width: '45px', height: '45px' }}
                                      class="rounded"
                                    />
                                    <div class="ms-3">
                                      <p class="fw-bold mb-1">{list.name}</p>
                                      {/* <p class="text-muted mb-0">john.doe@gmail.com</p> */}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p class="fw-normal mb-1">{list.categories}</p>

                                </td>
                                <td>
                                  <span class="badge badge-success rounded-pill d-inline">Active</span>
                                </td>
                                <td>Qty: {list.quantity}</td>
                                <td>
                                  $ {list.price}
                                </td>
                              </tr>)
                          }

                        </tbody>)

                    }
                  </table>
                </div>)

            }
          </div>
        </div>
      </div>

    </div>
  );
};

export default MyOrder;