import * as actions from '../actions';

export default function(state = {
    EUR_USD: {},
    EUR_JPY: {},
    GBP_JPY: {},
    GBP_USD: {},
    USD_JPY: {},
    EUR_GBP: {}
}, action)
{
    switch(action.type)
    {
        case actions.ANALYSIS:            
            return {
                ...state,
                [action.payload.currency]: 
                {
                    [action.payload.id]: action.payload.result
                }                    
            }
        default:
            return state;
    }
}