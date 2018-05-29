import styled from 'styled-components';
import { leadingColor } from '../../data/style';

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

    &:hover
    {
        background-color: ${props => props.toggle ? "#910808" : "#077b07"};
    }
`

export const Title = styled.h3`
    margin:10px 0px;
    font-size:1rem;
`;

export const Description = styled.p`
    margin:10px 0px;
    font-size:.75rem;
    display:${props => props.show};
`;

export const Percentages = styled.article`
    margin:10px 0px 15px 0px;
    display:flex;
    align-items:center;
`;

export const Bar = styled.div`
    display:flex;
    align-items:center;
    justify-column:center;
    width:50%;
    padding-right:10px;
    position:relative;

    &:before
    {
        content:"${props => props.percentage}%";
        width:${props => props.percentage}%;
        height:30px;
        background-color:#f74444;
        padding-left:10px;
    }
    
    &:after
    {
        content: "Spadek";
        font-size: .6rem;
        position: absolute;
        top:100%;
        left:5px;
    }

    &:first-child
    {
        &:before
        {
            background-color:#4ac14a;
        }

        &:after
        {
            content: "Wzrost";
        }
    }
`;