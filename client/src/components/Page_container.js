import React from 'react';
import styled from 'styled-components';

const PageContainer = ({ children }) =>
{
    return(
        <Main>{children}</Main>
    )
}

export { PageContainer };

const Main = styled.main`
    width:100%;
    padding-bottom:60px;
`