import React, { useEffect, useState } from 'react';
import './ViewItem.scss'
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const ViewItem = () => {
    const [allProduct, setAllProduct] = useState([])
    const [pageCount, setPageCount] = useState(0)
    const [activeStep, setActiveStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [searchItem, setSearchItem] = useState('')
    const [totalCount, setTotalCount] = useState(0)

    const size = 10

    useEffect(() => {
        setLoading(true)
        fetch(`https://boiling-badlands-11783.herokuapp.com/showAllProduct?page=${activeStep}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setAllProduct(data.products)
                const count = data.counted
                setTotalCount(count)
                const pageNumber = Math.ceil(count / size)
                setPageCount(pageNumber)
                setLoading(false)
            })
    }, [activeStep])


    const handleDelete = (id) => {
        const procced = window.confirm('Are you sure delete product')

        if (procced) {
            fetch(`https://boiling-badlands-11783.herokuapp.com/deleteProduct/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remaining = allProduct.filter(pd => pd._id !== id)
                        setAllProduct(remaining)
                    }
                })
        }
    }


    const handleChange = (event, value) => {
        setActiveStep(value - 1)
    };




    return (
        <div className=''>
            <div className=' row'>
                <div className='col-auto me-auto'>
                    <h4>Product List</h4>
                </div>
                <div className='col-auto'>
                    <Link to={'/dashboard/additem'}><button type="button" class="btn btn-warning text-dark">New Product</button> </Link>
                </div>
            </div>

            <div className='productListDesign '>
                <div className='table-responsive mb-5 mt-4'>
                    <div class="form-inline mt-3">
                        <input class="form-control  input-field " onChange={(e) => setSearchItem(e.target.value)} type="search" placeholder="Start typing to Search for Product" aria-label="Search" />
                    </div>
                    <table class="table align-middle mb-3 bg-white">
                        <thead class="bg-light">
                            <tr>
                                <th width='5%'>No</th>
                                <th width='40%'>Product</th>
                                <th width='20%'>Category</th>
                                <th width='20%'>Stock</th>
                                <th width='20%'>Price</th>
                                <th>discount</th>

                            </tr>
                        </thead>
                        {
                            loading ?
                                <div class="text-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div> :
                                <tbody>
                                    {
                                        [...allProduct].reverse().map((item, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <img
                                                            src={item.imageUrl}
                                                            alt=""
                                                            style={{ width: "45px", height: "45px" }}
                                                            class="rounded"
                                                        />
                                                        <div class="ms-3">
                                                            <p class="fw-bold mb-1">{item.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p class="fw-normal mb-1">{item.categories}</p>
                                                    <p class="text-muted mb-0">{item.period}</p>
                                                </td>
                                                <td>
                                                    <span class="badge badge-success rounded-pill d-inline">{item.stock}</span>
                                                </td>
                                                <td>${item.price}</td>
                                                <td>{item.discount}</td>
                                                <td>
                                                    <i class="fas fa-ellipsis-v p-2 dropdown-toggle d-flex align-items-center hidden-arrow"
                                                        id="DropdownMenuAvatar"
                                                        role="button"
                                                        data-mdb-toggle="dropdown"
                                                        aria-expanded="false"
                                                    ></i>
                                                    <ul
                                                        class="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="DropdownMenuAvatar"
                                                    >
                                                        <li>
                                                            <a class="dropdown-item" href="#" onClick={() => handleDelete(item._id)}><i class="fa fa-trash text-danger" aria-hidden="true"></i>  Delete</a>
                                                        </li>
                                                        <li>
                                                            <Link to={`/dashboard/productUpdate/${item._id}`}>   <a class="dropdown-item" href="#"><i class="fa fa-pencil text-primary" aria-hidden="true"></i> Edit</a> </Link>
                                                        </li>

                                                    </ul>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                        }
                    </table>
                    <div className=' d-flex'>
                        <div className=' col-md-8 col-8'>
                            <Pagination count={pageCount} variant='outlined' onChange={handleChange} size='small' color='warning' />
                        </div>
                        <div className='col-md-4 col-4' >
                            <p className='text-end px-3'>Showing 1 to 10 of <span className='text-primary border'>{totalCount}</span></p>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ViewItem;