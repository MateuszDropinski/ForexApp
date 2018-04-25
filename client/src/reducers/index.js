import { combineReducers } from 'redux';
import streamReducer from './stream_reducer';

const rootReducer = combineReducers({
    streamData: streamReducer
});

export default rootReducer;