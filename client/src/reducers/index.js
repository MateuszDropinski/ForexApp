import { combineReducers } from 'redux';
import streamReducer from './stream_reducer';
import chartsReducer from './charts_reducer';
import analysisReducer from './analysis_reducer';

const rootReducer = combineReducers({
    streamData: streamReducer,
    charts: chartsReducer,
    analysis: analysisReducer
});

export default rootReducer;