import { TextField } from '@mui/material';
import React, { useContext } from 'react';
import { ContextUser } from '../../../../App';
import './Profile.scss'
import LetteredAvatar from 'react-lettered-avatar';


const Profile = () => {
    const {value3} = useContext(ContextUser)
    const [loggedInUser] = value3

    
    return (
        <div className='container'>
            <h5>Admin Profile</h5>
            <div className='row mt-2 '>
                <div className='col-md-4 col-12 profile-div'>
                    <div className='one '>
                        <div className='mx-auto'>
                            <div className='mx-auto radius-circle mb-2'>
                                <div className='mx-auto img-profile'>
                                <LetteredAvatar name={loggedInUser.displayName} size={120} />
                                    {/* <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp" className='img-fluid' alt="" /> */}
                                </div>
                            </div>

                            <div className='text-center'>
                                <small>Admin</small>
                                <h5>{loggedInUser.displayName}</h5>
                                <p>{loggedInUser.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-7  col-12'>
                    <div className='col-md-12 col-12 my-3 py-3 row  card mx-auto'>
                    <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            value={loggedInUser.displayName}
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 col-10 mx-3 mb-3'
                        />
                               <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            value={loggedInUser.email}
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 col-10 mx-3 mb-3'
                        />
                               <TextField
                            required
                            id="outlined-required"
                            label="phone"
                            placeholder='+0130007770'
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 col-10 mx-3 mb-3'
                        />
                            <TextField
                            required
                            id="outlined-required"
                            label="Birth of date"
                            placeholder='DD-MM-YYYY'
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 col-10 mx-3 mb-3'
                        />

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;