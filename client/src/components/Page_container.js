import React from 'react';
import styled from 'styled-components';
import { media } from '../data/style';

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

    ${media.md`padding-bottom:80px;`}
    ${media.lg`padding-bottom:120px;`}
    ${media.hd`padding-bottom:160px;`}
`