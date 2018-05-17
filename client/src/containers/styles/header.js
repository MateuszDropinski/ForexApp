import { NavLink } from 'react-router-dom';

import styled from 'styled-components';
import { leadingColor } from '../../data/style';

export const MainHeader = styled.header`
    padding:15px;
    background-color:#000000;
    font-size:1rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

export const Menu = styled.nav`
    font-size:.8rem;
    display:flex;
    justify-content:space-between;
    align-items:center
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
        left:0px;
    }
`;