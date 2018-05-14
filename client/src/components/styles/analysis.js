import styled from 'styled-components';
import { leadingColor } from '../../data/style';

export const AnalysisContainer = styled.article`
    width:100%;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding:15px 20px;
    margin:10px 0px;
    display:grid;
    grid-template: 50px 100px ${props => props.currency ? "100px" : "0px"} / 50% 50%;
    border:1px solid ${leadingColor};
    border-radius:2px;
`;

export const Title = styled.h3`
    margin:0px;
    font-size:1rem;
    display:flex;
    align-items:center;
`;

export const Correctness = styled.p`
    margin:0px;
    font-size:.8rem;
    display:flex;
    align-items:center;
    justify-content:flex-end;
`;

export const Description = styled.p`
    margin:0px;
    font-size:.75rem;
    grid-column: 1 / 3;
    display:flex;
    align-items:center;
`;

export const Percentages = styled.article`
    grid-column: 1 / 3;
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

    &:first-child
    {
        &:before
        {
            background-color:#4ac14a;
        }
    }
`;