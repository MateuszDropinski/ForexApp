import styled from 'styled-components';
import { leadingColor, media } from '../../data/style';

export const CurrenciesContainer = styled.article`
    width:100%;
    display:grid;
    grid-template: 110px 110px / 1fr 1fr 1fr;
    position:fixed;
    top:100%;
    transition:.25s;    
    transform:${props => props.show ? "translate(0,-100%)" : "translate(0,0)" };

    ${media.md`grid-template:120px 120px / 1fr 1fr 1fr;`}
    ${media.lg`grid-template:140px / 1fr 1fr 1fr 1fr 1fr 1fr;`}
    ${media.hd`grid-template:185px / 1fr 1fr 1fr 1fr 1fr 1fr;`}
`

export const ExpandBar = styled.div`
    position: absolute;
    width:100%;
    height:40px;
    background-color:black;
    color:white;
    cursor:pointer;
    top:0%;
    transform:translate(0,-100%);
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    transition:.25s;
    border-top:3px solid ${leadingColor};
    font-size:1rem;

    &:hover
    {
        background-color:white;
        color:black;
    }

    ${media.md`height:50px;`}
    ${media.lg`height:60px;`}
    ${media.hd`height:70px;`}
`