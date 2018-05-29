import * as actions from '../actions';

export default function(state = {
    EUR_USD: [],
    EUR_JPY: [],
    GBP_JPY: [],
    GBP_USD: [],
    USD_JPY: [],
    EUR_GBP: []
}, action)
{
    switch (action.type)
    { 
        case actions.PANEL:
            let newArray = state[action.payload.currency];
            newArray[action.payload.id] = newArray[action.payload.id] ? false : true;
            return {
                ...state,
                [action.payload.currency]: newArray
            }
            break;
        case actions.PANELINIT:
            return action.payload;
        default:
            return state;
    }
}