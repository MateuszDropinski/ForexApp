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
                active: [...state.active, action.payload]
            }
        case actions.DELETEPOSITION:
            let element = state.active.splice(action.payload.id, 1)[0];
            element.closeValue = +action.payload.closeValue;
            element.closeDate = new Date();
            if(state.history.length > 30)state.history.pop();
            
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