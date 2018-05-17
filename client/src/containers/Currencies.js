import React, { Component } from 'react';
import { Currency } from '../components';

import { CurrenciesContainer, ExpandBar } from './styles/currencies';

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