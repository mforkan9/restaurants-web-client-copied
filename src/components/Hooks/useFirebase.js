import { useState, useEffect, useContext } from 'react';
import initializationFirebase from './../Firebase/firebase.init';
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
        updateProfile } from "firebase/auth";


initializationFirebase();


const useFirebase = () => {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [passwordMessage,setPasswordMessage] = useState('')
    const [emailMessage,setEmailMessage] = useState('')

    const [errorInRegister, setRegisterErr] = useState('')
    const [errorInLogin,setErrorLogin] = useState('')

    const [loggedInUser, setLoggedInUser] = useState({})


  

    const auth = getAuth()

    //Google Sign In

    const GoogleProvider = new GoogleAuthProvider();

    const handleGoogleSig = () => {
       return signInWithPopup(auth, GoogleProvider)
        
    }

    
    //Email-Password Registration

    const userName = () =>{
        updateProfile(auth.currentUser, {displayName: name})
        .then((result) => {
        
          }).catch((error) => {
            setRegisterErr(error);
          });
    }


    const validEmail = (e) =>{
        const email = e.target.value
        const emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(email)) {
            setEmailMessage('')
            setEmail(email)
        }
        else{
            setEmailMessage('Please enter a valid email')
        }

    }

    const passwordValid = (e) =>{
        const password = e.target.value
        if (password.length > 6 ) {
            setPasswordMessage('') 
            setPassword(password)           
        }
        else{
            setPasswordMessage('Password must be 6 characters long')
        }
    }

    const verifyEmail = () =>{
        sendEmailVerification(auth.currentUser)
       .then((result) => {

         });
    }


    const handleRegister = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setRegisterErr('')
                userName()
                verifyEmail()
                setLoggedInUser(user)

            })
            .catch((error) => {
                const errorMessage = error.message;
                setRegisterErr(errorMessage)

            });
    }


    useEffect(() =>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setLoggedInUser(user)
            } 
          });
    },[])


//Email-Password Login

const handleLogin = (e) =>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setLoggedInUser(user)
    setErrorLogin('')
  })
  .catch((error) => {
    const errorMessage = error.message;
    setErrorLogin(errorMessage);
  });
}

//Password--Reset

const handlePasswordReset = () =>{

    sendPasswordResetEmail(auth, email)
  .then((result) => {
  
  })
  .catch((error) => {
    const errorMessage = error.message;
    setErrorLogin(errorMessage);
  });
}

    return {
        handleGoogleSig,
        loggedInUser,
        setLoggedInUser,
        errorInRegister,
        setRegisterErr,
        errorInLogin,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        handleRegister,
        validEmail,
        emailMessage,
        passwordValid,
        passwordMessage,
        handleLogin,
        handlePasswordReset
    }

}


export default useFirebase;