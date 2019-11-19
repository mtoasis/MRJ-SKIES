import React from 'react'
import { connect } from 'react-redux'
import { selectCollection } from '../../redux/shop/shop.selector'

import {CollectionPageContainer, ItemsContainer, CollectionItemContainer} from './collection.styles'

const CollectionPage = ({ collection }) => {
    const {title, items} = collection;
    return (
        <CollectionPageContainer>
            <h2 className='title'>{title}</h2>
            <ItemsContainer>
                {
                    items.map(item=> <CollectionItemContainer key={item.id} item={item} />)
                }
            </ItemsContainer>
        </CollectionPageContainer>
    )
}

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);