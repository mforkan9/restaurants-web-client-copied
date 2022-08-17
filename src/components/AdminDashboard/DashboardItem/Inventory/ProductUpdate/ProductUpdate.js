import { Alert, AlertTitle, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductUpdate.scss'


const ProductUpdate = () => {
    const { id } = useParams()
    const [updatedData, setUpdatedData] = useState({})
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState('')
    const [template, setTemplate] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [stock, setStock] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    const [updateSuccess, setUpdateSuccess] = useState(false)

    const [processing, setProcessing] = useState(false)
    const [load, setLoad] = useState(false)
    const handleChange = async (e) => {
        const files = e.target.files
        const imageData = new FormData()
        imageData.append('file', files[0])
        imageData.append('upload_preset', 'storeImage')
        console.log(files)
        setProcessing(true)
        const upload = await fetch('https://api.cloudinary.com/v1_1/forkancloudinary/image/upload', {
            method: 'POST',
            body: imageData
        })
        const file = await upload.json()

        console.log(file)
        setImgUrl(file.secure_url)
        setLoad(file.secure_url)
        setProcessing(false)
    }

    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/showProduct/${id}`)
            .then(res => res.json())
            .then(data => setUpdatedData(data))
    }, [id])

    const handleUpdate = (e) => {
        e.preventDefault()
        const updateItemData = {
            name: name || updatedData.name,
            integration: description || updatedData.integration,
            categories: categories || updatedData.categories,
            period: template || updatedData.period,
            price: price || updatedData.price,
            discount: discount || updatedData.discount,
            imageUrl: imgUrl || updatedData.imageUrl,
            stock: stock || updatedData.stock
        }

        // console.log(updateItemData)

        fetch(`https://boiling-badlands-11783.herokuapp.com/updateProduct/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateItemData)
        })
            .then(res => setUpdateSuccess(res.ok))
    }

    // console.log(updatedData)




    return (
        <div className='row'>
            <form onSubmit={handleUpdate}>
                <div className=' row px-4'>
                    <div className='col-auto me-auto'>
                        <h4>Edit Product</h4>
                    </div>
                    <div className='col-auto '>

                        <button type="submit" class="btn btn-warning text-dark">Save</button>
                    </div>
                </div>
                <div className='col-md-12 mb-3 updateField'>
                    <div className='col-md-9 col-12 mx-auto mt-3 py-3 box-style'>
                        {
                            updateSuccess ? <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            This is a success alert Update successfully —<Link to='/dashboard/viewitem'> <strong>check it out!</strong></Link>
                          </Alert> :
                     
                        <div className='col-md-10 col-10  mx-auto'>

                            <TextField
                                id="outlined-multiline-static"
                                label="Product Name"
                                multiline
                                defaultValue={updatedData.name}
                                onChange={(e) => setName(e.target.value)}
                                className='col-md-12 col-12 '
                                sx={{ m: 1 }}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                label="Description"
                                multiline
                                rows={4}
                                defaultValue={updatedData.integration}
                                onChange={(e) => setDescription(e.target.value)}
                                className='col-md-12 col-12 '
                                sx={{ m: 1 }}
                            />
                            <FormControl sx={{ m: 2 }} className='col-md-5 col-12'>
                                <InputLabel id="demo-simple-select-helper-label">Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={categories}
                                    label="Categories"
                                    onChange={(e) => setCategories(e.target.value)}
                                >
                                    <MenuItem value=""  >
                                        <em>Categories</em>
                                    </MenuItem>
                                    <MenuItem value={'fish'}>Fish</MenuItem>
                                    <MenuItem value={'chicken'}>Chicken</MenuItem>
                                    <MenuItem value={'beef'}>Beef</MenuItem>
                                    <MenuItem value={'vegetable'}>Vegetable</MenuItem>
                                </Select>
                                <FormHelperText className='text-primary fw-bold fs-6'>{updatedData.categories}</FormHelperText>
                            </FormControl>
                            <FormControl sx={{ m: 2 }} className='col-md-5 col-12' >
                                <InputLabel id="demo-simple-select-helper-label">Template</InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={template}
                                    label="Template"
                                    onChange={(e) => setTemplate(e.target.value)}

                                >
                                    <MenuItem value="">
                                        <em>Template</em>
                                    </MenuItem>
                                    <MenuItem value={'breakfast'}>Breakfast</MenuItem>
                                    <MenuItem value={'launch'}>Launch</MenuItem>
                                    <MenuItem value={'snack'}>Snack</MenuItem>
                                    <MenuItem value={'dinner'}>Dinner</MenuItem>
                                </Select>
                                <FormHelperText className='text-primary fw-bold fs-6'>{updatedData.period}</FormHelperText>
                            </FormControl>
                            <TextField
                                id="outlined-number"
                                label="Price"
                                type="number"
                                className='col-md-3 col-12'
                                multiline
                                defaultValue={updatedData.price}
                                onChange={(e) => setPrice(e.target.value)}
                                sx={{ m: 2 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-number"
                                label="Discount"
                                type="number"
                                className='col-md-3 col-12'
                                multiline
                                defaultValue={updatedData.discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                sx={{ m: 2 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-number"
                                label="Stock"
                                type="number"
                                className='col-md-2 col-12'
                                multiline
                                onChange={(e) => setStock(e.target.value)}
                                sx={{ m: 2 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <div className='col-md-10'>
                                {
                                    processing ?
                                        <TextField

                                            id="outlined-number"
                                            label="Media"
                                            type="text"
                                            value={'loading....'}
                                            className='col-md-8 '
                                            sx={{ m: 3 }}
                                            InputLabelProps={{
                                                readOnly: true,
                                            }}
                                        />

                                        :

                                        <TextField
                                            helperText={load && <span className='text-success fw-bold'>success</span>}
                                            id="outlined-number"
                                            label="Media"
                                            type="file"
                                            className='col-md-8 '
                                            onChange={handleChange}
                                            sx={{ m: 3 }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                }
                            </div>
                        </div>
           }
                    </div>
                </div>





            </form>
        </div>
    );
};

export default ProductUpdate;