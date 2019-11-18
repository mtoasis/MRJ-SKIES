import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) =>{
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_gdLeayJ7JWsJwUoV8QBAqO5S006NnCmtWR'
    
    const onToken = token=>{
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout 
        label='Pay Now'
        name='MRJ SKIS Inc. '
        billingAddress
        shippingAddress
        description={`Your total is $${price}`}
        amount ={priceForStripe}
        panelLabel='Pay Now'
        toke={onToken}
        stripeKey ={publishableKey}
        />
    )
}

export default StripeCheckoutButton