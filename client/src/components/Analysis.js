import React, { Component } from 'react';

import { Percentages, Bar, AnalysisContainer, Title, Description, ToggleButton } from './styles/analysis';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAnalysis, togglePanel } from '../actions';

import { analysisData } from '../data/analysis';

class Analysis extends Component
{   
    componentWillReceiveProps(newProps)
    {
        if(newProps.analysis[newProps.currency] && !newProps.analysis[newProps.currency][newProps.id])
        {
            const { candles, algorithm } = analysisData[newProps.id];
            this.props.getAnalysis(candles, newProps.currency, algorithm, newProps.id);
        }            
    }
    
    componentDidMount()
    {
        let { currency, id } = this.props
        
        if(currency && !this.props.analysis[currency][id])
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
            if(this.props.analysis[currency][id] && this.props.analysis[currency][id] !== "Loading")
            {
                let { up, down } = this.props.analysis[currency][id];
                return (
                    <Percentages>
                        <Bar percentage={up} side="left"/>
                        <Bar percentage={down} side="right"/>
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
        const { panel, id } = this.props;
        
        return(
            <AnalysisContainer>
                <Title>"{name}"</Title>
                <Description show={ this.props.description ? "block" : "none" }>
                    Opis: {description}
                </Description>
                {this.renderPercentages()}
                <ToggleButton 
                    toggle={(this.props.currency && panel[this.props.currency][id]) ? true : false} 
                    show={this.props.currency ? "block" : "none"}
                    onClick = {() => this.props.togglePanel(this.props.currency, id)}
                >
                    {this.props.currency && panel[this.props.currency][id] ? "Usuń" : "Dodaj"}
                </ToggleButton>
            </AnalysisContainer>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ getAnalysis, togglePanel }, dispatch);
}

function mapStateToProps({ analysis, panel })
{
    return { analysis, panel };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Analysis);

export { connectedComponent as Analysis };