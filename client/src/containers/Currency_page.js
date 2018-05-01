import React, { Component } from 'react';

class CurrencyPage extends Component
{
    shouldComponentUpdate(nextProps)
    {
        const currency = this.props.match.params.id;
        if(currency === nextProps.match.params.id)    
        return false;
        else
        return true;
    }
    
    componentWillMount()
    {
        
    }
    
    render()
    {
        console.log(this.props.match.params.id);
        return(
            <p>Currency</p>
        )
    }
}

export default CurrencyPage;