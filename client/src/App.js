import React, { Component } from 'react';
import Currencies from './containers/Currencies';
import Header from './containers/Header';
import MainPage from './containers/Main_page';
import CurrencyPage from './containers/Currency_page';

import styled from 'styled-components';

import { BrowserRouter, Route } from 'react-router-dom';

const PageContainer = styled.article`
    width:100%;
    min-height:100%;
`

class App extends Component 
{
    render() {
        return (
            <BrowserRouter>
                <PageContainer>
                    <Route path="/" render={() => (<Header />)}/>
                    <Route exact path="/" render={() => (<MainPage />)}/>
                    <Route path="/currency/:id" render={props => <CurrencyPage id={props.match.params.id} />}/>
                    <Route path="/" render={() => (<Currencies />)}/>
                </PageContainer>                
            </BrowserRouter>
        );
    }
}

export default App;
