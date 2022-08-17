import React from 'react';
import { useState, useEffect } from 'react';
import './AddItem.scss'
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { CircularProgress, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



const AddItem = () => {
    const [category, setCategory] = useState('')
    const [template, setTemplate] = useState('')
    const [nameItem, setNameItem] = useState('')
    const [integration, setIntegration] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [stock,setStock] = useState('')

    const [addSuccess, setAddSuccess] = useState(false)
    const [processing, setProcessing] = useState(false)


    const [imageUrl, setImageUrl] = useState(null)
    const [load, setLoad] = useState(false)

    const [addToggle, setAddToggle] = useState(false)
    const [addCategories, setAddCategories] = useState('')
    const [allCategories, setAllCategories] = useState([])
    const [categoryAddTrue, setCategoryAddTrue] = useState(false)

    //Category Add

    const handleAddCategory = (e) => {
        const category = {
            categories: addCategories
        }
        fetch('https://boiling-badlands-11783.herokuapp.com/addCategories', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(category)
        })
            .then(res => setCategoryAddTrue(res.ok))


    }

    useEffect(() => {
        fetch('https://boiling-badlands-11783.herokuapp.com/showCategories')
            .then(res => res.json())
            .then(data => setAllCategories(data))
    }, [categoryAddTrue])


    //Image Uploaded

    const handleChange = async (e) => {
        const files = e.target.files
        const imageData = new FormData()
        imageData.append('file', files[0])
        imageData.append('upload_preset', 'storeImage')
        setProcessing(true)
        const upload = await fetch('https://api.cloudinary.com/v1_1/forkancloudinary/image/upload', {
            method: 'POST',
            body: imageData
        })
        const file = await upload.json()

        setImageUrl(file.secure_url)
        setLoad(file.secure_url)
        setProcessing(false)
    }


    //Product Added

    const handleSubmit = (e) => {
        e.preventDefault()

        const productInfo = {
            categories: category,
            period: template,
            name: nameItem,
            integration: integration,
            price: price,
            discount: discount,
            imageUrl: imageUrl,
            stock:stock
        }
        console.log(productInfo)

        fetch('https://boiling-badlands-11783.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productInfo)
        })
            .then(res => setAddSuccess(res.ok))


    }


    return (
        <div className='addMain bg-light container'>
            {
                addSuccess ? <Alert severity="success">Successfully Product Add — <Link to='/dashboard/viewItem'>check it out!</Link> </Alert>
                    : null

            }
            <form onSubmit={handleSubmit}>

                <div className=' row'>
                    <div className='col-auto me-auto'>
                        <h4>Add Product</h4>
                    </div>
                    <div className='col-auto '>

                        <button type="submit" class="btn btn-warning text-dark">Save</button>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-4 col-10 first-side">
                        <div className="col-md-12 col-12 one bg-white">
                            <h4>Product Category</h4>
                            <p>Select Category</p>
                            <select name="choice" required  className='selectbox col-md-8 col-8' onChange={(e) => setCategory(e.target.value)}>
                                    <option selected>Categories</option>
                                    {
                                        allCategories.map(item => <option value="fish">{item.categories}</option>)
                                    }

                            </select>
                            <div className='mt-4'>
                                {
                                    addToggle ?

                                        <div>
                                            <p>Add Categories</p>
                                            <div class="input-group addBtn">
                                                <div class="form-outline">
                                                    <input id="search-input" onChange={(e) => setAddCategories(e.target.value)} type="text" class="form-control border" />
                                                </div>
                                                <button id="search-button" onClick={handleAddCategory} type="button" class="btn btn-primary">
                                                    <i class="fas fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>

                                        : ''

                                }
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    size='small'
                                    className='fav'
                                    onClick={() => setAddToggle(!addToggle)}
                                >
                                    <AddIcon />
                                </Fab>
                            </div>
                        </div>
                        <div className="col-md-12 col-12 tow bg-white">
                            <h4>Product template</h4>
                            <p>Select Template</p>
                            <select name="choice" required className='selectbox col-md-8 col-8' onChange={(e) => setTemplate(e.target.value)}>
                                <option selected >Template</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="dinner">Dinner</option>
                                <option value="launch">Launch</option>
                                <option value="snack">Snack</option>
                            </select>

                        </div>
                    </div>
                    <div className="col-md-6 col-12 last-side">
                        <div className="col-md-12 col-12 one bg-white">
                            <h4>General</h4>
                            <div className='product-name'>
                                <p>Product Name</p>
                                <input type="text" className='col-md-8 col-8' placeholder='Name' onChange={(e) => setNameItem(e.target.value)} required />
                            </div>
                            <div className="product-details">
                                <p> Product Details</p>
                                <textarea name="Product Details " required onChange={(e) => setIntegration(e.target.value)} placeholder='Product Integration ' id="" cols="" rows="8" className='details col-md-9 col-10'></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 col-12 tow bg-white">
                            <h4>Media</h4>
                            <div>
                                {
                                    processing ?

                                        <div className='text-center'>
                                            <CircularProgress />
                                        </div>

                                        :

                                        <div>
                                            {
                                                load ? <h4 className='text-center text-success'>Successfully Uploaded</h4> :
                                                    <div class='file file--upload'>
                                                        <label for='input-file'>
                                                            <i class="material-icons">cloud_upload</i>Upload
                                                        </label>
                                                        <input id='input-file' type='file' onChange={handleChange} />
                                                    </div>
                                            }
                                        </div>
                                }
                            </div>
                        </div>

                        <div className="col-md-12 col-12 py-3 three bg-white">
                            <h4>Price</h4>
                            <p>Price Add</p>
                            <input className='col-md-6' required type="number" name="" id="" placeholder='price' onChange={(e) => setPrice(e.target.value)} />
                            <p>Discount</p>
                            <input className='col-md-6' type="number" placeholder='Discount' onChange={(e) => setDiscount(e.target.value)} />
                            <p>Stock</p>
                            <input className='col-md-6' type="number" placeholder='Stock' onChange={(e) => setStock(e.target.value)} />
                        </div>
                        {/* <button onClick={() => handleSubmit()}>Submit</button> */}
                    </div>
                </div>

            </form>
        </div>
    );
};

export default AddItem;