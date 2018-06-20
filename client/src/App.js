import React, { Component } from 'react';
import Currencies from './containers/Currencies';
import Header from './containers/Header';
import MainPage from './containers/Main_page';
import CurrencyPage from './containers/Currency_page';
import PanelPage from './containers/Panel_page';
import PositionsPage from './containers/Positions_page';

import styled from 'styled-components';

import { analysisData } from './data/analysis';

import { BrowserRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { panelInitiation, positionsInitiation, getAnalysis, getChart } from './actions';

const PageContainer = styled.article`
    width:100%;
    min-height:100%;
`

class App extends Component 
{
    constructor()
    {
        super()
        
        this.state = { hour: 0 };
    }
    
    shouldComponentUpdate()
    {
        return false;
    }
     
    componentDidMount()
    {
        this.props.panelInitiation();
        this.props.positionsInitiation();
        this.setState({ hour: new Date().getHours() });
        
        setInterval(() => {            
            if( new Date().getHours() !== this.state.hour && new Date().getMinutes() > 0)
            {
                this.setState({ hour: new Date().getHours() });  
                for(let instrument in this.props.analysis)
                    for(let analysis in this.props.analysis[instrument])
                        this.props.getAnalysis(analysisData[analysis].candles, instrument, analysisData[analysis].algorithm, analysis);                
            }   
            if(new Date().getMinutes()%5 === 1)
                for(let instrument in this.props.charts)
                    if(this.props.charts[instrument].length && this.props.charts[instrument]) this.props.getChart(instrument);
        }, 60000);
    }
    
    render() {
        return (
            <BrowserRouter>
                <PageContainer>
                    <Route path="/" render={() => (<Header />)}/>
                    <Route exact path="/" render={() => (<MainPage />)}/>
                    <Route exact path="/panel" render={() => (<PanelPage />)}/>
                    <Route exact path="/positions" render={() => (<PositionsPage />)}/>
                    <Route path="/currency/:id" render={props => <CurrencyPage id={props.match.params.id} />}/>
                    <Route path="/" render={() => (<Currencies />)}/>                    
                </PageContainer>                
            </BrowserRouter>
        );
    }
}

function mapStateToProps({ analysis, charts })
{
    return { analysis, charts };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ panelInitiation, positionsInitiation, getAnalysis, getChart }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
