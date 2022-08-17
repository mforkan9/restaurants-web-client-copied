import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51J48PcI49BSRorNvAiYFzddt5zOk2P5C5BbWLDiaPJrLMyaD1vDqcsX3BFWmHAvn7sm1nXCyCSvlJEQlgpFdeikS00EC4sMswv')


const Payment = ({paymentPrice}) => {

    return (
       <Elements stripe={stripePromise }>
          <CheckoutForm
             price = {paymentPrice}
          ></CheckoutForm>
       </Elements>
    );
};

export default Payment;