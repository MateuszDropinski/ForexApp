import React, { Component } from 'react';
import { Currency } from '../components';

import styled from 'styled-components';

class Currencies extends Component
{
    constructor()
    {
        super()
        
        this.state = { show: false };
    }
    
    renderCurrencies()
    {
        return Object.keys(this.props.streamData).map((instrument,index) => {
            let { bid, ask } = this.props.streamData[instrument];
            return <Currency key={index} bid={bid} ask={ask} instrument={instrument}/>
        });
    }
    
    render()
    {    
        return(
            <CurrenciesContainer show={this.state.show}>
                <ExpandBar onClick = {() => {this.setState({ show: !this.state.show })}}>
                    <span>{this.state.show ? "Ukryj" : "Pokaż"} pary walutowe</span>
                </ExpandBar>
                {this.renderCurrencies()}
            </CurrenciesContainer>
        )
    }
}

export default Currencies;

const CurrenciesContainer = styled.article`
    width:100%;
    display:grid;
    grid-template: 80px 80px / 1fr 1fr 1fr;
    position:fixed;
    top:100%;
    transition:.25s;    
    transform:${props => props.show ? "translate(0,-100%)" : "translate(0,0)" };
`

const ExpandBar = styled.div`
    position: absolute;
    width:100%;
    height:40px;
    background-color:black;
    color:white;
    cursor:pointer;
    top:0%;
    transform:translate(0,-100%);
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    transition:.25s;
    border:1px solid black;
    font-size:1rem;

    &:hover
    {
        background-color:white;
        color:black;
    }
`