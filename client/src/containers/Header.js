import React, { Component } from 'react';

import { MainHeader, Menu, StyledLink } from './styles/header';

class Header extends Component
{   
    render()
    {    
        return(
            <MainHeader>
                <Menu>
                    <StyledLink activeClassName="active-link" exact to="/">Strona główna</StyledLink>
                    <StyledLink activeClassName="active-link" to="/panel">Panel analiz</StyledLink>
                    <StyledLink activeClassName="active-link" to="/orders">Historia zleceń</StyledLink>
                </Menu>
            </MainHeader>
        )
    }
}

export default Header;

