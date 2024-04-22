/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import './Payment.css';
import { UseStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import {Link, useNavigate} from "react-router-dom";
import { CardElement ,useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios.js';
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from './firebase.js';

function Payment() {
    const [{basket, user}, dispatch] = UseStateValue();
    
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [processing, setProcessing] = useState("");
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() =>{
        // generate the special stripe secret which allows us to charge a customer 

        const getClientSecret = async () =>{
            const response = await axios({
                method: 'post',
                // stripe expects the total in a currencies subunits (for dollars take a param as cents)
                url:`/payments/create?total=${getBasketTotal(basket) * 100}`
            });

            setClientSecret(response.data.clientSecret);
        }
        getClientSecret();
    }, [basket])


    console.log("the secret is >>>",clientSecret);
    

    const handleSubmit = async ( event ) => {
        // stripe fancy stuff
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission or show a loading indicator until Stripe.js has loaded.
            return;
        }

        try {
            const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            // Handle success
            console.log('PaymentIntent:', paymentIntent);

            // Push into the database
            await setDoc(doc(collection(db, 'users', user?.uid, 'orders'), paymentIntent.id), {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });
            
            navigate("/orders", { replace: true });

        } catch (error) {
            console.error('Error confirming card payment:', error);
            setError(error.message); // Set error state to display to the user
            setProcessing(false); // Reset processing state
        }

        

        // const payload = await stripe.confirmCardPayment(clientSecret,{
        //     payment_method: {
        //         card: elements.getElement(CardElement)
        //     }
        // }).then(({ paymentIntent }) =>{
        //     // payment intent = payment confirmation

        //     console.log(paymentIntent);
            
        //     //push into the database 
        //     setDoc(doc(collection(db, 'users', user?.uid, 'orders'), paymentIntent.id), {
        //         basket: basket,
        //         amount: paymentIntent.amount,
        //         created: paymentIntent.created
        //       });

            
        //     setSucceeded(true);
        //     setError(null);
        //     setProcessing(false);

        //     dispatch({
        //         type:'EMPTY_BASKET'
        //     })
        //     navigate("/orders",{replace: true});
        // }).catch(error => {
        //     console.error('Error confirming card payment:', error);
        //     setError(error.message); // Set error state to display to the user
        //     setProcessing(false); // Reset processing state
        // });
    }

    const handleChange = event => {
        //Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

  return (
    <div className='payment'>
        <div className='payment__container'>
            <h1>
                Checkout (
                    <Link to="/checkout">{basket?.length} items</Link>)
            </h1>

            {/* Delivery section */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React lane</p>
                    <p>Bangalore, India</p>
                </div>
            </div>
            {/* Review Items */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h2>Review Items and Delivery</h2>
                </div>
                <div className='payment__items'>
                    {basket.map(item => (
                        <CheckoutProduct
                            id ={item.id}
                            title = {item.title}
                            image = {item.image}
                            rating ={item.rating}
                            price = {item.price}
                        />
                    ))}
                </div>
            </div>
            {/* Payment Method */}
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* Stripe payment magic will go  */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) =>(
                                    <>
                                        <p>
                                            Subtotal ({basket.length} items):
                                            <strong>{value}</strong>
                                        </p>
                                        <small className='subtotal__gift'>
                                            <input type='checkbox'/>This order contains a gift
                                        </small>
                                    </>
                                )}
                                decimalScale={2}
                                value ={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSperator ={true}
                                prefix={'$'}
                            />
                            <button disabled={processing || disabled ||succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment;
