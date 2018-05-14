import React from 'react';
import styled from 'styled-components';

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
`;