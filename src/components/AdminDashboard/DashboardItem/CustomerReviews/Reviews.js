import React, { useEffect, useState } from 'react';
import './Reviews.scss'
import LetteredAvatar from 'react-lettered-avatar';


const Reviews = () => {
    const [allReview, setAllReview] = useState([])
    const [deleted,setDeleted] = useState(false)

    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/showTestimonial`)
            .then(res => res.json())
            .then(data => setAllReview(data))
    }, [deleted])


    const handleTestimonialDelete = (id) => {
        const procced = window.confirm('Are you sure delete ')

        if (procced) {
            fetch(`https://boiling-badlands-11783.herokuapp.com/deleteTestimonial/${id}`, {
                method: 'DELETE'
            })
                .then(res => setDeleted(res.ok))
        }
    }


    return (
        <div className='row container'>
            <h4>Reviews</h4>
            <div className='col-md-12'>
                <div className='row  mx-4 mb-3 review-div'>
                    {
                        allReview.map(data =>

                            <div className='col-md-12 row  mx-auto py-2 mb-3 mt-2'>
                                <div className='col-md-2 mb-2 '>
                                    <div className='mx-5 '>
                                        <LetteredAvatar name={data.name} size={60} />
                                    </div>
                                </div>
                                <div className='col-md-8 text-start border-div'>
                                    <h5 className='mb-0'>{data.name}</h5>
                                    <small>{data.email}</small>
                                    <p className='mt-2'>
                                        {data.comment}
                                    </p>
                                </div>
                                <div className='col-md-2 '>
                                <i  onClick={() => handleTestimonialDelete(data._id)} class="bi bi-trash-fill fs-3 mx-4 my-5 text-danger ripple" data-mdb-ripple-color="danger" type="button"></i>
                                </div>
                            </div>

                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Reviews;