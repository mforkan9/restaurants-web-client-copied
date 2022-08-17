import React, { useContext } from 'react';
import './MyAccount.scss'
import LetteredAvatar from 'react-lettered-avatar';
import { TextField } from '@mui/material';
import { ContextUser } from '../../../../App';

const MyAccount = () => {
    const {value3} = useContext(ContextUser)
    const [loggedInUser] = value3

    console.log(loggedInUser)

    return (
        <div className=''>
            <h4>My Account</h4>
            <div className='col-md-12 col-12 row container my-5'>
                <div className='col-md-4  col-12   mb-4'>
                    <div className='card account-avatar'>
                        <div className=' mx-auto my-5'>
                            <LetteredAvatar name={loggedInUser.displayName} size={120} />
                            <p className='text-center mt-3 fw-bold'>Profile Image</p>
                        </div>

                    </div>
                </div>
                <div className='col-md-6 col-12  mb-4'>
                    <div className=' p-4 card'>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name"
                            value={loggedInUser.displayName}
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 mx-3 mb-3'
                        />
                           <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            value={loggedInUser.email}
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 mx-3 mb-3'
                        />
                           <TextField
                            required
                            id="outlined-required"
                            label="phone"
                            placeholder='+0130007770'
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 mx-3 mb-3'
                        />
                           <TextField
                            required
                            id="outlined-required"
                            label="Birth of date"
                            placeholder='DD-MM-YYYY'
                            InputProps={{
                                readOnly: true,
                              }}
                            className='col-md-10 mx-3 mb-3'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;