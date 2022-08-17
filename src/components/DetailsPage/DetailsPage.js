import React, { useEffect, useState } from 'react';
import ReactNavbar from '../ReactStyle/ReactNavbar/ReactNavbar';
import './DetailsPage.scss'
import useLocalDB from './../Hooks/useLocalDB';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { Button, Rating, TextField } from '@mui/material';



const DetailsPage = () => {
    const { addToCart } = useLocalDB()
    const [reviewName, setReviewName] = useState('')
    const [reviewEmail, setReviewEmail] = useState('')
    const [comment, setComment] = useState('')
    const [ratingValue, setRatingValue] = useState(0);

    const [reviewDataGet, setReviewDataGet] = useState([])
    const [addSuccess, setAddSuccess] = useState(false)
    const [ratingAvarage, setRatingAvarage] = useState(0)

    const { detailsId } = useParams()
    const [detailsInfo, setDetailsInfo] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`https://boiling-badlands-11783.herokuapp.com/showProduct/${detailsId}`)
            .then(res => res.json())
            .then(result => {
                setDetailsInfo(result)
                setLoading(false)
            })
    }, [detailsId])




    //Review Data Post

    const handleReviewSubmit = (e) => {
        e.preventDefault()

        const reviewData = {
            productId: detailsId,
            name: reviewName,
            email: reviewEmail,
            comment: comment,
            createAt: new Date().toLocaleDateString(),
            rating: ratingValue
        }

        console.log(reviewData)

        fetch('https://boiling-badlands-11783.herokuapp.com/addReview', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
            .then(res => setAddSuccess(res.ok))

        setComment('')
        setReviewName('')
        setReviewEmail('')
        setRatingValue('')
    }


    //Review Data Get

    useEffect(() => {
        fetch(`https://boiling-badlands-11783.herokuapp.com/reviewShow/${detailsId}`)
            .then(res => res.json())
            .then(data => setReviewDataGet(data))
    }, [detailsId, addSuccess])


    //Avarage Rating 

    useEffect(() => {
        const totalScore = reviewDataGet.reduce((preValue, currValue) =>
            preValue + currValue.rating, 0)

        const avarageRating = totalScore / reviewDataGet.length
        setRatingAvarage(avarageRating)

    }, [reviewDataGet])


    return (
        <div className=''>
            <ReactNavbar></ReactNavbar>
            {
                loading ?

                    <div className='fw-bold' style={{ marginTop: '120px', }}>Loading</div>

                    :

                    <div className="row details-main container mx-auto" key={detailsInfo._id}>
                        <div className="col-md-7  bg-image hover-zoom part1">
                            <img src={detailsInfo.imageUrl} alt="" />
                        </div>
                        <div className="col-md-5  part2">
                            <div className='describe'>
                                <p className='headLine'> <strong> {detailsInfo.period} </strong></p>
                                <h2>{detailsInfo.name}</h2>
                                <Rating value={ratingAvarage} readOnly></Rating>
                                <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid eaque vero reiciendis vitae porro ipsa quidem mollitia, suscipit incidunt itaque necessitatibus sapiente corrupti enim soluta voluptate distinctio, accusantium reprehenderit consectetur.</p>

                                <div className='row button-area'>
                                    <div className="col-md-6 col-6">
                                        <strong>${detailsInfo.price}</strong>
                                    </div>
                                    <div className="col-md-6 col-6 text-center">
                                        <button onClick={() => addToCart(detailsInfo)}>Add to cart</button>
                                    </div>
                                </div>
                                <div>
                                    <h4>Categories:</h4>
                                    <p className='text-muted'> {detailsInfo.categories}</p>
                                </div>
                                <div className="integration">
                                    <h4>Integration</h4>
                                    <p className='text-muted'>{detailsInfo.integration}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            }
            <div className='row section-review mx-auto container'>
                <div className='col-md-7 mb-3'>
                    <div className=' mx-2 review-thumb  '>
                        <div class="row mx-3 py-2">
                            <div class="col-auto me-auto header-font"><h5>Reviews</h5></div>
                            <div class="col-auto">    </div>
                        </div>
                        {
                            reviewDataGet.map(data =>

                                <div className='row col-md-12 col-12 py-2'>
                                    <div className='col-md-2 col-2 d-flex justify-content-end '>
                                        <img
                                            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                                            alt=""
                                            style={{ width: '45px', height: '45px' }}
                                            class="rounded-circle"
                                        />
                                    </div>
                                    <div className='col-md-8 col-8  '>

                                        <p class="fw-bold mb-0">{data.name}</p>
                                        <small class="mb-0 text-muted">  {data.createAt} </small>
                                        <p className='mb-0'><Rating value={data.rating} readOnly size='small'></Rating></p>
                                        <p class="text-dark text-wrap ">{data.comment}</p>

                                    </div>
                                </div>
                            )
                        }

                    </div>

                </div>

                <div className='col-md-5'>
                    <div className=' mx-3 row review-table'>
                        <div className='col-md-8 col-8 mx-auto py-4'>
                            <form onSubmit={handleReviewSubmit}>
                                <h5 className='mb-2'>Add Comment</h5>
                                <Rating
                                    name="simple-controlled"
                                    value={ratingValue}
                                    className=' mb-3'
                                    onChange={(event, newValue) => {
                                        setRatingValue(newValue);
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Name"
                                    required
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    variant="outlined"
                                    className='col-md-12 col-12 mb-4'
                                    placeholder='Name' />

                                <TextField
                                    id="outlined-basic"
                                    label="Email"
                                    type={'email'}
                                    required
                                    value={reviewEmail}
                                    onChange={(e) => setReviewEmail(e.target.value)}
                                    variant="outlined"
                                    className='col-md-12 col-12 mb-4'
                                    placeholder='Email' />

                                <TextField
                                    id="outlined-multiline-static"
                                    label="Comment"
                                    multiline
                                    required
                                    rows={4}
                                    onChange={(e) => setComment(e.target.value)}
                                    value={comment}
                                    className='col-md-12 col-12 mb-3'
                                    placeholder='Write comment'
                                />

                                <Button variant="outlined" type='submit'>Submit</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;