import { Alert, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { ContextUser } from '../../../../App';
import './MyReview.scss'





const MyReview = () => {
    const { value3 } = useContext(ContextUser)
    const [loggedInUser] = value3
    const [testimonialName, setTestimonialName] = useState('')
    const [testimonialAdded,setTestimonialAdded] = useState(false)
    const [description, setDescription] = useState('')

    const handleAddTestimonial = (e) => {
        e.preventDefault()

        const testData = {
            name: testimonialName,
            email: loggedInUser.email,
            comment: description
        }

        fetch(`https://boiling-badlands-11783.herokuapp.com/addTestimonial`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        })
            .then(res => setTestimonialAdded(res.ok))

    }



    return (
        <div className='  container user-review-style'>
            <h4>Review</h4>
            <div className='col-md-12 col-12 row mx-auto'>
                <div className='col-md-7 col-12  py-3 '>
                    {
                        testimonialAdded ?
                        <Alert severity="success">This is a success alert — </Alert>
                        :
                        ''
                    }
                    <div className='create-section py-4 mx-auto mt-1'>
                        <form onSubmit={handleAddTestimonial}>
                            <TextField
                                id="outlined-number"
                                label="Name"
                                type="text"
                                placeholder='Name'
                                className='col-md-10 col-10 mx-3 mb-3'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setTestimonialName(e.target.value)}
                            />
                            <TextField
                                id="outlined-number"
                                label="Email"
                                type="email"
                                value={loggedInUser.email}
                                className='col-md-10 col-10 mx-3 mb-3'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Multiline"
                                type="text"
                                multiline
                                rows={4}
                                placeholder='write your thought'
                                className='col-md-10 col-10 mx-3 mb-3'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Button type='submit' variant="contained" className='mx-3'>
                                Add Comment
                            </Button>
                        </form>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default MyReview;