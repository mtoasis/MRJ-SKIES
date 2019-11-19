import React from 'react'
import { connect } from 'react-redux'

import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selecCartItemsCount } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect'

import { CartIconContainer, ShoppingIconContainer } from './cart-icon.styles'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <ShoppingIconContainer />
        <span>{itemCount}</span>
    </CartIconContainer>
)


const mapStateToProps = createStructuredSelector({
    itemCount: selecCartItemsCount
})

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon)