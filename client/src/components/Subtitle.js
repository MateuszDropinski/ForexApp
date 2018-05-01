import React from 'react';

import styled from 'styled-components';
import { leadingColor } from '../data/style';

const Header = styled.h2`
    margin:15px 0px;
    font-size:1.1rem;
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
`;

const Subtitle = ({ children }) =>
{
    return(
        <Header>
            {children}
        </Header>
    )
}

export { Subtitle };