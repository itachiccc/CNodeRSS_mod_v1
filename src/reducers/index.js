import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import topicListReducer from './topicListReducer';
import topicReducer from './topicReducer';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    topicListReducer,
    topicReducer,
    userReducer,
    routing: routerReducer
});

export default rootReducer;