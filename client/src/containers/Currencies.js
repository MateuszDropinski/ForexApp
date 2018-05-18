import React, { Component } from 'react';
import { Currency } from '../components';

import { CurrenciesContainer, ExpandBar } from './styles/currencies';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startStream } from '../actions';

class Currencies extends Component
{
    constructor()
    {
        super()
        
        this.state = { show: false };
    }
    
    componentDidMount()
    {
        this.props.startStream();
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

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({startStream}, dispatch);
}

function mapStateToProps(state)
{
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);