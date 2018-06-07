import React, { Component } from 'react';

import styled from 'styled-components';
import { leadingColor } from '../data/style';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removePosition } from '../actions';

const StyledTable = styled.table`
    width:100%;
    font-size:.65rem;
    text-align:center;
    border-spacing:0px;
    margin-top:20px;
    td
    {
        border:1px solid ${leadingColor};
        padding:5px;
    }
    tr
    {
        border: 1px solid black;
    }
    thead
    {
        font-size:.7rem;
        background-color:#c4c4c4;
    }
`

const PositionButton = styled.button`
    border:none;
    border-radius:2px;
    background-color:#000000;
    color:white;
    cursor:pointer;
    font-size:.8rem;
    padding:5px;
    transition:.25s;
    display: ${props => props.show ? "inline" : "none"};

    &:hover
    {
        background-color:#ffffff;
        color:black;
        border:1px solid black;
    }
`

class PositionsTable extends Component
{
    showDate(date)
    {
        date = new Date(date);
        let year = date.getFullYear(), month = date.getMonth(), 
            day = date.getDate(), hour = date.getHours(), minutes = date.getMinutes();
        return `${year}-${month > 9 ? month : "0"+month}-${day > 9 ? day : "0"+day} ${hour > 9 ? hour : "0"+hour}:${minutes > 9 ? minutes : "0"+minutes}`;
    }
    
    getDifference(ins, pos, oV, cV)
    {
        let difference, multiplier;
        multiplier = ins.split("_")[0] === "JPY" || ins.split("_")[1] === "JPY" ? 100 : 10000;
        if(cV && pos === "buy") difference = cV - oV;
        else if(cV) difference = oV - cV;
        else {
            if(pos === "buy")
                difference = this.props.stream[ins].bid - oV;
            else 
                difference = oV - this.props.stream[ins].ask;
        }
        difference = this.props.stream[ins].bid ? Math.round((difference * multiplier) * multiplier) / multiplier : "loading";
        
        if(difference === "loading") return <td>Ładowanie...</td>
        else if(difference > 0) return <td style={{color: '#4ac14a', fontSize: '.8rem'}}>+ {difference}</td>
        else if(difference < 0) return <td style={{color: '#f74444', fontSize: '.8rem'}}>- {difference * (-1)}</td>
        else return <td style={{fontSize: '.8rem'}}>{difference}</td>
    }
    
    renderRow(position, key)
    {
        const { instrument, openDate, closeDate, openValue, closeValue, direction} = position;
        let round = instrument.split("_")[0] === "JPY" || instrument.split("_")[1] === "JPY" ? 3 : 5;
        
        return <tr key={key} data-key={key}>
            <td>{instrument}<br/><span style={{color: direction === "buy" ? "#4ac14a" : "#f74444"}}>{direction}</span></td>
            <td>{this.showDate(openDate)}<br/>{parseFloat(openValue).toFixed(round)}</td>
            <td>{closeDate ? this.showDate(closeDate) : <PositionButton 
                show={this.props.stream[instrument].bid} 
                onClick={e => this.closePosition(e, direction === "buy" ? this.props.stream[instrument].bid : this.props.stream[instrument].ask)}>
                    Zamknij
                </PositionButton>}
                <br/>
                { closeValue ? parseFloat(closeValue).toFixed(round) : ""}
            </td>
            {this.getDifference(instrument, direction, openValue, closeValue ? closeValue : null)}
        </tr>
    }
    
    closePosition(e, closeValue)
    {
        let index = e.target.parentElement.parentElement.getAttribute('data-key'), node = e.target.parentElement.parentElement;
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