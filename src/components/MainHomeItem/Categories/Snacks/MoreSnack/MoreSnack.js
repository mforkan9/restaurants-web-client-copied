import { Rating } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactNavbar from '../../../../ReactStyle/ReactNavbar/ReactNavbar';
import './MoreSnack.scss'

const MoreSnack = () => {
    const [snackAll,setSnackAll] = useState([])
    const [searchInput,setSearchInput] = useState('')
    const [searchedData,setSearchedData] = useState([])

    
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'snack'})
        };
        fetch(`https://boiling-badlands-11783.herokuapp.com/showItem`, requestOptions)
            .then(res => res.json())
            .then(data => setSnackAll(data))
    }, [])

    console.log(searchInput)
 
    
  

    useEffect(() =>{
        fetch(`https://boiling-badlands-11783.herokuapp.com/showItemBySearch`,{
            method:'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body:JSON.stringify({name: searchInput,template: 'snack'})
        })
        .then(res => res.json())
        .then(data => setSearchedData(data))
        
    },[searchInput])

    console.log(searchedData)

    return (
        <div className=''>
                <ReactNavbar></ReactNavbar>
                <div class="form-inline col-md-12 " style={{marginTop:'120px'}}>
                <div className='col-md-6 col-8 mx-auto input-div'>
                    <span class="fa fa-search icon"></span>
                    <input class="form-control py-2  input-field  " onChange={(e) => setSearchInput(e.target.value)} type="search" placeholder="Search for Product" aria-label="Search" />
                </div>
            </div>

                <div className='row container mx-auto moreSnack-main'>
        
                    {
                        searchedData.map((pd) => (
                            <div className='col-md-4 col-lg-3 col-6 mb-4 one hover-zoom'>
                             <Link to={`/detailspage/${pd._id}`}>
                                 <div key={pd._id} className='card one-inner '>
                                    <div className='bg-image ripple ripple-surface ripple-surface-light'>
                                        <div className=' image'>
                                            <img src={pd.imageUrl} alt="" />
                                        </div>
        
                                        <div className="card-body row mt-2">
                                            {/* <div className="col-md-12">
                                                <p className='text-center fw-bold '>{pd.name}</p>
                                            </div>
                                            <div className="col-md-12">
                                                <div className='row'>
                                                    <div className="col-md-6 col-7 text-start">
                                                        <Rating className='mb-2' name="half-rating-read" defaultValue={2.5} precision={0.5} size='small' readOnly />
        
                                                    </div>
                                                    <div className="col-md-4 col-4">
                                                        <p>$<strong>{pd.price}</strong> </p>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div class="d-flex justify-content-between mb-0">
                                                {/* <h6 class="small"><a href="#!" class="">{pd.name}</a></h6> */}
                                                <p class="small"><a href="#!" class=" text-start">{pd.categories}</a></p>
                                                {/* <p class="small text-danger"><s>$1099</s></p> */}
                                                <p class="text-dark mb-0 small">$ {pd.price}</p> 
                                            </div>
        
                                            <div class="d-flex justify-content-between mb-3 name-size">
                                                <h6 class="mb-0 text-dark" style={{fontSize:'1.5vh'}}>{pd.name}</h6>
                                                {/* <h6 class="text-muted mb-0">Available: <span class="fw-bold">6</span></h6> */}
                                                {/* <h6 class="text-dark mb-0">$ {pd.price}</h6> */}
                                            </div>
        
                                            <div class=" justify-content-start mb-2 rating-size">
                                                {/* <p class="text-muted mb-0"><span class="fw-bold">{pd.price}</span></p> */}
                                                <Rating className='mt-1 mb-0 ms-auto rating' name="half-rating-read" defaultValue={2.5} precision={0.5} size='small' readOnly />
                                                 {/* <div class="ms-auto text-warning">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                </div>  */}
                                            </div>
                                        </div>
        
                                    </div>
                                </div>
                                </Link>  
                            </div>
                        ))
                    }
                </div>
            </div>
    );
};

export default MoreSnack;