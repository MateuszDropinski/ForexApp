import styled from 'styled-components';
import bannerBackground from '../../assets/banner.jpg';
import { leadingColor, media } from '../../data/style';

export const Banner = styled.div`
    width:100%;
    height:120px;
    background-image:url('${bannerBackground}') ;
    background-size:cover;
    background-position:center center;
    position:relative;

    ${media.md`height:130px;`}
    ${media.md`height:180px;`}
    ${media.md`height:230px;`}
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

    ${media.md`
        width:100%;
        text-align:center;
        left:0px;
        
        &:before{
            left:50%;width:170px;
            transform:translate(-50%,10px);
    }`}
    ${media.lg`&:before{
            width:220px;
    }`}
    ${media.hd`&:before{
            width:260px;
            transform:translate(-50%,20px);
            height:5px;
    }`}
`