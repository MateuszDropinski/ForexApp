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

    ${media.md`margin:15px 0px 10px 0px; padding:20px 25px;`}
    ${media.lg`margin:15px 5% 10px 5%; padding:30px; width:90%;`}
    ${media.hd`margin:20px 5% 15px 5%; padding:35px;`}
`;

export const ToggleButton = styled.button`
    display:${props => props.show};
    position:absolute;
    top:15px;
    right:20px;
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

    ${media.md`top:20px; right:25px; padding:10px 15px;`}
    ${media.lg`top:30px; right:30px; padding:10px 20px;`}
    ${media.hd`top:40px; right:40px; padding:15px 25px;`}
`

export const Title = styled.h3`
    margin:5px 0px;
    font-size:1rem;

    ${media.hd`margin:10px 0px;`}
`;

export const Description = styled.p`
    margin:10px 0px;
    font-size:.75rem;
    display:${props => props.show};

    ${media.hd`margin: 15px 0px;`}
`;

export const Percentages = styled.article`
    width:100%;
    margin:5px 0px 35px 0px;
    position:relative;
    background-color: #4ac14a;
    
    ${media.md`margin:10px 0px 40px 0px;`}
    ${media.lg`margin:15px 0px 45px 0px;`}
    ${media.hd`margin:20px 0px 50px 0px;`}
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
        height:25px;
        padding-left:10px;
        display:flex;
        align-items:center;
        z-index:2;
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

    ${media.md`&:before{height:30px;}`}
    ${media.lg`&:before{height:35px;}`}
    ${media.hd`&:before{height:40px;}`}
`;