import React, {Fragment} from 'react'

import { Route } from 'react-router-dom'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

const ShopPage = ({match}) => (

    <Fragment>
        <Route exact path ={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
    </Fragment>
)

export default ShopPage

