import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removePosition } from '../actions';

import { StyledTable, PositionButton } from './styles/positions_table';

class PositionsTable extends Component
{
    showDate(date)
    {
        date = new Date(date);
        let year = date.getFullYear(), 
            month = date.getMonth(), 
            day = date.getDate(), 
            hour = date.getHours(), 
            minutes = date.getMinutes();
        
        const addZero = value => {return (value > 9) ? value : '0'+value};
        
        return `${year}-${addZero(month)}-${addZero(day)} ${addZero(hour)}:${addZero(minutes)}`;
    }
    
    getDifference(ins, pos, oV, cV)
    {
        let difference,
            multiplier = (ins.split("_")[0] === "JPY" || ins.split("_")[1] === "JPY") ? 100 : 10000;
        
        if(cV) 
            difference = pos === "buy" ? cV - oV : oV - cV;
        else
            difference = pos === "buy" ? this.props.stream[ins].bid - oV : oV - this.props.stream[ins].ask;
            
        difference = difference || difference === 0 ? Math.round((difference * multiplier) * multiplier) / multiplier : "loading";
        
        if(difference === "loading") 
            return <td>Ładowanie...</td>
        else if(difference > 0) 
            return <td style={{color: '#4ac14a', fontSize: '.8rem'}}>+ {difference}</td>
        else if(difference < 0) 
            return <td style={{color: '#f74444', fontSize: '.8rem'}}>- {difference * (-1)}</td>
        else 
            return <td style={{fontSize: '.8rem'}}>{difference}</td>
    }
    
    renderRow(position, key)
    {
        const { instrument, openDate, closeDate, openValue, closeValue, direction} = position;
        let round = instrument.split("_")[0] === "JPY" || instrument.split("_")[1] === "JPY" ? 3 : 5;
        
        return (<tr key={key} data-key={key}>
            <td>
                {instrument}<br/>
                <span style={{color: direction === "buy" ? "#4ac14a" : "#f74444"}}>{direction}</span>
            </td>
            <td>
                {this.showDate(openDate)}<br/>{parseFloat(openValue).toFixed(round)}
            </td>
            <td>
               { closeDate ? this.showDate(closeDate) : 
                    <PositionButton 
                        show={this.props.stream[instrument].bid} 
                        onClick={e => this.closePosition(e, direction === "buy" ? this.props.stream[instrument].bid : this.props.stream[instrument].ask)}>
                        Zamknij
                    </PositionButton> }
                    <br/>
                { closeValue ? parseFloat(closeValue).toFixed(round) : ""}
            </td>
            {this.getDifference(instrument, direction, openValue, closeValue ? closeValue : null)}
        </tr>)
    }
    
    closePosition(e, closeValue)
    {
        let index = e.target.parentElement.parentElement.getAttribute('data-key');
        e.preventDefault();
        this.props.removePosition(index, closeValue);
    }    
    
    render()
    {
        return(
            <StyledTable className="table">
                <thead>
                    <tr>
                        <td>Pozycja</td>
                        <td>Otwarcie</td>
                        <td>Zamknięcie</td>
                        <td>Zysk/strata (pips)</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.positions.map((position, key) => this.renderRow(position, key))}
                </tbody>
            </StyledTable>
        )
    }
    
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({ removePosition }, dispatch);
}
const connectedComponent = connect(null, mapDispatchToProps)(PositionsTable);

export { connectedComponent as PositionsTable };