import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { leadingColor, media } from '../../data/style';

export const MainHeader = styled.header`
    padding:15px;
    background-color:#000000;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px ${leadingColor};
    position:relative;
    z-index:1;
    
    ${media.md`padding:20px 50px;`}
    ${media.hd`padding:25px 50px;`}
`;

export const Menu = styled.nav`
    font-size:.8rem;
    display:flex;
    justify-content:space-between;
    align-items:center;
    max-width:500px;
    margin:0px auto;

    ${media.md`font-size:1rem;`}
    ${media.lg`max-width:600px;`}
    ${media.hd`max-width:700px;`}
`;

export const StyledLink = styled(NavLink)`
    text-decoration:none;
    color:#ffffff;
    transition:.25s;
    position:relative;
    padding:3px;

    &:hover
    {
        &:before
        {
            width:100%;
        }
    }

    &:before
    {
        transition:.25s;
        content:"";
        width:0%;
        height:2px;
        background-color:${leadingColor};
        position:absolute;
        top:100%;
        border-radius:2px;
        margin-top:2px;
        left:0px;+
    }

    ${media.md`padding:5px;`}
    ${media.hd`&:before{height:4px;}`}
`;