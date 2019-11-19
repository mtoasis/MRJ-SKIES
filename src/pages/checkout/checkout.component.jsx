import React from 'react'
import {
    CheckoutPageContainer, 
    CheckoutHeader, 
    HeaderBlockContainer, 
    TotalContainer, 
    TestWarningContainer} from './checkout.styles'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'


const CheckoutPage = ({ cartItems, total }) => {
    
    const totalDisplay = total.toFixed(2)
    return(
    <CheckoutPageContainer>
        <CheckoutHeader>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>

            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>

            <HeaderBlockContainer>
                <span>Quantity</span>
            </HeaderBlockContainer>

            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>

            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
        </CheckoutHeader>
        {
            cartItems.map(cartItem =>
                <CheckoutItem cartItem={cartItem} key={cartItem.id} />
            )
        }
        <TotalContainer>
            <span>TOTAL: ${totalDisplay}</span>
        </TotalContainer>
        <TestWarningContainer>
            *Please use the following test credit card numbe for paylemts*
            <br/>
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </TestWarningContainer>
        <StripeCheckoutButton price={total} />
    </CheckoutPageContainer>
)}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
})

export default connect(mapStateToProps)(CheckoutPage)
