import styled from 'styled-components';
import { leadingColor } from '../../data/style';

export const StyledTable = styled.table`
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

export const PositionButton = styled.button`
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