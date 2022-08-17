import './App.css';
import Home from './components/Home/Home';
import MoreBreakfast from './components/MainHomeItem/Categories/Breakfast/MoreBreakfast/MoreBreakfast';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import MoreDinner from './components/MainHomeItem/Categories/Dinner/MoreDinner/MoreDinner';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import DetailsPage from './components/DetailsPage/DetailsPage';
import { createContext, useEffect, useState } from 'react';
import Shipping from './components/Shipping/Shipping';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
import MoreLunch from './components/MainHomeItem/Categories/Lunch/MoreLunch/MoreLunch';
import MoreSnack from './components/MainHomeItem/Categories/Snacks/MoreSnack/MoreSnack';
import UserDash from './components/UserDashboard/UserDash/UserDash';

export const ContextUser = createContext()

function App() {

const [detailsData,setDetailsData] = useState([{}])
const [order,setOrder] = useState([])
const [orderSuccess,setOrderSuccess] = useState(false)
const [loggedInUser,setLoggedInUser] = useState({})
const [paymentData,setPaymentData] = useState({})

const auth = getAuth()

useEffect(() => {
  onAuthStateChanged(auth,(user) => {
    if (user) {
       getIdToken(user)
      .then(idToken => sessionStorage.setItem('idToken',idToken))
     setLoggedInUser(user)
    }else{
      setLoggedInUser({})
    }
  });
}, [auth])

  return (
    <ContextUser.Provider  value={{
      value1:[detailsData,setDetailsData] ,
      value2:[order,setOrder],
      value3:[loggedInUser,setLoggedInUser],
      value4:[paymentData,setPaymentData],
      value5:[orderSuccess,setOrderSuccess],
    }}>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'}>
          <Home></Home>
        </Route>
        <Route path={'/morebreakfast'}>
          <MoreBreakfast></MoreBreakfast>
        </Route>
        <Route path={'/moredinner'}>
          <MoreDinner></MoreDinner>
        </Route>
        <Route path={'/morelunch'}>
            <MoreLunch></MoreLunch>
        </Route>
        <Route path={'/moresnack'}>
            <MoreSnack></MoreSnack>
        </Route>
       <PrivateRoute path={'/dashboard'}>
         <AdminDashboard></AdminDashboard>
       </PrivateRoute>
       <PrivateRoute path={'/userDashboard'}>
        <UserDash></UserDash>
       </PrivateRoute>
       <Route path='/detailspage/:detailsId'>
         <DetailsPage></DetailsPage>
       </Route>
       <Route path='/login'>
         <Login></Login>
       </Route>
       <PrivateRoute path='/ship'>
         <Shipping></Shipping>
       </PrivateRoute>
      
      </Switch>
    </BrowserRouter>
    </ContextUser.Provider>
   

  );
}

export default App;
