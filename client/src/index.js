import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import { injectGlobal } from 'styled-components';
import { media } from './data/style';
import background from './assets/background.png';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

injectGlobal`
    *
    {
        box-sizing:border-box;
    }
    html
    {
        font-size:100%;
        ${media.lg`font-size:110%;`}
        ${media.hd`font-size:130%;`}
    }
    body
    {
        font-family: 'Noto Sans', sans-serif;
        margin:0px;
        background: url(${background});
        line-height:1.75;
    }
    .active-link
    {
        &:before
        {
            width:100%;
        }
    }
`

ReactDOM.render(
    <Provider store={store}>
            <App/> 
    </Provider>
, document.getElementById('root'));
