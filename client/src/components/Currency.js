import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { leadingColor } from '../data/style';

const CurrencyContainer = styled(NavLink)`
    padding:5px;
    border:1px solid gray;
    background-color:#ffffff;
    text-decoration:none;
    color:black;
    transition:.25s;

    &:hover
    {
        background-color:${leadingColor};
    }
`

const Instrument = styled.h3`
    margin:0px;
    font-size:.8rem;
`
const Paragraph = styled.p`
    margin:2px 0px;
    font-size:.7rem;
    span
    {
        color: ${props => props.color};
    }
`

class Currency extends Component
{
    constructor()
    {
        super()
        
        this.state = { color: "", loading: false }
    }
    
    componentWillReceiveProps(newProps)
    {
        if(newProps.bid !== this.props.bid)
        {
            this.setState({ loading: true });
            if(newProps.bid > this.props.bid)this.setState({ color: "#16a521" });
            else if(this.props.bid > newProps.bid)this.setState({ color: "#d41414" });
            else this.setState({ color: "#434343" });
        }        
    }
    
    shouldComponentUpdate(newProps)
    {
        if(newProps.bid === this.props.bid)return false;
        else return true;
    }
    
    onCurrencyBuy(e)
    {
        e.preventDefault();
        e.stopPropagation();
    }
    
    render()
    {
        let { instrument, bid, ask } = this.props;
        return(
            <CurrencyContainer exact to={`/currency/${instrument}`}>
                <Instrument>{instrument.split("_").join(" ")}</Instrument>
                <Paragraph color={this.state.color}>Bid: <span>{this.state.loading ? bid : "ładowanie..."}</span></Paragraph>
                <Paragraph color={this.state.color}>Ask: <span>{this.state.loading ? ask : "ładowanie..."}</span></Paragraph>
                <button onClick={(e) => this.onCurrencyBuy(e)}></button>
            </CurrencyContainer>
        ) 
    }    
}

export { Currency };