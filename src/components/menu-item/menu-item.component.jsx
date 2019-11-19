import React from 'react'
import { withRouter } from 'react-router-dom';
import {ContentContainer, BackgroundImageContainer, MenuItemContainer} from './menu-item.styles'

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
    <MenuItemContainer size={size}  onClick={()=>history.push(`${match.url}${linkUrl}`)}>

        <BackgroundImageContainer imageUrl={imageUrl} />
        <ContentContainer>
            <h1>
                {title}
            </h1>
            <span>
                SHOP NOW
            </span>
        </ContentContainer>
    </MenuItemContainer>
)

export default withRouter(MenuItem)