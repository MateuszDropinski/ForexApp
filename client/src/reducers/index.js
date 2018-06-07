import { combineReducers } from 'redux';
import streamReducer from './stream_reducer';
import chartsReducer from './charts_reducer';
import analysisReducer from './analysis_reducer';
import panelReducer from './panel_reducer';
import positionsReducer from './positions_reducer';

const rootReducer = combineReducers({
    stream: streamReducer,
    charts: chartsReducer,
    analysis: analysisReducer,
    panel: panelReducer,
    positions: positionsReducer
});

export default rootReducer;