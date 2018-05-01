import React, { Component } from 'react';
import Currencies from './containers/Currencies';
import Header from './containers/Header';
import MainPage from './containers/Main_page';
import CurrencyPage from './containers/Currency_page';

import styled from 'styled-components';

import { BrowserRouter, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startStream } from './actions';

const PageContainer = styled.article`
    width:100%;
    min-height:100%;
`

class App extends Component 
{
    componentDidMount()
    {
        this.props.startStream();
    }
    
    render() {
        return (
            <BrowserRouter>
                <PageContainer>
                    <Route path="/" render={() => (<Header />)}/>
                    <Route exact path="/" render={() => (<MainPage />)}/>
                    <Route path="/currency/:id" render={(props) => (<CurrencyPage {...props} />)}/>
                    <Route path="/" render={() => (<Currencies streamData={this.props.streamData}/>)}/>
                </PageContainer>                
            </BrowserRouter>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
