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
    switch (action.type)
    {
        case actions.PRICE:
            let newAskBid = {
                bid: action.payload.closeoutBid,
                ask: action.payload.closeoutAsk
            }
            return {
                ...state,
                [action.payload.instrument]: newAskBid
            }
        default:
            return state;
    }
}