import React, { Component } from 'react';

import styled from 'styled-components';
import { leadingColor } from '../data/style';

const AnalysisContainer = styled.article`
    width:100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding:15px 20px;
    margin:10px 0px;
    display:grid;
    grid-template: 50px 100px ${props => props.height ? "100px" : "0px"} / 50% 50%;
    border:1px solid ${leadingColor};
    border-radius:2px;
`;

const Title = styled.h3`
    margin:0px;
    font-size:1rem;
    display:flex;
    align-items:center;
`;

const Correctness = styled.p`
    margin:0px;
    font-size:.8rem;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`;

const Description = styled.p`
    margin:0px;
    font-size:.75rem;
    grid-column-start:1;
    grid-column-end:3;
    display:flex;
    align-items:center;
`;

class Analysis extends Component
{
    // props = { currency, id_analizy }
    
    constructor()
    {
        super();
    }
    
    renderPercentages()
    {
        if(this.props.currency)
        {
            return <p >{this.props.currency}</p>    
        }
        else return null;        
    }
    
    render()
    {
        let { name, correctness, currency, description } = this.props;
        return(
            <AnalysisContainer height={currency ? true : undefined}>
                <Title>"{name}"</Title>
                <Correctness>Trafność: {currency ? correctness[currency] : correctness["all"]}</Correctness>
                <Description>Opis: {description}</Description>
                {this.renderPercentages()}
            </AnalysisContainer>
        )
    }
}

export { Analysis }