import React, { useContext, useEffect, useState } from 'react';
import './Login.scss'
import initializationFirebase from './../Firebase/firebase.init';
import useFirebase from './../Hooks/useFirebase';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { ContextUser } from './../../App';

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  getIdToken
} from "firebase/auth";
import { TextField } from '@mui/material';

initializationFirebase();

const Login = () => {
  const {value3} = useContext(ContextUser)
  const [loggedInUser,setLoggedInUser] = value3
  // const {
  //   handleGoogleSignIn,
  //   loggedInUser,
  //   setLoggedInUser,
  //   name,
  //   setName,
  //   errorInRegister,
  //   setRegisterErr,
  //   errorInLogin,
  //   email,
  //   setEmail,
  //   password,
  //   setPassword,
  //   handleRegister,
  //   validEmail,
  //   passwordValid,
  //   emailMessage,
  //   passwordMessage,
  //   handleLogin,
  //   handlePasswordReset

  // } 
  // = useFirebase()
  
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } };

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [passwordMessage, setPasswordMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')

  const [errorInRegister, setRegisterErr] = useState('')
  const [errorInLogin, setErrorLogin] = useState('')

  

  const auth = getAuth()

  //Google Sign In

  const GoogleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, GoogleProvider)
      .then((result) => {
        const user = result.user
        console.log(user);
        setLoggedInUser(user)
        history.push(from)

      })

  }


  //Email-Password Registration

  const userName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then((result) => {

      }).catch((error) => {
        setRegisterErr(error);
      });
  }


  const validEmail = (e) => {
    const email = e.target.value
    const emailRegex = /\S+@\S+\.\S+/;
    if (emailRegex.test(email)) {
      setEmailMessage('')
      setEmail(email)
    }
    else {
      setEmailMessage('Please enter a valid email')
    }

  }

  const passwordValid = (e) => {
    const password = e.target.value
    if (password.length > 6) {
      setPasswordMessage('')
      setPassword(password)
    }
    else {
      setPasswordMessage('Password must be 6 characters long')
    }
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then((result) => {

      });
  }


  const handleRegister = (e) => {
    e.preventDefault()

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setRegisterErr('')
        userName()
        verifyEmail()
        setLoggedInUser(user)
        history.push(from)
      })
      .catch((error) => {
        const errorMessage = error.message;
        setRegisterErr(errorMessage)

      });
  }


  // useEffect(() => {
  //   onAuthStateChanged(auth,(user) => {
  //     if (user) {
  //        getIdToken(user)
  //       .then(idToken => sessionStorage.setItem('idToken',idToken))
  //      setLoggedInUser(user)
  //     }else{
  //       setLoggedInUser({})
  //     }
  //   });
  // }, [])


  


  //Email-Password Login

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedInUser(user)
        setErrorLogin('')
        history.push(from)
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorLogin(errorMessage);
      });
  }

  //Password--Reset

  const handlePasswordReset = () => {

    sendPasswordResetEmail(auth, email)
      .then((result) => {

      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorLogin(errorMessage);
      });
  }

  return (
    <div className='loginPage col-md-6 col-12 mx-auto container'>
      <div className='card  shadow-2-strong mainDiv row'>
        <div className='login-form col-md-6 col-10'>
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                aria-controls="pills-login" aria-selected="true">Login</a>
            </li>
            <li className="nav-item" role="presentation">
              <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                aria-controls="pills-register" aria-selected="false">Register</a>
            </li>
          </ul>



          <div className="tab-content">
            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">

              <form onSubmit={handleLogin}>
                <div className="text-center mb-3">
                  <h5>Sign in with</h5>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1" onClick={handleGoogleSignIn}>
                    <i className="fab fa-google"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                </div>

                <h3 className="text-center">or</h3>


                <div className="form-outline mb-4">

                  <input type="email" id="loginName" className="form-control" onBlur={(e) => setEmail(e.target.value)} />
                  <label className="form-label" for="loginName">Email or username</label>
                </div>


                <div className="form-outline mb-4 pass-wrapper">
                  <input type={passwordShown ? 'text' : "password"} id="loginPassword" className="form-control" onBlur={(e) => setPassword(e.target.value)} />
                  <div className='show' onClick={togglePassword}>
                    {passwordShown ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                  </div>
                  <label className="form-label" for="loginPassword">Password</label>
                </div>


                <div className="row mb-4">

                  <div className="col-md-6 d-flex justify-content-center">
                    {/* <div className="form-check mb-3 mb-md-0">
                      <input className="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                      <label className="form-check-label" for="loginCheck"> Remember me </label>
                    </div> */}
                  </div>

                  <div className="col-md-6 d-flex justify-content-center">
                    <a href="#!" onClick={handlePasswordReset}>Forgot password?</a>
                  </div>
                </div>

                <p className='text-danger'>{errorInLogin}</p>

                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                <div className="text-center ">
                  <p>
                    Not a member?  <span>Register</span>
                  </p>
                </div>

              </form>

            </div>


            <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
              <form onSubmit={handleRegister}>
                <div className="text-center mb-3">
                  <h5 style={{ marginBottom: '30px' }}>Sign up with</h5>
                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                  </button>

                  <button type="button" className="btn btn-primary btn-floating mx-1" onClick={handleGoogleSignIn}>
                    <i className="fab fa-google"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                  </button>

                  <button type="button" className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                  </button>
                </div>

                <h4 className="text-center mt-3">or</h4>


                {/* <div className="form-outline mb-4">
                  <input type="text" id="registerName" className="form-control" onBlur={(e) =>setName(e.target.value)} />
                  <label className="form-label" for="registerName">Name</label>
                </div> */}


                <div className="form-outline mb-4">
                  <input type="text" id="registerUsername" className="form-control"  required onBlur={(e) => setName(e.target.value)} />
                  <label className="form-label" for="registerUsername">Username</label>
                </div>


                <div className="form-outline mb-4">
                  <input type="email" id="registerEmail" className="form-control" required onChange={validEmail} />
                  <label className="form-label" for="registerEmail">Email</label>
                  <p className='text-danger'>{emailMessage}</p>
                </div>


                <div className="form-outline mb-4">
                  <span className='pass-wrapper'>
                    <input type={passwordShown ? 'text' : "password"} id="registerPassword" className="form-control" required onChange={passwordValid} />
                    <div className='show' onClick={togglePassword}>
                      {passwordShown ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                    </div>
                    <label className="form-label" for="registerPassword">Password</label>
                  </span>
                  <p className='text-danger'>{passwordMessage}</p>
                </div>



                {/* <div className="form-outline mb-4">
                  <input type="password" id="registerRepeatPassword" className="form-control" />
                  <label className="form-label" for="registerRepeatPassword">Repeat password</label>
                </div> */}


                <div className="form-check d-flex justify-content-center mb-4">

                  <label className="form-check-label text-danger" for="registerCheck" >
                    {errorInRegister}
                  </label>
                </div>


                <button type="submit" className="btn btn-primary btn-block mb-3">Sign in</button>
                <div className="text-center ">
                  <p>
                    Already have a member?  <span>Login</span>
                  </p>
                </div>
              </form>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;