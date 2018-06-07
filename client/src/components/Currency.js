import React, { Component } from 'react';

import { CurrencyContainer, Instrument, Paragraph, PositionButton, InfoBox } from './styles/currency';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPosition } from '../actions';

class Currency extends Component
{
    constructor()
    {
        super()
        
        this.state = { color: "", loading: false, opacity: 0, information: "", show: false};
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
    
    shouldComponentUpdate(newProps, newState)
    {
        if(newProps.bid !== this.props.bid || this.state.opacity !== newState.opacity)return true;
        else return false;
    }
    
    createPosition(e, position)
    {        
        let value = position === "buy" ? this.props.ask : this.props.bid;
        e.preventDefault();
        e.stopPropagation();
        this.props.setPosition(this.props.instrument, position, value);
        this.setState({ show:true, opacity:1, position, information:`${position === "buy" ? "Kupno" : "Sprzedaż"} ${this.props.instrument} po cenie: ${value}`})
        setTimeout(() => this.setState({ opacity: 0 }), 2000);
        setTimeout(() => this.setState({ show: false }), 2000);
    }
    
    render()
    {
        let { instrument, bid, ask } = this.props;
        return(
            <CurrencyContainer exact to={`/currency/${instrument}`}>
                <Instrument>{instrument.split("_").join(" ")}</Instrument>
                <Paragraph color={this.state.color}>Bid: <span>{this.state.loading ? bid : "ładowanie..."}</span></Paragraph>
                <Paragraph color={this.state.color}>Ask: <span>{this.state.loading ? ask : "ładowanie..."}</span></Paragraph>
                <PositionButton show={bid} position="buy" onClick={e => this.createPosition(e, "buy")}>Buy</PositionButton>
                <PositionButton show={bid} position="sell" onClick={e => this.createPosition(e, "sell")}>Sell</PositionButton>
                <InfoBox opacity={this.state.opacity} show={this.state.show}>
                    <p>{this.state.information}</p>
                </InfoBox>
            </CurrencyContainer>
        ) 
    }    
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ setPosition }, dispatch);
}
const connectedComponent = connect(null, mapDispatchToProps)(Currency);

export { connectedComponent as Currency };