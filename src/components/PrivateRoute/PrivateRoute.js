import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import useFirebase from './../Hooks/useFirebase';
import { ContextUser } from './../../App';


const PrivateRoute = ({ children, ...rest }) => {
    const {value3} = useContext(ContextUser)
    const [loggedInUser,setLoggedInUser] = value3
    return (
        <Route
        {...rest}
        render={({ location }) =>
          loggedInUser.email || sessionStorage.getItem('idToken') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;