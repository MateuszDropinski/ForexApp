import styled from 'styled-components';
import bannerBackground from '../../assets/banner.jpg';
import { leadingColor } from '../../data/style';

export const Banner = styled.div`
    width:100%;
    height:120px;
    background-image:url('${bannerBackground}') ;
    background-size:cover;
    background-position:center center;
    position:relative;
`;

export const Header = styled.h1`
    margin:0;
    color:white;
    position:absolute;
    left:15px;
    top:40%;
    transform:translate(0,-50%);
    width:10px;
    line-height:2.2rem;
    font-size:2rem;
    position:relative;

    &:before
    {
        width:100px;
        height:3px;
        content:"";
        position:absolute;
        left:0px;
        top:100%;
        background-color:${leadingColor};
        border-radius:2px;
        transform:translate(0,5px);
    }
`