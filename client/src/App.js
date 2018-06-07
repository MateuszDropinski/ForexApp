import React, { Component } from 'react';
import Currencies from './containers/Currencies';
import Header from './containers/Header';
import MainPage from './containers/Main_page';
import CurrencyPage from './containers/Currency_page';
import PanelPage from './containers/Panel_page';
import PositionsPage from './containers/Positions_page';

import styled from 'styled-components';

import { BrowserRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { panelInitiation, positionsInitiation } from './actions';

const PageContainer = styled.article`
    width:100%;
    min-height:100%;
`

class App extends Component 
{
    componentDidMount()
    {
        this.props.panelInitiation();
        this.props.positionsInitiation();
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

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ panelInitiation, positionsInitiation }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
