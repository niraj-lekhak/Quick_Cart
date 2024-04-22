import './App.css';
import Checkout from './Checkout.js';
import Header from './Header.js';
import Home from './Home.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login.js';
import { useEffect } from 'react';
import { auth } from './firebase.js';
import { UseStateValue } from './StateProvider.js';
import Payment from './Payment.js';
import { loadStripe } from "@stripe/stripe-js"
import { Elements} from "@stripe/react-stripe-js"
import Orders from './Orders.js';

const promise = loadStripe("pk_test_51P6dauSEnkPmmCIHKygdcJLjStQRDYq3wLr80G2hId7Vi6QqY2ssPmt1Gau2k08nYmmapZ6jzIDBDJ1knCFz3L8s00Wzc2ebVz");

function App() {
  const [{}, dispatch] = UseStateValue();

  useEffect( ()=> {
    // will only run once when the app component loads 
    auth.onAuthStateChanged(authUser => {
      if(authUser){
        // the user just logged in / the user was logged in 
        dispatch({
          type:'SET_USER',
          user: authUser
        })
      }else{
        // the user is logged out
        dispatch({
          type:'SET_USER',
          user: null
        })
      }
    })
  },[])

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path="/orders" element ={[<Header />,<Orders/>]}/>

          <Route exact path="/login" element ={<Login />}/>
          <Route exact path="/checkout" element ={[<Header />,<Checkout/>]}/>

          <Route exact path="/payment" element ={[<Header />, <Elements stripe={promise}><Payment /></Elements>]}/>
          
          <Route path="/" element={[<Header />,<Home/>]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
