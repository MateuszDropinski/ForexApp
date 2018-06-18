import * as actions from '../actions';

export default function(state = {
    EUR_USD: {},
    USD_CAD: {},
    GBP_JPY: {},
    NZD_USD: {},
    USD_JPY: {},
    EUR_GBP: {}
}, action)
{
    switch(action.type)
    {
        case actions.LOADING:
            return {
                ...state,
                [action.payload.currency]:
                {
                    ...state[action.payload.currency],
                    [action.payload.id]: "Loading"
                }
            }
        case actions.ANALYSIS:            
            return {
                ...state,
                [action.payload.currency]: 
                {
                    ...state[action.payload.currency],
                    [action.payload.id]: {...action.payload.result}
                }                    
            }
        default:
            return state;
    }
}