import styled from 'styled-components';
import { leadingColor, media } from '../../data/style';
import { NavLink } from 'react-router-dom';

export const CurrencyContainer = styled(NavLink)`
    padding:5px;
    border:1px solid gray;
    background-color:#ffffff;
    text-decoration:none;
    color:black;
    transition:.25s;
    position:relative;

    &:hover
    {
        background-color:${leadingColor};
    }

    ${media.md`padding:10px;`}
    ${media.lg`padding:15px;`}
    ${media.hd`padding:25px;`}
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

    ${media.md`margin:4px 0px;`}
    ${media.lg`margin:6px 0px;`}
    ${media.hd`margin:10px 0px;`}
`

export const PositionButton = styled.button`
    font-size:.7rem;
    border:none;
    padding:5px;
    margin:2px 5px 2px 0px;
    width:30px;
    border-radius:2px;
    cursor:pointer;
    background-color:${props => props.position === "buy" ? "#4ac14a" : "#f74444"};
    display: ${props => props.show ? "inline" : "none"};
    transition:.25s;

    &:hover
    {
        background-color:${props => props.position === "buy" ? "#16a521" : "#d41414"};
        color:white;
    }

    ${media.md`padding:5px 10px; width:50px;`}
    ${media.lg`padding:7px 10px; width:60px;`}
    ${media.hd`padding:10px 15px; width:80px;margin:2px 10px 2px 0px;`}
`

export const InfoBox = styled.div`
    width:100%;
    padding:5px;
    min-height:50px;
    position:absolute;
    background-color:white;
    border-radius:2px;
    border:2px solid ${leadingColor};
    bottom:0px;
    visibility:${props => props.show ? "visible" : "hidden"};
    right:0px;
    transition: visibility 0s, opacity 0.25s linear;
    opacity:${props => props.opacity};
    
    p
    {   
        text-align:center;
        font-size:.6rem;
        margin:0px;
    }
`