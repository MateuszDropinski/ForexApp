import * as actions from '../actions';

export default function(state = {
    EUR_USD: [],
    EUR_JPY: [],
    GBP_JPY: [],
    GBP_USD: [],
    USD_JPY: [],
    EUR_GBP: [],
    error: ""
}, action)
{
    switch (action.type)
    {
        case actions.CHART:
            let chartData = action.payload.candles.map(candle => {
                return candle.mid.c;
            });
            chartData.push(action.payload.candles[0].time);
            return {
                ...state,
                [action.payload.instrument]: chartData,
                error: ""
            }
        case actions.ERROR:
            return {
                ...state,
                error: action.payload.errorMessage
            }   
        default:
            return state;
    }
}