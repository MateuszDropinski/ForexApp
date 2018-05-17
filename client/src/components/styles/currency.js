import styled from 'styled-components';
import { leadingColor } from '../../data/style';
import { NavLink } from 'react-router-dom';

export const CurrencyContainer = styled(NavLink)`
    padding:5px;
    border:1px solid gray;
    background-color:#ffffff;
    text-decoration:none;
    color:black;
    transition:.25s;

    &:hover
    {
        background-color:${leadingColor};
    }
`

export const Instrument = styled.h3`
    margin:0px;
    font-size:.8rem;
`
export const Paragraph = styled.p`
    margin:2px 0px;
    font-size:.7rem;
    span
    {
        color: ${props => props.color};
    }
`