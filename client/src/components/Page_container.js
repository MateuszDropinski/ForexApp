import React from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components'
import { media } from '../data/style';

const PageContainer = ({ children }) =>
{
    return(
        <Main>{children}</Main>
    )
}

export { PageContainer };

const showPage = keyframes`
  from {
    opacity:0;
  }

  to {
    opacity:1;
  }
`;

const Main = styled.main`
    width:100%;
    padding-bottom:60px;
    opacity:0;

    ${media.md`padding-bottom:80px;`}
    ${media.lg`padding-bottom:100px;`}
    ${media.hd`padding-bottom:140px;`}

    animation: ${showPage} .25s ease-in forwards;
`