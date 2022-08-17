import React, { useContext, useEffect, useState } from 'react';
import { useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { ContextUser } from './../../App';


const CheckoutForm = ({ price }) => {
    const {value4} = useContext(ContextUser)

    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [success, setSuccess] = useState('')
    const [prossesing, setProssesing] = useState(false)
    const [paymentData,setPaymentData] = value4
    


    useEffect(() => {
        fetch('https://boiling-badlands-11783.herokuapp.com/create-payment-intent', {

            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => setClientSecret(data.clientSecret))

    }, [price])


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement)

        if (card === null) {
            return;
        }
        
        setProssesing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })


        if (error) {
            console.log(error);
            setSuccess('')
            setErrorMessage(error.message)
            setProssesing(false)
        }
        else {
            setErrorMessage('')
            console.log(paymentMethod);
        }

        
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: 'Jenny Rosen',
                    },
                },
            },
        )

        if (intentError) {
            setErrorMessage(intentError.message)
            setSuccess('')
        }
        else {
            setErrorMessage('')
            setSuccess('Your payment Successfully')
            setProssesing(false)
            setPaymentData(paymentIntent)
        }
    }

  
    const ELEMENT_OPTIONS = {
        style: {
            base: {
                fontSize: '18px',
                color: '#424770',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };


    return (
        <div>
          {success ? <p className='text-center text-success fs-5 fw-bold'>{success}</p> : <form onSubmit={handleSubmit}>
                <div>
                    <div class="form-outline mb-3">
                        <label class="form-label" for="formControlLgXM8">Card Number</label>
                        <CardNumberElement
                            className='form-control border'
                            id="formControlLgXM8"
                            options={ELEMENT_OPTIONS}
                        />
                    </div>

                    <div class="row mb-3">
                        <div class="col-6">
                            <div class="form-outline">
                                <label class="form-label fw-bold" for="formControlLgExpk8">Expire</label>
                                <CardExpiryElement
                                    className='form-control border'
                                    id="formControlLgExpk8"
                                    options={ELEMENT_OPTIONS}
                                />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-outline">
                                <label class="form-label fst-normal" for="formControlLgcvv8">CVC</label>
                                <CardCvcElement
                                    className='form-control border'
                                    id="formControlLgcvv8"
                                    options={ELEMENT_OPTIONS}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <p className='text-danger'>{errorMessage}</p>
                <p>{success}</p>

                {prossesing ?
                    <div class="spinner-border text-primary " role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    :
                    <button className='btn btn-info btn-block' type="submit" disabled={!stripe}>
                        Pay <span>${price}</span>
                    </button>}
            </form>}
        </div>
    );
};

export default CheckoutForm;