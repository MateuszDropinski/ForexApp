import React from 'react';
import styled from 'styled-components';
import { media } from '../data/style';

const PageSection = ({ children, vertical, horizontal }) =>
{
    return (
        <Section vertical={vertical || "center"} horizontal={horizontal || "center"}>
            {children}
        </Section>
    )
};

export { PageSection };

const Section = styled.article`
    width: 100%;
    padding:20px 25px 0px 25px;
    display:flex;
    justify-content:${props => props.horizontal};
    align-items:${props => props.vertical};
    flex-wrap:wrap;

    ${media.md`padding-top:30px;width:80%;margin:0 auto;`}
    ${media.lg`width:60%;`}
    ${media.hd`width:50%;`}
`;