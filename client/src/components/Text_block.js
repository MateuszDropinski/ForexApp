import React from 'react';

import styled from 'styled-components';

const Paragraph = styled.p`
    margin:10px 0px;
    font-size:.8rem;
    width:100%;
    text-align:${props => props.align};
`;

const TextBlock = ({ children, align }) =>
{
    return(
        <Paragraph align={ align || "left" }>
            {children}
        </Paragraph>
    )
}

export { TextBlock };