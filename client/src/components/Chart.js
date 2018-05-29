import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

import { leadingColor } from '../data/style';

const Chart = ({ data }) =>
{
    data.splice(-1,1);
    
    return(
        <Sparklines style={{width:"100%", borderBottom: "2px solid black", borderLeft: "2px solid black"}} data={data}>
            <SparklinesLine style={{ fill: 'none', stroke: leadingColor, strokeWidth: '3px'}}/>
        </Sparklines>
    )
}

export { Chart };