import './App.css';
import Checkout from './Checkout.js';
import Header from './Header.js';
import Home from './Home.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login.js';
import { useEffect } from 'react';
import { auth } from './firebase.js';
import { UseStateValue } from './StateProvider.js';


function App() {
  const [{}, dispatch] = UseStateValue();

  useEffect( ()=> {
    // will only run once when the app component loads 
    auth.onAuthStateChanged(authUser => {
      console.log("the User is ", authUser);
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
          <Route exact path="/login" element ={<Login />}/>
          <Route exact path="/checkout" element ={[<Header />,<Checkout/>]}/>
          <Route path="/" element={[<Header />,<Home/>]} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
