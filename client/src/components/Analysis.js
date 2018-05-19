import React, { Component } from 'react';

import { Percentages, Bar, AnalysisContainer, Title, Correctness, Description } from './styles/analysis';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnalysis } from '../actions';

import { analysisData } from '../data/analysis';

class Analysis extends Component
{   
    componentWillReceiveProps(newProps)
    {
        if(newProps[newProps.currency] && !newProps[newProps.currency][newProps.id])
        {
            const { candles, algorithm } = analysisData[newProps.id];
            this.props.getAnalysis(candles, newProps.currency, algorithm, newProps.id);
        }            
    }
    
    componentDidMount()
    {
        if(this.props.currency)
        {
            const { candles, algorithm } = analysisData[this.props.id];
            
            this.props.getAnalysis(candles, this.props.currency, algorithm, this.props.id);
        }        
    }
    
    renderPercentages()
    {
        let { currency, id } = this.props;
        
        if(currency)
        {
            if(this.props[currency][id] && this.props[currency][id] !== "Loading")
            {
                let { up, down } = this.props[currency][id];
                return (
                    <Percentages>
                        <Bar percentage={up} />
                        <Bar percentage={down} />
                    </Percentages>
                );
            }                  
            else return <p>Ładowanie...</p>
        }
        else return null;        
    }
    
    render()
    {
        const { name, description } = analysisData[this.props.id];
        const currency = this.props.currency ? this.props.currency : "all";
        return(
            <AnalysisContainer>
                <Title>"{name}"</Title>
                <Description show={ description ? "block" : "none" }>Opis: {description}</Description>
                {this.renderPercentages()}
            </AnalysisContainer>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ getAnalysis }, dispatch);
}

function mapStateToProps({ analysis })
{
    return analysis;
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Analysis);

export { connectedComponent as Analysis };