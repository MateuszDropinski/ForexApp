import React, { Component } from 'react';

import { PageContainer, Chart, PageSection, TextBlock, Subtitle, Analysis } from '../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getChart } from '../actions';

import { analysisData } from '../data/analysis';

class CurrencyPage extends Component
{    
    componentWillReceiveProps(newProps)
    {
        let oldCurrency = this.props.id,
            newCurrency = newProps.id;
        
        if(!newProps[newCurrency].length && oldCurrency !== newCurrency)
        {
            this.props.getChart(newCurrency);   
        }
    }
    
    componentDidMount()
    {
        let currency = this.props.id;
        
        if(!this.props[currency].length)
            this.props.getChart(currency);
    }
    
    renderChart()
    {        
        if(this.props.error)
            return <p>{this.props.error}</p>
        else if(!this.props[this.props.id].length)
            return <p>Ładowanie...</p>
        else 
            return (
                <Chart data={this.props[this.props.id]}/>
            );
    }
    
    renderAnalysis(analysis)
    {
        return <Analysis id={analysis.id} key={analysis.id} currency={this.props.id} description={true}/>
    }
    
    render()
    {
        return(
            <PageContainer>
                <PageSection>
                    <Subtitle>{this.props.id.split('_').join(' ')}</Subtitle>
                </PageSection>                   
                <PageSection>
                   {this.renderChart()} 
                    <TextBlock align="center" size=".6rem">Wykres ceny {this.props.id.split('_').join(' ')} z ostatnich 4 godzin.</TextBlock>  
                </PageSection>    
                <PageSection>
                    {analysisData.map(analysis => this.renderAnalysis(analysis))}
                </PageSection>
            </PageContainer>
        )
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ getChart }, dispatch);
}

function mapStateToProps({ charts })
{
    return charts;
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPage);