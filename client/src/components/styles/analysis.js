import styled from 'styled-components';
import { leadingColor, media } from '../../data/style';

export const AnalysisContainer = styled.article`
    width:100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding:15px 20px;
    margin:10px 0px;
    display:flex;
    flex-direction:column;
    border:1px solid ${leadingColor};
    border-radius:2px;
    background-color:#ffffff;
    position:relative;  

    ${media.md`margin:20px 0px; padding:25px 30px;`}
    ${media.lg`margin:30px 0px; padding:40px;`}
    ${media.hd`margin:40px 0px; padding:50px;`}
`;

export const ToggleButton = styled.button`
    display:${props => props.show};
    position:absolute;
    top:5px;
    right:5px;
    cursor:pointer;
    padding:5px 10px;
    background-color: ${props => props.toggle ? "#eb4242" : "#2bd32b"};
    color:#ffffff;
    border: none;
    border-radius:2px;
    transition:.25s;
    font-size:.7rem;

    &:hover
    {
        background-color: ${props => props.toggle ? "#910808" : "#077b07"};
    }

    ${media.md`top:10px; right:10px; padding:10px 15px;`}
    ${media.lg`top:20px; right:20px; padding:15px 25px;`}
    ${media.hd`top:30px; right:30px; padding:20px 30px;`}
`

export const Title = styled.h3`
    margin:10px 0px;
    font-size:1rem;
`;

export const Description = styled.p`
    margin:10px 0px;
    font-size:.75rem;
    display:${props => props.show};

    ${media.lg`margin: 20px 0px;`}
    ${media.hd`margin: 30px 0px;`}
`;

export const Percentages = styled.article`
    width:100%;
    margin:10px 0px 40px 0px;
    position:relative;
    background-color: #4ac14a;
    
    ${media.md`margin:10px 0px 50px 0px;`}
    ${media.lg`margin:20px 0px 60px 0px;`}
    ${media.hd`margin:30px 0px 70px 0px;`}
`;

export const Bar = styled.div`
    display:flex;
    align-items:center;
    justify-column:center;
    width:${props => props.percentage}%;
    position:relative;
    background-color:${props => props.side === "left" ? "#4ac14a" : "#f74444"};
    position:absolute;
    ${props => props.side === "left" ? "left:0px;" : "right:0px;"}
    top:0px;

    &:before
    {
        content:"${props => props.percentage}%";
        width:50px;
        height:30px;
        padding-left:10px;
        display:flex;
        align-items:center;
    }
    
    &:after
    {
        content: "Spadek";
        font-size: .65rem;
        position: absolute;
        top:100%;
        left:5px;
    }

    &:first-child
    {
        &:after
        {
            content: "Wzrost";
        }
    }

    ${media.md`&:before{height:35px;}`}
    ${media.lg`&:before{height:45px;}`}
    ${media.hd`&:before{height:60px;}`}
`;