import * as actions from '../actions';

export default function(state = {
    active: [],
    history: []
}, action)
{
    switch (action.type)
    {
        case actions.ADDPOSITION:
            return {
                ...state,
                active: [action.payload, ...state.active]
            }
        case actions.DELETEPOSITION:
            let element = state.active.splice(action.payload, 1)[0];
            element.closeValue = +action.payload.closeValue;
            element.closeDate = new Date();
            
            return {
                active: [...state.active],
                history: [element, ...state.history]
            };
        case actions.POSITIONSINIT:
            return action.payload;
        default:
            return state;
    }
}