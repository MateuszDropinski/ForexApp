import React from 'react';

import styled from 'styled-components';
import { media } from '../data/style';

const TextBlock = ({ children, align, size }) =>
{
    return(
        <Paragraph align={ align || "left" } size={ size || ".8rem" }>
            {children}
        </Paragraph>
    )
}

export { TextBlock };

const Paragraph = styled.p`
    margin:10px 0px;
    font-size:${props => props.size};
    width:100%;
    text-align:${props => props.align};

    ${media.md`margin: 15px 0px;`}
    ${media.md`margin: 20px 0px;`}
`;