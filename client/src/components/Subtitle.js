import React from 'react';

import styled from 'styled-components';
import { leadingColor, media } from '../data/style';

const Subtitle = ({ children }) =>
{
    return(
        <Header>
            {children}
        </Header>
    )
}

export { Subtitle };

const Header = styled.h2`
    margin:10px 0px;
    font-size:1.3rem;
    position:relative;
    
    &:before
    {
        content:"";
        position:absolute;
        top:100%;
        left:0;
        transform:translate(0,2px);
        height:2px;
        width:100%;
        background-color:${leadingColor};
        border-radius:2px;
    }

    ${media.lg`margin:15px 0px;&:before{height:4px;}`}
`;