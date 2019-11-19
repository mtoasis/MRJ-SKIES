import React from 'react'
// import './collection-preview.styles.scss'
import CollectionItem from '../collection-item/collection-item.component'
import { withRouter } from 'react-router-dom';
import {CollectionPreviewContainer, TitleLinkContainer, PreviewContainer} from './collection-preview.styles'

const CollectionPreview = ({title,items, history, match}) => (
    <CollectionPreviewContainer>
        <TitleLinkContainer onClick={()=>history.push(`${match.url}/${title.toLowerCase()}`)}>
            <h1>{title.toUpperCase()}</h1>
        </TitleLinkContainer>        
        <PreviewContainer>
            {
                items
                .filter((item, idx)=> idx< 4)
                .map((item)=>(
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </PreviewContainer>
    </CollectionPreviewContainer>
)

export default withRouter(CollectionPreview)